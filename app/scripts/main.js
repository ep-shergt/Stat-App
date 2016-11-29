import React  from 'react';
import { render }  from 'react-dom';

import RoutedContent from './components/RoutedContent';

/* render the Base Component that contains all other child components.
The displayed component will depend on the "route or url defined for the component"*/
render(
    <RoutedContent/>, document.querySelector('#main')
);