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

        this.updateColumns = this.updateColumns.bind(this);
        this.loadSalesData = this.loadSalesData.bind(this);

    	//getinitialState
    	this.state = {
    		columns: [
    		['x', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                ['Aktuelle Kalenderwoche', 30, 200, 100, 400, 150, 250, 400],
                ['Letzte Kalenderwoche', 50, 20, 10, 40, 15, 25, 80]
            ]
    	}
    }

    loadSalesData() {
    	$.ajax({
			url: "../server_files/public/index.php/allorders",
			type: "POST",
			data: ''
		}).done( (data) => {
			console.log(data);
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

    generateLineChart () {
        let chart = c3.generate({
            bindto: '#lineChart',
            data: {x: 'x',
              columns: this.state.columns,
              type: 'bar'
            },
            axis: {
            	x: {
            		type: 'category' // this needed to load string x value
        		},
                y: {
                    label: {
                        text: 'Umsatz in €',
                        position: 'outer-middle'
                    }
                }
            }
        });
        return chart
    }

    componentDidMount() {
        let chart = this.generateLineChart();

        const newColumns = [
        ['x', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                ['Vorletzte Kalenderwoche', 300, 100, 250, 150, 300, 150, 500],
                ['Vorvorletzte Kalenderwoche', 100, 200, 150, 50, 100, 250, 30]
              ];

        this.updateColumns(newColumns)

        setTimeout(() => {
            chart.load({
              columns: this.state.columns
            });
        }, 3000);
    }


    render() {
        return (
        	<div>
	            <div id="lineChart"></div>
			 	<button type="button" onClick={this.loadSalesData}>Umsatzdaten anzeigen</button>
        	</div>
        )
    }

}

export default LineChart;
