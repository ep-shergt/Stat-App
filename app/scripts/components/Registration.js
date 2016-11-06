/*
  Registration
*/

import React from 'react';

class Registration extends React.Component {

	// constructor(props) {
	// 	super(props);
	// 	this.handleRegistrationData = this.handleRegistrationData.bind(this);
	// }

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	sendToLogin (event) {
		event.preventDefault();
		this.context.router.push('/login');
	}

	handleRegistrationData (event) {

		//no page refresh
		event.preventDefault();
		console.log('handle registration data');
		console.log(this.regFirstName.value);

		let regData = {
			regFirstName: this.regFirstName.value,
			regLastName: this.regLastName.value,
			regEmail: this.regEmail.value,
			regPassword: this.regPassword.value,
			regConfirmPassword: this.regConfirmPassword.value
		}

		regData = $(this).serialize() + "&" + $.param(regData);

		$.ajax({
			url: "../server_files/public/index.php/registration",
			type: "POST",
			data: regData
		}).done( (data) => {
			if (Number(data)) {
				$('#idRegError').css("display", "block");
			} else {
				this.context.router.push('/userarea');
			}
		});

	}

    render() {
	    return (
	    	<div className="page-wrap row">
				<div className="container reduceWidth">
					<div id="logo">StoreStats</div>
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
							<button type="submit" className="btn waves-effect waves-light btnGreen">Registrieren</button>
						</form>
						<div id="idRegError">
							<p>Username ist leider schon vergeben. Bitte wählen Sie einen anderen Usernamen aus?</p>
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
