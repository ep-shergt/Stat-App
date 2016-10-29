/*
	RoutedContent
*/


import React  from 'react';
import { render }  from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';

import NotFound from './NotFound';
import App from './App';
import Aboutme from './Aboutme';
import Startpage from './Startpage';
import Registration from './Registration';
import Login from './Login';

/*
  Routes
*/

const RoutedContent = () => {
	return (
	    <Router history={hashHistory}>
	        <Route path="/userarea" component={App}/>
	        <Route path="/login" component={Login}/>
	        <Route path="/registration" component={Registration}/>
	        <Route path="/aboutme" component={Aboutme}/>
	        <Route path="/" component={Startpage}/>
	        <Route path="*" component={NotFound}/>
	    </Router>
	)
}

export default RoutedContent;
