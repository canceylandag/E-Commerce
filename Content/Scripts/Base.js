Filter={
    Apis:{
        fetchCategoryUrl:"https://dummyjson.com/products/categories",
        fetchAllItems:"https://dummyjson.com/products?limit=100",
        fetchSearch:"https://dummyjson.com/products/search?limit=100&q=",
    },
    Elements:{
        categoryList:document.getElementById("category-list"),
        productList:document.getElementById("product-list"),
        cardTemp:document.getElementById("card-temp"),
        categoryTemp:document.getElementById("category-list-item-temp"),
    
    },
    Status:{
        categories:[],
        querry:"",
        selectedCategories:"",
        sort:""
    },
    Actions:{
        init:()=>{
            Filter.Actions.getAllCategories();
            Filter.Actions.getAllItems();
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
        getAllItems:()=>{
            fetch(Filter.Apis.fetchAllItems)
            .then(res=>res.json())
            .then(res=>{
                Filter.Actions.appendListToHtml(res.products);
            })



        },
        searchList:()=>{
            var searchParam=document.getElementById("search-input").value;
            fetch(Filter.Apis.fetchSearch+searchParam)
            .then(res=>res.json())
            .then(res=>{
                Filter.Actions.appendListToHtml(res.products);
            })

        },
        searchCategory:()=>{
            
            var searchParam=document.getElementById("search-category").value; 
            var cloneArray=[...Filter.Status.categories];
           

            if(searchParam!=""){
                function _filter(data){
                    return data.includes(searchParam);
                }
                cloneArray=cloneArray.filter(x=>x.toLocaleLowerCase().includes(searchParam));

                for (let i = 0; i <Filter.Status.categories.length; i++) {
                    
                    if( cloneArray.includes(Filter.Status.categories[i]) ){

                        Filter.Elements.categoryList.querySelector("#"+Filter.Status.categories[i]).parentElement.style.display="block";
                        Filter.Elements.categoryList.querySelector("#"+Filter.Status.categories[i]).checked=false;
                    }else{
                        Filter.Elements.categoryList.querySelector("#"+Filter.Status.categories[i]).parentElement.style.display="none";
                    }
                    
                }

            }else{
                Filter.Actions.getAllCategories();
            }
            
            
        },
        appendListToHtml:(param)=>{
            Filter.Elements.productList.innerHTML="";
            for (let i = 0; i < param.length; i++) {
                const ctg = param[i];
                var div=document.createElement("div");
                div.innerHTML=Filter.Elements.cardTemp.innerHTML;
                div.querySelector("img").setAttribute("src",ctg.images[0]);
                div.querySelector("h5").innerText=ctg.title; 
                div.querySelector("p").innerText=ctg.description;
                Filter.Elements.productList.appendChild(div.querySelector("a"));
            } 
        },

    }


}

Filter.Actions.init();