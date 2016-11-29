 /*
  Navigation
*/
import React from "react";
import { render } from "react-dom";

class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.updateCurrencySymbol = this.updateCurrencySymbol.bind(this);

        //getinitialState
        this.state = {
          currencySymbol: '€',
          monthName: 'Januar'
        };
    }

	componentDidMount() {
	    $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: true, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left' // Displays dropdown with edge aligned to the left of button
        });
	}

    componentWillReceiveProps(nextProps) {
        var newCurrencySymbol = nextProps.currencySymbol,
            newMonthNumber = nextProps.month;

        this.updateCurrencySymbol(newCurrencySymbol);
        this.updateMonthName(newMonthNumber);
    }

    updateCurrencySymbol(newCurrencySymbol) {
        // take a copy of existing state
        var currencySymbol = {...this.state.currencySymbol};
        //add ne column
        currencySymbol = newCurrencySymbol;
        // set state
        this.setState({currencySymbol: currencySymbol});
    }

    updateMonthName(newMonthNumber) {
        var monthName = {...this.state.monthName},
            newMonthName,
            monthNameArray = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

        newMonthName = monthNameArray[Number(newMonthNumber)];
        monthName = newMonthName;
        this.setState({monthName: monthName});
    }


    render() {
        return (
        	<div>
                <ul id="period-dropdown-timeframe" className="dropdown-content">
                    <li id="period-dropdown-week" onClick={this.props.changeTimeFrame}>7-Tage-Woche</li>
                    <li id="period-dropdown-month" onClick={this.props.changeTimeFrame}>Monat</li>
                    <li id="period-dropdown-year" onClick={this.props.changeTimeFrame}>Jahr</li>
       			</ul>
			    <ul id="renderstyle" className="dropdown-content">
                    <li id="renderstyle-bar" onClick={this.props.changeDiagram}>Balken</li>
                    <li id="renderstyle-line" onClick={this.props.changeDiagram}>Linie</li>
                </ul>
                <ul id="currency-dropdown" className="dropdown-content">
                    <li id="currency-eur" onClick={this.props.changeCurrency}>Euro €</li>
                    <li id="currency-gbp" onClick={this.props.changeCurrency}>GBP £</li>
                    <li id="currency-usd" onClick={this.props.changeCurrency}>US Dollar $</li>
                    <li id="currency-pln" onClick={this.props.changeCurrency}>Zloty zł</li>
                    <li id="currency-dkk" onClick={this.props.changeCurrency}>Dänische Krone DKK</li>
                    <li id="currency-nok" onClick={this.props.changeCurrency}>Norwegische Krone kr</li>
                    <li id="currency-sek" onClick={this.props.changeCurrency}>Schwedische Krone kr</li>
                    <li id="currency-rub" onClick={this.props.changeCurrency}>Russischer Rubel руб.</li>
                </ul>
				<nav id="main-navigation-bar">
        <div className="nav-wrapper">
				    	<ul className="left green-color">
				    		<li>
				        		<button type="button" className="btn waves-effect waves-light" onClick={this.props.loadSalesData}>SYNC</button>
				    		</li>
                            <li><a id="currency-choice" className="dropdown-button" data-activates="currency-dropdown">Währungsfilter<i className="mdi-navigation-arrow-drop-down right"></i></a></li>
                            <li>
                                {this.state.currencySymbol}
                            </li>
				    		<li>
				    			<span id="tax-span">Umsatzsteuer </span><span id="taxSelectButton" className="background-color-blue" onClick={this.props.selectTax}>{this.props.taxSelect}</span>
				    		</li>
				    	</ul>

				        <ul className="right green-color">
				        	<li id="li-year-span" className="displayNone">
				        		<span className="pointer span-dist" onClick={this.props.changeYear}><i id="i-caret-left" className="fa fa-caret-left" aria-hidden="true"></i></span>
				        		<span className="calendar-span-text">Jahr </span>
                                <span id="span-year">{this.props.year}</span>
                                <span className="pointer span-dist" onClick={this.props.changeYear}><i id="i-caret-right" className="fa fa-caret-right" aria-hidden="true"></i></span>
				        	</li>
				        	<li id="li-month-span" className="displayNone">
				        		<span className="pointer span-dist" onClick={this.props.changeMonth}><i id="i-caret-left-month" className="fa fa-caret-left" aria-hidden="true"></i></span>
				        		<span className="calendar-span-text">Monat </span>
                                <span className="span-week">{this.state.monthName}</span>
                                <span className="pointer span-dist" onClick={this.props.changeMonth}><i id="i-caret-right-month" className="fa fa-caret-right" aria-hidden="true"></i></span>
				        	</li>
				            <li id="li-week-span" className="displayNone">
				            	<span className="pointer span-dist" onClick={(event) => this.props.loadCurrentSales(event, this.props.month,
                            	this.props.year, this.props.taxSelect, this.props.paidOrdersSelect, this.props.currencyForSales,
                                this.props.currencySymbol)}><i id="i-caret-left-calendar" className="fa fa-caret-left" aria-hidden="true"></i></span>
                            	<span className="calendar-span-text">Kalendarwoche </span>
                                <span className="span-week">{this.props.calendarWeek}</span>
                                <span className="pointer span-dist" onClick={(event) => this.props.loadCurrentSales(event, this.props.month,
                                this.props.year, this.props.taxSelect, this.props.paidOrdersSelect, this.props.currencyForSales,
                                this.props.currencySymbol)}><i id="i-caret-right-calendar" className="fa fa-caret-right" aria-hidden="true"></i></span>
				            </li>
				            <li><a className="dropdown-button" data-activates="period-dropdown-timeframe">Zeitraum auswählen<i className="mdi-navigation-arrow-drop-down right"></i></a></li>
				            <li><a className="dropdown-button" data-activates="renderstyle">Darstellungsart<i className="mdi-navigation-arrow-drop-down right"></i></a></li>
				        </ul>
				    </div>
				</nav>
			</div>
        );
    }
}

export default Navigation;


