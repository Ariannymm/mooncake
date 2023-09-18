import { productServices } from "../services/products-services.js";

// Selección de elementos del DOM

const productsContainer = document.querySelector("[data-container]");
const productsSection = document.querySelector("[data-products]");

// Obtención de la categoría de la URL, se utiliza "URLSearchParams" para obtener el parámetro "category" y determinar qué categoría de productos se debe mostrar.

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

// Mapeo de categorías a métodos de productos, permite asociar cada categoría con su respectivo método para obtener los productos.

const categoryToMethodMap = {
  Cheesecakes: productServices.cheesecakesProducts,
  Cupcakes: productServices.cupcakesProducts,
  Cookies: productServices.cookiesProducts
};

// Se verifica si se proporcionó una categoría válida y si existe un método correspondiente, de ser así, se llama para obtener los productos de dicha categoría.

if (category && categoryToMethodMap.hasOwnProperty(category)) {
  const productsPromise = categoryToMethodMap[category]();

  productsPromise.then(data => {
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
};
