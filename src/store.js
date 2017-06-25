
import React, { Component } from 'react';
import lines from './assets/lines.svg';
import storeSvg from './assets/store.svg';
import Helmet from 'react-helmet';


import Vivus from 'vivus';


import Products from "./Products";
import * as _ from "lodash";
import "./store.css";


import getData from "./productsData";

import ProductsMoveUp from "./ProductsMoveUp";

let isMounted= false;
export default class Store extends Component {
    constructor(){
        super();
        //Must throttle the scroll events so we do not lose any like debounce.
        this.scroll = _.throttle(this.scroll,10);
        this.state = {translateY:0}
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
	    return (
		    <section className="store">
   							 <Helmet>
       							 <title>Boutique Store</title>
        						<meta name="description" content="Online boutique store based in Helensburgh " />
    						</Helmet>
                {storeTitle}  
                <div className="store__content">
                <header>
                    <h1>Check out the latest offers</h1>
                </header>
                <Products title={""} childWidth={220} data={getData().offers}/>
                <Products title={"What other were interested in"} childWidth={220} data={getData().data0}/>
                <Products title={"Underwear"} childWidth={220} data={getData().data1}/>
                <Products title={"Accessories"} childWidth={220} data={getData().data2}/>
                <Products title={"Clothes"} childWidth={220} data={getData().data3}/>
                <ProductsMoveUp 
                    title={"Everything We Have"} 
                    childWidth={220} 
                    data={getData().data}
                />
                </div>
		    </section>
	    )
    }
}

Store.defaultProps = {
    speed:0.5
}
