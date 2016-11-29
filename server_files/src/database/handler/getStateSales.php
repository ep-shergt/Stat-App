<?php

function getStateSales() {
	$currencyForSales = filter_input(INPUT_POST, 'currencyForSales');

	$db = new Database();
	$dataArray = [];

	$getStateRows = $db->getRows("SELECT tbl_states.state, SUM(tbl_orders.sales_without_tax) AS sales FROM tbl_orders
								 NATURAL JOIN tbl_customer NATURAL JOIN tbl_locations NATURAL JOIN tbl_states WHERE tbl_orders.currency = ?
								 GROUP BY tbl_states.state ORDER BY tbl_orders.sales_without_tax DESC", [$currencyForSales]);

	$json = json_encode($getStateRows, JSON_FORCE_OBJECT);
	return $json;
}
