<?php

function getWeeklySales() {
<<<<<<< HEAD
	// get posted data from ajax request in the App component and wrote on variables
	$leftClickTimePeriodCounter = filter_input(INPUT_POST, 'leftClickTimePeriodCounter');
	$chosenTimeFrame = filter_input(INPUT_POST, 'timeframe');
	$chosenMonth = filter_input(INPUT_POST, 'month');
	$chosenYear = filter_input(INPUT_POST, 'year');
	$currencyForSales = filter_input(INPUT_POST, 'currencyForSales');

	$intChosenMonth = (int) $chosenMonth;
	$intChosenYear = (int) $chosenYear;
	// get the number of days of the chosen month in the frontend menu
	$daysInChosenMonth=cal_days_in_month(CAL_GREGORIAN, $intChosenMonth, $intChosenYear);

	// define arrays
	$dataArray = [];
	$dataArray2 = [];
	$intermediateArray = [];
	$intermediateArray2 = [];
	$fullDataArray = [];
	// create database object
	$db = new Database();

	// perform actions depending on the chosen time period
	switch ($chosenTimeFrame) {
		// case: weekly time period
    	case "period-dropdown-week":
    		// new time period = current week - 7 days times clicks on left/right arrow button
			$timeframe = time() - (7 * 24 * 60 * 60 *$leftClickTimePeriodCounter);
			$timeFrameFormat = date("W", $timeframe);
			// magic function to extract monday timestamp from the requested calendar week
			$mondayTimeframe = strtotime($chosenYear . 'W' . str_pad($timeFrameFormat, 2, '0', STR_PAD_LEFT));
			$oneday = 24 * 60 * 60;

			// get german date format for the week days of the requested week
			$sunday = date('d.m.y', $mondayTimeframe + (6 * $oneday));
			$saturday= date('d.m.y', $mondayTimeframe + (5 * $oneday));
			$friday = date('d.m.y', $mondayTimeframe + (4 * $oneday));
			$thursday = date('d.m.y', $mondayTimeframe + (3 * $oneday));
			$wednesday = date('d.m.y', $mondayTimeframe + (2 * $oneday));
			$tuesday = date('d.m.y', $mondayTimeframe + (1 * $oneday));
			$monday = date('d.m.y', $mondayTimeframe);
			// loop over all weekdays
			for ($i = 0; $i <= 6; $i++) {
				// get the sum of all sales with taxes on that day
				$salesPerDayPerWeek =  $db->getRows("SELECT SUM(tbl_orders.sales_with_tax) AS sales FROM tbl_orders, tbl_shop, tbl_users
													 WHERE tbl_users.email = ? AND tbl_shop.shop_id = tbl_orders.shop_id AND WEEK(tbl_orders.creationdate) = ?
													 AND WEEKDAY(tbl_orders.creationdate) = ? AND YEAR(tbl_orders.creationdate) = ?
													 AND tbl_orders.currency = ?" ,
													 [$_SESSION['email'], $timeFrameFormat, (string) $i, $chosenYear, $currencyForSales]);
				// add sales data to array
				$dataArray = array_merge($dataArray, $salesPerDayPerWeek);
			}

			// define array to contain the dates and the chosen time period (week)
			$infoArray = ['timeInfo' => 'week', 'sunday' => $sunday, 'saturday' => $saturday, 'friday' => $friday, 'thursday' => $thursday,
			 			  'wednesday' => $wednesday, 'tuesday' => $tuesday, 'monday' => $monday, 'annualWeek' => $timeFrameFormat];
			// unify the arrays
			array_push($intermediateArray, $dataArray);
			array_push($intermediateArray, $infoArray);
			// loop over all weekdays
			for ($i = 0; $i <= 6; $i++) {
				// get the sum of all sales WITHOUT taxes that are already paid
				$salesPerDayPerWeek2 =  $db->getRows("SELECT SUM(tbl_orders.sales_without_tax) AS sales FROM tbl_orders, tbl_shop, tbl_users
													 WHERE tbl_users.email = ? AND tbl_shop.shop_id = tbl_orders.shop_id AND WEEK(tbl_orders.creationdate) = ?
													 AND WEEKDAY(tbl_orders.creationdate) = ? AND YEAR(tbl_orders.creationdate) = ?
													 AND tbl_orders.currency = ?" ,
													 [$_SESSION['email'], $timeFrameFormat, (string) $i, $chosenYear, $currencyForSales]);
				// add sales data to array
				$dataArray2 = array_merge($dataArray2, $salesPerDayPerWeek2);
			}

			// define array to contain the dates and the chosen time period (week)
			$infoArray2 = ['timeInfo' => 'week', 'sunday' => $sunday, 'saturday' => $saturday, 'friday' => $friday, 'thursday' => $thursday,
			 			  'wednesday' => $wednesday, 'tuesday' => $tuesday, 'monday' => $monday, 'annualWeek' => $timeFrameFormat];
			// unfiy all arrays
			array_push($intermediateArray2, $dataArray2);
			array_push($intermediateArray2, $infoArray2);

			array_push($fullDataArray, $intermediateArray);
			array_push($fullDataArray, $intermediateArray2);
			// encode the full data array to a JSON object to be sent to the client
			$jsonWeek = json_encode($fullDataArray, JSON_FORCE_OBJECT);
			// send JSON object to client (App component)
			return $jsonWeek;

        	break;

        // case: monthly time period
       	case "period-dropdown-month":
       	// loop over all days in the chosen month
       		for ($i = 1; $i <= $daysInChosenMonth; $i++) {
       			// get the sum of all sales with taxes that are already paid
       			$salesPerDayPerMonth =  $db->getRows("SELECT SUM(tbl_orders.sales_with_tax) AS sales FROM tbl_orders, tbl_shop, tbl_users
													 WHERE tbl_users.email = ? AND tbl_shop.shop_id = tbl_orders.shop_id AND MONTH(tbl_orders.creationdate) = ?
													 AND DAY(tbl_orders.creationdate) = ? AND YEAR(tbl_orders.creationdate) = ?
													 AND tbl_orders.currency = ?" ,
													 [$_SESSION['email'], $chosenMonth, (string) $i, $chosenYear, $currencyForSales]);
       			// add sales data to array
				$dataArray = array_merge($dataArray, $salesPerDayPerMonth);
       		}
       		// define array to contain the chosen time period
       		$infoArray = ['timeInfo' => 'month'];
       		// unify the arrays
			array_push($intermediateArray, $dataArray);
			array_push($intermediateArray, $infoArray);

			// loop over all days in the chosen month
			for ($i = 1; $i <= $daysInChosenMonth; $i++) {
				// get the sum of all sales WITHOUT taxes that are already paid
       			$salesPerDayPerMonth2 =  $db->getRows("SELECT SUM(tbl_orders.sales_without_tax) AS sales FROM tbl_orders, tbl_shop, tbl_users
													 WHERE tbl_users.email = ? AND tbl_shop.shop_id = tbl_orders.shop_id AND MONTH(tbl_orders.creationdate) = ?
													 AND DAY(tbl_orders.creationdate) = ? AND YEAR(tbl_orders.creationdate) = ?
													 AND tbl_orders.currency = ?" ,
													 [$_SESSION['email'], $chosenMonth, (string) $i, $chosenYear, $currencyForSales]);
       			// add sales to array
				$dataArray2 = array_merge($dataArray2, $salesPerDayPerMonth2);
       		}
       		// define array to contain the chosen time period
       		$infoArray2 = ['timeInfo' => 'month'];
       		// unify all arrays
			array_push($intermediateArray2, $dataArray2);
			array_push($intermediateArray2, $infoArray2);

			array_push($fullDataArray, $intermediateArray);
			array_push($fullDataArray, $intermediateArray2);

			// build JSON object from full data array
			$jsonMonth = json_encode($fullDataArray, JSON_FORCE_OBJECT);
			// send JSON info to the client (App)
			return $jsonMonth;

       		break;
       	// case: annual time period
        case "period-dropdown-year":
        	// loop over all months in the chosen year
			for ($i = 1; $i <= 12; $i++) {
				// get the sum of all sales with taxes that are already paid
				$salesPerMonthPerYear =  $db->getRows("SELECT SUM(tbl_orders.sales_with_tax) AS sales FROM tbl_orders, tbl_shop, tbl_users
													   WHERE tbl_users.email = ? AND tbl_shop.shop_id = tbl_orders.shop_id AND YEAR(tbl_orders.creationdate) = ?
													   AND MONTH(tbl_orders.creationdate) = ?
													   AND tbl_orders.currency = ?" , [$_SESSION['email'], $chosenYear, (string) $i, $currencyForSales]);
				// add sales to array
				$dataArray = array_merge($dataArray, $salesPerMonthPerYear);
			}
			// define array to contain chosen time period (year)
			$infoArray = ['timeInfo' => 'year'];
			// unify arrays
			array_push($intermediateArray, $dataArray);
			array_push($intermediateArray, $infoArray);

			// loop over all months in the chosen year
			for ($i = 1; $i <= 12; $i++) {
				// get the sum of all sales WITHOUT taxes that are already paid
				$salesPerMonthPerYear2 =  $db->getRows("SELECT SUM(tbl_orders.sales_without_tax) AS sales FROM tbl_orders, tbl_shop, tbl_users
													   WHERE tbl_users.email = ? AND tbl_shop.shop_id = tbl_orders.shop_id AND YEAR(tbl_orders.creationdate) = ?
													    AND MONTH(tbl_orders.creationdate) = ?
													    AND tbl_orders.currency = ?" , [$_SESSION['email'], $chosenYear, (string) $i, $currencyForSales]);
				// add sales to array
				$dataArray2 = array_merge($dataArray2, $salesPerMonthPerYear2);
			}
			// define array to contain chosen time period (year)
			$infoArray2 = ['timeInfo' => 'year'];

			// unify all arrays
			array_push($intermediateArray2, $dataArray2);
			array_push($intermediateArray2, $infoArray2);

			array_push($fullDataArray, $intermediateArray);
			array_push($fullDataArray, $intermediateArray2);
			// build JSON object
			$jsonYear = json_encode($fullDataArray, JSON_FORCE_OBJECT);
			// return JSON data to client (App)
			return $jsonYear;

=======

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
        
>>>>>>> be1c222dfef7c15c8162b123601d761385303ab3
        	break;
	}
}
