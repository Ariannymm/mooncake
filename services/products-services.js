//  GET 
const productsList = () =>
    fetch("http://localhost:3000/products")
        .then( (respuesta) => respuesta.json())
        .catch( (error) => console.log(error));

const listaProduct = (id) => {
    return fetch(`http://localhost:3000/products/${id}`).then((respuesta) => {
      return respuesta.json();
    });
  };

const detailsProduct = (id) => {
    return fetch(`http://localhost:3000/products/${id}`).then((respuesta) => {
      return respuesta.json();
    });
  };

// POST
const createProduct = (name, imageUrl, category, price, description) => {
    return fetch(`http://localhost:3000/products`, {
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
    }).then((respuesta) => {
        if (respuesta.ok) {
            return respuesta.body;
        }
        throw new Error("Lo sentimos, no se pudo crear el producto");
    });
};

// PATCH
const changeProduct = async (id, name, price, description) => {
    return fetch(`http://localhost:3000/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          description,
        }),
      })
      .then((respuesta) => {
          return respuesta.json();
      })
      .catch((error) => console.log(error));
};

//DELETE
const deleteProduct = async (id) => {
    return await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

export const productServices = {
    productsList,
    listaProduct,
    detailsProduct,
    createProduct,
    changeProduct,
    deleteProduct,
}