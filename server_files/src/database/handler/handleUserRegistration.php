<?php

function handleUserRegistration() {

		$regFirstName = strtolower(filter_input(INPUT_POST, 'regFirstName', FILTER_SANITIZE_SPECIAL_CHARS));
		$regLastName = strtolower(filter_input(INPUT_POST, 'regLastName', FILTER_SANITIZE_SPECIAL_CHARS));
		$regEmail = filter_input(INPUT_POST, 'regEmail', FILTER_SANITIZE_SPECIAL_CHARS);
		$regPassword = md5(filter_input(INPUT_POST, 'regPassword', FILTER_SANITIZE_SPECIAL_CHARS));
		$regConfirmPassword = md5(filter_input(INPUT_POST, 'regConfirmPassword', FILTER_SANITIZE_SPECIAL_CHARS));

	if ($regPassword != $regConfirmPassword) {
		return "Deine Passwörter stimmen nicht überein. Bitte wiederhole deine Eingabe.";
	} else {

			$db = new Database();

			$getRow = $db->getRows("SELECT email FROM tbl_users WHERE email = ?", [$regEmail]);

			if (count($getRow)) {
				return (string) count($getRow);
			} else {

				$insertRow = $db->insertRow("INSERT INTO tbl_users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)", [$regFirstName, $regLastName, $regEmail, $regPassword]);

				return "Vielen Dank. Ihre Registrierung war erfolgreich. Viel Spaß mit der App!";
			}

			//get Row
			// $getRow = $db->getRow("SELECT * FROM appUser WHERE id = ?", ["1"]);
			// $db->die_r($getRow);

			//getRows
			//$getRows = $db->getRows("SELECT * FROM appUser");


			//update
			//$updateRow = $db->updateRow("UPDATE appUser SET username = ?, password = ? WHERE id = ?", ["ArthurMann", "a12345", "3"]);

			//$deleteRow = $db->deleteRow("DELETE FROM appUser WHERE id = ?", [3]);

			//$db->die_r($deleteRow);
	}
}

