import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Vivus from 'vivus';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import "./buy.css";
import linesUnder from "./assets/linesUnderline.svg";
import semi from "./assets/heart.svg";
import axios from 'axios';
import dress from './assets/tamara-bellis-256701.jpg'
let isMounted = false;

const client = {
    sandbox:    'AQ-KJEquFtNuzV9J4Y9IDXanFPcwymMaXvzY2EXWlDYSga_xjhvHDpIckOOpDMDW7ipW8erQgqodx1Fw'
}


export default class Buy extends Component {
    constructor(){
        super();
    }
    componentDidMount(){
        isMounted = true;
        //If we have a user and there have search for something then store it.
        if(typeof this.props.auth !== "undefined" && this.props.auth.userProfile !== null){
            axios.post('/account', {
                name: this.props.auth.userProfile.name,
                title:[this.props.location.state.title]

            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
    render() {
        let  unter = null;
        if(!isMounted){
            unter = (
                <object src={linesUnder} ref={() => {
                    new Vivus("linesUnderline",{duration:"500",start:"autostart",file:linesUnder}); 
                }} className="buy__underline" id="linesUnderline"></object>
            )
        }else{
            unter = (
                <img src={linesUnder} className={"buy__underline"} alt="chose"/>
            )
        }
        let colour = null;
        let size = null;
        let des = null;
        let price= null;
        let title = null;
        if(typeof this.props.location.state.info !=="undefined"){
            if(typeof this.props.location.state.title !== "undefined"){
                title = (
                    <h1>
                        {this.props.location.state.title}
                    </h1>

                )
            }
	        if(typeof this.props.location.state.info.size !=="undefined"){
	            size = (
	                <h3>
	                    Size: {this.props.location.state.info.size}
	                </h3>
	            )
	        }
	        if(typeof this.props.location.state.info.colour !== "undefined"){
	            colour = (
	                <h3>
	                    Colour: {this.props.location.state.info.colour}
	                </h3>
	            )
	        }
            if(typeof this.props.location.state.info.description !== "undefined"){
                des = (
                    <div>
	                    <h3>
	                        {this.props.location.state.description}
	                    </h3>
	                    <p>
	                         {this.props.location.state.info.description}
	                    </p>
                    </div>
                )
            }
        }
        if(this.props.location.state.price.indexOf("£") >= 0 ){
            price = (
                <div>
		            <h3>
		                {this.props.location.state.price}
		            </h3>
                    <PaypalExpressBtn env={'sandbox'} client={client} currency={'USD'} total={5.00} />
                </div>
            )
        }
        return(
        <div className={"buy"}>
            <img src={this.props.location.state.img} className="buy__image" alt="logo" />
            <div className={"buy__info"}>
                <img src={semi} className="buy__info__image" alt="logo" />
                <section className={"buy__info__content"}>
	                {title}
	                {size}
	                {colour}
	                {des}
	                {price}
                </section>
            </div>
            {unter}
        </div>
        )
    }
}

Buy.defaultProps = {
    title:"test name: Name Name Name",
    description:"test description: test test test test test test test test test test test test test test test test test test test test test test test test",
    price:"£5 + delivery £2.5",
    img:dress
}