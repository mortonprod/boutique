import React, { Component } from 'react';
import Vivus from 'vivus';
import { Link } from 'react-router-dom';
//import createOnce from "./createvivus";
import "./chose.css";
import chose from './assets/chose.svg';

let isMounted = false;
export default class Chose extends Component {
    constructor(){
        super();
    }
    componentDidMount(){
        isMounted = true;
    }
    render(){
        let comp = null
        if(!isMounted){
            comp = (
                <object key="obj" 
                    ref={() => { 
                        new Vivus("chose",{duration:"500",start:"autostart",file:chose});                    
                    }} 
                    className="chose__svg" id="chose">
                </object>
            )
        }else{
            comp = (
                <img src={chose} className={"chose__svg"} alt="chose"/>
            )
        }

        return (
            <div key={"chose"} className={"chose"}>
                {comp}
                <Link key="link1" to={"/"} className="chose__link__left" alt="logo" ></Link>
                <Link key="link2" to={"/headshop"} className="chose__link__right" alt="logo" ></Link>
            </div>
        )
    }
}
