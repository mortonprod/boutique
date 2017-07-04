import axios from "axios";

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
		            let products = [];
		            categories.map((el)=>{
		                el.products.map((product)=>{
		                    products.push(product);
		                });
		            });
                    console.log("All Products " + JSON.stringify(products));
                    categoriesStore = categories;
                    productsStore = products;
                    resolve({categories:categories,products:products})
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
	    if(!categoriesStore || !productsStore || isCallAgain){
	        return init()
	    }else{
	        return new Promise((resolve,reject) => {resolve({categories:categoriesStore,products:productsStore})})
	    }
    }
    return {
        post,
        getProducts
    }
})();

export default productsService;

