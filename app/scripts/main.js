import React  from 'react';
import { render }  from 'react-dom';

import RoutedContent from './components/RoutedContent';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

render(
    <RoutedContent/>, document.querySelector('#main')
);
//
render(
	<Navigation home="Diagrams" aboutme="About me" startpage="Start Page"/>,
	document.getElementById('navigation')
);

// render(
// 	<Footer footerContent="Footer Content" linkOne="Link 1" linkTwo="Link 2" linkThree="Link 3" linkFour="Link 4"/>,
// 	document.getElementById('footer')
// );
