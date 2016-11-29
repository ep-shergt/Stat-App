import React from "react";
import { render } from "react-dom";

// stateless functional component

class Logout extends React.Component {
	// make router available
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	// logout process triggered by button click
	logout(event) {
		// prevent page reload
		event.preventDefault();

		// request to server to delete session token in database
		$.ajax({
            url: "../server_files/public/index.php/logout",
            type: "POST",
            data: ''
        }).done((data) => {
        	// redirect to the Login component
            this.context.router.push('/login');

            // ToDo: delete cookie
        });
	}

	// render the Logout button and assign to it the onclick event
	render() {
	    return (
	    	<div>
				<button type="button" className="btn waves-effect waves-light"
				 onClick={(e) => this.logout(e)}>Logout</button>
			</div>
	    );
	}
 }


export default Logout;
