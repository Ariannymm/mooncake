import { productServices } from "../services/products-services.js";

// Se selecciona el elemento [data-products] que servirá de sección para mostrar resultados de la búsqueda.

const productsSection = document.querySelector("[data-products]");

// La función "searchTerm" obtiene el término de búsqueda del URL actual se ejecuta si tiene un "valor" y luego de que la página se cargue completamente.

window.addEventListener("DOMContentLoaded", () => {
  const searchTerm = getSearchTermFromURL();
  if (searchTerm) {
    searchProducts(searchTerm);
  }
});

// El siguiente bloque de código realiza la búsqueda utilizando el término buscado por nombre o categoría, eliminando los caracteres diacríticos y convirtiéndolo a minúsculas.

const searchProducts = async (searchTerm) => {
  try {
    const products = await productServices.productsList();
    const filteredProducts = products.filter(
      (product) =>
        normalizeString(product.name).includes(normalizeString(searchTerm)) ||
        normalizeString(product.category).includes(normalizeString(searchTerm))
    );
    showResults(filteredProducts);
  } catch (error) {
    console.log(error);
  }
};

const normalizeString = (string) => string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// "showResults" muestra los resultados de la búsqueda en la sección "productsSection".

const showResults = (products) => {
  productsSection.innerHTML = "";

  if (products.length === 0) {
    productsSection.innerHTML = "<p><span>Lo sentimos, no se encontraron resultados con ese nombre.</span><br><br> Esto puede deberse a que el producto no está disponible en nuestro inventario o puede haber un error ortográfico en su búsqueda. Por favor, verifique la ortografía y vuelva a intentarlo. Si tiene alguna pregunta o necesita ayuda adicional, no dude en contactarnos.</p>";
    productsSection.classList.add("results__error");
  } else {
    const productsContainer = document.querySelector("[data-container]");

    const resultsTitle = document.createElement("h1");
    resultsTitle.classList.add('results__title');
    resultsTitle.textContent = "Resultados de la Búsqueda";
    productsContainer.prepend(resultsTitle);
  
    const productsResults = document.createElement("section");
    productsResults.classList.add("products__container");
    productsSection.appendChild(productsResults);
  
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product__card");
      productElement.innerHTML = `
      <img class="product__image" src="${product.imageUrl}" alt="${product.name}" class="product__image">
      <h3 class="product__name">${product.category}</h3>
      <h3 class="product__name">de ${product.name}</h3>
      <p class="product__price">$${product.price}</p>
      <a href="../screens/view-product.html?id=${product.id}" class="product__link">Ver Producto</a>
      `;

      productsResults.appendChild(productElement);
    });
  }
};

// Esta función obtiene el término de búsqueda del URL actual extrae el valor del parámetro de búsqueda llamado "search" y lo devuelve como resultado.

const getSearchTermFromURL = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("search");
};