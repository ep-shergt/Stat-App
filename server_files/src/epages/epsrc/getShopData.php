<?php

function getShopData () {

	global $shop;

	
	$filter = new ep6\OrderFilter();
	$filter->setResultsPerPage(100);
	$fullOrders = $filter->getOrders();
	// $defaultCurrency = $currencies->getDefault();

	return var_dump($fullOrders[10]);
}
