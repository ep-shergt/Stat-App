<?php

error_reporting(E_ALL);
ini_set("display_errors", '1');

include(__DIR__ . "/epages-rest-php.phar");
include(__DIR__ . "/epsrc/shop_config.php");

$shop = new ep6\Shop(DEVSHOPURL, DEVSHOPID, CLIENTSECRET, true);

include(__DIR__ . "/epsrc/getAllOrders.php");
include(__DIR__ . "/epsrc/getShopData.php");
