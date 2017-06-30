import React, { Component } from 'react';
import axios from 'axios';
import Vivus from 'vivus';
import linesUnder from "./assets/linesUnderline.svg";
import heart from "./assets/heart.svg";
import "./account.css"
let isMounted = false;
export default class Account extends Component{
  isAdmin = true;
  constructor(){
    super();
   this.state = {
        file:null,
        info:null,
        num:null,
        des:null,
        name:null,
        cat:null,
        products:null,
        categories:null,
        productsLook:null,
        productsBought:null,
        message:[]
    }
    axios.get('/categories').then((res) => {
        this.setState({products:this.state.products,categories:res.data,productsLook:this.state.productsLook,productsBought:this.state.productsBought});
    });
    axios.get('/account').then((res) => {
        this.setState({products:this.state.products,categories:this.state.categories,productsLook:null,productsBought:null});
    });
  }
 
  componentWillMount() {

  }
  componentDidMount(){
    isMounted = true; 
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
  ///Can't just use form to pass to server. Must collect values from each input and then send to server on submit
  onFormSubmit(event){
    this.setState({message:[]});
    event.preventDefault();
    let formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('description', this.state.des);
    formData.append('info', this.state.info);
    formData.append('number', this.state.num);
    formData.append('file', this.state.file);
    formData.append('categories', this.state.cat);
    axios.post('/product',formData,{ 'content-type': 'multipart/form-data' })
    .then((res) => {
        this.setState({message:res.data});
        console.log(res.data);
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  onChangeFile(e) {
    this.setState({file:e.target.files[0]})
  }
  onChangeInfo(e){
      this.setState({info:e.target.value})
  }
  onChangeNumber(e){
    this.setState({num:e.target.value})
  }
  onChangeDes(e){
        this.setState({des:e.target.value})
  }
  onChangeName(e){
      this.setState({name:e.target.value})
  }
  onChangeCat(e){
    let options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
	    if (options[i].selected) {
	      value.push(options[i].value);
	    }
    }
      this.setState({cat:value})
  }
  render() {
    let  lines = null;
    if(!isMounted){
        lines = (
            <object src={linesUnder} ref={() => {
                new Vivus("linesUnderline",{duration:"500",start:"autostart",file:linesUnder}); 
            }} className="account__overline" id="linesUnderline"></object>
        )
    }else{
        lines = (
            <img src={linesUnder} className={"account__overline"} alt="chose"/>
        )
    }
    let prodLook = null;
    if(this.state.productsLook !== null){
        let listItemsLook = this.state.productsLook.map((item) =>
            <li className="account__profile__info__products__list__item">
                {item}
            </li>
        );
        prodLook = (
	        <ul className="account__profile__info__products__list">
	            {listItemsLook}
	        </ul>
        )
    }
    let prodBought = null;
    if(this.state.productsLook !== null){
        let listItemsBought = this.state.productsBought.map((item) =>
            <li className="account__profile__info__products__list__item">
                {item}
            </li>
        );
        prodBought = (
            <ul className="account__profile__info__products__list">
                {listItemsBought}
            </ul>
        )
    }
    let prod = null;
    if(this.state.products !== null){
        let listItems = this.state.products.map((item) =>
            <li>
                <span>{item["name"]}</span> <img src={item["file"]}/>
            </li>
        );
        prod = (
            <article className="account__admin__products">
                <ul>
                    {listItems}
                </ul>
                <button onClick={this.getProducts.bind(this)} >Hide Products</button>
            </article>
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
		            <select name="productCategories" multiple = "multiple" size = {this.state.categories.length} onChange={this.onChangeCat.bind(this)}>
		                {listCat}
					</select>
	            </div>
	        )
        }
        let message = this.state.message.map((item) =>
	        <h4>
	            {item}
	        </h4>
        );
        admin = (
        <article className="account__admin">
            <h1>Add A Product</h1>
            {message}
	        <form className="account__admin__addProducts" onSubmit={this.onFormSubmit.bind(this)}>
	            <h2>Product Name</h2>
	            <input placeholder="Shirt" type="text" onChange={this.onChangeName.bind(this)}/>
	            <h2>Product Description</h2>   
	            <textarea placeholder="A blue shirt with stripes" rows="4" cols="50" type="text" onChange={this.onChangeDes.bind(this)}/>
                {cat}
	            <h2>Number of Products</h2>
	            <input placeholder="10" type="number" onChange={this.onChangeNumber.bind(this)}/>
	            <h2>Product Info</h2>
	            <textarea placeholder="size:10;colour:blue" rows="2" cols="50" type="text" onChange={this.onChangeInfo.bind(this)}/>      
	            <h2>Select your image</h2>
	            <input type="file" accept="image/*" onChange={this.onChangeFile.bind(this)}/>
                <button type="submit">Upload</button>
	        </form>
            <br/>
            <hr className="styleLine"/>
            <br/>
            <form className="account__admin__addCategory" action="/category" method="post" enctype="application/x-www-form-urlencoded">
                <h2 for="productCategory">Add Category</h2>
                <input placeholder="Shirt" type="text" name="productCategory"/>
                <button type="submit">Upload Category</button>
            </form>
            <br/>
            <hr className="styleLine"/>
            <br/>
            <h1>Product List</h1>
            {prod}
        </article>
        )
    }
    let name = null;
    let nickname = null
    let src = null;
    if(typeof this.props.auth !== "undefined" && this.props.auth.userProfile !==null){
        name = this.props.auth.userProfile.name;
        nickname = this.props.auth.userProfile.nickname;
        src = this.props.auth.userProfile.picture;
    }else{
        name = "We don't seem to know your name";
        nickname = "We don't seem to know your nickname";
        src = "nowhere"
    }
    let profile = (
	    <article className="account__profile">
	      <img className="account__profile__img" src={src} alt="profile" />
	      <div className="account__profile__info">
	          <h1>{name}</h1>
	          <h3>{nickname}</h3>
              <div className={"flex"}>
		          <div className="account__profile__info__products">
		            <div className="account__profile__info__products__title">
		                <img src={heart} className="account__profile__info__products__title__image" alt="logo" />
		                <h2>Products You Looked At</h2>
		            </div>
		            {prodLook}
		          </div>
		          <div className="account__profile__info__products">
		            <div className="account__profile__info__products__title">
		                <img src={heart} className="account__profile__info__products__title__image" alt="logo" />
		                <h2>Products You Bought</h2>
		            </div>
		            {prodBought}
		          </div>
              </div>
	      </div>
	    </article>
    )
    return (
      <section className="account">
        <h1>Your Account</h1>
        {lines}
        {profile}
        {admin}
      </section>
    );
  }
}
