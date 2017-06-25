import React, { Component } from 'react';
import "./account.css"
export default class Account extends Component{
    constructor(){
        super();

    }
    render(){
        return (
            <section className={"account"}>
                <header className={"account__header"}>
                    <h1>
                        Sign in 
                    </h1>
                </header>
                <form action="/" className={"account__form"}>
                    <div className={"account__form__email"}>
                        <h2>Email</h2>
                        <input type="email" pattern="[^ @]*@[^ @]*" required>
                        </input>
                    </div>
                    <div className={"account__form__password"}>
                        <h2>Password</h2>
                        <input type="password" required></input>
                    </div>
                    <input type="submit" value="Submit" className={"account__form__submit"}/>
                </form>
            </section>
        )
    }
}
