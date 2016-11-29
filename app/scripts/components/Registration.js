/*
  Registration: displays input fields for the user to register for the app.
  Only after that he may enter the app's user area
*/

import React from 'react';

class Registration extends React.Component {

	constructor(props) {
		super(props);
	}

	// this is needed in order to use the router to redirect to another component
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	// redírect to the Login component on click
	sendToLogin (event) {
		//no page refresh
		event.preventDefault();
		this.context.router.push('/login');
	}

	// prepare the users input data to be send to the server and handle the server's response
	handleRegistrationData (event) {
		//no page refresh
		event.preventDefault();
		console.log('handle registration data');
		console.log(this.regShopName.value);

		// create object that holds all the input data
		let regData = {
			regFirstName: this.regFirstName.value,
			regLastName: this.regLastName.value,
			regEmail: this.regEmail.value,
			regPassword: this.regPassword.value,
			regConfirmPassword: this.regConfirmPassword.value,
			regShopName: this.regShopName.value
		}

		// format the data so that php can extract from the post request
		regData = $(this).serialize() + "&" + $.param(regData);

		// send user input data asynchronously to the server via a predefined url on the server
		$.ajax({
			url: "../server_files/public/index.php/registration",
			type: "POST",
			data: regData
		}).done( (data) => {
			if (Number(data)) {
				// show error message in case user already exists
				$('#idRegError').css("display", "block");
			} else {
				// if user has registered successfully redirect to the Login component
				this.context.router.push('/login');
			}
		});

	}

	// HTML structure to be rendered for the component
    render() {
	    return (
	    	<div className="page-wrap row">
				<div className="container reduceWidth">
					<div id="logo">StoreAnalyst</div>
					<div className="loginText">
						<span>Registrieren Sie sich für einen </span>
						<span className="storeStatsColor">14-tägigen Probezugang</span>
						<br/>
						<span className="textColorGray SmallFont">Kostenfreie Nutzung in vollem Umfang und ohne Kreditkarte</span>
						<form onSubmit={(e) => this.handleRegistrationData(e)}>
							<div className="input-field col s6 textAlignLeft">
								<input title="Keine Zahlen, Schrägstriche oder Klammern" ref={(input) => { this.regFirstName = input}}
								       type="text" required pattern="^[^0-9(){}]+$" name="regFirstName" id="idRegFirstName" className="validate fontSize"/>
								<label htmlFor="idRegFirstName">Vorname</label>
							</div>
							<div className="input-field col s6 textAlignLeft">
								<input title="Keine Zahlen, Schrägstriche oder Klammern" ref={(input) => { this.regLastName = input}}

								       type="text" required pattern="^[^0-9(){}]+$" name="regLastName" id="idRegLastName" className="validate fontSize"/>
								<label htmlFor="idRegLastName">Name</label>
							</div>
							<div className="input-field col s12 textAlignLeft">
								<input title="Bitte geben Sie ihre Email-Adresse ein" ref={(input) => { this.regEmail = input}}
								       type="email" required name="regEmail" id="idRegEmail" className="validate fontSize"/>
								<label htmlFor="idRegUser">Email-Adresse</label>
							</div>
							<div className="input-field col s12 textAlignLeft">
								<input title="Wenigstens 6 Zeichen" ref={(input) => { this.regPassword = input}}
								       type="password" required pattern=".{6,}" name="regPw" id="idRegPw" className="validate fontSize"/>
								<label htmlFor="idRegPw">Passwort</label>
							</div>
							<div className="input-field col s12 textAlignLeft">
								<input title="Passwort müssen übereinstimmen" ref={(input) => { this.regConfirmPassword = input}}
								       type="password" required pattern=".{6,}" name="regConfirmPw" id="idRegConfirmPw" className="validate fontSize"/>
								<label htmlFor="idRegConfirmPw">Passwort wiederholen</label>
							</div>
							<div className="input-field col s12 textAlignLeft">
								<input title="Ihr von ePages zugewiesener Shopname" ref={(input) => { this.regShopName = input}}
								       type="text" required pattern=".{6,}" name="regShopName" id="idRegShopName" className="validate fontSize"/>
								<label htmlFor="idregShopName">Shop Name</label>
							</div>
							<button type="submit" className="btn waves-effect waves-light btnGreen">Registrieren</button>
						</form>
						<div id="idRegError">
							<p>Username ist leider schon vergeben. Bitte wählen Sie einen anderen Usernamen aus</p>
						</div>
						<div className="normalFont textColorGray">
				 		<span>Sie sind schon registriert bei uns? </span>
				 		<span id="regLoginRef" className="textColorBlue smallFont" onClick={(e) => this.sendToLogin(e)}>Einloggen</span>
				 	</div>
					</div>
				</div>
			</div>
    )
  }
}

export default Registration;
