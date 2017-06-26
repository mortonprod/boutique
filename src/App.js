import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import * as _ from "lodash";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

import Auth from "./auth";

import Chose from "./chose";

import Store from "./store";

import Buy from "./buy";
import About from "./about";
import Nav from "./nav";

import Eye from "./eye";

import Account from "./account";


import './App.css';


const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}
class App extends Component {
  constructor(){
    super();
    this.state = {isDown:false,isNavButton:false};
  }
  componentWillMount(){
  }

  render() {
    return (

     <Router>
        <div className="app">
	    <Fade>
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
                <Route path="/buy" component={Buy}/>
                <Route path="/more" component={Chose}/>
                <Route path="/headshop" component={Eye}/>
                <Route path="/account" component={Account}/>
	        </Switch>
	    </Fade>
        <Nav auth={auth} threshold={700}/>
        </div>
      </Router>

    );
  }
}

export default App;

class Fade extends Component {

    render() {
        return (
            <Route render={({location}) => (
                <ReactCSSTransitionGroup
                    transitionName="tran"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {React.cloneElement(this.props.children, {location: location, key: location.key})}
                </ReactCSSTransitionGroup>
            )}/>
        );
    }
}
//{React.cloneElement(this.props.children, {location: location, key: location.key})}
