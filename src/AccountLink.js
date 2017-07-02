import React from "react";
import {Link} from 'react-router-dom';
import googleC from './assets/Google_Color.svg';
import facebookC from './assets/Facebook_Color.svg';
import twitterC from './assets/Twitter_Color.svg';
import accountBox from './assets/accountBox.svg';

import "./AccountLink.css";

export default function AccountLink(props){
    let Acc = null;
    if(props.auth.userProfile === null || typeof props.auth.userProfile === "undefined" ){
        Acc =  () => {
            return (
                <div className={"accountLink"}>
                  <div onClick={props.auth.login} className="accountLink__social">
                    <img src={accountBox} className="" alt="Account logins" />
                    <img src={facebookC} className="" alt="Facebook login" />
                    <img src={googleC} className="" alt="google login" />
                  </div>
                </div>
            )
        }
    }else{
        Acc =  () => {
            return (
                    <article className="accountLink">
                      <div className={"accountLink__welcome"}>
	                      <h3> Welcome </h3>
	                      <h4>{props.auth.userProfile.name} </h4>
                      </div>
                      <Link to={"/account"}>
                        <img src={props.auth.userProfile.picture} alt="profile link" />
                      </Link>
                      <button onClick={props.auth.logout}> logout </button>
                    </article>
                )
        }
    }
    return (    
        <Acc/>
    )


}
