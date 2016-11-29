/*
  Not Found
*/

import React from 'react';

class NotFound extends React.Component {
    render() {
        return (
	    	<div id="notfound" className="col s12">
		    	<h1 >Oops! Etwas ist schief gelaufen</h1>
	    		<h2>Die angeforderte URL führte leider ins Nirgendwo :-(</h2>
	    	</div>
        );
    }
}

export default NotFound;
