 /*
  TopTemCustomer component: show a table with the top ten customers of the shop ordered by revenue
*/
import React from "react";
import { render } from "react-dom";

class TopTenCustomer extends React.Component {

  constructor(props) {
    super(props);

    this.generateTable = this.generateTable.bind(this);
    this.updateColumns = this.updateColumns.bind(this);
    this.updateCurrencySymbol = this.updateCurrencySymbol.bind(this);

    //getinitialState
    this.state = {
      // get customer table data to display from parent component (App)
      columns: this.props.columnsForTopTenCustomers,
      currencySymbol: '€'
    };
  }

  // generate and populate the table with the state's column data dynamically
  generateTable() {
    // begin of the HTML table string including header cells
    var topTenTable = '<table><tbody><tr><th class="width-5p">Platz</th><th>Kunde (Vorname, Name, Email)</th><th class="width-15p">Gesamtumsatz in ' + this.state.currencySymbol + '</th><th class="width-10p">Bestellungen</th><th class="width-15p">Datum letzter Bestellung</th>';

    for (var i = 0; i < this.state.columns.length; i++) {
      // specify the rank for the list (1 means best)
      var rank = i + 1;

      // add a row with corresponding cells
      topTenTable += "<tr>" +
                      "<td class='color'" + rank + " >" + rank + '.' + "</td>" +
                      "<td>" + this.state.columns[i][0] + " " + this.state.columns[i][1] + ":  " + this.state.columns[i][2] + "</td>" +
                      "<td>" + this.state.columns[i][3] + "</td>" +
                      "<td>" + this.state.columns[i][4] + "</td>" +
                      "<td>" + this.state.columns[i][5] + "</td>" +
                     "</tr>";
    }

    // end the table string
    topTenTable += "</tbody></table>";

    // attach table string to component
    $('#topTenTable').append(topTenTable);

  }

  // tell component it has received new props
  componentWillReceiveProps(nextProps) {
    var newColumns = nextProps.columnsForTopTenCustomers,
        newCurrencySymbol = nextProps.currencySymbol,
        self = this;

    // update the component's state
    this.updateColumns(newColumns);
    this.updateCurrencySymbol(newCurrencySymbol);

    //destroy old table
    $('#topTenTable').empty();
    // generate and add table with updated date
    self.generateTable();

    // wait one second to force an update (again) to be really sure the new state is displayed
    setTimeout(()=>{self.forceUpdate();}, 1000);
  }

  updateColumns(newColumns) {
    // take a copy of existing state
    var columns = {...this.state.columns};
    //add new column
    columns = newColumns;
    // set state
    this.setState({ columns: columns});
  }

   updateCurrencySymbol(newCurrencySymbol) {
    // take a copy of existing state
    var currencySymbol = {...this.state.currencySymbol};
    //add new column
    currencySymbol = newCurrencySymbol;
    // set state
    this.setState({ currencySymbol: currencySymbol});
  }

  componentDidMount() {
    var self = this;

    self.generateTable();
    // force an update of the components state in case it didn't load correctly initially
    setTimeout(()=>{self.forceUpdate();}, 1000);
  }

  render() {
      return (
      	<div>
          <div id="headerTopTen">Top Ten der umsatzstärksten Kunden für die ausgewählte Währung</div>
          <div id="topTenTable"></div>
        </div>
      );
  }
}

export default TopTenCustomer;


