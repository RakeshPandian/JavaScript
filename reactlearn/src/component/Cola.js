import React, { Component } from 'react';
import {NavLink, Route} from 'react-router-dom';

class Cola extends Component{
    constructor(props){
    super(props);
    console.log("This is Cola");
}

render(){
    return(
        <div>
            <h1> This is Cola : {this.props.colaName}</h1>
            <NavLink exact to="/">GOBACK</NavLink>
           
        </div>
    );
}
}

export default Cola;