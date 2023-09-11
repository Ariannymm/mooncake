import { productServices } from "../services/products-services.js";

const url = new URL(window.location);

const category = url.searchParams.get("id");

const getTitle = () => {
    const title = document.querySelector("[data-title]");

    if (category === "[data-view]") {
        title.textContent = "Cheesecakes";
    };
    
}

getTitle();



/*
const render = async () => {
    try{
        const title = document.querySelector("[data-title]");
        
        if (products => products.category === "Cheesecakes") {
            productServices.detailsProduct(category).then( (products) => {
                title.textContent = products.category;
            });
        } if (products => products.category === "Cupcakes") {
            title.textContent = "Cupcakes"
        } 
    }.catch (error) {console.log(error);}
};

render();*/
