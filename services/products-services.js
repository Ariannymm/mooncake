//  GET 
// Solicitud para obtener la lista completa de productos.

const productsList = () =>
    fetch("https://alurageek-api-three.vercel.app/products")
        .then((respuesta) => respuesta.json())
        .catch((error) => console.log(error));

// Solicitud para obtener detalles de un producto, toma un parámetro id que utiliza para construir la URL.

const listaProduct = (id) => {
    return fetch(`https://alurageek-api-three.vercel.app/products/${id}`).then((respuesta) => {
      return respuesta.json();
    });
};

// Solicitudes a URLs específicas para obtener productos filtrados por categoría.
// Realiza cada solicitud a una URL diferente e incluye el parámetro de consulta "category" con el valor correspondiente.

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
// Solicitud para crear un nuevo producto. Si es exitosa, se actualiza la lista de productos alojada en el almacenamiento local.

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
            productsList().then((products) => {
                localStorage.setItem("products", JSON.stringify(products));
                window.location.href = "../screens/products-list-edit.html";
            });
        })
        .catch((error) => console.log(error));
};


// PUT/PATCH
// Solicitud para actualizar un producto existente. Toma parámetros que representan los nuevos datos del producto.

const changeProduct = (id, name, category, price, description) => {
    return fetch(`https://alurageek-api-three.vercel.app/products/${id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            name,
            category,
            price,
            description,
        }),
    }).then((respuesta) => {
        console.log(respuesta);
        if (respuesta.ok) {
            return respuesta.body;
        }
        throw new Error("Lo sentimos, no se pudo actualizar el producto");
    }).catch((error) => console.log(error));
};


// DELETE
// Solicitud para eliminar un producto existente. Toma el id para construir la URL.

const deleteProduct = async (id) => {
    return await fetch(`https://alurageek-api-three.vercel.app/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
};

// Objeto que contiene las funciones anteriores, para permitir su uso en otros archivos o módulos.

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