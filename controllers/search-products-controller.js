const form = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchInput.addEventListener("input", (event) => {
    const inputValue = event.target.value.toLowerCase();

    const results = products.filter(product => {
        return product.name.toLowerCase().startsWith(inputValue) || product.name.toLowerCase().includes(inputValue)
    });
});


form.addEventListener("submit", e => {
    e.preventDefault();
});
