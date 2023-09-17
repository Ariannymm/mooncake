import { productServices } from "../services/products-services.js";
import { formatPrice } from "../formatterPrices.js";

const newProduct = (name, imageUrl, category, price, id) => {               
    const card = document.createElement("div");
    const content = `
        <div class="product__card">
            <img class="product__image" src="${imageUrl}" alt="image">
            <h3 class="product__name">${category}</h3>
            <h3 class="product__name">de ${name}</h3>
            <p class="product__price">${formatPrice(price)}</p>
            <a href="../screens/view-product.html?id=${id}" class="product__link">Ver producto</a>
        </div>
    `;
    card.innerHTML = content;
    card.dataset.id = id;

    return card;
};

const render = async () => {
    try {
        const productsList = await productServices.productsList();
        const categoryCheesecakes = document.querySelector("[data-cheesecakes]");
        const categoryCupcakes = document.querySelector("[data-cupcakes]");
        const categoryCookies = document.querySelector("[data-cookies]");
        
        if (categoryCheesecakes) {
            categoryCheesecakes.innerHTML = "";
            productsList.filter(products => products.category === "Cheesecakes").forEach((element) => {
                categoryCheesecakes.appendChild(
                    newProduct(element.name, element.imageUrl, element.category, element.price, element.id)
                );
            });
        } 
        if (categoryCupcakes) {
                categoryCupcakes.innerHTML = "";
                productsList.filter(products => products.category === "Cupcakes").forEach((element) => {
                    categoryCupcakes.appendChild(
                        newProduct(element.name, element.imageUrl, element.category, element.price, element.id)
                    );
                });
        } if (categoryCookies) {
            categoryCookies.innerHTML = "";
                productsList.filter(products => products.category === "Cookies").forEach((element) => {
                    categoryCookies.appendChild(
                        newProduct(element.name, element.imageUrl, element.category, element.price, element.id));
                });
        }
    } catch (error) {
        console.log(error);
    }
};

render();
