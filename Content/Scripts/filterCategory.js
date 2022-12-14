var Filter = {
    Apis: {
        products: "https://dummyjson.com/products",
        categories:'https://dummyjson.com/products/categories'
    },
    Elements: {
        productList: document.getElementById("product-list"),
        cardTemp: document.getElementById("card-temp"),
        categorySelect: document.getElementById("category-select"),
    },
    Status: {
        products: [],
        categories:[]
    },
    Actions: {
        //Sayfa ilk açıldığında istenilen fonksiyonları çalıştrıacak
        init: () => {
            Filter.Actions.getProducts(Filter.Apis.products,"list");
            Filter.Actions.getProducts(Filter.Apis.categories,"category");
        },

        handleSortChange: (sender) => {
            debugger
            var products = Filter.Status.products;

            if (sender.value === "descPrice") {
                products = products.sort((a, b) => b.price - a.price);
            }
            else if (sender.value === "ascPrice") {
                products = products.sort((a, b) => a.price - b.price);
            }
            else if (sender.value === "descRate") {
                products = products.sort((a, b) => b.rating - a.rating);
            }
            else if (sender.value === "descDiscount") {
                products = products.sort((a, b) => b.discountPercentage - a.discountPercentage);
            }

            //Filter.Status.products = products;
            Filter.Actions.appendProductsToHtml();

        },

        //ürün listesini html e ekliyor
        appendProductsToHtml: () => {
            Filter.Elements.productList.innerHTML = "";
            for (let i = 0; i < Filter.Status.products.length; i++) {
                const product = Filter.Status.products[i];

                var div = document.createElement("div");
                div.innerHTML = Filter.Elements.cardTemp.innerHTML;

                div.querySelector("a").setAttribute("href", "/product?id=" + product.id);
                div.querySelector("img").setAttribute("src", product.thumbnail);
                div.querySelector("img").setAttribute("alt", product.title);
                div.querySelector("h5").innerText = product.title;
                div.querySelector("p").innerText = product.description;
                div.querySelector("p.price").innerHTML =
                    "Price: " + product.price + "$<br/>" +
                    "Rating: " + product.rating + "<br/>" +
                    "Discount: " + product.discountPercentage + "%";

                Filter.Elements.productList.appendChild(div.querySelector("a"));

            }
        },
        appendCategoriesToSelect:()=>{
           
            for (let i = 0; i < Filter.Status.categories.length; i++) {
                const product = Filter.Status.categories[i];

                var option = document.createElement("option");
                
                option.setAttribute("value",product);
                option.innerText=product;
               
                Filter.Elements.categorySelect.appendChild(option);

            }

        },

        //api'den tüm ürün listesini getiriyor
        getProducts: (apiUrl,param) => {
            fetch(apiUrl)
                .then(res => res.json())
                .then(res => {
                    
                    if(param==="list"){
                        Filter.Status.products = res.products;
                        Filter.Actions.appendProductsToHtml();
                    }else{
                        Filter.Status.categories = res;
                        Filter.Actions.appendCategoriesToSelect();

                    }
                    
                });
        },
        handleCategoryChange:(param)=>{
            let apiurl="";

            if(param.value!=""){
                apiurl=Filter.Apis.products+"/category/"+param.value;
            }else{
                apiurl=Filter.Apis.products;
            }

            Filter.Actions.getProducts(apiurl,"list");
            


        },

    },
};

Filter.Actions.init();