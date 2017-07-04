import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import "./AdminLogin.css";

export default class AdminLogin extends Component {
    constructor(){
        super();
        this.state = {password:null,passwordUpdate:null,isUpdate:false}
    }
    onChangePassword(e){
        this.setState({password:e.target.value})
    }
    onChangePasswordUpdate(e){
        this.setState({passwordUpdate:e.target.value})
    }
    render(){
        let postLoc = null;
        let inputUpdate = null;
        if(this.state.isUpdate){
            postLoc = "admin-update";
            inputUpdate = (
                <input key={"update"} required type="password" name="passwordUpdate" value={this.state.passwordUpdate} onChange={this.onChangePasswordUpdate.bind(this)}/>
            )
        }else{
            postLoc = "admin-login";
        }
		return (
			<section className={"adminLogin"}>
                <form className={"adminLogin__form"} post={postLoc} encType="application/x-www-form-urlencoded">
                    <h1>Administration Login</h1>
			        <h2>Password</h2>
			        <input required type="password" name="password" value={this.state.password} onChange={this.onChangePassword.bind(this)}/>
                    <ReactCSSTransitionGroup
                    transitionName="tran"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {inputUpdate}
                    </ReactCSSTransitionGroup>
			        <button type="submit">Submit Password</button>
			    </form>
                <button onClick={()=>{this.setState({isUpdate:!this.state.isUpdate});}}>Change Password</button>
			</section>
		);
    }
}