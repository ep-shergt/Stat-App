/*
  StartPage
*/

import React from 'react';
import Login from './Login';

class StartPage extends React.Component {
	constructor(props) {
		super(props);
	}

	// function is passed down to child component
    render() {
	    return (
			<Login/>
	    )
  	}
}

export default StartPage;
