import { productServices } from "../services/products-services.js";

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const productsSection = document.querySelector("[data-container]");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm !== "") {
    searchProducts(searchTerm);
  }
});

async function searchProducts(searchTerm) {
  try {
    const products = await productServices.productsList();
    const filteredProducts = products.filter((product) =>
      normalizeString(product.name).includes(normalizeString(searchTerm)) ||
      normalizeString(product.category).includes(normalizeString(searchTerm))
    );
    showResults(filteredProducts);
  } catch (error) {
    console.log(error);
  }
}

function normalizeString(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function showResults(products) {
  productsSection.innerHTML = "";
  if (products.length === 0) {
    productsSection.innerHTML = "<p><span>Lo sentimos, no se encontraron resultados con ese nombre.</span><br><br> Esto puede deberse a que el producto no está disponible en nuestro inventario o puede haber un error ortográfico en su búsqueda. Por favor, verifique la ortografía y vuelva a intentarlo. Si tiene alguna pregunta o necesita ayuda adicional, no dude en contactarnos.</p>";
    productsSection.classList.add("results__error");
  } else {
    const resultsTitle = document.createElement("h1");
    resultsTitle.textContent = "Resultados de la Búsqueda";
    resultsTitle.classList.add('results__title');
    productsSection.appendChild(resultsTitle);

    const productsContainer = document.createElement("section");
    productsContainer.classList.add("products__container");
    productsSection.appendChild(productsContainer);

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
      productsContainer.appendChild(productElement);
    });
  }
}

