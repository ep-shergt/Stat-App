<?php

function handleLoadShopData() {
	// create database object
	$db = new Database();
	// get shop access data from database
	$getShopDataRows = $db->getRows("SELECT tbl_shop.shop_url, tbl_shop.epages_shop_id, tbl_shop.access_token
									 FROM (tbl_shop, tbl_users)
									 WHERE tbl_shop.user_id = tbl_users.user_id AND tbl_users.email = ?",
									 [$_SESSION['email']]);
	// assign access data to variables
	$devshopurl = $getShopDataRows[0]['shop_url'];
	$epagesshopid = $getShopDataRows[0]['epages_shop_id'];
	$accesstoken = $getShopDataRows[0]['access_token'];
	// create shop object with access variables (REST-call)
	$shop = new ep6\Shop($devshopurl, $epagesshopid, $accesstoken, true);
	// create currency object for the shop
	$shopCurrencies = new ep6\Currencies();
	$shopCurrencyArray = $shopCurrencies->getItems();
	// get shop data that fit to the access token
	$getShopRow = $db->getRow("SELECT * FROM tbl_shop WHERE access_token = ?", [$accesstoken]);
	// check if access token exist
	if ($getShopRow) {
		// delete all orders belonging to the shop and all shop-customer related info (not the customers!)
		$db->deleteRow("DELETE tbl_orders FROM tbl_orders JOIN tbl_shop ON tbl_orders.shop_id = tbl_shop.shop_id
						WHERE tbl_shop.access_token = ?", [$accesstoken]);
		$db->deleteRow("DELETE tbl_shop_customer FROM tbl_shop_customer JOIN tbl_customer
						ON tbl_shop_customer.customer_id = tbl_customer.customer_id
		 				JOIN tbl_shop ON tbl_shop_customer.shop_id = tbl_shop.shop_id WHERE tbl_shop.access_token = ?",
		 				[$accesstoken]);
	}

	// loop over all available currencies in the shop
	foreach ($shopCurrencyArray as $shopCurrency) {
		// set currency in the shop object
		$shopCurrencies->setCurrency($shopCurrency);
		// create order filter object
		$filter = new ep6\OrderFilter();
		// set displayed orders in the MBO (and in the shop object) to 100
		$filter->setResultsPerPage(100);
		// get all orders (max. 100) as an array
		$fullOrders = $filter->getOrders();

		$page = 1;
		// now get ALL orders by joining all orders per page (while loop over the pages in the MBO where orders are present)
		while (TRUE):
			$filter->setPage($page + 1);
			$ordersPerPage = $filter->getOrders();
			if (count($ordersPerPage)) {
				$fullOrders = array_merge($fullOrders, $ordersPerPage);
				$page++;
			} else {
				break;
			}
		endwhile;
		// loop over all orders and extract valuable info for statistical analysis and insert them into the database
		foreach ($fullOrders as $order) {
			$isPaid = $order->isPaid();
	 		$customer_email = $order->getBillingAddress()->getEmailAddress();
	 		$firstname = $order->getBillingAddress()->getFirstName();
	 		$lastname = $order->getBillingAddress()->getLastName();
			$customer_zip = $order->getBillingAddress()->getZipCode();
			$customer_city = $order->getBillingAddress()->getCity();
			$order_id = $order->getID();
			$sales_with_tax = $order->getTotalPrice()->getAmount();
			$sales_without_tax = $order->getTotalPriceWithoutTax()->getAmount();
			$order_currency = $order->getTotalPrice()->getCurrency();
			// get all customers from the database with the email address of the order
			$getCustomerRow = $db->getRow("SELECT * FROM tbl_customer WHERE customer_email = ?", [$customer_email]);
			// get all locations from database that have the same zip code and city as the customer of the order
			$getAddressCustomerRow = $db->getRow("SELECT * FROM tbl_locations WHERE zip_code = ?
												  AND location = ? ", [$customer_zip, $customer_city]);
			// get all shop-customer relations from database with the email address from the shop's order
			$getShopCustomerRow = $db->getRow("SELECT * FROM tbl_shop_customer JOIN tbl_customer
											   ON tbl_shop_customer.customer_id = tbl_customer.customer_id
			 								   JOIN tbl_shop ON tbl_shop_customer.shop_id = tbl_shop.shop_id
			 								   WHERE tbl_customer.customer_email = ? AND tbl_shop.access_token = ?",
			 								   [$customer_email, $accesstoken]);
			// check if customer exists in database
			if (!$getCustomerRow) {
				// check if address exists in database
				if (!$getAddressCustomerRow) {
					// insert new address info into database
					$db->insertRow("INSERT INTO tbl_locations (zip_code, location) VALUES (?, ?)", [$customer_zip, $customer_city]);
				}
				// insert new customer into database
				$db->insertRow("INSERT INTO tbl_customer (firstname, lastname, customer_email, locations_id) VALUES
								(?, ?, ?, (SELECT locations_id FROM tbl_locations WHERE zip_code = ? AND location = ?))",
							    [$firstname, $lastname, $customer_email, $customer_zip, $customer_city]);
			}
			// check if shop-customer relation exists in  database
			if (!$getShopCustomerRow) {
				// insert new customer data into database
				$db->insertRow("INSERT INTO tbl_shop_customer (customer_id, shop_id) VALUES ((SELECT tbl_customer.customer_id
								FROM tbl_customer WHERE customer_email = ?),
								(SELECT tbl_shop.shop_id FROM tbl_shop WHERE tbl_shop.access_token = ?) )",
								[$customer_email, $accesstoken]);
			}
			// assign state_id 17 to all locations that are not linked to a state
			$db->updateRow("UPDATE tbl_locations SET state_id = ? WHERE state_id IS NULL", [17]);

			// check if order is paid
		 	if($isPaid) {
		 		// extract pay date
				$timestamp = $order->getPayDate()->getTimestamp();
				$payDate = date("Y-m-d", $timestamp);
		 	} else {
		 		// set pay date to NULL
		 		$payDate = NULL;
		 	}

		 	// extract the date the order was created in the shop
			$cTimestamp = $order->getCreationDate()->getTimestamp();
			$creationDate = date("Y-m-d", $cTimestamp);

			// insert all relevant order info into the database
			$db->insertRow("INSERT INTO tbl_orders (order_id, is_paid, shop_id, sales_with_tax, sales_without_tax, customer_id, currency, paydate, creationdate)
	                		VALUES (?, ?, (SELECT shop_id FROM tbl_shop WHERE access_token = ?), ?, ?, (SELECT customer_id FROM tbl_customer
	                		WHERE customer_email = ?), ?, ?, ?)",
	                		[$order_id, $isPaid, $accesstoken, $sales_with_tax, $sales_without_tax, $customer_email,
	                		 $order_currency, $payDate, $creationDate]);
		}
	}
}
