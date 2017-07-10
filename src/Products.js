import React, { Component } from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import * as _ from "lodash";
import Product from "./Product";
import "./Products.css";
export default class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            width: window.innerWidth, 
            height: window.innerHeight,
            start:0,
            end:100,
            direction:""
        }
    }
    componentDidMount() {

    }
    componentWillMount(){
        window.addEventListener('resize', _.throttle(this.updateWindowDimensions.bind(this),500));
        this.updateWindowDimensions();

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        //The number of boxes between start and stop before resize - the number it should be to get the end.
        let numNow = this.state.end -  this.state.start;
        //New end = old end - (difference between old and new number of boxes.)
        let end = this.state.end - (numNow - this.getNumBoxes());
        this.setState({ 
            start:this.state.start,
            end:end,
            direction:"moveUp" 
        });
    }
    componentWillUpdate(){

    }
    getNumBoxes(){
        if(Math.floor(window.innerWidth/this.props.childWidth) < this.props.products.length){
            let fitNum = Math.floor(window.innerWidth/this.props.childWidth)
            return fitNum;
        }else{
            return this.props.products.length;
        }

    }
    moveLeft(){
        let newStart = this.state.start+this.getNumBoxes();
        let newEnd = this.state.end+this.getNumBoxes();
        if(newEnd > this.props.products.length){//If we have reach then end then fill up array.
            newStart = 0;
            newEnd = this.getNumBoxes()
        }

        this.setState({ 
            width: this.state.width, 
            height: this.state.height,
            start:0,
            end:0,
            direction:"moveLeft"
        });
        setTimeout(()=> {
        this.setState({ 
            width: this.state.width, 
            height: this.state.height,
            start:newStart,
            end:newEnd,
            direction:"moveLeft"
        });
        },600);
    }
    moveRight(){
        let newStart = this.state.start-this.getNumBoxes();
        let newEnd = this.state.end-this.getNumBoxes();
        if(newStart < 0){
            newStart = this.props.products.length -  this.getNumBoxes();
            newEnd = this.props.products.length;
        }
        this.setState({ 
            width: this.state.width, 
            height: this.state.height,
            start:0,
            end:0,
            direction:"moveRight"
        });
        setTimeout(()=> {
        this.setState({ 
            width: this.state.width, 
            height: this.state.height,
            start:newStart,
            end:newEnd,
            direction:"moveRight"
        });
        },600);
    }
    xyS = [null,null];
    //Only used for mouse events.
    start(event){
        console.log("start");
        this.xyS = this.getXY(event);

    }
    xyE = [null,null];
    ///Keep updating since touchEnd does not contain coordinates.
    move(event){
        this.xyE = this.getXY(event);
    }
    getXY(event){
	    let x = null;
	    let y = null;
	    if(typeof event.clientX !== 'undefined'){
	        x = event.clientX;    
	        y = event.clientY;     
	    }else if (event.touches !== null && event.touches.length !== 0){
	        x = event.touches[0].clientX;
	        y = event.touches[0].clientY;
	    }else{
	        console.log("Not touched or mouse move?");
	    }
        return [x,y];
    }
    end(event){
        console.log("end");
        let xyE = this.xyE;
        let xS = this.xyS[0];
        let yS = this.xyS[1];
        let xE = this.xyE[0];
        let yE = this.xyE[1];

        if(xS !== null && xE  !== null){
	        if(xE - xS >0){
	            this.moveRight();
	            console.log(xE-this.xS + "  left.")
	        }else if(xE - xS <0){ 
	            this.moveLeft();   
	            console.log(xE-xS + "  right.")
	        }else{
	            console.log(xE-xS + "  No change of displacement or still null.")
	        }
        }
    }
    render(){
        let items = [];
        for (let i = this.state.start; i < this.state.end; i++) {
            items.push(
                <Product
                    key={i} 
                    src={this.props.products[i].file}
                    title={this.props.products[i].name}
                    description={this.props.products[i].description}
                    price={this.props.products[i].price}
                    info={this.props.products[i].info}
                    >
                </Product>
            )
        }
        if(this.state.direction === ""){
            console.log("Direction not set.")
        }
        return (
            <article 
            onTouchStart={(event)=> { event.persist(); event.preventDefault(); this.start(event) }}
            onTouchMove={(event)=> { event.persist(); event.preventDefault();   this.move(event) }}
            onTouchEnd={(event)=> { event.persist(); event.preventDefault();  this.end(event) }}
            onMouseDown={(event)=> { event.persist(); event.preventDefault(); this.start(event) }}
            onMouseMove={(event)=> { event.persist(); event.preventDefault();  this.move(event) }}
            onMouseUp={(event)=> { event.persist(); event.preventDefault();  this.end(event) }}
             className="products">
                <div className="products__box"> 
                    <header>
                        <h2 className="products__title"> {this.props.title} </h2>
                    </header>
                    <div className={"products__list"}>    
	                    <ReactCSSTransitionGroup 
                            className={"products__items"}
	                        transitionName={this.state.direction}
	                        transitionEnterTimeout={500}
	                        transitionLeaveTimeout={500}>
	                        {items}
	                    </ReactCSSTransitionGroup> 
	                    <button onClick = {this.moveLeft.bind(this)} className={"products__button products__button__left"  }> </button>
	                    <button onClick = {this.moveRight.bind(this)} className={"products__button products__button__right" }> </button>
                    </div>
                </div>
                  
            </article>
        )
    }
}

