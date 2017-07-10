
import React, { Component } from 'react';
import lines from './assets/lines.svg';
import storeSvg from './assets/store.svg';
import Helmet from 'react-helmet';
import ProductSearch from "./productSearch";

import Vivus from 'vivus';


import * as _ from "lodash";
import productsService from "./productsService";
import Products from "./Products";
import "./store.css";




import ProductsMoveUp from "./ProductsMoveUp";

export default class Store extends Component {
    isRun = true;
    childWidth =200;
    constructor(){
        super();
        //Must throttle the scroll events so we do not lose any like debounce.
        this.scroll = _.throttle(this.scroll,10);
        this.state = {translateY:0,data:null,categories:null,products:null}
        productsService.getProducts(true).then((data)=>{
            this.setState({categories:data.categories,products:data.products});
            console.log(JSON.stringify(data));
        });
    }
    componentDidMount(){
        window.addEventListener('scroll', this.scroll.bind(this));
    }
    scroll(event){
        let scrollTop = -1*event.srcElement.body.scrollTop*this.props.speed;
        this.setState({translateY:scrollTop});

    }
    render(){
		let storeTitle = (
		        <object style={{transform:'translateY(' + this.state.translateY + 'px)'}}
		            src={storeSvg} 
		            ref={() => {
		                if(this.isRun){
		                    new Vivus("store",{duration:"2000",start:"autostart",file:storeSvg}); 
		                }
		                this.isRun=false;
		            }} 
		            className="store__title" id="store">
		        </object>
        )

        let categories = null;
        let moveUp =null;
        if(this.state.categories){
	        categories = this.state.categories.map((cat)=>{
                if(cat.products.length !==0){
		            return (
		                <Products title={cat.name} childWidth={220} products={cat.products}/>
		            )
                }else{
                    return null;
                }
	        });
            moveUp = (
	            <ProductsMoveUp 
	                title={"Everything We Have"} 
	                childWidth={220} 
	                data={this.state.products}
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
                    {moveUp}
                </div>
		    </section>
	    )
    }
}

Store.defaultProps = {
    speed:0.5
}



