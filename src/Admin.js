import React, { Component } from 'react';
import Vivus from 'vivus';
import linesUnder from "./assets/linesUnderline.svg";
import productsService from "./productsService";
import "./Admin.css";
export default class Admin extends Component{
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
		    products:[],
            categories:[],
		    isEditShow:[],
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
	}
    getProducts(){
        productsService.getProducts(true).then((data)=>{
            this.setState({categories:data.categories,products:data.products});
            console.log(JSON.stringify(data));
            
        });
    }
    componentWillMount(){
        this.getProducts.bind(this)();
    }
	componentDidMount(){
	}

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
        productsService.post('/product',formData, { 'content-type': 'multipart/form-data' })
		.then((message) => {
		    this.setState({message:message});
            console.log("Message in submit: " + JSON.stringify(message));
            this.getProducts.bind(this)();
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
        productsService.post('/update-product',formData, { 'content-type': 'multipart/form-data' })
        .then((message) => {
            this.setState({editMessage:message});
            console.log("Message in admin: " + JSON.stringify(message));
            this.getProducts.bind(this)();
        });
	}
	onFormCategorySubmit(event){
		this.setState({messageCategory:[]});
		event.preventDefault();
        productsService.post('/category',{productCategory:this.state.catAdd})
        .then((message) => {
            this.setState({messageCategory:message});
            console.log("Message in admin: " + JSON.stringify(message));
            this.getProducts.bind(this)();
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
		let temp = this.state.isEditShow.map((item)=>{
            return false;
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
		let prod = null;
	    let listCat = null;
		if(this.state.products !== null){
	        if(this.state.categories !== null){
		        listCat = this.state.categories.map((cat) =>
		            <option>
		                {cat.name}
		            </option>
		        );
		    }
		    let index = 0;
		    let listItems = this.state.products.map((item) => {
		        index++;
		        let form = null;
		        if(this.state.isEditShow[index-1]){
		            form = (
		                <form className={""} onSubmit={this.onEditFormSubmit.bind(this,item["_id"])}>
                            <img src={item["file"]}/>
		                    <h2>Product Name</h2>
		                    <input required type="text" defaultValue={item["name"]} value={this.state.editName} onChange={this.editName.bind(this)}/>
		                    <h2>Product Description</h2>   
		                    <textarea required rows="4" cols="50" type="text" defaultValue={item["description"]} value={this.state.editDescription} onChange={this.editDescription.bind(this)}/>

		                    <div>
		                        <h2>Product Categories</h2>
		                        <select required name="" multiple = "multiple" size = {this.state.products.length} defaultValue={item["categories"]} 
		                             value={this.state.editCategories}
		                             onChange={this.editCategories.bind(this)}>
		                            {listCat}  
		                        </select>
		                    </div>


		                    <h2>Number of Products</h2>
		                    <input required type="number" defaultValue={item["number"]} value={this.state.editNumber} onChange={this.editNumber.bind(this)}/>
		                    <h2>Product Info</h2>
		                    <textarea required rows="2" cols="50" type="text" defaultValue={item["info"]} value={this.state.editInfo} onChange={this.editInfo.bind(this)}/>      
		                    <h2>Select your image</h2>
		                    <input type="file" accept="image/*" placeholder={"Upload new photo if needed"}
		                        onChange={this.editFile.bind(this)}/>
		                    <button type="submit">Upload Edit To Product</button>
		                </form>
		            )
		        }else{
                    form = (
                        <div className={"admin__list"}>
                            <h3>{item["name"]}</h3> <img src={item["file"]}/><button onClick={this.editProduct.bind(this,index-1,item)}>Show</button>
                        </div>
                    )
                }
		        return (
		            <li>
		                {form}
		            </li>
		        )
		    });
		    prod = (
		        <article className="admin__products">
		            <h4>{this.state.editMessage}</h4>                
		            <ul>
		                {listItems}
		            </ul>
		        </article>
		    )
		}else{
		    prod = (
		        <label>Products Loading</label>
		    )
		}
	    
	    let cat = (
	        <div>
	            <h2>Product Categories</h2>
	            <select required name="productCategories" multiple = "multiple" size = {this.state.categories.length} onChange={this.onChangeCat.bind(this)}>
	                {listCat}
	            </select>
	        </div>
	    )
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
	    let admin = (
	        <article className="admin__box">
	            <h1>Add A Product</h1>
	            {message}
	            <form onSubmit={this.onFormSubmit.bind(this)}>
	                <h2>Product Name</h2>
	                <input required placeholder="Shirt" type="text" onChange={this.onChangeName.bind(this)}/>
	                <h2>Product Description</h2>   
	                <textarea required placeholder="A blue shirt with stripes" rows="4" cols="50" type="text" onChange={this.onChangeDes.bind(this)}/>
	                {cat}
	                <h2>Number of Products</h2>
	                <input required placeholder="10" type="number" onChange={this.onChangeNumber.bind(this)}/>
	                <h2>Product Info</h2>
	                <textarea required placeholder="size:10; colour:blue" rows="2" cols="50" type="text" onChange={this.onChangeInfo.bind(this)}/>      
	                <h2>Select your image</h2>
	                <input required type="file" accept="image/*" onChange={this.onChangeFile.bind(this)}/>
	                <button type="submit">Upload</button>
	            </form>
	            <br/>
	            <hr className="styleLine"/>
	            <br/>
	            <form className="" onSubmit={this.onFormCategorySubmit.bind(this)}>
	                <h2 for="productCategory">Add Category</h2>
	                {messageCategory}
	                <input required placeholder="Shirt" type="text" name="productCategory" onChange={this.onChangeCatAdd.bind(this)}/>
	                <button type="submit">Upload Category</button>
	            </form>
	            <br/>
	            <hr className="styleLine"/>
	            <br/>
	            <h1>Product List</h1>
	            {prod}
	        </article>
	    )
		return (
		  <section className="admin">
		    <h1>Administration</h1>
		    {admin}
		  </section>
		);
    }
}