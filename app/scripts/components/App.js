/*
  App
*/

import React from "react";
import { render } from "react-dom";
import Welcome from "./Welcome";
import LoadingScreen from "./LoadingScreen";
import Navigation from "./Navigation";
import TopTenCustomer from "./TopTenCustomer";
import PieChart from "./PieChart";
import Logout from "./Logout";
// import D3.js library for data driven documents
import * as d3 from "d3";
// import C3.js as a sub-D3-library for special diagrams
import * as c3 from "c3";
// import function from the helpers file
import { capitalizeFirstLetter } from '../helpers';

class App extends React.Component {

	constructor(props) {
        super(props);

        this.updateColumns = this.updateColumns.bind(this);
        this.updateColumnsForOrderCount = this.updateColumnsForOrderCount.bind(this);
        this.loadSalesData = this.loadSalesData.bind(this);
        this.loadCurrentSales = this.loadCurrentSales.bind(this);
        this.changeTimeFrame = this.changeTimeFrame.bind(this);
        this.updateTimeFrame = this.updateTimeFrame.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
        this.selectTax = this.selectTax.bind(this);
        this.changeDiagram = this.changeDiagram.bind(this);
        this.handlePaidOrdersSelect = this.handlePaidOrdersSelect.bind(this);
        this.updateColumnsForTopTenCustomers = this.updateColumnsForTopTenCustomers.bind(this);
        this.updateColumnsForStateSales = this.updateColumnsForStateSales.bind(this);
        this.changeCurrency = this.changeCurrency.bind(this);
        this.updateCurrencyForSales = this.updateCurrencyForSales.bind(this);
        this.updateCurrencySymbol = this.updateCurrencySymbol.bind(this);


    	//getinitialState
    	this.state = {
            firstname: '',
            lastname: '',
            shopname: 'Demoshop',
            // token send via the URL
            token: '',
            /* boolean to inform the app component that user was authenticated by the server
             and may render its user content*/
            ok: '',
            leftClickTimePeriod: 0,
            // chosen timeframe for revenue chart
            timeframe: 'period-dropdown-week',
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            chartType: 'bar',
            calendarWeek: '1',
            // display revenue with tax
            taxSelect: 'ON',
            // columns for the revenue chart
            columns: [
                ['x', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                ['Aktuelle Kalenderwoche', 0, 0, 0, 0, 0, 0, 0]
            ],
            // columns for the order chart
            columnsForOrderCount: [
                ['x', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                ['Aktuelle Kalenderwoche', 0, 0, 0, 0, 0, 0, 0]
            ],
            // columns for the top ten customer table to be passed to the TopTenCustomer component
            columnsForTopTenCustomers: [
                ['Max', 'Mustermann', 'mmuster@mmuster.com', 100, 10, '01.01.2000'],
            ],
            // columns for the pie chart to be passed to the PieChart component
            columnsForStateSales: [
                ['Baden-Württemberg', 100],
                ['Bayern', 100],
                ['Berlin', 100],
                ['Brandenburg', 100],
                ['Bremen', 100],
                ['Hamburg', 100],
                ['Hessen', 100],
                ['Mecklenburg-Vorpommern', 100],
                ['Niedersachsen', 100],
                ['Nordrhein-Westfalen', 100],
                ['Rheinland-Pfalz', 100],
                ['Saarland', 100],
                ['Sachsen', 100],
                ['Sachsen-Anhalt', 100],
                ['Schleswig-Holstein', 100],
                ['Thüringen', 100]
            ],
            // show paid order in order chart
            paidOrdersSelect : 'ON',
            // active currency for all charts
            currencyForSales: 'EUR',
            currencySymbol: '€'
    	};
    }

    changeCurrency(event) {
        var newCurrencyForSales,
            newCurrencySymbol;

        // update the app's state to the new active currency
        switch (event.target.id) {
            case 'currency-eur':
                this.updateCurrencyForSales('EUR');
                this.updateCurrencySymbol('€');
                newCurrencyForSales = 'EUR';
                newCurrencySymbol = '€';
                break;
            case 'currency-gbp':
                this.updateCurrencyForSales('GBP');
                 this.updateCurrencySymbol('£');
                newCurrencyForSales = 'GBP';
                newCurrencySymbol = '£';
                break;
            case 'currency-usd':
                this.updateCurrencyForSales('USD');
                this.updateCurrencySymbol('$');
                newCurrencyForSales = 'USD';
                newCurrencySymbol = '$';
                break;
            case 'currency-pln':
                this.updateCurrencyForSales('PLN');
                this.updateCurrencySymbol('zł');
                newCurrencyForSales = 'PLN';
                newCurrencySymbol = 'zł';
                break;
            case 'currency-dkk':
                this.updateCurrencyForSales('DKK');
                this.updateCurrencySymbol('DKK');
                newCurrencyForSales = 'DKK';
                newCurrencySymbol = 'DKK';
                break;
            case 'currency-nok':
                this.updateCurrencyForSales('NOK');
                this.updateCurrencySymbol('kr');
                newCurrencyForSales = 'NOK';
                newCurrencySymbol = 'kr';
                break;
            case 'currency-sek':
                this.updateCurrencyForSales('SEK');
                this.updateCurrencySymbol('kr');
                newCurrencyForSales = 'SEK';
                newCurrencySymbol = 'kr';
                break;
            case 'currency-rub':
                this.updateCurrencyForSales('RUB');
                this.updateCurrencySymbol('руб.');
                newCurrencyForSales = 'RUB';
                newCurrencySymbol = 'руб.';
                break;
            default:
                break;
        }

        // trigger update of the app and of all child components
        this.loadCurrentSales(event, this.state.month, this.state.year, this.state.taxSelect, this.state.paidOrdersSelect, newCurrencyForSales, newCurrencySymbol);
    }

    // change chart type from bar to line and reverse and update the app's state
    changeDiagram(event) {
        var chartNew,
            chartNewForOrders;

        chartNew = this.generateLineChartForSales(this.state.currencySymbol);
        chartNewForOrders = this.generateLineChartForOrderCount();

        if (event.target.id === 'renderstyle-bar') {
            this.setState({ diagramType: 'bar'});
            chartNew.transform('bar');
            chartNewForOrders.transform('bar');
        } else {
            this.setState({ diagramType: 'line'});
            chartNew.transform('line');
            chartNewForOrders.transform('line');

        }
    }

    // choose to show paid orders in order chart depending on the 'ON'/'OFF' switch
    handlePaidOrdersSelect(event) {
        if(event.target !== undefined && event !== undefined) {
            if ($('#' + event.target.id).hasClass("background-color-blue")){
                $('#' + event.target.id).addClass("background-color-red");
                $('#' + event.target.id).removeClass("background-color-blue");
                this.setState({paidOrdersSelect: 'OFF'});
                this.loadCurrentSales(event, this.state.month, this.state.year, this.state.taxSelect, 'OFF', this.state.currencyForSales, this.state.currencySymbol);
            } else {
                $('#' + event.target.id).removeClass("background-color-red");
                $('#' + event.target.id).addClass("background-color-blue");
                this.setState({paidOrdersSelect: 'ON'});

                // trigger update of the app and of all child components
                this.loadCurrentSales(event, this.state.month, this.state.year, this.state.taxSelect, 'ON', this.state.currencyForSales, this.state.currencySymbol);
            }
        }
    }

    // choose to show the shops revenue with or without taxes in the revenue chart depending on the 'ON'/'OFF' switch
    selectTax(event) {
        if ($('#' + event.target.id).hasClass("background-color-blue")){
            $('#' + event.target.id).addClass("background-color-red");
            $('#' + event.target.id).removeClass("background-color-blue");
            this.setState({taxSelect: 'OFF'});
            this.loadCurrentSales(event, this.state.month, this.state.year, 'OFF', this.state.paidOrdersSelect, this.state.currencyForSales, this.state.currencySymbol);
        } else {
            $('#' + event.target.id).removeClass("background-color-red");
            $('#' + event.target.id).addClass("background-color-blue");
            this.setState({taxSelect: 'ON'});

            // trigger update of the app and of all child components
            this.loadCurrentSales(event, this.state.month, this.state.year, 'ON', this.state.paidOrdersSelect, this.state.currencyForSales, this.state.currencySymbol);
        }

    }

    // change month for the charts
    changeMonth(event) {
        var stateMonth = this.state.month,
            currentMonth = new Date().getMonth(),
            newStateMonth;

        switch (event.target.id) {
            case 'i-caret-left-month':
                if (Number(stateMonth) > 0) {
                    newStateMonth = Number(stateMonth) - 1;
                    this.setState({month: newStateMonth.toString()});
                }
                break;
            case 'i-caret-right-month':
                if (Number(stateMonth) < 11) {
                    newStateMonth = Number(stateMonth) + 1;
                    this.setState({month: newStateMonth.toString()});
                }
                break;
            default:
                break;
        }

        // trigger update of the app and of all child components
        this.loadCurrentSales(event, newStateMonth, this.state.year, this.state.taxSelect, this.state.paidOrdersSelect, this.state.currencyForSales, this.state.currencySymbol);
    }

    // change year for the charts
    changeYear(event) {
        var stateYear = this.state.year,
            currentYear = new Date().getFullYear(),
            newStateYear;

        switch (event.target.id) {
            case 'i-caret-left':
                newStateYear = Number(stateYear) - 1;
                this.setState({year: newStateYear.toString()});
                break;
            case 'i-caret-right':
                if (Number(stateYear) < 2016) {
                    newStateYear = Number(stateYear) + 1;
                    this.setState({year: newStateYear.toString()});
                }
                break;
            default:
                break;
        }

        // trigger update of the app and of all child components
        this.loadCurrentSales(event, this.state.month, newStateYear, this.state.taxSelect, this.state.paidOrdersSelect, this.state.currencyForSales, this.state.currencySymbol);
    }

    // change overall time period for the charts
    changeTimeFrame(event) {
        console.log('changeTimeFrame: ', event.target);
        this.updateTimeFrame(event.target.id);

        // trigger update of the app and of all child components
        this.loadCurrentSales(event, this.state.month, this.state.year, this.state.taxSelect, this.state.paidOrdersSelect, this.state.currencyForSales, this.state.currencySymbol);
    }

    // synchronize data with the user's shop, fetch the new data from the server and trigger update of the app's state
    loadSalesData() {
        $.ajax({
            url: "../server_files/public/index.php/allorders",
            type: "POST",
            data: ''
        }).done((data) => {
            console.log(data);

            // define default/dummy state for the update function
            var event = new CustomEvent(
            "defaultEvent2",
                {
                    detail: {},
                    bubbles: true,
                    cancelable: true
                }
            );

            // trigger update of the app and of all child components
            this.loadCurrentSales(event, this.state.month, this.state.year, this.state.taxSelect, this.state.paidOrdersSelect, this.state.currencyForSales, this.state.currencySymbol);
        });
    }


    // update the app and all of its child components with the app's new state
    loadCurrentSales(event, month, year, tax, paidOrders, currency, currencySymbol) {
        var leftClickTimePeriodCounter = this.state.leftClickTimePeriod,
            chosenTimeframe = this.state.timeframe,
            chosenYear = year,
            chosenMonth = (Number(month) + 1).toString(),
            currentYear = new Date().getFullYear(),
            currencySymbole = currencySymbol,
            postData, minorPostData;

        /*update time period for the charts chosen by the user,
          show necessary controls, hide unnecessary controls  */
        if (event !== undefined && event.target !== undefined && event.target !== null) {
            switch(event.target.id) {
                case 'period-dropdown-week':
                    leftClickTimePeriodCounter = 0;
                    this.setState({ leftClickTimePeriod: leftClickTimePeriodCounter});
                    chosenTimeframe = event.target.id;

                    $('#li-week-span').removeClass('displayNone');
                    $('#li-month-span').addClass('displayNone');
                    $('#li-year-span').removeClass('displayNone');

                    break;
                 case 'period-dropdown-month':
                    leftClickTimePeriodCounter = 0;
                    this.setState({ leftClickTimePeriod: leftClickTimePeriodCounter});
                    chosenTimeframe = event.target.id;

                    $('#li-week-span').addClass('displayNone');
                    $('#li-month-span').removeClass('displayNone');
                    $('#li-year-span').removeClass('displayNone');

                    break;
                 case 'period-dropdown-year':
                    leftClickTimePeriodCounter = 0;
                    this.setState({ leftClickTimePeriod: leftClickTimePeriodCounter});
                    chosenTimeframe = event.target.id;

                    $('#li-week-span').addClass('displayNone');
                    $('#li-month-span').addClass('displayNone');
                    $('#li-year-span').removeClass('displayNone');

                    break;
                case 'i-caret-left-calendar':
                    if (Number(this.state.calendarWeek) > 1) {
                        leftClickTimePeriodCounter++;
                        this.setState({ leftClickTimePeriod: leftClickTimePeriodCounter});
                    }

                    break;
                case 'i-caret-right-calendar':
                        leftClickTimePeriodCounter--;
                        this.setState({ leftClickTimePeriod: leftClickTimePeriodCounter});
                    break;
                default:
                    break;
            }
        }

        // create data object to be send to the server
        postData = {
            leftClickTimePeriodCounter: leftClickTimePeriodCounter,
            timeframe: chosenTimeframe,
            month: chosenMonth,
            year: chosenYear,
            taxSelect: tax,
            paidOrderSelect: paidOrders,
            currencyForSales: currency
        }

        console.log('postDate: ', postData);

        /* post data to the server to retrieve the necessary data for display of
         the revenue chart for the correct settings by the user*/
        $.ajax({
            url: "../server_files/public/index.php/weeklysales",
            type: "POST",
            data: postData
        }).done((data) => {
            console.log(data);
            // prepare posted data from the server to be processed by javascript
            var parsedData = JSON.parse(data),
                // get revenue with tax data
                chartDataWithTax = parsedData[0][0],
                // get revenue without tax data
                chartDataWithoutTax = parsedData[1][0],
                // map data to a valid array
                chartDataWithTaxArray = $.map(chartDataWithTax, (value, key) => value),
                chartDataWithoutTaxArray = $.map(chartDataWithoutTax, (value, key) => value),
                // get the timeinfo
                timeInfo = parsedData[0][1].timeInfo,
                newColumns = [],
                xArray = ['x'],
                yDataWithTax = [],
                yDataWithoutTax = [],
                months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                chartNew;

            switch(timeInfo) {
                case 'week':
                    // extract the dates of the weekdays
                    let monday = parsedData[0][1].monday,
                        tuesday = parsedData[0][1].tuesday,
                        wednesday = parsedData[0][1].wednesday,
                        thursday = parsedData[0][1].thursday,
                        friday = parsedData[0][1].friday,
                        saturday = parsedData[0][1].saturday,
                        sunday = parsedData[0][1].sunday,
                        annualWeek = parsedData[0][1].annualWeek;

                    // update calendar week
                    this.setState({calendarWeek: annualWeek});

                    // prepare new columns for the revenue chart
                    yDataWithTax = [annualWeek + '. Kalenderwoche (mit USt.)'];
                    yDataWithoutTax = [annualWeek + '. Kalenderwoche (ohne USt.)'];

                    $.each(chartDataWithTaxArray, (index, value) => {
                        // fill new column with revenue amount with taxes
                        yDataWithTax.push(Number(value.sales));
                    });

                    $.each(chartDataWithoutTaxArray, (index, value) => {
                        // fill new column with revenue amount without taxes
                        yDataWithoutTax.push(Number(value.sales));
                    });

                    // build full new data column for the revenue chart
                    newColumns = [['x', 'Mo ' + monday, 'Di ' + tuesday, 'Mi ' + wednesday, 'Do ' + thursday, 'Fr ' + friday, 'Sa ' + saturday, 'So ' + sunday],
                                     yDataWithTax, yDataWithoutTax];

                    break;

                case 'month':
                    // prepare new columns for the revenue chart
                    yDataWithTax = ['Tagesumsätze (m. USt.) von ' + months[chosenMonth - 1] + ' ' + chosenYear];
                    yDataWithoutTax = ['Tagesumsätze (o. USt.) von ' + months[chosenMonth - 1] + ' ' + chosenYear];

                    $.each(chartDataWithTaxArray, (index, value) => {
                        // build integer array for the month mapping
                        xArray.push((index + 1).toString());
                        // fill new column with revenue amount with taxes
                        yDataWithTax.push(Number(value.sales));
                    });

                    $.each(chartDataWithoutTaxArray, (index, value) => {
                        // fill new column with revenue amount without taxes
                        yDataWithoutTax.push(Number(value.sales));
                    });

                    // build full new data column for the revenue chart
                    newColumns = [xArray, yDataWithTax, yDataWithoutTax];

                    break;

                case 'year':
                    // prepare new columns for the revenue chart
                    yDataWithTax = ['Monatliche Umsätze (m. USt.) von ' + this.state.year];
                    yDataWithoutTax = ['Monatliche Umsätze (o. USt.) von ' + this.state.year];

                    $.each(chartDataWithTaxArray, (index, value) => {
                         // fill new column with revenue amount with taxes
                        yDataWithTax.push(Number(value.sales));
                    });

                    $.each(chartDataWithoutTaxArray, (index, value) => {
                        // fill new column with revenue amount without taxes
                        yDataWithoutTax.push(Number(value.sales));
                    });

                    // build full new data column for the revenue chart
                    newColumns = [['x', 'Jan', 'Feb', 'März', 'April', 'Mai', 'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez'],
                                     yDataWithTax, yDataWithoutTax];

                    break;
                }

            // update the revenue chart's new columns' data
            this.updateColumns(newColumns);

            // render chart with new data
            chartNew = this.generateLineChartForSales(currencySymbole);
            chartNew.load({
              columns: this.state.columns,
              type: this.state.diagramType
            });
            // show or hide revenue with taxes depending on the taxSelect state
            if (this.state.taxSelect === 'OFF') {
                chartNew.hide([this.state.columns[1][0]]);
            } else {
                chartNew.show([this.state.columns[1][0]]);
            }

        });
        // define data object to be send to the server
        minorPostData = {
            currencyForSales: currency
        }
        // post request to server to retrieve data for the top ten customer table
        $.ajax({
            url: "../server_files/public/index.php/toptencustomers",
            type: "POST",
            data: minorPostData
        }).done((data) => {
            var parsedData = JSON.parse(data),
                dataArray = [];
            console.log('ttcust: ', data);
            // loop over all entries of parsedData object
            for (var i = 0; i < Object.keys(parsedData).length; i++) {
                var array = [],
                    formattedDate;
                // map object data to array
                array = $.map(parsedData[i], (value, key) => value);
                // convert date to german formatted date
                formattedDate = array[5].split('-').reverse().join(".");
                array[5] = formattedDate;
                // push back to dataArray
                dataArray.push(array);
            }

            // update state attribute for the top ten customer table data
            this.updateColumnsForTopTenCustomers(dataArray);
        });

        // post request to server to retrieve data for state pie chart
        $.ajax({
            url: "../server_files/public/index.php/statesales",
            type: "POST",
            data: minorPostData
        }).done((data) => {
            var parsedData = JSON.parse(data),
                dataArray = [];

            console.log('statesales: ', data);
            // loop over all entries of parsedData object
            for (var i = 0; i < Object.keys(parsedData).length; i++) {
                var array = [],
                    arrayEntry;

                // map object to array
                array = $.map(parsedData[i], (value, key) => value);
                // format data to display in pie chart
                arrayEntry = array[0] + ": " + array[1] + currencySymbole;
                array[0] = arrayEntry;

                dataArray.push(array);
            }
            // update state data for the pie chart
            this.updateColumnsForStateSales(dataArray);
        });

        // post request to server to retrieve new data to display in the order chart
        $.ajax({
            url: "../server_files/public/index.php/ordercount",
            type: "POST",
            data: postData
        }).done((data) => {
            console.log('ordercount: ', data);
            var parsedData = JSON.parse(data),
                chartData = parsedData[0][0],
                chartDataPaid = parsedData[1][0],
                // map object data to array
                chartDataArray = $.map(chartData, (value, key) => value),
                chartDataPaidArray = $.map(chartDataPaid, (value, key) => value),
                // extract chosen time period
                timeInfo = parsedData[0][1].timeInfo,
                newColumnsForOrderCount = [],
                xArray = ['x'],
                yData = [],
                yDataPaid = [],
                months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                chartNew;

                switch(timeInfo) {
                    case 'week':
                        // extract the dates for the week days
                        let monday = parsedData[0][1].monday,
                            tuesday = parsedData[0][1].tuesday,
                            wednesday = parsedData[0][1].wednesday,
                            thursday = parsedData[0][1].thursday,
                            friday = parsedData[0][1].friday,
                            saturday = parsedData[0][1].saturday,
                            sunday = parsedData[0][1].sunday,
                            annualWeek = parsedData[0][1].annualWeek;

                        // prepare new columns for the order chart
                        yData = ['Eingegangene Bestellungen der ' + annualWeek + '. Kalenderwoche'];
                        yDataPaid = ['Davon sind bereits bezahlt'];

                        $.each(chartDataArray, (index, value) => {
                            // fill new column with the orders amount
                            yData.push(Number(value.order_amount));
                        });

                        $.each(chartDataPaidArray, (index, value) => {
                            // fill new column with the paid orders amount
                            yDataPaid.push(Number(value.order_amount));
                        });

                        // build new column data for the order chart
                        newColumnsForOrderCount = [['x', 'Mo ' + monday, 'Di ' + tuesday, 'Mi ' + wednesday, 'Do ' + thursday, 'Fr ' + friday, 'Sa ' + saturday, 'So ' + sunday],
                                         yData, yDataPaid];

                        break;

                    case 'month':
                        yData = ['Eingegangene Bestellungen im ' + months[chosenMonth - 1] + ' ' + chosenYear];
                        yDataPaid = ['Davon sind bereits bezahlt'];

                        $.each(chartDataArray, (index, value) => {
                            xArray.push((index + 1).toString());
                            yData.push(Number(value.order_amount));
                        });

                        $.each(chartDataPaidArray, (index, value) => {
                            xArray.push((index + 1).toString());
                            yDataPaid.push(Number(value.order_amount));
                        });

                        newColumnsForOrderCount = [xArray, yData, yDataPaid];

                        break;

                    case 'year':

                        yData = ['Eingegangene Bestellungen von ' + this.state.year];
                        yDataPaid = ['Davon sind bereits bezahlt'];

                        $.each(chartDataArray, (index, value) => {
                            yData.push(Number(value.order_amount));
                        });

                         $.each(chartDataPaidArray, (index, value) => {
                            yDataPaid.push(Number(value.order_amount));
                        });

                        newColumnsForOrderCount = [['x', 'Jan', 'Feb', 'März', 'April', 'Mai', 'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez'],
                                         yData, yDataPaid];

                        break;
                }
            // update state attribute to hold the columns' data for the order chart
            this.updateColumnsForOrderCount(newColumnsForOrderCount);

            // load order chart with new updated data
            chartNew = this.generateLineChartForOrderCount();
            chartNew.load({
              columns: this.state.columnsForOrderCount,
              type: this.state.diagramType
            });

            // show or hide paid orders on user request/depending on state attribute paidOrdersSelect
            if (this.state.paidOrdersSelect === 'ON') {
                chartNew.show([this.state.columnsForOrderCount[2][0]]);
            } else {
                chartNew.hide([this.state.columnsForOrderCount[2][0]]);
            }
        });
    }

    updateColumns(newColumns) {
        // take a copy of existing state
        var columns = {...this.state.columns};
        //add ne column
        columns = newColumns;
        // set state
        this.setState({ columns: columns});
    }

    updateColumnsForOrderCount(newColumnsForOrderCount) {
        // take a copy of existing state
        var columnsForOrderCount = {...this.state.columnsForOrderCount};
        //add ne column
        columnsForOrderCount = newColumnsForOrderCount;
        // set state
        this.setState({ columnsForOrderCount: columnsForOrderCount});
    }

    updateColumnsForTopTenCustomers(newColumnsForTopTenCustomers) {
        // take a copy of existing state
        var columnsForTopTenCustomers = {...this.state.columnsForTopTenCustomers};
        //add ne column
        columnsForTopTenCustomers = newColumnsForTopTenCustomers;
        // set state
        this.setState({ columnsForTopTenCustomers: columnsForTopTenCustomers});
    }

     updateColumnsForStateSales(newColumnsForStateSales) {
        // take a copy of existing state
        var columnsForStateSales = {...this.state.columnsForStateSales};
        //add ne column
        columnsForStateSales = newColumnsForStateSales;
        // set state
        this.setState({ columnsForStateSales: columnsForStateSales});
    }

    updateTimeFrame(newTimeframe) {
        // take a copy of existing state
        var timeframe = {...this.state.timeframe};
        //add ne column
        timeframe = newTimeframe;
        // set state
        this.setState({ timeframe: timeframe});
    }

    updateCurrencyForSales(newCurrencyForSales) {
        // take a copy of existing state
        var currencyForSales = {...this.state.currencyForSales};
        //add ne column
        currencyForSales = newCurrencyForSales;
        // set state
        this.setState({ currencyForSales: currencyForSales});
    }

    updateCurrencySymbol(newCurrencySymbol) {
        var currencySymbol = {...this.state.currencySymbol};
        //add ne column
        currencySymbol = newCurrencySymbol;
        // set state
        this.setState({ currencySymbol: currencySymbol});
    }

    generateLineChartForSales (currencySymbol) {
        var currencySymbole = currencySymbol;
        // c3 syntax to initialize the chart and populate with data
        var chart = c3.generate({
            bindto: '#lineChartForSales',
            data: {x: 'x',
                columns: this.state.columns,
                type: this.state.diagramType
            },
            axis: {
                x: {
                    type: 'category' // this needed to load string x value
                },
                y: {
                    label: {
                        text: 'Umsatz in ' + currencySymbole,
                        position: 'outer-middle'
                    }
                }
            }
        });
        return chart
    }

    generateLineChartForOrderCount () {
        // c3 syntax to initialize the chart and populate with data
        var chart = c3.generate({
            bindto: '#lineChartForOrderCount',
            data: {x: 'x',
                columns: this.state.columnsForOrderCount,
                type: this.state.diagramType
            },
            color: {
                pattern: ['#DC143C', '#00994c']
            },
            axis: {
                x: {
                    type: 'category' // this needed to load string x value
                },
                y: {
                    label: {
                        text: 'Anzahl der Bestellungen',
                        position: 'outer-middle'
                    }
                }
            }
        });
        return chart
    }

    componentDidMount() {
        // initialize revenue chart and order chart
        var salesChart = this.generateLineChartForSales(this.state.currencySymbol),
            orderCountChart = this.generateLineChartForOrderCount();

        // define default event as fallback if no other event is present in the function loadCurrentSales
        var event = new CustomEvent(
            "defaultEvent",
            {
                detail: {},
                bubbles: true,
                cancelable: true
            }
        );
        // load all data from the database to the charts and tables for initial display
        this.loadCurrentSales(event, this.state.month, this.state.year, this.state.taxSelect, this.state.paidOrdersSelect, this.state.currencyForSales, this.state.currencySymbol);
        this.forceUpdate();
    }


    componentWillMount() {
        var postData;
        // transform token string to array
        const tokenArray = this.props.params.fulltoken.split(':');
        // update state attributes firstname, lastname, token
    	this.setState({
    		firstname: capitalizeFirstLetter(tokenArray[0]),
            lastname: capitalizeFirstLetter(tokenArray[1] !== undefined ? tokenArray[1] : ""),
    		token: tokenArray[2]
    	});

        // prepare data object to be sent to server
        postData = {
            token: tokenArray[2]
        }

        // post request to server to retrieve the shop's name as headline banner
        $.ajax({
            url: "../server_files/public/index.php/shopname",
            type: "POST",
            data: postData
        }).done((data) => {
            console.log(data);
            var parsedData = JSON.parse(data);

            // update state attribute for the shop name
            this.setState(
            	{shopname: parsedData[1],
            		   ok: parsedData[0]}
            );
        });

        // change the body's color for the app's user area
        $('body').css( "background-color", "antiquewhite" );
    }

    // render the HTML code for the App component including its child components if the user is successfully authenticated and cookie is valid
    // otherwise show Loading screen component
    render() {
    	if (Number(this.state.ok) && document.cookie.split(';')[1].slice(1) === this.state.token) {
	        return (
	            <div>
                    <div id="fixedHeaderWrap">
    	            	<div id="headerWrap" className="row">
    	    	            <div id="welcomeWrap" className="col s2">
    	    	            	<Welcome firstname={this.state.firstname} lastname={this.state.lastname} />
    	                    </div>
    	                    <div id="welcomeMessage" className="col s8">
    	                        Ihre Analyse zum Shop <span>{this.state.shopname}</span>
    	                    </div>
                            <div className="col s2 textAlignRight">
                                <div id="logoutButtonWrap">
                                    <Logout/>
                                </div>
                            </div>
    	            	</div>
                        <div id="navBarWrap" className="col s12">
                            <Navigation changeCurrency={this.changeCurrency} paidOrdersSelect={this.paidOrdersSelect}
                             changeYear={this.changeYear} selectTax={this.selectTax}
                             loadSalesData={this.loadSalesData} changeDiagram={this.changeDiagram} changeMonth={this.changeMonth}
                             changeTimeFrame={this.changeTimeFrame}
                             loadCurrentSales={this.loadCurrentSales} month={this.state.month} year={this.state.year}
                             taxSelect={this.state.taxSelect} calendarWeek={this.state.calendarWeek} currencyForSales={this.state.currencyForSales}
                             currencySymbol={this.state.currencySymbol}/>
                        </div>
                    </div>
                    <div id="body-wrap">
                        <div id="linechart-row-sales" className="row">
                            <div id="lineChartWrap" className="col s8">
                                <div id="headerLineChart">Ihr Shopumsatz für den gewählten Zeitraum und die gewählte Währung</div>
                                <div id="lineChartForSales"></div>
                            </div>
                            <div className="col s4">
                                <div id="headerStateSales">Gesamtumsatzanteile nach Bundesland</div>
                                <PieChart columnsForStateSales={this.state.columnsForStateSales}/>
                            </div>
                        </div>
                        <div id="linechart-row-ordercount" className="row">
                            <div id="lineChartSecondWrap" className="col s8">
                                 <div id="headerLineChart">Bestellungen nach Eingangsdatum</div>
                                 <div id="paidOrders">(Davon bezahlte Bestellungen anzeigen)
                                    <span id="orderPaidButton" className="background-color-blue" onClick={this.handlePaidOrdersSelect}>
                                    {this.state.paidOrdersSelect}</span>
                                 </div>
                                <div id="lineChartForOrderCount"></div>
                            </div>
                            <div className="col s4"></div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <TopTenCustomer currencySymbol={this.state.currencySymbol} columnsForTopTenCustomers={this.state.columnsForTopTenCustomers}/>
                            </div>
                        </div>
                    </div>
	            </div>
	        );
    	} else {
    		return <LoadingScreen/>
    	}

    }
}

export default App;


