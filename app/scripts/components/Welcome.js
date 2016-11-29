/*
	Welcome component to display the users name
*/


import React from "react";
import { render } from "react-dom";

// stateless functional component

const Welcome = (props) => {
    return (
    	<div>
			<div>Willkommen<span> {props.firstname}</span><span> {props.lastname}</span></div>
		</div>
    );
 }


export default Welcome;
