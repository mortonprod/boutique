import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import * as _ from "lodash";
import { RouteTransition } from 'react-router-transition';
import Auth from "./auth";
import Chose from "./chose";
import Store from "./store";
import Buy from "./buy";
import About from "./about";
import Nav from "./nav";
import Admin from "./Admin";

import Eye from "./eye";

import Account from "./account";


import './App.css';


const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}
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

		<Router>
            <Route component={Content}/>
        </Router>       

    );
  }
}

let Content = ({ match, location, history })=>{
    return(
        <div className="app">
            <RouteTransition 
              pathname={location.pathname}
              atEnter={{ opacity: 0}} 
              atLeave={{ opacity: 0}} 
              atActive={{ opacity: 1}} 
            > 
                <Switch>
                    <Route exact path="/" 
                        render={
                            (props)=>{
                                handleAuthentication(props);
                                return <Store {...props}/>
                            }
                        }
                    />
                    <Route path="/about" component={About}/>
                    <Route path="/buy" render={(props) => {return <Buy auth={auth} {...props}/>}}/>
                    <Route path="/more" component={Chose}/>
                    <Route path="/headshop" component={Eye}/>
                    <Route path="/admin" component={Admin}/>
                    <Route path="/account" render={() => {return <Account auth={auth}/>}}/>
                </Switch>
            </RouteTransition>
            <Nav auth={auth} thresholdX={700} thresholdY={30} />
        </div>
    )
}