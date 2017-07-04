import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "./AdminLogin.css";

export default class AdminLogin extends Component {
    constructor(){
        super();
        this.state = {password:null}
    }
    onChange(e){
        this.setState({password:e.target.value})
    }
    render(){
		return (
			<section className={"adminLogin"}>
                <form className={"adminLogin__form"} post="admin-login" encType="application/x-www-form-urlencoded">
                    <h1>Administration Login</h1>
			        <h2>Password</h2>
			        <input required type="password" name="password" value={this.state.password} onChange={this.onChange.bind(this)}/>
			        <button type="submit">Submit Password</button>
			    </form>
			</section>
		);
    }
}