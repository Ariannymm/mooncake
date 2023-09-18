// Versión mejorada:

const form = document.querySelector("[data-form]");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const email = document.querySelector("[data-email]").value;
    const password = document.querySelector("[data-password]").value;

    // Verificar si el email y la contraseña cumplen con los requisitos
    if (email.length > 8 && password.length > 8) {
        // Aquí puedes agregar la lógica para verificar el inicio de sesión en tu backend
        // Puedes utilizar una solicitud AJAX o cualquier otro método para enviar los datos al servidor y verificar la autenticación.
        // Por ahora, asumiremos que el inicio de sesión es exitoso.
        // Redirigir al usuario a la página de productos después del inicio de sesión exitoso.
        window.location.href = "../screens/products-list-edit.html";
    } else {
        alert("Email o contraseña inválidos.");
    }
});
