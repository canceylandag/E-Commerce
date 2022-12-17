Filter={
    Apis:{
        fetchCategoryUrl:"https://dummyjson.com/products/categories",
        fetchAllItems:"https://dummyjson.com/products",
        
    },
    Elements:{
        categoryList:document.getElementById("category-list"),
        productList:document.getElementById("product-list"),
        cardTemp:document.getElementById("card-temp"),
        categoryTemp:document.getElementById("category-list-item-temp"),
    
    },
    Status:{
        categories:[],
        products:[],
        querry:"",
        selectedCategories:"",
        sort:""
    },
    Actions:{
        init:()=>{
            Filter.Actions.getAllCategories();
            Filter.Actions.getAllProducts();
        },
        appendCategoriesToHtml:()=>{
            Filter.Elements.categoryList.innerHTML="";
            for (let i = 0; i < Filter.Status.categories.length; i++) {
                const ctg = Filter.Status.categories[i];
                var div=document.createElement("div");
                div.innerHTML=Filter.Elements.categoryTemp.innerHTML;
                div.querySelector("input").setAttribute("id",ctg);
                div.querySelector("label").setAttribute("id",ctg); 
                
                var text=ctg.replaceAll("-"," ");
                var firstChar=text.charAt(0).toLocaleUpperCase();
                text=firstChar+text.substring(1);
                
                div.querySelector("label").innerText=text;
                Filter.Elements.categoryList.appendChild(div.querySelector("li"));
            }
        },
        getAllCategories:()=>{
            fetch(Filter.Apis.fetchCategoryUrl)
            .then(res=>res.json())
            .then(res=>{
                Filter.Status.categories=res;
                Filter.Actions.appendCategoriesToHtml();
            }

            )

        },
        clear:()=>{
            
        },
        getAllProducts:()=>{
            fetch(Filter.Apis.fetchAllItems)
            .then(res=>res.json())
            .then(res=>{
                Filter.Status.products=res.products;
                Filter.Actions.appendListToHtml();
            })



        },
        searchList:(param)=>{
            
            Filter.Status.querry=param.value;
            Filter.Actions.filter();
            

        },handleCategoryChange:()=>{
          
            const checkedCategories=document.querySelectorAll("#category-list input:checked");

            const checkedIds=[];
            for (let i = 0; i < checkedCategories.length; i++) {
                const element=checkedCategories[i];
                checkedIds.push(element.getAttribute("id"));
                
            }

            Filter.Status.selectedCategories=checkedIds;

            Filter.Actions.filter();
            

        },
        filter:()=>{
            
            let apiurl="";
            if(Filter.Status.querry){

                apiurl=Filter.Apis.fetchAllItems+"/search?q="+Filter.Status.querry;

            }else{
                apiurl=Filter.Apis.fetchAllItems;
            }

            fetch(apiurl)
            .then(res=>res.json())
            .then(res=>{
               
                var selectedCategories=Filter.Status.selectedCategories;
                if (selectedCategories.length>0) {

                    Filter.Status.products=res.products.filter(x=>selectedCategories.includes(x.category));
                    
                }else{
                    Filter.Status.products=res.products;

                }


                Filter.Actions.appendListToHtml();
            })

        },
        searchCategory:()=>{
            
            var searchParam=document.getElementById("search-category").value; 
            var cloneArray=[...Filter.Status.categories];
           
                
                cloneArray=cloneArray.filter(x=>x.toLocaleLowerCase().includes(searchParam));

                for (let i = 0; i <Filter.Status.categories.length; i++) {
                    
                    if( cloneArray.includes(Filter.Status.categories[i]) ){

                        Filter.Elements.categoryList.querySelector("#"+Filter.Status.categories[i]).parentElement.style.display="flex";
                        Filter.Elements.categoryList.querySelector("#"+Filter.Status.categories[i]).checked=false;
                    }else{
                        Filter.Elements.categoryList.querySelector("#"+Filter.Status.categories[i]).parentElement.style.display="none";
                    }
                    
                }

            
            
            
        },
        appendListToHtml:()=>{
            
            Filter.Elements.productList.innerHTML="";
            for (let i = 0; i < Filter.Status.products.length; i++) {
                const product = Filter.Status.products[i];
                var div=document.createElement("div");
                div.innerHTML=Filter.Elements.cardTemp.innerHTML;
                div.querySelector("a").setAttribute("href","/product?id="+product.id);
                div.querySelector("img").setAttribute("src",product.thumbnail);
                div.querySelector("img").setAttribute("alt",product.title);
                div.querySelector("h5").innerText=product.title; 
                div.querySelector("p").innerText=product.description;
                Filter.Elements.productList.appendChild(div.querySelector("a"));
            } 
        },

    }


}

Filter.Actions.init();