/*
  About me
*/
import React from "react";
import { render } from "react-dom";
import { testLog } from '../helpers';

class Aboutme extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: "horst",
                age: 1}
        }
    }

    initalLoad() {
        console.log(this); // null
        console.log(test());
        // Ajax
        // success => this.state.items = schnick-schnack-aus-Request
    }

    getInitialState() {
        return {
            user : {
                username: "horst",
                age: 1,
                testString: 'bla'
            }
        };
    }

    componentDidMount() {
        this.initalLoad.bind(this);

        // this.serverRequest = $.get("../server_files/public/1.php", function (result) {
        //     console.log(JSON.parse(result), " state", this.state);
        //     var res = JSON.parse(result)[0];

        //     this.setState({
        //         user : {
        //             username: res.name,
        //             age: res.age
        //         }
        //     });
        //     console.log("state", this.state);
        // }.bind(this));

        // this.serverRequest = $.post("../server_files/public/index.php/allorders", function (result) {
        //     console.log(result);

        //     this.setState({
        //         user : {
        //             username: result,
        //             age: 2,
        //             testString: testLog()
        //         }
        //     });
        // }.bind(this));
    }

    render() {
        return (
            <div>
                {this.state.user.username}
            </div>
        );
    }
}

export default Aboutme;
