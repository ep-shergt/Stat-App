<?php

function getOrderCount() {
	$leftClickTimePeriodCounter = filter_input(INPUT_POST, 'leftClickTimePeriodCounter');
	$chosenTimeFrame = filter_input(INPUT_POST, 'timeframe');
	$chosenMonth = filter_input(INPUT_POST, 'month');
	$chosenYear = filter_input(INPUT_POST, 'year');
	$paidOrderSelect = filter_input(INPUT_POST, 'paidOrderSelect');
	$currencyForSales = filter_input(INPUT_POST, 'currencyForSales');

	$intChosenMonth = (int) $chosenMonth;
	$intChosenYear = (int) $chosenYear;

	$daysInChosenMonth=cal_days_in_month(CAL_GREGORIAN, $intChosenMonth, $intChosenYear);

	$dataArray = [];
	$dataArray2 = [];
	$intermediateArray = [];
	$intermediateArray2 = [];
	$fullDataArray = [];


	$db = new Database();

	$today = new DateTime();
	$todayFormat = $today->format('Y-m-d');
	$todayWeek = $today->format("W");
	$todayMonth = $today->format("m");
	$todayYear = $today->format("Y");
	$todayDay = $today->format("N");

	switch ($chosenTimeFrame) {
    	case "period-dropdown-week":
			$timeframe = time() - (7 * 24 * 60 * 60 *$leftClickTimePeriodCounter);
			$timeFrameFormat = date("W", $timeframe);
			$mondayTimeframe = strtotime($chosenYear . 'W' . str_pad($timeFrameFormat, 2, '0', STR_PAD_LEFT));
			$oneday = 24 * 60 * 60;

			$sunday = date('d.m.y', $mondayTimeframe + (6 * $oneday));
			$saturday= date('d.m.y', $mondayTimeframe + (5 * $oneday));
			$friday = date('d.m.y', $mondayTimeframe + (4 * $oneday));
			$thursday = date('d.m.y', $mondayTimeframe + (3 * $oneday));
			$wednesday = date('d.m.y', $mondayTimeframe + (2 * $oneday));
			$tuesday = date('d.m.y', $mondayTimeframe + (1 * $oneday));
			$monday = date('d.m.y', $mondayTimeframe);

			for ($i = 0; $i <= 6; $i++) {
				$orderPerDayPerWeek =  $db->getRows("SELECT COUNT(tbl_orders.order_id) AS order_amount FROM tbl_orders, tbl_shop, tbl_users
													 WHERE tbl_users.email = ? AND tbl_shop.shop_id = tbl_orders.shop_id AND WEEK(tbl_orders.creationdate) = ?
													 AND WEEKDAY(tbl_orders.creationdate) = ? AND YEAR(tbl_orders.creationdate) = ? AND tbl_orders.currency = ?" ,
													 [$_SESSION['email'], $timeFrameFormat, (string) $i, $chosenYear, $currencyForSales]);
				$dataArray = array_merge($dataArray, $orderPerDayPerWeek);
			}

			$infoArray = ['timeInfo' => 'week', 'sunday' => $sunday, 'saturday' => $saturday, 'friday' => $friday, 'thursday' => $thursday,
			 			  'wednesday' => $wednesday, 'tuesday' => $tuesday, 'monday' => $monday, 'annualWeek' => $timeFrameFormat,];

			array_push($intermediateArray, $dataArray);
			array_push($intermediateArray, $infoArray);

			for ($i = 0; $i <= 6; $i++) {
				$orderPerDayPerWeek2 =  $db->getRows("SELECT COUNT(tbl_orders.order_id) AS order_amount FROM tbl_orders, tbl_shop, tbl_users
													 WHERE tbl_users.email = ? AND tbl_shop.shop_id = tbl_orders.shop_id AND WEEK(tbl_orders.creationdate) = ?
													 AND WEEKDAY(tbl_orders.creationdate) = ? AND YEAR(tbl_orders.creationdate) = ? AND tbl_orders.is_paid = ?
													 AND tbl_orders.currency = ?" ,
													 [$_SESSION['email'], $timeFrameFormat, (string) $i, $chosenYear, 1, $currencyForSales]);
				$dataArray2 = array_merge($dataArray2, $orderPerDayPerWeek2);
			}

			$infoArray2 = ['timeInfo' => 'week', 'sunday' => $sunday, 'saturday' => $saturday, 'friday' => $friday, 'thursday' => $thursday,
			 			  'wednesday' => $wednesday, 'tuesday' => $tuesday, 'monday' => $monday, 'annualWeek' => $timeFrameFormat,];
			array_push($intermediateArray2, $dataArray2);
			array_push($intermediateArray2, $infoArray2);

			array_push($fullDataArray, $intermediateArray);
			array_push($fullDataArray, $intermediateArray2);

			$jsonWeek = json_encode($fullDataArray, JSON_FORCE_OBJECT);

			return $jsonWeek;

        	break;

       	case "period-dropdown-month":
       		for ($i = 1; $i <= $daysInChosenMonth; $i++) {
       			$orderPerDayPerMonth =  $db->getRows("SELECT COUNT(tbl_orders.order_id) AS order_amount FROM tbl_orders, tbl_shop, tbl_users
													 WHERE tbl_users.email = ? AND tbl_shop.shop_id = tbl_orders.shop_id AND MONTH(tbl_orders.creationdate) = ?
													 AND DAY(tbl_orders.creationdate) = ? AND YEAR(tbl_orders.creationdate) = ? AND tbl_orders.currency = ?" ,
													 [$_SESSION['email'], $chosenMonth, (string) $i, $chosenYear, $currencyForSales]);
				$dataArray = array_merge($dataArray, $orderPerDayPerMonth);
       		}

       		$infoArray = ['timeInfo' => 'month'];
			array_push($intermediateArray, $dataArray);
			array_push($intermediateArray, $infoArray);

			for ($i = 1; $i <= $daysInChosenMonth; $i++) {
       			$orderPerDayPerMonth2 =  $db->getRows("SELECT COUNT(tbl_orders.order_id) AS order_amount FROM tbl_orders, tbl_shop, tbl_users
													 WHERE tbl_users.email = ? AND tbl_shop.shop_id = tbl_orders.shop_id AND MONTH(tbl_orders.creationdate) = ?
													 AND DAY(tbl_orders.creationdate) = ? AND YEAR(tbl_orders.creationdate) = ? AND tbl_orders.is_paid = ?
													 AND tbl_orders.currency = ?" ,
													 [$_SESSION['email'], $chosenMonth, (string) $i, $chosenYear, 1, $currencyForSales]);
				$dataArray2 = array_merge($dataArray2, $orderPerDayPerMonth2);
       		}

       		$infoArray2 = ['timeInfo' => 'month'];
			array_push($intermediateArray2, $dataArray2);
			array_push($intermediateArray2, $infoArray2);

			array_push($fullDataArray, $intermediateArray);
			array_push($fullDataArray, $intermediateArray2);

			$jsonMonth = json_encode($fullDataArray, JSON_FORCE_OBJECT);

			return $jsonMonth;

       		break;

        case "period-dropdown-year":
			for ($i = 1; $i <= 12; $i++) {
				$orderPerMonthPerYear =  $db->getRows("SELECT COUNT(tbl_orders.order_id) AS order_amount FROM tbl_orders, tbl_shop, tbl_users
													   WHERE tbl_users.email = ? AND tbl_shop.shop_id = tbl_orders.shop_id AND YEAR(tbl_orders.creationdate) = ?
													   AND MONTH(tbl_orders.creationdate) = ? AND tbl_orders.currency = ?" ,
													   [$_SESSION['email'], $chosenYear, (string) $i, $currencyForSales]);
				$dataArray = array_merge($dataArray, $orderPerMonthPerYear);
			}

			$infoArray = ['timeInfo' => 'year'];
			array_push($intermediateArray, $dataArray);
			array_push($intermediateArray, $infoArray);

			for ($i = 1; $i <= 12; $i++) {
				$orderPerMonthPerYear2 =  $db->getRows("SELECT COUNT(tbl_orders.order_id) AS order_amount FROM tbl_orders, tbl_shop, tbl_users
													   WHERE tbl_users.email = ? AND tbl_shop.shop_id = tbl_orders.shop_id AND YEAR(tbl_orders.creationdate) = ?
													   AND MONTH(tbl_orders.creationdate) = ? AND tbl_orders.is_paid = ? AND tbl_orders.currency = ?" ,
													   [$_SESSION['email'], $chosenYear, (string) $i, 1, $currencyForSales]);
				$dataArray2 = array_merge($dataArray2, $orderPerMonthPerYear2);
			}

			$infoArray2 = ['timeInfo' => 'year'];
			array_push($intermediateArray2, $dataArray2);
			array_push($intermediateArray2, $infoArray2);

			array_push($fullDataArray, $intermediateArray);
			array_push($fullDataArray, $intermediateArray2);

			$jsonYear = json_encode($fullDataArray, JSON_FORCE_OBJECT);

			return $jsonYear;

        	break;
	}
}
