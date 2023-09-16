const form = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function showResults(results) {
    // Actualizar la interfaz de usuario para mostrar los resultados de búsqueda
    // Usar el objeto "results" para acceder a los productos encontrados y mostrarlos en la página
}

searchInput.addEventListener("input", (event) => {
    const inputValue = event.target.value.toLowerCase();

    const results = products.filter(product => {
        return product.name.toLowerCase().startsWith(inputValue) || product.name.toLowerCase().includes(inputValue)
    });

    showResults(results);
});


form.addEventListener("submit", e => {
    e.preventDefault();

    const inputValue = searchInput.value.toLowerCase();

    const results = products.filter(product => {
        return product.name.toLowerCase().startsWith(inputValue) || product.name.toLowerCase().includes(inputValue)
    });

    // Agregar acción de redirigir a una página de resultados de búsqueda
});