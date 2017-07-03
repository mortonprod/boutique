import axios from "axios";

let productsServices = function(isCallAgain){ 
    categoriesStore = null;
    productsStore = null;
	function init(){ 
        axios.get('/categories').then((res) => {
		    let categories = res.data;
		    let catToProducts = categories.map((cat)=> {
		        axios.get("/products/" + cat).then((res) => {
	                return new Promise((resolve,reject) =>{resolve(res.data)});
		        });
		    });
	        return new Promise.all(catToProducts).then((data) =>{
	            let categories = null;
	            let products = null;
	            categories = data;
	            data.map((el)=>{
	                el.products.map((product)=>{
	                    products.push(product);
	                });
	            });
	            return new Promise((resolve,reject)=>{
	                categoriesStore = categories;
	                productsStore = products; 
	                resolve({categories:categories,products:products});
	            })
            });
        }
    }
    post(api,form,content){
        if(content){
	        axios.post(api,form,content)
	        .then((res) => {
	            return Promise((resolve,reject)=>{resolve(res.data)});
	            console.log(res.data);
	        }).catch((res)=>{
	            return Promise((resolve,reject)=>{resolve("Error connecting to server")});
	        });
        }else{
	        axios.post(api,form)
	        .then((res) => {
	            return Promise((resolve,reject)=>{resolve(res.data)});
	            console.log(res.data);
	        })
	        .catch(function (error) {
                return Promise((resolve,reject)=>{resolve("Error connecting to server")})
	            console.log(error);
	        });
        }
    }
    getProducts(){
	    if(!categoriesStore || !productsStore || isCallAgain){
	        return init()
	    }else{
	        return new Promise((resolve,reject) => {resolve({categories:categoriesStore,products:productsStore})})
	    }
    }
};

export default productsServices;

