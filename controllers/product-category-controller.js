import { productServices } from "../services/products-services.js";

// Obtener el elemento del título
const titleElement = document.querySelector("[data-title]");

// Obtener el elemento del contenedor de productos
const productsContainer = document.querySelector("[data-category]");

// Obtener la categoría de la URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

// Actualizar el título de la página
titleElement.textContent = category;

// Obtener los productos de la categoría correspondiente
let products;
if (category === "Cheesecakes") {
  products = productServices.cheesecakesProducts();
} else if (category === "Cupcakes") {
  products = productServices.cupcakesProducts();
} else if (category === "Cookies") {
  products = productServices.cookiesProducts();
}

console.log(products);
// Mostrar los productos en el contenedor
products.then(data => {
  data.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add("product__card");
    productElement.innerHTML = `
      <img class="product__image" src="${product.imageUrl}" alt="${product.name}">
      <h2 class="product__name">${product.name}</h2>
      <p class="product__price">${product.price}</p>
      <a href="../screens/view-product.html?id=${product.id}" class="product__link">Ver producto</a>
    `;
    productsContainer.appendChild(productElement);
  });
});
