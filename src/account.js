import React, { Component } from 'react';
import axios from 'axios';
import "./account.css"
export default class Account extends Component{
  isAdmin = true;
  constructor(){
    super();
    this.state = {products:null,categories:null,productsLook:null}
    axios.get('/categories').then((res) => {
        this.setState({products:this.state.products,categories:res.data,productsLook:this.state.productsLook});
    });
    axios.get('/account').then((res) => {
        this.setState({products:this.state.products,categories:this.state.categories,productsLook:res.data});
    });
  }
 
  componentWillMount() {

  }
  getProducts(){
    if(this.state.products === null){
		axios.get('/products').then(res => {
			this.setState({ products: res.data });
		});
    }else{
        this.setState({ products: null }); 
    }
    
  }
  render() {
    let prodLook = null;
    if(this.state.productsLook !== null){
        let listItemsLook = this.state.productsLook.map((item) =>
            <li>
                {item}
            </li>
        );
        prodLook = (
	        <ul>
	            {listItemsLook}
	        </ul>
        )
    }
    let prod = null;
    if(this.state.products !== null){
        let listItems = this.state.products.map((item) =>
            <li>
                {item["_id"]}
            </li>
        );
        prod = (
            <div>
                <ul>
                    {listItems}
                </ul>
                <button onClick={this.getProducts.bind(this)} >Hide Products</button>
            </div>
        )
    }else{
        prod = (
            <button onClick={this.getProducts.bind(this)} >Get Products</button>
        )
    }
    let admin = null;
    if(this.isAdmin){
        let cat = null;
        if(this.state.categories !== null){
	        let listCat = this.state.categories.map((item) =>
	            <option>
	                {item}
	            </option>
	        );
	        cat = (
	            <div>
		            <label for="productCategories">Product Categories(Multiple selection hold cmd or ctrl)</label>
		            <select name="productCategories" multiple = "multiple" size = {this.state.categories.length}>
		                {listCat}
					</select>
	            </div>
	        )
        }
        admin = (
        <div>
            {prod}
	        <form action="/product" method="post" enctype="multipart/form-data">
	            <label for="productName">Product Name</label>
	            <input type="text" name="productName"/>
	            <label for="productDescription">Product Description</label>
	            <textarea rows="4" cols="50" type="text" name="productDescription"/>
                {cat}
	            <label for="productNumber">Number of Products</label>
	            <input placeholder="10" type="number" name="productNumber"/>
	            <label for="productInfo">Product Info</label>
	            <textarea placeholder="size:10;colour:blue" rows="2" cols="50" type="text" name="productInfo"/>      
	            <label for="productFile">Select your image</label>
	            <input type="file" name="productFile" />
	            <button type="submit">upload</button>
	        </form>
            <form action="/category" method="post" enctype="application/x-www-form-urlencoded">
                <label for="productCategory">Add Category</label>
                <input placeholder="Shirt" type="text" name="productCategory"/>
                <button type="submit">upload</button>
            </form>
        </div>
        )
    }
    let profile=null;
    if(typeof this.props.auth !== "undefined" && this.props.auth.userProfile !==null){
        profile = (
        <div className="profile-area">
          <h1>{this.props.auth.userProfile.name}</h1>
            <img src={this.props.auth.userProfile.picture} alt="profile" />
            <div>
              <h2> Nickname</h2>
              <h3>{this.props.auth.userProfile.nickname}</h3>
              {prodLook}
            </div>
        </div>
        )
    }
    return (
      <div className="container">
        {profile}
        {admin}
      </div>
    );
  }
}
