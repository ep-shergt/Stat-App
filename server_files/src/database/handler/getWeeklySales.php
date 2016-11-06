<?php

function getWeeklySales() {

	global $shop;

	$leftClickCounter = filter_input(INPUT_POST, 'leftClickCounter');
	$chosenTimeFrame = filter_input(INPUT_POST, 'timeframe');

	$dataArray = [];
	$fullDataArray = [];

	$db = new Database();

	$today = new DateTime();
	$todayFormat = $today->format('Y-m-d');
	$todayWeek = $today->format("W");
	$todayMonth = $today->format("m");
	$todayYear = $today->format("Y");
	$todayDay = $today->format("N");


	switch ($chosenTimeFrame) {
    	case "week":
			$timeframe = time() - (7 * 24 * 60 * 60 *$leftClickCounter);
			$timeFrameFormat = date("W", $timeframe);
			$timeframeDay = date("N", $timeframe);

			for ($i = 1; $i <= 7; $i++) {
				$salesPerDayPerWeek =  $db->getRows("SELECT SUM(tbl_orders.sales_with_tax) AS sales FROM tbl_orders, tbl_shop
													        WHERE tbl_shop.shop_id = tbl_orders.shop_id AND tbl_orders.payweek = ? AND tbl_orders.payday = ? " , [$timeFrameFormat, (string) $i]);
				$dataArray = array_merge($dataArray, $salesPerDayPerWeek);
			}

			switch ($timeframeDay) {
				case '7':
					$sunday = date('d.m.y', $timeframe);
					$saturday= date('d.m.y', $timeframe - (1 * 24 * 60 * 60));
					$friday = date('d.m.y', $timeframe - (2 * 24 * 60 * 60));
					$thursday = date('d.m.y', $timeframe - (3 * 24 * 60 * 60));
					$wednesday = date('d.m.y', $timeframe - (4 * 24 * 60 * 60));
					$tuesday = date('d.m.y', $timeframe - (5 * 24 * 60 * 60));
					$monday = date('d.m.y', $timeframe - (6 * 24 * 60 * 60));
					break;
				
				case '6':
					$sunday = date('d.m.y', $timeframe + (1 * 24 * 60 * 60));
					$saturday= date('d.m.y', $timeframe);
					$friday = date('d.m.y', $timeframe - (1 * 24 * 60 * 60));
					$thursday = date('d.m.y', $timeframe - (2 * 24 * 60 * 60));
					$wednesday = date('d.m.y', $timeframe - (3 * 24 * 60 * 60));
					$tuesday = date('d.m.y', $timeframe - (4 * 24 * 60 * 60));
					$monday = date('d.m.y', $timeframe - (5 * 24 * 60 * 60));
					break;

				case '5':
					$sunday = date('d.m.y', $timeframe + (2 * 24 * 60 * 60));
					$saturday= date('d.m.y', $timeframe + (1 * 24 * 60 * 60));
					$friday = date('d.m.y', $timeframe);
					$thursday = date('d.m.y', $timeframe - (1 * 24 * 60 * 60));
					$wednesday = date('d.m.y', $timeframe - (2 * 24 * 60 * 60));
					$tuesday = date('d.m.y', $timeframe - (3 * 24 * 60 * 60));
					$monday = date('d.m.y', $timeframe - (4 * 24 * 60 * 60));
					break;

				case '4':
					$sunday = date('d.m.y', $timeframe + (3 * 24 * 60 * 60));
					$saturday= date('d.m.y', $timeframe + (2 * 24 * 60 * 60));
					$friday = date('d.m.y', $timeframe + (1 * 24 * 60 * 60));
					$thursday = date('d.m.y', $timeframe);
					$wednesday = date('d.m.y', $timeframe - (1 * 24 * 60 * 60));
					$tuesday = date('d.m.y', $timeframe - (2 * 24 * 60 * 60));
					$monday = date('d.m.y', $timeframe - (3 * 24 * 60 * 60));
					break;

				case '3':
					$sunday = date('d.m.y', $timeframe + (4 * 24 * 60 * 60));
					$saturday= date('d.m.y', $timeframe + (3 * 24 * 60 * 60));
					$friday = date('d.m.y', $timeframe + (2 * 24 * 60 * 60));
					$thursday = date('d.m.y', $timeframe + (1 * 24 * 60 * 60));
					$wednesday = date('d.m.y', $timeframe);
					$tuesday = date('d.m.y', $timeframe - (1 * 24 * 60 * 60));
					$monday = date('d.m.y', $timeframe - (2 * 24 * 60 * 60));
					break;

				case '2':
					$sunday = date('d.m.y', $timeframe + (5 * 24 * 60 * 60));
					$saturday= date('d.m.y', $timeframe + (4 * 24 * 60 * 60));
					$friday = date('d.m.y', $timeframe + (3 * 24 * 60 * 60));
					$thursday = date('d.m.y', $timeframe + (2 * 24 * 60 * 60));
					$wednesday = date('d.m.y', $timeframe + (1 * 24 * 60 * 60));
					$tuesday = date('d.m.y', $timeframe);
					$monday = date('d.m.y', $timeframe - (1 * 24 * 60 * 60));
					break;

				case '1':
					$sunday = date('d.m.y', $timeframe + (6 * 24 * 60 * 60));
					$saturday= date('d.m.y', $timeframe + (5 * 24 * 60 * 60));
					$friday = date('d.m.y', $timeframe + (4 * 24 * 60 * 60));
					$thursday = date('d.m.y', $timeframe + (3 * 24 * 60 * 60));
					$wednesday = date('d.m.y', $timeframe + (2 * 24 * 60 * 60));
					$tuesday = date('d.m.y', $timeframe + (1 * 24 * 60 * 60));
					$monday = date('d.m.y', $timeframe);
					break;

				default:
					break;
			}

			$infoArray = ['timeInfo' => 'week', 'sunday' => $sunday, 'saturday' => $saturday, 'friday' => $friday, 'thursday' => $thursday,
			 			  'wednesday' => $wednesday, 'tuesday' => $tuesday, 'monday' => $monday, 'annualWeek' => $timeFrameFormat];
			array_push($fullDataArray, $dataArray);
			array_push($fullDataArray, $infoArray);

			$jsonWeek = json_encode($fullDataArray, JSON_FORCE_OBJECT);

			return $jsonWeek;
        
        	break;

        case "month":

        	$timeframe = $todayYear - $leftClickCounter;
			for ($i = 1; $i <= 12; $i++) {
				$salesPerMonthPerYear =  $db->getRows("SELECT SUM(tbl_orders.sales_with_tax) AS sales FROM tbl_orders, tbl_shop
													        WHERE tbl_shop.shop_id = tbl_orders.shop_id AND tbl_orders.payyear = ? AND tbl_orders.paymonth = ? " , [$timeframe, (string) $i]);
				$dataArray = array_merge($dataArray, $salesPerMonthPerYear);
			}
				
			$infoArray = ['timeInfo' => 'month', 'year' => $timeframe];
			array_push($fullDataArray, $dataArray);
			array_push($fullDataArray, $infoArray);

			$jsonMonth = json_encode($fullDataArray, JSON_FORCE_OBJECT);

			return $jsonMonth;
        
        	break;
	}
}
