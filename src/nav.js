import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import * as _ from "lodash";
import auth0 from 'auth0-js';
import createHistory from 'history/createBrowserHistory'
import menu from './assets/menu.svg';
import googleC from './assets/Google_Color.svg';
import facebookC from './assets/Facebook_Color.svg';
import twitterC from './assets/Twitter_Color.svg';
import accountBox from './assets/accountBox.svg';

import "./nav.css"

export default class Nav extends Component{
    constructor(props){
        super(props);
        this.scroll = _.throttle(this.scroll,200);
        this.resize = _.throttle(this.resize,200);
        this.state = {isButton:false,isShow:false}
    }
    resize(){
        if(window.innerWidth > this.props.threshold){
            this.setState({ isButton:false, isShow:this.state.isShow});
        }else{
            this.setState({ isButton:true, isShow:this.state.isShow});
        }
    }
    scroll(event){
        let scrollTop = event.srcElement.body.scrollTop;
        if(scrollTop > 30){
            this.setState({isShow:true});
        }
        if(scrollTop < 30){ 
            this.setState({isShow:false});
        }
    }
    componentDidMount(){
        window.addEventListener('resize',this.resize.bind(this));
        window.addEventListener('scroll',this.scroll.bind(this));
        this.resize();
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.resize.bind(this));
        window.removeEventListener('scroll',this.scroll.bind(this));
    }

    render(){
        let show = ""
        if(this.state.isShow){
            show = "nav--show"
            
        }
        let comp = null;
        if(this.state.isButton){
            comp = (
                <img 
                    onClick= { () =>{
                        let isButton = true;
                        if(this.state.isButton){
                            isButton = false;
                        }
                        this.setState({isButton:isButton})
                    }} 
                    src={menu} className={"nav__button " + show } alt="logo" 
                />
            )
        }else{
            comp = (
                <nav
                    onClick={()=>{
                        let isButton = true;
                        if(this.state.isButton){
                            isButton = false;
                        }
                        this.setState({isButton:isButton})
                    }} 
                    className={"nav__box " + show}
                >
                 <div className={"nav__full"}></div>
                  <header>
                    <h2> Boutique </h2>
                  </header>
                  <section className={"nav__box__links"}>
                      <article>
	                      <h3> What you'll find here: </h3>
	                      <ul className={"nav__box__links__routes"}>
	                        <li><Link to="/">Home</Link></li>
	                        <li><Link to="/about">About</Link></li>
	                        <li><Link to="/more">More</Link></li>
	                      </ul>
                      </article>
                      <article>
	                      <h3> Login: </h3>
	                      <ul className="nav__box__links__social">
                            <li onClick={auth.login}>
	                            <img src={accountBox} className="" alt="logo" />
	                            <img src={facebookC} className="" alt="logo" />
	                            <img src={googleC} className="" alt="logo" />
                            </li>
	                      </ul>
                        </article>
                  </section>
              </nav>

            )
        }
        return (
            <div>
                {comp}
            </div>
        )
    }
}


let history = createHistory({
  forceRefresh: true
});

class Auth {
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }
  auth0 = new auth0.WebAuth({
    domain: 'mortonprod.eu.auth0.com',
    clientID: 'i92K1aH4gGRkkJagDPAAIjH0xmCX4A8S',
    redirectUri: 'http://localhost:3000',
    audience: 'https://mortonprod.eu.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/home');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}

const auth = new Auth();