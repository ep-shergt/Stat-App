<?php

function sortOrders($a, $b) {
    $c = strcmp($a['payYear'], $b['payYear']);
    if($c != 0) {
        return $c;
    }

    $c = strcmp($a['payWeek'], $b['payWeek']);
    if($c != 0) {
        return $c;
    }

    return strcmp($a['payDay'], $b['payDay']);
}

function getAllOrders() {

	global $shop;

	$filter = new ep6\OrderFilter();
	$filter->setResultsPerPage(100);
	$fullOrders = $filter->getOrders();
	$customer_email = $fullOrders[0]->getBillingAddress()->getEmailAddress();
	$customer_zip = $fullOrders[0]->getBillingAddress()->getZipCode();
	$customer_city = $fullOrders[1]->getBillingAddress()->getCity();
	$order_id = $fullOrders[1]->getID();
	$sales_with_tax = $fullOrders[1]->getTotalPrice()->getAmount();
	$order_currency = $fullOrders[1]->getTotalPrice()->getCurrency();
	$timestamp = $fullOrders[11]->getPayDate()->getTimestamp();
	$payDay = date("N", $timestamp);
	$payDayPerMonth = date('j', $timestamp);
	$payWeek = date("W", $timestamp);
	$payMonth = date("n", $timestamp);
	$payYear = date("Y", $timestamp);
	$shop_name = $shop->getName();


	// $db = new Database();

	// 		$getRow = $db->getRows("SELECT email FROM tbl_users WHERE email = ?", [$regEmail]);

	// 		if (count($getRow)) {
	// 			return (string) count($getRow);
	// 		} else {

	// 			$insertRow = $db->insertRow("INSERT INTO tbl_users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)", [$regFirstName, $regLastName, $regEmail, $regPassword]);

	// 			return "Vielen Dank. Ihre Registrierung war erfolgreich. Viel Spaß mit der App!";
	// 		}


	// $page = 1;

	// while (TRUE):
	// 	$filter->setPage($page + 1);
	// 	$ordersPerPage = $filter->getOrders();
	// 	if (count($ordersPerPage)) {
	// 		$fullOrders = array_merge($fullOrders, $ordersPerPage);
	// 		$page++;
	// 	} else {
	// 		break;
	// 	}
	// endwhile;

	// $todayDay = date("N");
	// $todayWeek = date("W");
	// $todayYear = date("Y");

	// $salesArray = array();

	// foreach ($fullOrders as $order) {
	// 	if ($order->isPaid()) {
	// 		$dataArray = array();
	// 		$totalPriceWithTax = $order->getTotalPrice()->getAmount();
	// 		$timestamp = $order->getPayDate()->getTimestamp();
	// 		$day = date("N", $timestamp);
	// 		$dayPerMonth = date('j', $timestamp);
	// 		$week = date("W", $timestamp);
	// 		$month = date("n", $timestamp);
	// 		$year = date("Y", $timestamp);

	// 		$dataArray = array('totalPriceWithTax' => $totalPriceWithTax, 'timestamp' => $timestamp, 'payDay' => $day, 'payDayPerMonth' => $dayPerMonth, 'payWeek' => $week, 'payMonth' => $month, 'payYear' => $year);


	// 		array_push($salesArray, $dataArray);
	// 	}
	// }

	// usort($salesArray, 'sortOrders');

	// $startingYear = $salesArray[0]['payYear'];
	// $yearsCounter = $todayYear - $startingYear;
	// $allYearsArray = array();
	// $weeksArrayPerYear = array();
	// $newFullArray = array();

	// for ($i = 0; $i <= $yearsCounter; $i++) {
	// 	$individualYearArray = array();

	// 	foreach ($salesArray as $sales) {

	// 		if ($sales['payYear'] == $startingYear + $i) {
	// 			array_push($individualYearArray, $sales);
	// 		}
	// 	}
	// 	array_push($allYearsArray, $individualYearArray);
	// }

	// foreach ($allYearsArray as $individualYearArray) {
	// 	$dt = new DateTime('December 28th, ' . $individualYearArray[0]['payYear']);
	// 	$weeksPerYear = $dt->format('W');
	// 	$weeksArray = array();

	// 	for ($i = 1; $i <= $weeksPerYear ; $i++) {
	// 		$individualWeekArray = array();

	// 		foreach ($individualYearArray as $sales) {
	// 			if ($sales['payWeek'] == $i) {
	// 				array_push($individualWeekArray, $sales);
	// 			}
	// 		}

	// 		array_push($weeksArray, $individualWeekArray);
	// 	}



	// 	array_push($weeksArrayPerYear, $weeksArray);
	// }

	// foreach($weeksArrayPerYear as $years) {
	// 	$newYears = array();
	// 	foreach($years as $week) {
	// 		$daysArray = array();
	// 		for ($i = 1; $i <= 7; $i++) {
	// 			$dayArray = array();
	// 			foreach($week as $data) {
	// 				if ($data['payDay'] == $i) {
	// 					array_push($dayArray, $data);
	// 				}
	// 			}
	// 			array_push($daysArray, $dayArray);
	// 		}
	// 		array_push($newYears, $daysArray);
	// 	}
	// 	array_push($newFullArray, $newYears);
	// }

	// $json = json_encode($newFullArray, JSON_FORCE_OBJECT);

	//return var_dump($fullOrders[1]);
	return var_dump($shop->getID());
}
