import { productServices } from "../services/products-services.js";
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
        <p class="product__category">${category}</p>
        <h3 class="product__name">de ${name}</h3>
        <p class="product__price">${formatPrice(price)}</p>
      </div>
    </div>
  `;
  card.innerHTML = content;
  card.dataset.id = id;

  const deleteButton = card.querySelector(".deleteBtn");
  deleteButton.addEventListener("click", () => {

    productServices.deleteProduct(id);
  });
  
  return card;
};



const productsContainer = document.querySelector("[data-productsEdit]");

// Agregar título y enlace antes del contenedor de productos
const title = document.createElement("h1");
title.classList.add("title", "all_products--title");
title.textContent = "Todos los productos";

const link = document.createElement("a");
link.classList.add("primary_button--alt", "button");
link.href = "../screens/add-product.html";
link.textContent = "Agregar Producto";

const container = document.createElement("div");
container.classList.add("all_products--div", "flex");
container.appendChild(title);
container.appendChild(link);

productsContainer.insertAdjacentElement("beforebegin", container);

/*
const render = async () => {
  try {
    const list = await productServices.productsList();

    if (list) {
      list.filter(product => product.category === "Cheesecakes").forEach(product => {
        productsContainer.appendChild(
          getProducts(product.name, product.imageUrl, product.category, product.price, product.id)
        );
      });
    }
    if (list) {
      list.filter(product => product.category === "Cupcakes").forEach(product => {
        productsContainer.appendChild(
          getProducts(product.name, product.imageUrl, product.category, product.price, product.id)
        );
      });
    }
    if (list) {
      list.filter(product => product.category === "Cookies").forEach(product => {
        productsContainer.appendChild(
          getProducts(product.name, product.imageUrl, product.category, product.price, product.id)
        );
      });
    }
  } catch (error) {
    console.log(error);
  }
};*/

const render = async () => {
  try {
    const list = await productServices.productsList();

    if (list) {
      const categories = ["Cheesecakes", "Cupcakes", "Cookies"];

      for (const category of categories) {
        const filteredProducts = list.filter(product => product.category === category);

        filteredProducts.forEach(product => {
          productsContainer.appendChild(
            getProducts(product.name, product.imageUrl, product.category, product.price, product.id)
          );
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

render();