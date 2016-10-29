/*
  Login
*/

import React from 'react';

class Login extends React.Component {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	sendToRegistration (event) {
		event.preventDefault();
		this.context.router.push('/registration');
	}

	handleLoginData (event) {

		//no page refresh
		event.preventDefault();

		let login = {
			loginEmail: this.loginEmail.value,
			loginPassword: this.loginPassword.value
		}

		login = $(this).serialize() + "&" + $.param(login);

		$.ajax({
			url: "../server_files/public/index.php/login",
			type: "POST",
			data: login
		}).done( (data) => {
			if (Number(data)) {
				//this.props.fillLoginData(login);
				this.context.router.push('/userarea');
			} else {
				$('#idLoginError').css("display", "block");
			}
		});

	}

  	render() {
	    return (
	    	<div className="page-wrap row">
				<div className="container reduceWidth">
					<div id="logo" className="marginTopLesser">StoreStats</div>
					<div className="marginTopLess loginText">
						<span>Loggen Sie sich hier ein für Ihr Benutzerkonto bei </span>
						<span className="storeStatsColor">StoreStats</span>
						<br/>
						<span className="textColorGray SmallFont">Volle Kontrolle über Ihr Geschäft mit nur einem Klick</span>
						<form onSubmit={(e) => this.handleLoginData(e)}>
							<div className="input-field col s12 textAlignLeft" >
						 		<input ref={(input) => { this.loginEmail = input}}
						 		       type="text" required name="loginEmail" id="idUserAccount" className="validate fontSize"/>
						 		<label htmlFor="idUserAccount">Email-Adresse</label>
							</div>
					 		<div className="input-field col s12 textAlignLeft">
						 		<input title="Wenigstens 6 Zeichen"
						 		       required pattern=".{6,}" ref={(input) => { this.loginPassword = input}}
						 		                type="password" name="loginPassword" id="idAccountPassword" className="validate fontSize"/>
						 		<label htmlFor="idAccountPassword">Passwort</label>
					 		</div>
					 		<button type="submit" className="btnGreen">Einloggen</button>
					 	</form>
					 	<div className="normalFont textColorGray">
					 		<span>Sie haben noch keinen Zugang angelegt? </span>
					 		<span id="loginRegRef" className="textColorBlue smallFont" onClick={(e) => this.sendToRegistration(e)}>Registrieren Sie sich hier.</span>

					 	</div>
						<div id="idLoginError">
							<p>Email oder Passwort inkorrekt. Sie sind noch nicht registriert?</p>
						</div>
					</div>
				</div>
	    	</div>
	    )
  	}
}

export default Login;
