import { productServices } from "../services/products-services.js"
import { formatPrice } from "../formatterPrices.js";

const getProducts = (name, imageUrl, category, price, id) => {
    const card = document.createElement("div");

    const content = `
    <div class="all_products--card">
        <div class="all_products--edit flex">
            <a href="../screens/edit-product.html?id=${id}">
                <button class="editBtn">
                    <ion-icon name="create-outline"></ion-icon>
                </button>
            </a>
            <button class="deleteBtn">
                <img class="deleteIcon" src="../assets/icon/delete.png"></img>
            </button>
        </div>
        <div class="product__card">
            <img class="product__image" src="${imageUrl}" alt="image">
            <h3 class="product__name">${name}</h3>
            <p class="product__price">${formatPrice(price)}</p>
            <p class="product__category">${category}</p>
        </div>

    </div>
    `;
    card.innerHTML = content;
    card.dataset.id = id;
    return card;
};

const products = document.querySelector("[data-allProducts]");

products.addEventListener("click", async (event) => {
    let deleteButton = event.target.className === "deleteIcon";
    if (deleteButton) {
        const product = event.target.closest("[data-id]");
        let id = product.dataset.id;
        productServices
            .deleteProduct(id)
            .then( (respuesta) => {
                product.remove();
                console.log(respuesta);
            })
        .catch((error) => console.log(error));
    }
});

const render = async () => {
    try {
        const list = await productServices.productsList();

        if (list) {
            list.filter(products => products.category === "Cheesecakes").forEach( (product) => {
                products.appendChild(
                    getProducts(product.name, product.imageUrl, product.category, product.price, product.id)
                );
            });
        } if (list) {
            list.filter(products => products.category === "Cupcakes").forEach( (product) => {
                products.appendChild(
                    getProducts(product.name, product.imageUrl, product.category, product.price, product.id)
                );
            });
        } if (list) {
            list.filter(products => products.category === "Cookies").forEach( (product) => {
                products.appendChild(
                    getProducts(product.name, product.imageUrl, product.category, product.price, product.id)
                );
            });
        }
    } catch (error) {
        console.log(error);
    }
};

render();