Filter={
    Apis:{
        fetchCategoryUrl:"https://dummyjson.com/products/categories",
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
    }


}

Filter.Actions.init();