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
		}).done((data) => {
			console.log('rawlogindata: ', data);
			var parsedData = JSON.parse(data),
				d = new Date();

			d.setTime(d.getTime() + 480*60*1000);

			console.log('login: ', parsedData);

			if (Number(parsedData[0])) {
				const firstname = parsedData[1][0].firstname,
					  lastname = parsedData[1][0].lastname,
					  token = parsedData[2],
					  fulltoken = firstname + ':' + lastname + ':' + token;

				document.cookie = token + ';path=/;expires=' + d.toGMTString() + ';max-age='+480*60 + ';';
				console.log(fulltoken);
				this.context.router.push('/userarea/' + fulltoken);
			} else {
				$('#idLoginError').css("display", "block");
			}
		});
	}

	componentWillMount() {
        $('body').css( "background-color", "white" );
    }

  	render() {
	    return (
	    	<div className="page-wrap row">
				<div className="container reduceWidth">
					<div id="logo" className="marginTopLesser">StoreAnalyst</div>
					<div className="marginTopLess loginText">
						<span>Loggen Sie sich hier ein für Ihr Benutzerkonto bei </span>
						<span className="storeStatsColor">StoreAnalyst</span>
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
					 		<button type="submit" className="btnGreen btn waves-effect waves-light">Einloggen</button>
					 	</form>
					 	<div className="normalFont textColorGray">
					 		<span>Sie haben noch keinen Zugang angelegt? </span>
					 		<span id="loginRegRef" className="textColorBlue smallFont" onClick={(e) => this.sendToRegistration(e)}>Registrieren Sie sich hier.</span>

					 	</div>
						<div id="idLoginError">
							<p>Email oder Passwort inkorrekt. Sind sie schon registriert?</p>
						</div>
					</div>
				</div>
	    	</div>
	    )
  	}
}

export default Login;
