import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import lines from './assets/lines.svg';
import storeSvg from './assets/store.svg';
import Helmet from 'react-helmet';
import Vivus from 'vivus';
import * as _ from "lodash";
import productsService from "./productsService";

import Products from "@mortonprod/react-products-component";
import "@mortonprod/react-products-component/dist/index.css";

import ProductsMoveUp from "@mortonprod/react-product-up-component";
import "@mortonprod/react-product-up-component/dist/index.css";

import "./store.css";
import "./grid.css";

export default class Store extends Component {
    isRun = true;
    info = null;
    childWidth =200;
    constructor(props){
        super(props);
        this.state = {data:null,categories:null,products:null}
        productsService.getProducts(true).then((data)=>{
            this.setState({categories:data.categories,products:data.products});
            console.log(JSON.stringify(data));
        });
        this.info = infoBuilder(props.info.list,props.info.layout)
    }
    componentDidMount(){
    }
    render(){
		let storeTitle = (
		        <object
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
	        categories = this.state.categories.map((cat,i)=>{
                if(cat.products.length !==0){
		            return (
		                <Products key={i} title={cat.name} childWidth={220} products={cat.products}/>
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
                    <div className="grid-container outline">
                        {this.info}
                    </div>
                    <div className="store__deals">
                        <div className="store__dealsInfo">
                            <h1>
                                Check out the latest deals
                            </h1>
                            <h2>
                                For a limited time only
                            </h2>           
                            <p>*Selected lines only</p>
                        </div>
                    </div>
                    {categories}
                    {moveUp}
                </div>
		    </section>
	    )
    }
}

Store.defaultProps = {
    speed:0.5,
    info:{
        layout:[[2,2,2],[3,3]],
        list:[
            {
                pic:null,
                title: "Free Delivery",
                paragraphs: ["On orders over 35 pounds we provide free delivery."],
                link: null
            },
            {
                pic:null,
                title: "Discreet Packaging",
                paragraphs: ["Plain and secure.","Discreet delivery and purchase","No mention of product in bank statements","Inconspicuous packaging"],
                link: null
            },
            {
                pic:null,
                title: "Free returns",
                paragraphs: ["We will accept anything which is not up to your high standards."],
                link: null
            },
            {
                pic:null,
                title: "Always ready to help",
                paragraphs: ["Contact us at ?."],
                link: null
            },
            {
                pic:null,
                title: "A small boutique store. ",
                paragraphs: ["We decide on the best products for you."],
                link: null
            }
        ]
    }
}
/**
 * Will take in a pic, title, paragraphs and a link to more information and produce a react jsx output.
 * It loops through each row and fills the information in. 
 * The number of columns in a row must be a total of 6. So we pass this as an array of column sizes.
 * [[6],[2,2,2],[3,3]] 
 */
function infoBuilder(info,rows){
    let output = [];
    let counter = 0;
    for(let i=0; i <  rows.length ; i++){//Loop through each row.
        let col = [];
        for(let j=0; j <  rows[i].length ; j++){//Loop through each column.    
            const paragraphs = info[counter].paragraphs.map((ek,k)=>{
                return (
                    <p>{ek}</p>
                )
            });
            col.push(
                <div className={"col-"+rows[i][j]}>
                    <img src={info[counter].pic} alt={"info"}/>
                    <h1> {info[counter].title} </h1>
                    {paragraphs}
                </div> 
            )
            counter++; //Increment for each element in info which is a single column.
        };
        output.push(
            <div className="row">
                {col}
            </div>
        )
    }
    return output;
}



