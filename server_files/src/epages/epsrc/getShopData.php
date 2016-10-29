<?php

function getShopData () {

	global $shop;

	$currencies = new ep6\Currencies();
	$default = $currencies->getDefault();

	return (string) $default;
}
