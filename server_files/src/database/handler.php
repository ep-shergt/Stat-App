<?php

error_reporting(E_ALL);
ini_set("display_errors", '1');

require __DIR__ . "/Database.php";
require __DIR__ . "/handler/handleUserRegistration.php";
require __DIR__ . "/handler/getWeeklySales.php";
require __DIR__ . "/handler/getOrderCount.php";
require __DIR__ . "/handler/getTopTenCustomers.php";
require __DIR__ . "/handler/getStateSales.php";
require __DIR__ . "/handler/handleUserLogin.php";
require __DIR__ . "/handler/handleLoadShopData.php";
require __DIR__ . "/handler/getShopName.php";
require __DIR__ . "/handler/handleLogout.php";
