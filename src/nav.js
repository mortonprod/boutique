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
	                        <li>
	                            <a href="https://www.facebook.com/">
	                                <img src={facebookC} className="" alt="logo" />
	                            </a>
	                        </li>
	                        <li>
	                            <a href="https://twitter.com/?lang=en">
	                                <img src={twitterC} className="" alt="logo" />
	                            </a>
	                        </li>
	                        <li>
	                            <a href="/https://groups.google.com/forum/#!overview">
	                                <img src={googleC} className="" alt="logo" />
	                            </a>
	                        </li>
                            <li>
                                <Link to="/account">
                                    <img src={accountBox} className="" alt="logo" />
                                </Link>
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
