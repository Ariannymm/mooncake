import { productServices } from "../services/products-services.js";

const productsContainer = document.querySelector("[data-container]");
const productsSection = document.querySelector("[data-products]");

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

// Obtener los productos de la categoría correspondiente
let products;
if (category === "Cheesecakes") {
  products = productServices.cheesecakesProducts();
} else if (category === "Cupcakes") {
  products = productServices.cupcakesProducts();
} else if (category === "Cookies") {
  products = productServices.cookiesProducts();
}

// Mostrar los productos en el contenedor
products.then(data => {
  const categoryTitle = document.createElement("h1");
  categoryTitle.classList.add("results__title");
  categoryTitle.textContent = category;
  productsContainer.prepend(categoryTitle);

  data.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add("product__card");
    productElement.innerHTML = `
      <img class="product__image" src="${product.imageUrl}" alt="${product.name}">
      <h2 class="product__name">${product.category}</h2>
      <h2 class="product__name">${product.name}</h2>
      <p class="product__price">${product.price}</p>
      <a href="../screens/view-product.html?id=${product.id}" class="product__link">Ver producto</a>
    `;
    productsSection.appendChild(productElement);
  });
});

