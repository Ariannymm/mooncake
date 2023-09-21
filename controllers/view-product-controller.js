import { productServices } from "../services/products-services.js";
import { formatPrice } from "../utils/formatterPrices.js";

const url = new URL(window.location);
const id = url.searchParams.get("id");

const imgUrl = document.querySelector("[data-image]");
const name = document.querySelector("[data-name]");
const price = document.querySelector("[data-price]");
const description = document.querySelector("[data-description]");

productServices.listaProduct(id).then((products) => {
  imgUrl.src = products.imageUrl;
  name.textContent = products.name;
  price.textContent = products.price;
  description.textContent = products.description;

  const obtenerProductosSimilares = (products, category) => {
    const productosSimilaresFiltrados = products.filter(products => products.category === category); 
    return productosSimilaresFiltrados;
  }

  const productosSimilares = obtenerProductosSimilares(productServices.productsList(), products.category);
  const productosSimilaresLimitados = productosSimilares.slice(0, 6);

  productosSimilaresLimitados.forEach((product) => {
    const elementProduct = document.createElement('div');
    const content = `
      <div class="product__card">
        <img class="product__image" src="${product.imageUrl}" alt="image">
        <h3 class="product__name">${product.category}</h3>
        <h3 class="product__name">${product.name}</h3>
        <p class="product__price">${formatPrice(product.price)}</p>
        <a href="../screens/view-product.html/${product.id}" class="product__link">Ver producto</a>
      </div>
    `;
    elementProduct.innerHTML = content;

    const similarProduct = document.querySelector('[data-similar]');
    similarProduct.appendChild(elementProduct);
  });
});
