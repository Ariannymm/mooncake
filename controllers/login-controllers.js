const form = document.querySelector("[data-form]");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const email = document.querySelector("[data-email]").value;
    const password = document.querySelector("[data-password]").value;

    if (email.length > 5 && password.length > 5) {
        window.location.href = "../screens/all-products-client.html";
    } else {
        alert("Email o contraseña inválidos.");
    }
});