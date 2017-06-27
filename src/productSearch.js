import React, { Component } from 'react';
import axios from 'axios';
import ProductsMoveUp from "./productsMoveUp";
import "./productSearch.css";
export default class ProductSearch extends Component {
    constructor(){
        super();
        this.state = {categories:null,categoryChoice:null,categoryProducts:null}
	    axios.get('/categories').then((res) => {
	        this.setState({categories:res.data,categoryChoice:this.state.categoryChoice,categoryProducts:this.state.categoryProducts});
	    });
    }
    click(name){
        return function(){
	        axios.get('/products/' + name).then((res) => {
                this.setState({categories:this.state.categories,categoryChoice:name,categoryProducts:res.data});
	        });  
        }
    }
    render(){
        let products = null;
        if(this.state.categoryChoice !==null){
	        products = (
		        <ProductsMoveUp 
		            title={this.state.categoryChoice} 
		            childWidth={220} 
		            data={this.state.categoryProducts}
		        />
	        )
        }
        let listCat = null;
        if(this.state.categories !== null){
			listCat = this.state.categories.map((item) =>
				<button onClick={this.click(item).bind(this)}>
				    {item}
				</button>
			);
        }
        return(
            <article>
	            {listCat}
	            {products}
            </article>
        )
    }
}