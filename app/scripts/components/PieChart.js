 /*
  Navigation
*/
import React from "react";
import { render } from "react-dom";
import * as d3 from "d3";
import * as c3 from "c3";

class PieChart extends React.Component {

  constructor(props) {
    super(props);

     this.generatePieChart = this.generatePieChart.bind(this);

    //getinitialState
    this.state = {
      columns: this.props.columns
    };
  }

  generatePieChart() {
    var pieChart = c3.generate({
      bindto: '#piechart',
      data: {
        columns: this.props.columnsForStateSales,
        type: 'pie'
      }
    });
  }

   componentWillReceiveProps(nextProps) {
    var newColumns = nextProps.columnsForStateSales,
        self = this;

    self.updateColumns(newColumns);
    setTimeout(()=>{
        $('#piechart').empty();
        self.generatePieChart();
        self.forceUpdate();
    }, 1000);
  }

   updateColumns(newColumns) {
    // take a copy of existing state
    var columns = {...this.state.columns};
    //add ne column
    columns = newColumns;
    // set state
    this.setState({ columns: columns});
  }

  componentDidMount() {
    var generatedPieChart = this.generatePieChart(),
        self = this;

    setTimeout(()=>{self.forceUpdate();}, 1000);
  }

  render() {
    return (
    	<div>
        <div id="piechart"></div>
      </div>
    );
  }
}

export default PieChart;


