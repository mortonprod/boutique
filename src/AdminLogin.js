import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import productsService from "./productsService";
import "./AdminLogin.css";

export default class AdminLogin extends Component {
    constructor(){
        super();
        this.state = {password:null,passwordUpdate:null,isUpdate:false,messages:[],isRedirect:false}
    }
    onChangePassword(e){
        this.setState({password:e.target.value})
    }
    onChangePasswordUpdate(e){
        this.setState({passwordUpdate:e.target.value})
    }
    onSubmit(event){
        this.setState({message:[]});
        event.preventDefault();
        if(this.state.isUpdate){
	        productsService.post('/admin-login',{password:this.state.password})
	        .then((messages) => {
                let isRedirect = false
                if(messages.length === 1){
                    if(messages[0].includes("correct")){
                        isRedirect = true;
                    }
                }
	            this.setState({messages:messages,isRedirect:isRedirect});
	            console.log("Message in admin login result: " + JSON.stringify(messages));
	            this.getProducts.bind(this)();
	        });
        }else{
            productsService.post('/admin-update',{password:this.state.password,passwordUpdate:this.state.passwordUpdate})
            .then((messages) => {
                this.setState({messages:messages});
                console.log("Message in admin update result: " + JSON.stringify(messages));
                this.getProducts.bind(this)();
            });
        }
    }
    render(){
        let inputUpdate = null;
        if(this.state.isUpdate){
            inputUpdate = (
                <div>
                    <h2>New Password</h2>
                    <input key={"update"} required type="password" name="passwordUpdate" value={this.state.passwordUpdate} onChange={this.onChangePasswordUpdate.bind(this)}/>
                </div>
            )
        }
        let messages = this.state.messages.map((item)=>{
            <h4 key={item}>{item}</h4>
        });
        if(!this.state.isRedirect){
			return (
				<section className={"adminLogin"}>
	                <form className={"adminLogin__form"} onSubmit={this.onSubmit.bind(this)}>
	                    <h1>Administration Login</h1>
	                    <ReactCSSTransitionGroup
	                    transitionName="tran"
	                    transitionEnterTimeout={500}
	                    transitionLeaveTimeout={500}>
	                        {messages}
	                    </ReactCSSTransitionGroup>
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
        }else{
            return (
                <Redirect to="/admin" push={true} />
            )
        }
    }
}