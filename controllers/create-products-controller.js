import { productServices } from "../services/products-services.js"

const form = document.querySelector('[data-addform]');

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector('[data-name]').value;
    const url = document.querySelector('[data-url]').value;
    const category = document.querySelector('[data-category]').value;
    const price = document.querySelector('[data-price]').value;
    const description = document.querySelector('[data-description]').value;

    productServices
    .createProduct(name, url, category, price, description)
    .then((respuesta) => {
        window.location.href = "../screens/index.html";
        console.log(respuesta);
    })
    .catch((error) => {
        console.log(error);
    });
});