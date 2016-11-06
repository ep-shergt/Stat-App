<?php

function handleLoadShopData() {

	global $shop;

	$filter = new ep6\OrderFilter();
	$filter->setResultsPerPage(100);
	$fullOrders = $filter->getOrders();
	$shop_name = $shop->getName();

	$page = 1;

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


	$db = new Database();

	$getShopRow = $db->getRow("SELECT * FROM tbl_shop WHERE shop_name = ?", [$shop_name]);

	if ($getShopRow) {
		$db->deleteRow("DELETE FROM tbl_orders WHERE shop_id = (SELECT shop_id FROM tbl_shop WHERE shop_name = ?)", [$shop_name]);
		$db->deleteRow("DELETE FROM tbl_customer WHERE shop_id = (SELECT shop_id FROM tbl_shop WHERE shop_name = ?)", [$shop_name]);
		$db->deleteRow("DELETE FROM tbl_shop WHERE shop_name = ?", [$shop_name]);
	} 

	$db->insertRow("INSERT INTO tbl_shop (shop_id, user_id, shop_name)
	 			    VALUES (?, (SELECT user_id FROM tbl_users WHERE email = 'max'),?)", ["1", $shop_name]);


	
	foreach ($fullOrders as $order) {
	 	if ($order->isPaid()) {
	 		$customer_email = $order->getBillingAddress()->getEmailAddress();
			$customer_zip = $order->getBillingAddress()->getZipCode();
			$customer_city = $order->getBillingAddress()->getCity();
			$order_id = $order->getID();
			$sales_with_tax = $order->getTotalPrice()->getAmount();
			$order_currency = $order->getTotalPrice()->getCurrency();
			$timestamp = $order->getPayDate()->getTimestamp();
			$payDate = date("Y-m-d", $timestamp);
			$payDay = date("N", $timestamp);
			$payDayPerMonth = date('j', $timestamp);
			$payWeek = date("W", $timestamp);
			$payMonth = date("n", $timestamp);
			$payYear = date("Y", $timestamp);

			$getCustomerRow = $db->getRow("SELECT * FROM tbl_customer WHERE customer_email = ?", [$customer_email]);

			if(!$getCustomerRow) {
				$db->insertRow("INSERT INTO tbl_customer (shop_id, customer_email) VALUES ((SELECT shop_id FROM tbl_shop WHERE shop_name = ?), ?)", [$shop_name, $customer_email]);
			}

			$db->insertRow("INSERT INTO tbl_orders (order_id, shop_id, sales_with_tax, customer_id, currency, paydate, payday, payday_per_month, payweek, paymonth, payyear)
	                VALUES (?, (SELECT shop_id FROM tbl_shop WHERE shop_name = ?), ?, (SELECT customer_id FROM tbl_customer WHERE customer_email = ?), ?, ?, ?, ?, ?, ?, ?)",
	                [$order_id, $shop_name, $sales_with_tax, $customer_email, $order_currency, $payDate, $payDay, $payDayPerMonth, $payWeek, $payMonth, $payYear]);
	 		
		}
		
	}

}
