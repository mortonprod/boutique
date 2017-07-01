import React, { Component } from 'react';
import axios from 'axios';
import Vivus from 'vivus';
import linesUnder from "./assets/linesUnderline.svg";
import heart from "./assets/heart.svg";
import "./account.css"
let isMounted = false;
export default class Account extends Component{
  isAdmin = true;
  constructor(props){
   super(props);
   this.state = {
        file:null,
        info:null,
        num:null,
        des:null,
        name:null,
        cat:null,
        catAdd:null,
        products:null,
        isEditShow:[],
        categories:null,
        productsLook:null,
        productsBought:null,
        message:[],
        messageCategory:[],
        editName:null,
        editDescription:null,
        editInfo:null,
        editCategories:null,
        editNumber:null,
        editFile:null,
        editMessage:[]

    }
    axios.get('/categories').then((res) => {
        this.setState({products:this.state.products,categories:res.data,productsLook:this.state.productsLook,productsBought:this.state.productsBought});
    });
    if(typeof props.auth !== "undefined" && props.auth.userProfile !==null){
	    axios.get('/account').then((res) => {
	        this.setState({products:this.state.products,categories:this.state.categories,productsLook:null,productsBought:null});
	    });
    }
    if(this.isAdmin){
	    axios.get('/products').then(res => {
	        let show = []
	        for(let i=0; i < res.data.length; i++){
	            show.push(false);
	        }
	        this.setState({ products: res.data,isEditShow:show });
	    });
    }
  }
 
  componentWillMount() {

  }
  componentDidMount(){
    isMounted = true; 
  }
  getProducts(){
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
  onEditFormSubmit(id,event){
    this.setState({editMessage:[]});
    event.preventDefault();
    let formData = new FormData();
    formData.append('id', id);
    formData.append('name', this.state.editName);
    formData.append('description', this.state.editDescription);
    formData.append('info', this.state.editInfo);
    formData.append('number', this.state.editNumber);
    formData.append('file', this.state.editFile);
    formData.append('categories', this.state.editCategories);
    axios.post('/update-product',formData,{ 'content-type': 'multipart/form-data' })
    .then((res) => {
        this.setState({editMessage:res.data});
        console.log(res.data);
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  onFormCategorySubmit(event){
    this.setState({messageCategory:[]});
    event.preventDefault();
    axios.post('/category',{productCategory:this.state.catAdd})
    .then((res) => {
        this.setState({messageCategory:res.data});
        console.log(res.data);
        axios.get('/categories').then((res) => {///Must update categories 
            this.setState({products:this.state.products,categories:res.data,productsLook:this.state.productsLook,productsBought:this.state.productsBought});
        });
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
  onChangeCatAdd(e){
      this.setState({catAdd:e.target.value})
  }
  ///Must remove other open forms so we attach only one event edit event handler.
  editProduct(index,item){
    this.setState({
        editName:item["name"],
        editDescription:item["description"],
        editInfo:item["info"],
        editNumber:item["number"],
        editCategories:item["categories"]
    })
    let temp = this.state.isEditShow;
    temp.forEach((item)=>{
        item = false;
    })
    this.setState({isEditShow:temp});
    temp[index] = true;
    this.setState({isEditShow:temp});      
  }
  editName(e){
    this.setState({editName:e.target.value})
  }
  editDescription(e){
    this.setState({editDescription:e.target.value})
  }
  editInfo(e){
    this.setState({editInfo:e.target.value})
  }
  editNumber(e){
    this.setState({editNumber:e.target.value})
  }
  editCategories(e){
    this.setState({editCategories:e.target.value})
  }
  editFile(e){
    this.setState({editFile:e.target.files[0]})
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
        let listCat = null;
        if(this.state.categories !== null){
            listCat = this.state.categories.map((item) =>
                <option>
                    {item}
                </option>
            );
        }
        let index = 0;
        let listItems = this.state.products.map((item) => {
            index++;
            let form = null;
            if(this.state.isEditShow[index-1]){
                form = (
	                <form className={"account__admin__products__form"} onSubmit={this.onEditFormSubmit.bind(this,item["_id"])}>
	                    <h2>Product Name</h2>
	                    <input type="text" defaultValue={item["name"]} value={this.state.editName} onChange={this.editName.bind(this)}/>
	                    <h2>Product Description</h2>   
	                    <textarea rows="4" cols="50" type="text" defaultValue={item["description"]} value={this.state.editDescription} onChange={this.editDescription.bind(this)}/>

                        <div>
	                        <label for="">Product Categories(Multiple selection hold cmd or ctrl)</label>
	                        <select name="" multiple = "multiple" size = {this.state.categories.length} defaultValue={item["categories"]} 
                                 value={this.state.editCategories}
                                 onChange={this.editCategories.bind(this)}>
	                            {listCat}  
	                        </select>
                        </div>


	                    <h2>Number of Products</h2>
	                    <input type="number" defaultValue={item["number"]} value={this.state.editNumber} onChange={this.editNumber.bind(this)}/>
	                    <h2>Product Info</h2>
	                    <textarea rows="2" cols="50" type="text" defaultValue={item["info"]} value={this.state.editInfo} onChange={this.editInfo.bind(this)}/>      
	                    <h2>Select your image</h2>
	                    <input type="file" accept="image/*" placeholder={"Upload new photo if needed"}
                            onChange={this.editFile.bind(this)}/>
	                    <button type="submit">Upload Edit To Product</button>
	                </form>
                )
            }
            return (
                <li>
                    <span>{item["name"]}</span> <img src={item["file"]}/><button onClick={this.editProduct.bind(this,index-1,item)}>Show</button>
                    {form}
                </li>
            )
        });
        prod = (
            <article className="account__admin__products">
                <h4>{this.state.editMessage}</h4>                
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
        let message = this.state.message.map((item) =>{
            return (
		        <h4>
		            {item}
		        </h4>
            )
        });
        let messageCategory = this.state.messageCategory.map((item) => {
            return (
	            <h4>
	                {item}
	            </h4>
            )
        });
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
	            <form className="account__admin__addCategory" onSubmit={this.onFormCategorySubmit.bind(this)}>
	                <h2 for="productCategory">Add Category</h2>
	                {messageCategory}
	                <input placeholder="Shirt" type="text" name="productCategory" onChange={this.onChangeCatAdd.bind(this)}/>
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
