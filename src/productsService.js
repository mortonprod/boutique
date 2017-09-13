import axios from "axios";
let getData = null
if(process.env.NODE_ENV === "development"){
    getData = require("./productsData").default;
    console.log("Get products from bundle: " + JSON.stringify(getData()));
}else{
    console.log("Get products from public directory");
}

let productsService = (function(){ 
    let categoriesStore = null;
    let productsStore = null;
	function init(){ 
        return new Promise((resolve,reject)=>{
	        axios.get('/categories').then((res) => {
			    let categories = res.data;
			    let catToProducts = categories.map((cat)=> {
                    return new Promise((resolve,reject) => {
				        axios.get("/products/" + cat).then((res) => {
	                        console.log("Category and product: " + cat + "  " + JSON.stringify(res.data));
			                resolve(res.data);
				        });
                    });
			    });
		        Promise.all(catToProducts).then((categories) =>{
	                axios.get("/products/").then((res) => {
                        console.log("Products: " + JSON.stringify(res.data));
	                    categoriesStore = categories;
	                    productsStore = res.data;
	                    resolve({categories:categories,products:res.data})
	                });
                });
	        }).catch((res)=>{
                categoriesStore = [];
                productsStore = [];
                resolve({categories:[],products:[]});
	        })
        });
    }
    function post(api,form,content){
        return new Promise((resolve,reject) =>{
	        if(content){
	            axios.post(api,form,content).then((res) => {
		            resolve(res.data)
		            console.log("Message from post: " + JSON.stringify(res.data));
                });
	        }else{
		        axios.post(api,form).then((res) => {
                    resolve(res.data)
                    console.log("Message from post: " + JSON.stringify(res.data));
                });;
	        }
        });
    }
    function getProducts(isCallAgain){
        if(getData){
            return new Promise((resolve,reject) => {
                resolve({categories:getData().categories,products:getData().products})
            });
        }else{
		    if(!categoriesStore || !productsStore || isCallAgain){
		        return init()
		    }else{
		        return new Promise((resolve,reject) => {resolve({categories:categoriesStore,products:productsStore})})
		    }
        }
    }
    return {
        post,
        getProducts
    }
})();

export default productsService;

