function doSearch(e) {
    e.preventDefault();
    var searchTerm = document.getElementById("searchInput").value;
    var searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = ""; // Clear previous results
    console.log("Searching for:", searchTerm);
    if (searchTerm) {
        fetch(`/personas/search?q=${encodeURIComponent(searchTerm)}`)
            .then(response => response.json())
            .then(data => {
                var personas = data.personas;
                if (personas.length > 0) {
                    personas.forEach(item => {
                        var resultItem = document.createElement("div");
                        resultItem.className = "result-item";
                        resultItem.innerHTML = `<strong>${item.nombre} ${item.apellido}</strong>`;
                        searchResults.appendChild(resultItem);

                        searchResults.style.display = "block";
                    });
                } else {
                    searchResults.innerHTML = "<p>No se encontraron resultados.</p>";
                }
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
                searchResults.innerHTML = "<p>Error fetching results. Please try again later.</p>";
            });
    } else {
        searchResults.innerHTML = "<p>Por favor ingrese un término para búsqueda.</p>";
    }
}