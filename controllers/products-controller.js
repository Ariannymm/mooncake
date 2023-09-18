import { productServices } from "../services/products-services.js";
import { formatPrice } from "../formatterPrices.js";

// Se crea una nueva card de producto con la clase "product__card" estableciendo su contenido HTML con una plantilla de cadena de texto. 

const newProduct = (name, imageUrl, category, price, id) => {
  const card = document.createElement("div");
  card.classList.add("product__card");
  const content = `
    <img class="product__image" src="${imageUrl}" alt="image">
    <h3 class="product__name">${category}</h3>
    <h3 class="product__name">de ${name}</h3>
    <p class="product__price">${formatPrice(price)}</p>
    <a href="../screens/view-product.html?id=${id}" class="product__link">Ver producto</a>
  `;
  card.innerHTML = content;
  card.dataset.id = id;
  return card;
};

// Ésta función busca el contenedor correspondiente a una categoría y lo vacía para luego filtrar los productos según su categoría y crear una card para cada uno. Agrega las card al contenedor.

const renderCategory = (category, productsList) => {
  const categoryContainer = document.querySelector(`[data-${category}]`);
  if (categoryContainer) {
    categoryContainer.innerHTML = "";
    const filteredProducts = productsList.filter(product => product.category === category);
    filteredProducts.forEach(product => {
      categoryContainer.appendChild(
        newProduct(product.name, product.imageUrl, product.category, product.price, product.id)
      );
    });
  }
};

// "render" obtiene la lista de productos con "productsList". Luego define las categorías y ejecuta "renderCategory" para cada categoría.

const render = async () => {
  try {
    const productsList = await productServices.productsList();
    const categories = ["Cheesecakes", "Cupcakes", "Cookies"];
    categories.forEach(category => renderCategory(category, productsList));
  } catch (error) {
    console.log(error);
  }
};

// Se verifica la visibilidad de las card en sus contenedores(categoría), compara sus coordenadas para determinar si son totalmente visibles y reducir la opacidad de las que no.

const checkLastProductVisibility = () => {
  const containers = document.getElementsByClassName("category-container");
  Array.from(containers).forEach(container => {
    const products = container.getElementsByClassName("product__card");
    const containerRect = container.getBoundingClientRect();
    Array.from(products).forEach(product => {
      const productRect = product.getBoundingClientRect();
      product.style.opacity = productRect.right > containerRect.right ? "0.4" : "1";
    });
  });
};

// La función "render" se ejecutará cuando la página se cargue completamente.

const onPageLoad = () => {
  render();
  checkLastProductVisibility();
};

// "onPageLoad" se ejecutará al cargar totalmente la página. "checkLastProductVisibility" se ejecutará cuando se cambia el tamaño de la ventana del navegador.

window.addEventListener("load", onPageLoad);
window.addEventListener("resize", checkLastProductVisibility);

// Éste código maneja el evento de envío del formulario de búsqueda, obtiene el término ingresado, construye una URL de redireccionamiento y redirige la página a esa URL.

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm !== "") {
    const url = `products.html?search=${encodeURIComponent(searchTerm)}`;
    window.location.href = url;
  }
});
