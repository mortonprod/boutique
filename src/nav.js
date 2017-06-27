import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import * as _ from "lodash";


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
        this.state = {isButton:false,isShow:false,profile:null}
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
    componentWillMount(){
	    if (!this.props.auth.userProfile) {
	      this.props.auth.getProfile((err, profile) => {
	        this.setState({ profile:profile });
	      });
	    } else {
	      this.setState({ profile: this.props.auth.userProfile });
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
        let acc = null;
        if(this.props.auth.userProfile === null || typeof this.props.auth.userProfile === "undefined" ){
            acc = (
	            <article className={"nav__box__links__account"}>
	              <div onClick={this.props.auth.login} className="nav__box__links__account__social">
                    <img src={accountBox} className="" alt="logo" />
                    <img src={facebookC} className="" alt="logo" />
                    <img src={googleC} className="" alt="logo" />
                  </div>
	            </article>

            )
        }else{
            acc = (
                <Link to={"/account"}>
	                <article className="nav__box__links__account">
	                  <h3> Welcome {this.props.auth.userProfile.name} </h3>
	                  <Link to={"/account"}>
	                    <img src={this.props.auth.userProfile.picture} alt="profile" />
	                  </Link>
	                </article>
                </Link>

            )
        }
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
                    className={"nav__box " + show}>
                  <header>
                    <h2> Boutique </h2>
                  </header>
                  <section className={"nav__box__links"}>
                      <article>
	                      <ul className={"nav__box__links__routes"}>
	                        <li><Link to="/">Home</Link></li>
	                        <li><Link to="/about">About</Link></li>
	                        <li><Link to="/more">More</Link></li>
	                      </ul>
                      </article>
                      {acc}
                  </section>
              </nav>

            )
        }
        return (
            <div className={"nav"}>
                {comp}
            </div>
        )
    }
}