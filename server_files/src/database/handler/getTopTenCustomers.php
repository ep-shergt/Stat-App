<?php

function getTopTenCustomers () {
	// get currency from client's post request
	$currencyForSales = filter_input(INPUT_POST, 'currencyForSales');

	$db = new Database();

	// database request for providing the data for the top ten customer table depending on the user's session
	$getCustomerRows = $db->getRows("SELECT tbl_customer.firstname, tbl_customer.lastname, tbl_customer.customer_email,
									 SUM( tbl_orders.sales_without_tax ) AS sales,
									 COUNT( tbl_orders.order_id ) AS ordercount,
									 (SELECT MAX(tbl_orders.creationdate)) AS creationdate
									 FROM tbl_customer JOIN tbl_orders ON tbl_customer.customer_id = tbl_orders.customer_id
									 JOIN tbl_shop ON tbl_orders.shop_id = tbl_shop.shop_id JOIN tbl_users ON tbl_users.user_id = tbl_shop.user_id
									 WHERE tbl_orders.currency = ? AND tbl_users.email = ?
									 GROUP BY tbl_customer.customer_email ORDER BY sales DESC LIMIT 10", [$currencyForSales, $_SESSION['email']]);

	$json = json_encode($getCustomerRows, JSON_FORCE_OBJECT);
	return $json;
}
