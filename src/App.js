import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import * as _ from "lodash";
import { RouteTransition } from 'react-router-transition';
import Chose from "./chose";
import Store from "./store";
import Buy from "./buy";
import About from "./about";
import config from "./config";
//import Nav from "./nav";
import {CreateRouter,Auth} from "@mortonprod/react-nav-component";
import "@mortonprod/react-nav-component/dist/index.css";
import Admin from "./Admin";

import Eye from "./eye";

import Account from "./account";


import './App.css';
import './grid.css';


const auth = new Auth(config);
const props = {
	Auth:auth,
	routes:[
		{
			name: "route1",
			location: "/",
			element: Store
		}
	]
}
// <CreateRouter {...props} />
export default class App extends Component {
  constructor(){
    super();
    this.state = {isDown:false,isNavButton:false};
  }
  componentWillMount(){
  }
  //Note buy route pass props so each product can pass information to it through location state..
  render() {
    return (
      <CreateRouter {...props} />
    );
  }
}


