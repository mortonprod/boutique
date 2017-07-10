import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import * as _ from "lodash";


import menu from './assets/menu.svg';
import AccountLink from "./AccountLink";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';
import "./nav.css"
import "./share.css";

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
                <img key={"button"} 
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
                <div key={"header"}
                    onClick={()=>{
                        let isButton = true;
                        if(this.state.isButton){
                            isButton = false;
                        }
                        this.setState({isButton:isButton})
                    }} 
                    className={"nav__box " + show}>
					<h2> Boutique </h2>
					<div className={"nav__links"}>
                        <ListLink list={["Home","about","more"]}/>
					</div>
					<div className={"nav__share"}>
						<Share title={"Share"} 
							facebook={{url:"github.com",title:"boutique"}}
							google={{url:"github.com",title:"boutique"}}
							twitter={{url:"github.com",title:"boutique"}}
                        />

					</div>
					<div className={"nav__account"}>
                        <AccountLink auth={this.props.auth}/>
                    </div>

                </div>

            )
        }
        return (
            <nav className={"nav"}>
		        <ReactCSSTransitionGroup
		            transitionName={"nav__tran"}
		            transitionEnterTimeout={500}
		            transitionLeaveTimeout={500}>
		            {comp}
		        </ReactCSSTransitionGroup> 
            </nav>
        )
    }
}

function Share(props){
    return (
        <div className={"share"}>
			<h4>{props.title}</h4>
			<FacebookShareButton url={props.facebook.url} title={props.facebook.title} >
			    <FacebookIcon size={32} round />
			</FacebookShareButton>
			<GooglePlusShareButton url={props.facebook.url} title={props.google.title} >
			    <GooglePlusIcon size={32} round />
			</GooglePlusShareButton>
			<TwitterShareButton url={props.twitter.url} title={props.twitter.title} >
			    <TwitterIcon size={32} round />
	        </TwitterShareButton>
        </div>
    )
}




