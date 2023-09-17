//  GET 
const productsList = () =>
    fetch("https://alurageek-api-three.vercel.app/products")
        .then((respuesta) => respuesta.json())
        .catch((error) => console.log(error));

const listaProduct = (id) => {
    return fetch(`https://alurageek-api-three.vercel.app/products/${id}`).then((respuesta) => {
      return respuesta.json();
    });
};

const cheesecakesProducts = () =>
    fetch("https://alurageek-api-three.vercel.app/products?category=Cheesecakes")
        .then( (respuesta) => respuesta.json())
        .catch( (error) => console.log(error));

const cupcakesProducts = () =>
fetch("https://alurageek-api-three.vercel.app/products?category=Cupcakes")
    .then( (respuesta) => respuesta.json())
    .catch( (error) => console.log(error));

const cookiesProducts = () =>
fetch("https://alurageek-api-three.vercel.app/products?category=Cookies")
    .then( (respuesta) => respuesta.json())
    .catch( (error) => console.log(error));

// POST

const createProduct = (name, imageUrl, category, price, description) => {
    return fetch(`https://alurageek-api-three.vercel.app/products`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            name,
            imageUrl,
            category,
            price,
            description,
        }),
    })
        .then((respuesta) => {
            if (respuesta.ok) {
                return respuesta.body;
            }
            throw new Error("Lo sentimos, no se pudo crear el producto");
        })
        .then(() => {
            // Obtener la lista actualizada de productos
            productsList().then((products) => {
                // Guardar la lista de productos en el almacenamiento local
                localStorage.setItem("products", JSON.stringify(products));
                window.location.href = "../screens/products-list-edit.html";
            });
        })
        .catch((error) => console.log(error));
};
// PUT/PATCH

const changeProduct = (id, name, price, description) => {
    return fetch(`https://alurageek-api-three.vercel.app/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            name,
            price,
            description,
        }),
    }).then((respuesta) => {
        if (respuesta.ok) {
            return respuesta.body;
        }
        throw new Error("Lo sentimos, no se pudo actualizar el producto");
    }).catch((error) => console.log(error));
};

//DELETE
const deleteProduct = async (id) => {
    return await fetch(`https://alurageek-api-three.vercel.app/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  export const productServices = {
    productsList,
    listaProduct,
    cheesecakesProducts,
    cupcakesProducts,
    cookiesProducts,
    createProduct,
    changeProduct,
    deleteProduct,
};