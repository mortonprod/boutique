
import React, { Component } from 'react';
import lines from './assets/lines.svg';
import storeSvg from './assets/store.svg';
import Helmet from 'react-helmet';
import ProductSearch from "./productSearch";

import Vivus from 'vivus';


import Products from "./Products";
import * as _ from "lodash";
import "./store.css";


import getData from "./productsData";

import ProductsMoveUp from "./ProductsMoveUp";

let isMounted= false;
export default class Store extends Component {
    childWidth =200;
    constructor(){
        super();
        //Must throttle the scroll events so we do not lose any like debounce.
        this.scroll = _.throttle(this.scroll,10);
        this.state = {translateY:0,data:null}

    }
    componentDidMount(){
        isMounted = true;
        window.addEventListener('scroll', this.scroll.bind(this));
    }
    scroll(event){
        let scrollTop = -1*event.srcElement.body.scrollTop*this.props.speed;
        this.setState({translateY:scrollTop});

    }
    //getNumBoxes(){
    //    return Math.floor(window.innerWidth/this.props.childWidth);
    //}
    render(){
        let  storeTitle = null;
        if(!isMounted){
            storeTitle = (
                <object style={{transform:'translateY(' + this.state.translateY + 'px)'}}
                    src={storeSvg} 
                    ref={() => {
                        new Vivus("store",{duration:"2000",start:"autostart",file:storeSvg}); 
                    }} 
                    className="store__title" id="store">
                </object>
            )
        }else{
            storeTitle = (
                <img style={{transform:'translateY(' + this.state.translateY + 'px)'}}
                    src={storeSvg} className={"store__title"} alt="chose"
                />
            )
        }
        let categories = null;
        let moveUp =null;
        if(this.props.products){
            let all = null;
	        categories = this.props.products.map((cat)=>{
	            all = all.concat(cat.data.items);
	            return (
	                <Products title={cat.title} childWidth={220} products={cat.data.items}/>
	            )
	        });
            moveUp = (
	            <ProductsMoveUp 
	                title={"Everything We Have"} 
	                childWidth={220} 
	                data={all}
	            />
            )
        }else{
            categories = (
                <p>loading</p>
            )
        }   
	    return (
		    <section className="store">
				 <Helmet>
					 <title>Boutique Store</title>
					<meta name="description" content="Online boutique store based in Helensburgh " />
				</Helmet>
                {storeTitle}  
                <div className="store__content">
                    {categories}
                </div>
		    </section>
	    )
    }
}

Store.defaultProps = {
    speed:0.5
}



