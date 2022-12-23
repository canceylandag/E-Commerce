var Filter = {
    Apis: {
        products: "https://dummyjson.com/products/",
    },
    Elements: {
        productTitle: document.getElementById("product-title"),
        productDetail: document.getElementById("product-detail")

    },

    Actions: {
        //Sayfa ilk açıldığında istenilen fonksiyonları çalıştrıacak
        init: () => {
            Filter.Actions.getProductDetails(); //  get all products
        },

        //ürün detaylarını getiren endpoint çalışacak
        getProductDetails: () => {
        

            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            const starsTotal=5;

            if (id) {
                fetch(Filter.Apis.products + id)
                    .then(res => res.json())
                    .then(res => {
                        
                        Filter.Elements.productTitle.innerText = res.title;
                        Filter.Elements.productDetail.querySelector("#detail-title").innerText=res.title;
                        Filter.Elements.productDetail.querySelector("#detail-price").innerText=res.price;
                        Filter.Elements.productDetail.querySelector("#detail-description").innerText=res.description;
                        Filter.Elements.productDetail.querySelector("#detail-description").innerText=res.description;
                        
                        Filter.Elements.productDetail.querySelector("#big-picture").querySelector("img").setAttribute("src",res.images[0]);
                        for (image of res.images){
                            img=document.createElement("img");
                            img.setAttribute("src",image);
                            Filter.Elements.productDetail.querySelector("#picture-list").appendChild(img);
                        }

                        Filter.Elements.productDetail.querySelector("#picture-list").onclick=function(event){

                            Filter.Elements.productDetail.querySelector("#big-picture").querySelector("img").setAttribute("src",event.target.src);

                        }
                        console.log(res.rating)
                        const starPercentage=(res.rating/starsTotal)*100;

                        const starPercentageRounded=Math.round((starPercentage/10)*10);

                        document.querySelector(".detail-rating .stars-inner").style.width=starPercentageRounded;

                    });
            }
            else {
                alert("hatalı url")
            }


        }

    },
};

Filter.Actions.init();