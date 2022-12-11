
var categories = ["nft", "bitcoin", "etherium", "bnb"];


var mockData = [
    {
        title: "Moonbirds nft",
        category: "nft",
        desc: "Faucibus odio elementum nulla venenatis, libero. Ullamcorper duis fringilla pulvinar nibh diam sit.",
        img: "Content/images/home/card.jpg"
    },
    {
        title: "Bitcoin sdfsds ds ",
        category: "bitcoin",
        desc: "Bitcoin Faucibus o Bitcoin dio elementum nulla venenatis, libero. Ullamcorper duis fringilla pulvinar nibh diam sit.",
        img: "Content/images/home/card.jpg"
    },
    {
        title: "Moonbirds etherium ",
        category: "etherium",
        desc: "Faucibus odio elementum nulla venenatis, libero. Ullamcorper duis fringilla pulvinar nibh diam sit.",
        img: "Content/images/home/card.jpg"
    },
    {
        title: "etherium sdfsds ds ",
        category: "etherium",
        desc: "Bitcoin Faucibus o Bitcoin dio elementum nulla venenatis, libero. Ullamcorper duis fringilla pulvinar nibh diam sit.",
        img: "Content/images/home/card.jpg"
    },

]


var Search = {
    Elements: {
        searchInput: document.getElementById("input-search"),
        results: document.getElementById("search-results"),
        template: document.getElementById("card-template"),
    },
    Action: {
        handleSearch: function () {
            var el = Search.Elements;

            var filteredData = [];

            if (el.searchInput.value.length > 0) {
                var val = el.searchInput.value.toLocaleLowerCase();

                function _filter(data) {
                    return data.title.toLocaleLowerCase().includes(val) || data.desc.toLocaleLowerCase().includes(val)
                }

                filteredData = mockData.filter(_filter);

            }
            else {
                filteredData = mockData;
            }
            
            debugger
            if(filteredData.length>0){
                el.results.innerHTML=""
                for (let i = 0; i < filteredData.length; i++) {
                    const element = filteredData[i];
                    var div=document.createElement("div");
                    div.innerHTML=document.getElementById("card-template").innerHTML;
                    div.querySelector("img").src=element.img;
                    div.querySelector("h5").innerText=element.title;
                    div.querySelector("p").innerText=element.desc;
                    
                    Search.Elements.results.appendChild(div.querySelector("a"));

                }
            }else{
                el.results.innerHTML="Sonuç Bulunamadı."
            }
            
            //append ler yapılacak
            //filteredData for

        }

    }
}
