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
        this.updateCurrencySymbol = this.updateCurrencySymbol.bind(this);
        this.updateIdNumber = this.updateIdNumber.bind(this);

    	//getinitialState
    	this.state = {
    		columns: [
    		    ['x', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                ['Aktuelle Kalenderwoche', 0, 0, 0, 0, 0, 0, 0]
            ],
            currencySymbol: "€",
            idNumber: "1"
    	};
    }


    generateLineChart (currencySymbol, idNumber) {
        var currencySymbole = currencySymbol;

        var chart = c3.generate({
            bindto: '#lineChart' + idNumber,
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
    }


    render() {
        var divID = 'lineChart' + this.state.idNumber;
        return (
        	<div>
                <div id=divID></div>
            </div>
        )
    }

}

export default LineChart;
