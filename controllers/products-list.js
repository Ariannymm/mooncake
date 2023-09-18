import { productServices } from "../services/products-services.js";
import { formatPrice } from "../formatterPrices.js";

// Esta función devuelve un elemento HTML que representa un producto. El elemento HTML contiene un botón de editar, un botón de eliminar y la card con información del producto.

const getProducts = (name, imageUrl, category, price, id) => {
  const card = document.createElement("div");
  card.classList.add("all_products--card");

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("all_products--edit", "flex");

  const editButton = document.createElement("a");
  editButton.href = `../screens/edit-product.html?id=${id}`;
  editButton.classList.add("editBtn");
  editButton.innerHTML = `
    <ion-icon name="create-outline"></ion-icon>
  `;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteBtn");
  deleteButton.innerHTML = `
    <img class="deleteIcon" src="../assets/icon/delete.png" alt="delete">
  `;
  deleteButton.addEventListener("click", () => {
    productServices.deleteProduct(id);
    setTimeout(() => {
      location.reload();
    }, 2000);
  });

  const productCard = document.createElement("div");
  productCard.classList.add("product__card");
  productCard.innerHTML = `
    <img class="product__image" src="${imageUrl}" alt="image">
    <p class="product__category">${category}</p>
    <h3 class="product__name">de ${name}</h3>
    <p class="product__price">${formatPrice(price)}</p>
  `;

  buttonsDiv.appendChild(editButton);
  buttonsDiv.appendChild(deleteButton);
  card.appendChild(buttonsDiv);
  card.appendChild(productCard);
  card.dataset.id = id;

  return card;
};

// Se selecciona el elemento contenedor en el que se mostrarán los productos.

const productsContainer = document.querySelector("[data-productsEdit]");

// Se crean un título "h1", un enlace "a" de "Agregar Producto", estos elementos se agregan a un contenedor "div" insertado antes del contenedor de productos anterior.

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

// Esta función se encarga de obtener la lista de productos. Luego, filtra los productos por categoría y los renderiza en el contenedor de productos.

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