import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import "./Product.css";
import underlines from "./assets/underlines.svg";
export default class Product extends Component {
  componentDidMount(){
  }
  render() {
    let price = null;
	if(this.props.price !== null && this.props.price !== ""){
	    price = (
	        <Link to={{
                    pathname: '/buy',
                    state: { 
                        title: this.props.title,
                        description:this.props.description,
                        img:this.props.src,
                        price:this.props.price,
                        info:this.props.info 
                    }
                }} 
                className={"product__link"} >
                <span> 
                    {this.props.price} 
                </span> 
            </Link>
	    )
	}
    let title = null;
    if(this.props.title !== null && this.props.title !== ""){
        title = (
            <div className={"product__name"}>
                <h3 className="product__name">{this.props.title}</h3>
                <img src={underlines} alt="underline"/>
            </div>
        )
    }
    let des = null;
    if(this.props.description !== null && this.props.description !== ""){
        des = (
            <h4 className="product__description">{this.props.description}</h4>
        )
    }

    return (
        <div className="product">
            <img src={this.props.src} className="product__image" alt="logo" />
            {title}
            {des}
            {price}
        </div>
    )
        
  }
}