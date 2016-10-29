<?php

function handleUserLogin() {
	$loginEmail = filter_input(INPUT_POST, 'loginEmail', FILTER_SANITIZE_SPECIAL_CHARS);
	$loginPassword = md5(filter_input(INPUT_POST, 'loginPassword', FILTER_SANITIZE_SPECIAL_CHARS));

	$db = new Database();

	$getRow = $db->getRows("SELECT email FROM tbl_users WHERE email = ? AND password = ?", [$loginEmail, $loginPassword]);

	return (string) count($getRow);
}

