import React, { Component } from 'react';
import Vivus from 'vivus';
import linesUnder from "./assets/linesUnderline.svg";
import heart from "./assets/heart.svg";
import "./account.css"

import ListProduct from "./ListProduct";
let isMounted = false;
export default class Account extends Component{
  constructor(props){
   super(props);
   this.state = {}
   if(!process.env && props.auth && !props.auth.userProfile){///Window defined in react snapshot so use node as indicator.
        props.auth.login();
   }

  }
 
  componentWillMount() {

  }
  componentDidMount(){
    isMounted = true; 
  }
 
  render() {
    let  lines = null;
    if(!isMounted){
        lines = (
            <object src={linesUnder} ref={() => {
                new Vivus("linesUnderline",{duration:"500",start:"autostart",file:linesUnder}); 
            }} className="account__overline" id="linesUnderline"></object>
        )
    }else{
        lines = (
            <img src={linesUnder} className={"account__overline"} alt="chose"/>
        )
    }
    let name = null;
    let nickname = null;
    let src = null;
    let user = this.props.auth.userProfile;
    if(user && window){
	    name = this.props.auth.userProfile.name;
	    nickname = this.props.auth.userProfile.nickname;
	    src = this.props.auth.userProfile.picture;
    }
    let profile = (
	    <article className="profile">
	      <img className="profile__img" src={src} alt="profile" />
	      <div className="profile__info">
	          <h1>{name}</h1>
	          <h3>{nickname}</h3>
              <div className={"flex"}>
		          <div className="">
		            <div className="profile__title">
		                <img src={heart} className="profile__image" alt="logo" />
		                <h2>Products You Looked At</h2>
		            </div>
                    <ListProduct products={[]}/>
		          </div>
		          <div className="">
		            <div className="profile__title">
		                <img src={heart} className="profile__image" alt="logo" />
		                <h2>Products You Bought</h2>
		            </div>
                    <ListProduct products={[]}/>
		          </div>
              </div>
	      </div>
	    </article>
    )
    return (
      <section className="account">
        <h1>Your Account</h1>
        {lines}
        {profile}
      </section>
    );
  }
}
