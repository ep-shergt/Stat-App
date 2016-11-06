<?php

function getWeeklySales() {

	global $shop;

	$leftClickCounter = filter_input(INPUT_POST, 'leftClickCounter');

	$weekArray = [];

	$db = new Database();

	$today = new DateTime();
	$todayFormat = $today->format('Y-m-d');
	$todayWeek = $today->format("W");

	$timeframe = time() - (7 * 24 * 60 * 60 *$leftClickCounter);
	$timeFrameFormat = date("W", $timeframe);

	// $twoWeeksAgo = time() - (7 * 24 * 60 * 60 * 2);
	// $twoWeeksAgoFormat = date("W", $twoWeeksAgo);

	// $threeWeeksAgo = time() - (7 * 24 * 60 * 60 * 3);
	// $threeWeeksAgoFormat = date("W", $threeWeeksAgo);


	for ($i = 1; $i <= 7; $i++) {
		$salesPerDayPerWeek =  $db->getRows("SELECT SUM(tbl_orders.sales_with_tax) AS sales FROM tbl_orders, tbl_shop
											        WHERE tbl_shop.shop_id = tbl_orders.shop_id AND tbl_orders.payweek = ? AND tbl_orders.payday = ? " , [$timeFrameFormat, (string) $i]);
		// array_push($CurrentWeekArray, $salesPerDayPerCurrentWeek);
		$weekArray = array_merge($weekArray, $salesPerDayPerWeek);
	}


	// $geCurrentWeekMondaySales =  $db->getRows("SELECT SUM(tbl_orders.sales_with_tax) AS 'mondaySales' FROM tbl_orders, tbl_shop
	// 										   WHERE tbl_shop.shop_id = tbl_orders.shop_id AND tbl_orders.payweek = ? AND tbl_orders.payday = ? " , [$todayWeek, '1']);


	// $getCurrentWeekData = $db->getRows("SELECT EXTRACT(DAY FROM tbl_orders.paydate) 'payMonthDay', EXTRACT(Month FROM tbl_orders.paydate) 'payMonth', EXTRACT(Year FROM tbl_orders.paydate) 'payYear',
	// 							 tbl_orders.sales_with_tax, tbl_orders.payday AS payWeekDay, tbl_orders.payweek FROM tbl_orders, tbl_shop WHERE tbl_shop.shop_id = tbl_orders.shop_id
	// 							 AND tbl_orders.payweek = ? ORDER BY tbl_orders.paydate DESC" , [$todayWeek]);

	// $getCurrentWeekMinusOneData = $db->getRows("SELECT EXTRACT(DAY FROM tbl_orders.paydate) 'payMonthDay', EXTRACT(Month FROM tbl_orders.paydate) 'payMonth', EXTRACT(Year FROM tbl_orders.paydate) 'payYear',
	// 							 tbl_orders.sales_with_tax, tbl_orders.payday AS payWeekDay, tbl_orders.payweek FROM tbl_orders, tbl_shop WHERE tbl_shop.shop_id = tbl_orders.shop_id
	// 							 AND tbl_orders.payweek = ? ORDER BY tbl_orders.paydate DESC" , [$oneWeekAgoFormat]);

	// $getCurrentWeekMinusTwoData = $db->getRows("SELECT EXTRACT(DAY FROM tbl_orders.paydate) 'payMonthDay', EXTRACT(Month FROM tbl_orders.paydate) 'payMonth', EXTRACT(Year FROM tbl_orders.paydate) 'payYear',
	// 							 tbl_orders.sales_with_tax, tbl_orders.payday AS payWeekDay, tbl_orders.payweek FROM tbl_orders, tbl_shop WHERE tbl_shop.shop_id = tbl_orders.shop_id
	// 							 AND tbl_orders.payweek = ? ORDER BY tbl_orders.paydate DESC" , [$twoWeeksAgoFormat]);

	// $getCurrentWeekMinusThreeData = $db->getRows("SELECT EXTRACT(DAY FROM tbl_orders.paydate) 'payMonthDay', EXTRACT(Month FROM tbl_orders.paydate) 'payMonth', EXTRACT(Year FROM tbl_orders.paydate) 'payYear',
	// 							 tbl_orders.sales_with_tax, tbl_orders.payday AS payWeekDay, tbl_orders.payweek FROM tbl_orders, tbl_shop WHERE tbl_shop.shop_id = tbl_orders.shop_id
	// 							 AND tbl_orders.payweek = ? ORDER BY tbl_orders.paydate DESC" , [$threeWeeksAgo]);

	// $dataArray = ['currentWeek' => $getCurrentWeekData, 'minusOneWeek' => $getCurrentWeekMinusOneData, 'minusTwoWeek' => $getCurrentWeekMinusTwoData, 'minusThreeWeek' => $getCurrentWeekMinusThreeData];

	$json = json_encode($weekArray, JSON_FORCE_OBJECT);

	return $json;

}
