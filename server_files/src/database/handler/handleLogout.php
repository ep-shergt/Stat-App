<?php

function handleLogout() {
	$db = new Database();

	$db->updateRow("UPDATE tbl_users SET tbl_users.timestamp = ? WHERE email = ?", [NULL, $_SESSION['email']]);
	unset($_SESSION['email']);
}