import { productServices } from "../services/products-services.js"

// Se selecciona el formulario [data-addform] y agrega un evento de escucha para el evento "submit".

const form = document.querySelector('[data-addform]');

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Se obtienen los valores de los campos del formulario.
    const name = document.querySelector('[data-name]').value;
    const url = document.querySelector('[data-url]').value;
    const category = document.querySelector('[data-category]').value;
    const price = document.querySelector('[data-price]').value;
    const description = document.querySelector('[data-description]').value;

    // Los valores se pasan a "createProduct" para crear un nuevo producto. Se encadenan las promesas y si se resuelve correctamente, se redirige a la página indicada.
    productServices
    .createProduct(name, url, category, price, description)
    .then(() => {
        window.location.href = "../screens/products-list-edit.html";
    })
    .catch(() => {
        console.error;
    });
});