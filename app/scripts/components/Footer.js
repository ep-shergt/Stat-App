 /*
  Footer
*/
import React from "react";
import { render } from "react-dom";

// stateless functional component

const Footer = (props) => {
    return (
	    <footer className="page-footer #00897b teal darken-1 site-footer">
	      <div className="container">
	        <div className="row">
	          <div className="col s6">
	            <h5 className="white-text">{props.footerContent}</h5>
	            <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
	          </div>
	          <div className="col s6">
	            <h5 className="white-text">Links</h5>
	            <ul>
	              <li><a className="grey-text text-lighten-3" href="#!">{props.linkOne}</a></li>
	              <li><a className="grey-text text-lighten-3" href="#!">{props.linkTwo}</a></li>
	              <li><a className="grey-text text-lighten-3" href="#!">{props.linkThree}</a></li>
	              <li><a className="grey-text text-lighten-3" href="#!">{props.linkFour}</a></li>
	            </ul>
	          </div>
	        </div>
	      </div>
	      <div className="footer-copyright">
	        <div className="container">
	        © 2016 Steven Hergt
	        <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
	        </div>
	      </div>
	    </footer>
    );
 }


export default Footer;
