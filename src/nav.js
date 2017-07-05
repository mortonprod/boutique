import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import * as _ from "lodash";


import menu from './assets/menu.svg';
import AccountLink from "./AccountLink";

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';
import "./nav.css"

import ListLink from "./ListLink";

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const GooglePlusIcon = generateShareIcon('google');
const TwitterIcon = generateShareIcon('twitter');


export default class Nav extends Component{
    constructor(props){
        super(props);
        this.scroll = _.throttle(this.scroll,200);
        this.resize = _.throttle(this.resize,200);
        //Define defaults and fill with details if connected to api for profile.
        this.state = {isButton:false,isShow:false,profile:null}
    }
    resize(event){
        if(window.innerWidth > this.props.thresholdX){
            this.setState({ isButton:false, isShow:this.state.isShow});
        }else{
            this.setState({ isButton:true, isShow:this.state.isShow});
        }
    }
    scroll(event){
        let scrollTop = event.srcElement.body.scrollTop;
        if(scrollTop > this.props.thresholdY){
            this.setState({isShow:true});
        }
        if(scrollTop < this.props.thresholdY){ 
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
                <div
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
                  <ListLink list={["Home","about","more"]}/>

                  <FacebookShareButton url={"http://github.com"} title={"Boutique store"} >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <GooglePlusShareButton url={"http://github.com"} title={"Boutique store"} >
                    <GooglePlusIcon size={32} round />
                  </GooglePlusShareButton>
                  <TwitterShareButton url={"http://github.com"} title={"Boutique store"} >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <div className={"nav__account"}>
                    <AccountLink auth={this.props.auth}/>
                  </div>
              </div>

            )
        }
        return (
            <nav className={"nav"}>
                {comp}
            </nav>
        )
    }
}