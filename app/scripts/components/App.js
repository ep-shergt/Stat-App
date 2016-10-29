/*
  App
*/

import React from "react";
import { render } from "react-dom";
import LineChart from "./LineChart";

class App extends React.Component {
    render() {
        return (
            <div>
                <LineChart />
            </div>
        );
    }
}

export default App;
