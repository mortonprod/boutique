import React, { Component, findDOMNode } from 'react';
import Product from "./Product";
import * as _ from "lodash";

import "./ProductsMoveUp.css";
///Thursday 12:20
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
//If the user has placed the productsMoveUp div at the middle of the view port. 
//Put more products at bottom moving the bottom away from the div parent.
export default class ProductsMoveUp extends Component {
    parentDiv = null;
    constructor(props){
        super(props);
        this.scroll = _.throttle(this.scroll,500,{trailing:true,leading:true});
        let end = null;
        if(this.getNumBoxes() > this.props.data.length){
            end = this.props.data.length;
        }else{
            end = this.getNumBoxes();
        }
        this.state = {end:end}
    }
    scroll(event){
        if(this.parentDiv !== null){
	        let space = this.parentDiv.getBoundingClientRect().bottom - window.innerHeight;
	        console.log("space: " +  space);
	        let num = this.getNumBoxes();
            if(space < 500){
		        if(this.props.data.length - this.state.end >= num){//If can fill a whole row then do it.
			        for(let i = 0; i < num; i++ ){
			            setTimeout(function(){
			                this.setState({end:this.state.end + 1});
			            }.bind(this),500*i);
			        }        
	            }else{//Otherwise just take the last of the data
	                for(let i = 0; i < this.props.data.length - this.state.end; i++ ){
	                    setTimeout(function(){
	                        this.setState({end:this.state.end + 1});
	                    }.bind(this),500*i);
	                } 
	            }
            }
        }
    }

    componentDidMount(){
        window.addEventListener('scroll', this.scroll.bind(this));
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.scroll.bind(this));
    }
    getNumBoxes(){
        return Math.floor(window.innerWidth/this.props.childWidth);
    }
    render(){
        let items = [];
        for (let i = 0; i < this.state.end; i++) {
            if(!this.props.data[i] || !this.props.data[i].file || !this.props.data[i].name || !this.props.data[i].description || !this.props.data[i].price || !this.props.data[i].info){
                continue;
            }
            items.push(
                <Product
                    key={i} 
                    src={this.props.data[i].file}
                    title={this.props.data[i].name}
                    description={this.props.data[i].description}
                    price={this.props.data[i].price}
                    info={this.props.data[i].info}
                    >
                </Product>
            )
        }
        return (
            <div className="productsUp"
              ref={(el)=> {this.parentDiv = el}}> 
                <h2 className="productsUp__title"> {this.props.title} </h2>    
                <ReactCSSTransitionGroup
                    className="productsUp__list"
                    transitionName={"productsUp"}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {items}
                </ReactCSSTransitionGroup> 
            </div>
        )
    }

}