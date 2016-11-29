<?php

function handleUserLogin() {
	$loginEmail = filter_input(INPUT_POST, 'loginEmail', FILTER_SANITIZE_SPECIAL_CHARS);
	$loginPassword = md5(filter_input(INPUT_POST, 'loginPassword', FILTER_SANITIZE_SPECIAL_CHARS));
	$dataArray = [];
	$timestamp = (string) time();
	$cryptTimestamp = sha1($timestamp);

	$_SESSION["email"] = $loginEmail;

	$db = new Database();

	$getRowNames = $db->getRows("SELECT firstname, lastname FROM tbl_users WHERE email = ?
								 AND password = ?",
								 [$loginEmail, $loginPassword]);

	if ($getRowNames) {
		$db->updateRow("UPDATE tbl_users SET tbl_users.timestamp = ? WHERE email = ?", [$cryptTimestamp, $_SESSION["email"]]);

		$email = md5($loginEmail);
		$token = $email . '!' . $cryptTimestamp;
		array_push($dataArray, (string) count($getRowNames), $getRowNames, $token);

	} else {
		array_push($dataArray, (string) count($getRowNames));
	}

	if (isset($_SESSION['email'])) {
		$getShopDataRows = $db->getRows("SELECT tbl_shop.shop_url, tbl_shop.epages_shop_id, tbl_shop.access_token FROM (tbl_shop, tbl_users)
										 WHERE tbl_shop.user_id = tbl_users.user_id AND tbl_users.email = ?", [$_SESSION['email']]);

		$devshopurl = $getShopDataRows[0]['shop_url'];
		$epagesshopid = $getShopDataRows[0]['epages_shop_id'];
		$accesstoken = $getShopDataRows[0]['access_token'];

		$shop = new ep6\Shop($devshopurl, $epagesshopid, $accesstoken, true);

	} else {
		var_dump('session_error');
	}

	$json = json_encode($dataArray, JSON_FORCE_OBJECT);
	return $json;
}
