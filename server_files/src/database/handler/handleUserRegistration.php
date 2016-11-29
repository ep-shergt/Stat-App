<?php

function handleUserRegistration() {

		$regFirstName = strtolower(filter_input(INPUT_POST, 'regFirstName', FILTER_SANITIZE_SPECIAL_CHARS));
		$regLastName = strtolower(filter_input(INPUT_POST, 'regLastName', FILTER_SANITIZE_SPECIAL_CHARS));
		$regEmail = filter_input(INPUT_POST, 'regEmail', FILTER_SANITIZE_SPECIAL_CHARS);
		$regPassword = md5(filter_input(INPUT_POST, 'regPassword', FILTER_SANITIZE_SPECIAL_CHARS));
		$regConfirmPassword = md5(filter_input(INPUT_POST, 'regConfirmPassword', FILTER_SANITIZE_SPECIAL_CHARS));
		$regShopName = filter_input(INPUT_POST, 'regShopName', FILTER_SANITIZE_SPECIAL_CHARS);

	if ($regPassword != $regConfirmPassword) {
		return "Deine Passwörter stimmen nicht überein. Bitte wiederhole deine Eingabe.";
	} else {

		$db = new Database();

		$getRow = $db->getRows("SELECT email FROM tbl_users WHERE email = ?", [$regEmail]);

		if (count($getRow)) {
			return (string) count($getRow);
		} else {

			$db->insertRow("INSERT INTO tbl_users (firstname, lastname, email, password)
										 VALUES (?, ?, ?, ?)", [$regFirstName, $regLastName, $regEmail, $regPassword]);
		}
	}
}