/*
  App
*/

import * as d3 from "d3";
import * as c3 from "c3";
import React from "react";
import { render } from "react-dom";

class LineChart extends React.Component {
    constructor(props) {
        super(props);

        this.generatePieChart = this.generatePieChart.bind(this);
        this.updateColumns = this.updateColumns.bind(this);
<<<<<<< HEAD
        this.updateCurrencySymbol = this.updateCurrencySymbol.bind(this);
        this.updateIdNumber = this.updateIdNumber.bind(this);
=======
        this.loadSalesData = this.loadSalesData.bind(this);
        this.loadCurrentSales = this.loadCurrentSales.bind(this);
        this.changeTimeFrame = this.changeTimeFrame.bind(this);
        this.updateTimeFrame = this.updateTimeFrame.bind(this);
>>>>>>> be1c222dfef7c15c8162b123601d761385303ab3

    	//getinitialState
    	this.state = {
            leftClick: 0,
            timeframe: 'week',
    		columns: [
    		    ['x', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                ['Aktuelle Kalenderwoche', 0, 0, 0, 0, 0, 0, 0]
<<<<<<< HEAD
            ],
            currencySymbol: "€",
            idNumber: "1"
    	};
    }


    generateLineChart (currencySymbol, idNumber) {
        var currencySymbole = currencySymbol;

        var chart = c3.generate({
            bindto: '#lineChart' + idNumber,
=======
            ]
    	}
    }

    changeTimeFrame(event) {
        console.log('changeTimeFrame: ', event.target);
        this.updateTimeFrame(event.target.id);
        this.loadCurrentSales(event);
    }

    loadSalesData() {
    	$.ajax({
			url: "../server_files/public/index.php/allorders",
			type: "POST",
			data: ''
		}).done( (data) => {
            console.log(data);
            this.loadCurrentSales();
		});
    }

    loadCurrentSales(event) {


        let leftClickCounter = this.state.leftClick,
            chosenTimeframe = this.state.timeframe;

        if(event !== undefined) {
            switch(event.target.id) {
                case 'week':
                    leftClickCounter = 0;
                    this.setState({ leftClick: leftClickCounter});
                    chosenTimeframe = event.target.id;
                    break;
                 case 'month':
                    leftClickCounter = 0;
                    this.setState({ leftClick: leftClickCounter});
                    chosenTimeframe = event.target.id;
                    break;
                 case 'year':
                    leftClickCounter = 0;
                    this.setState({ leftClick: leftClickCounter});
                    chosenTimeframe = event.target.id;
                    break;
                case 'btnBack':
                    leftClickCounter++;
                    this.setState({ leftClick: leftClickCounter});
                    break;
                case 'btnForward':
                    if (leftClickCounter !== 0) {
                        leftClickCounter--;
                        this.setState({ leftClick: leftClickCounter});
                    }
                    break;
                default:
                    break;
            }
        }

        let clickData = {
            leftClickCounter: leftClickCounter,
            timeframe: chosenTimeframe
        }

        console.log(clickData);

        $.ajax({
            url: "../server_files/public/index.php/weeklysales",
            type: "POST",
            data: clickData
        }).done( (data) => {
            console.log(data);
            let parsedData = JSON.parse(data),
                chartData = parsedData[0],
                timeInfo = parsedData[1].timeInfo,
                newColumns = [];

                switch(timeInfo) {
                    case 'week':
                        let monday = parsedData[1].monday,
                            tuesday = parsedData[1].tuesday,
                            wednesday = parsedData[1].wednesday,
                            thursday = parsedData[1].thursday,
                            friday = parsedData[1].friday,
                            saturday = parsedData[1].saturday,
                            sunday = parsedData[1].sunday,
                            annualWeek = parsedData[1].annualWeek;

                        newColumns = [
                            ['x', 'Mo ' + monday, 'Di ' + tuesday, 'Mi ' + wednesday, 'Do ' + thursday, 'Fr ' + friday, 'Sa ' + saturday, 'So ' + sunday],
                            [ annualWeek + '. Kalenderwoche' , Number(chartData[0].sales), Number(chartData[1].sales), Number(chartData[2].sales),
                             Number(chartData[3].sales), Number(chartData[4].sales), Number(chartData[5].sales), Number(chartData[6].sales)]
                        ];
                        break;

                    case 'month':
                        let year = parsedData[1].year.toString();
                        newColumns = [
                            ['x', 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                            ['Monatliche Umsätze von ' + year, Number(chartData[0].sales), Number(chartData[1].sales), Number(chartData[2].sales),
                             Number(chartData[3].sales), Number(chartData[4].sales), Number(chartData[5].sales), Number(chartData[6].sales),
                             Number(chartData[7].sales), Number(chartData[8].sales), Number(chartData[9].sales), Number(chartData[10].sales),
                             Number(chartData[11].sales)]
                        ];
                        break;
                }

            this.updateColumns(newColumns);

            let chartNew = this.generateLineChart();
            chartNew.load({
              columns: this.state.columns
            });
           
        });
    }

    updateColumns(newColumns) {
    	// take a copy of existing state
    	let columns = {...this.state.columns};
     	//add ne column
     	columns = newColumns;
     	// set state
     	this.setState({ columns: columns});
    }

    updateTimeFrame(newTimeframe) {
        // take a copy of existing state
        let timeframe = {...this.state.timeframe};
        //add ne column
        timeframe = newTimeframe;
        // set state
        this.setState({ timeframe: timeframe});
    }

    generateLineChart () {
        let chart = c3.generate({
            bindto: '#lineChart',
>>>>>>> be1c222dfef7c15c8162b123601d761385303ab3
            data: {x: 'x',
                columns: this.state.columns,
                type: this.props.diagramType
            },
            axis: {
                x: {
                    type: 'category'
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

<<<<<<< HEAD
    updateColumns(newColumns) {
        // take a copy of existing state
        var columns = {...this.state.columns};
        //add ne column
        columns = newColumns;
        // set state
        this.setState({ columns: columns});
    }

    updateCurrencySymbol(newCurrencySymbol) {
        // take a copy of existing state
        var currencySymbol = {...this.state.currencySymbol};
        //add ne column
        currencySymbol = newCurrencySymbol;
        // set state
        this.setState({ currencySymbol: currencySymbol});
    }

    updateIdNumber(newIdNumber) {
        // take a copy of existing state
        var idNumber = {...this.state.idNumber};
        //add ne column
        idNumber = newIdNumber;
        // set state
        this.setState({ idNumber: idNumber});
    }

    componentWillReceiveProps(nextProps) {
        var newColumns = nextProps.columnsForStateSales,
            newCurrencySymbol = nextProps.currencySymbol,
            newIdNumber = nextProps.idNumber,
            divID;

        this.updateColumns(newColumns);
        this.updateCurrencySymbol(newCurrencySymbol);
        this.updateIdNumber(newIdNumber);

        divID = divID = 'lineChart' + newIdNumber;

        $(divID).empty();
        this.generateLineChart(newCurrencySymbol, newIdNumber);
    }


    componentDidMount() {
        var salesChart = this.generateLineChart(this.state.currencySymbol, this.state.idNumber);
=======
    componentDidMount() {
        let chart = this.generateLineChart();
        this.loadCurrentSales();
>>>>>>> be1c222dfef7c15c8162b123601d761385303ab3
    }


    render() {
        var divID = 'lineChart' + this.state.idNumber;
        return (
        	<div>
<<<<<<< HEAD
                <div id=divID></div>
            </div>
=======
	            <div id="lineChart"></div>        
                <br></br>
                <div className="row">
                    <div className="col s4">
                        <table>
                            <tr>
                                <td className="cellColor">Zeitintervalle durchschalten</td>
                                <td>
                                    <button type="button" onClick={this.loadCurrentSales} id="btnBackend"><i className="fa fa-fast-backward" aria-hidden="true"></i></button>
                                    <button type="button" onClick={this.loadCurrentSales} id="btnBack"><i className="fa fa-backward" aria-hidden="true"></i></button>
                                    <button type="button" onClick={this.loadCurrentSales} id="btnForward"><i className="fa fa-forward" aria-hidden="true"></i></button>
                                    <button type="button" onClick={this.loadCurrentSales} id="btnForwardend"><i className="fa fa-fast-forward" aria-hidden="true"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td className="cellColor">Daten neu synchronisieren</td>
                                <td><button type="button" onClick={this.loadSalesData}>SYNC</button></td>
                            </tr>
                            <tr>
                                <td className="cellColor">Zeitraum wählen</td>
                                <td>
                                    <ul id="dropdown" className="dropdown-content">
                                        <li id="week" onClick={this.changeTimeFrame}>Woche</li>
                                        <li id="month" onClick={this.changeTimeFrame}>Monat</li>
                                        <li id="year" onClick={this.changeTimeFrame}>Jahr</li>
                                    </ul>
                                    <a className="btn dropdown-button" data-activates="dropdown">Zeitraum<i className="mdi-navigation-arrow-drop-down right"></i></a>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="col s8"></div>
                </div>
        	</div>
>>>>>>> be1c222dfef7c15c8162b123601d761385303ab3
        )
    }

}

export default LineChart;
