<?php

function getShopName () {

	$db = new Database();
	$getShopDataRows = $db->getRows("SELECT tbl_shop.shop_url, tbl_shop.epages_shop_id, tbl_shop.access_token FROM (tbl_shop, tbl_users)
										 WHERE tbl_shop.user_id = tbl_users.user_id AND tbl_users.email = ?", [$_SESSION['email']]);

	$devshopurl = $getShopDataRows[0]['shop_url'];
	$epagesshopid = $getShopDataRows[0]['epages_shop_id'];
	$accesstoken = $getShopDataRows[0]['access_token'];

	$shop = new ep6\Shop($devshopurl, $epagesshopid, $accesstoken, true);

	$dataArray = [];

	$token = filter_input(INPUT_POST, 'token', FILTER_SANITIZE_SPECIAL_CHARS);
	$tokenArray = explode("!", $token);


	$getRowEmail = $db->getRows("SELECT email FROM tbl_users WHERE MD5(email) = ? AND tbl_users.timestamp = ?",
								 [$tokenArray[0], $tokenArray[1]]);


	$shopname = $shop_name = $shop->getName();
	array_push($dataArray, (string) count($getRowEmail));
	array_push($dataArray, $shopname);

	$json = json_encode($dataArray, JSON_FORCE_OBJECT);

	return $json;
}
