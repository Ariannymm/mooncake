import { productServices } from "../services/products-services.js";

const url = new URL(window.location);

const id = url.searchParams.get("id");

const inputImageUrl = document.querySelector("[data-url]");
const inputName = document.querySelector("[data-name]");
const inputPrice = document.querySelector("[data-price]");
const inputDescription = document.querySelector("[data-description]");

productServices.listaProduct(id).then((datos) => {
  inputImageUrl.setAttribute("src", datos.imageUrl);
  inputName.value = datos.name;
  inputPrice.value = datos.price;
  inputDescription.value = datos.description;
});

const editForm = document.querySelector("[data-editForm]");

editForm.addEventListener("submit", (event) => {
  event.preventDefault();

  productServices.changeProduct(
      id,
      inputName.value,
      inputPrice.value,
      inputDescription.value,
  ).then(() => {
      window.location.href = "../screens/products-list-edit.html";
  });
});