import React, { Component } from 'react';
import Auth from "./auth";
import "./account.css"
export default class Account extends Component{
  constructor(){
    super();
    if(Auth.userProfile === null){
        this.state = { profile:null };
    }else{
        this.state = { profile:Auth.userProfile };
    }
  }
 
  componentWillMount() {
  }
  render() {
    return (
      <div className="container">
        <div className="profile-area">
          <h1>{this.state.profile.name}</h1>
            <img src={this.state.profile.picture} alt="profile" />
            <div>
              <h2> Nickname</h2>
              <h3>{this.state.profile.nickname}</h3>
            </div>
        </div>
      </div>
    );
  }
}
