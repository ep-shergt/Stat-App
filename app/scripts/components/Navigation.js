 /*
  Navigation
*/
import React from "react";
import { render } from "react-dom";

class Navigation extends React.Component {
    render() {
        return (
	    <ul id="slide-out" className="side-nav fixed #00acc1 cyan darken-1">
	      <li className="#ffffff white" id="liLogo"><img id="navLogo" src={"./images/logo.jpg"} alt="Logo"/><hr/></li>
	      <li><a href="#/userarea" className="White-text">{this.props.home}</a></li>
	      <li><a href="#/aboutme" className="white-text">{this.props.aboutme}</a></li>
	      <li><a href="#/" className="white-text">{this.props.startpage}</a></li>
	    </ul>
        );
    }
}

export default Navigation;


