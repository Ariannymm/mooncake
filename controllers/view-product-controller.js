import { productServices } from "../services/products-services.js";
import { formatPrice } from "../formatterPrices.js";

const url = new URL(window.location);

const id = url.searchParams.get("id");

const imgUrl = document.querySelector("[data-image]");
const name = document.querySelector("[data-name]");
const price = document.querySelector("[data-price]");
const description = document.querySelector("[data-description]");

productServices.detailsProduct(id).then( (products) => {
    imgUrl.src = products.imageUrl;
    name.textContent = products.name;
    price.textContent = products.price;
    description.textContent = products.description;
});

// Modificaciones para Productos similares


const getSimilarProduct = (name, imageUrl, category, price, id) => {               
    const card = document.createElement("div");
    const content = `
        <div class="product__card">
            <img class="product__image" src="${imageUrl}" alt="image">
            <h3 class="product__name">${name}</h3>
            <p class="product__price">${formatPrice(price)}</p>
            <a href="../screens/view-product.html?id=${id}" class="product__link">Ver producto</a>
        </div>
    `;
    card.innerHTML = content;
    card.dataset.id = id;

    return card; 
};


const category = document.querySelector("[data-categories]");

const productsList = await productServices.productsList(category);
        
if (category) {
    productsList.filter(products => products.category === "Cupcakes").forEach( (element) => {
        category.appendChild(
            getSimilarProduct(element.name, element.imageUrl, element.price, element.id)
        );
    });
}

/*
const render = async () => {        
        const productsList = await productServices.productsList();
        
        if (category) {
            productsList.filter(products => products.category === "Cheesecakes").forEach( (element) => {
                category.appendChild(
                    getSimilarProduct(element.name, element.imageUrl, element.price, element.id)
                );
            });
        } if (products => products.category === "Cupcakes") {
            productsList.filter(products => products.category === "Cupcakes").forEach( (element) => {
                category.appendChild(
                    getSimilarProduct(element.name, element.imageUrl, element.price, element.id)
                );
            });
        } if (products => products.category === "Cookies") {
            productsList.filter(products => products.category === "Cookies").forEach( (element) => {
                category.appendChild(
                    getSimilarProduct(element.name, element.imageUrl, element.price, element.id)
                );
            });
        }
};

render();
*/