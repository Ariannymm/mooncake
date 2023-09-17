const form = document.querySelector("[data-form]");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const email = document.querySelector("[data-email]").value;
    const password = document.querySelector("[data-password]").value;

    if (email.length > 5 && password.length > 5) {
        window.location.href = "../screens/products-list-edit.html";
    } else {
        alert("Email o contraseña inválidos.");
    }
});

/*
// Obtén el formulario y el botón de envío
const submitButton = form.querySelector("button[type='submit']");

// Agrega el evento de clic al botón de envío
submitButton.addEventListener("click", async (event) => {
  event.preventDefault(); // Evita la acción predeterminada del formulario

  try {
    await render(); // Renderiza los productos
  } catch (error) {
    console.log(error);
  }
});

// También puedes agregar el evento de envío del formulario
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita la acción predeterminada del formulario

  try {
    await render(); // Renderiza los productos
  } catch (error) {
    console.log(error);
  }
});*/