import { searchMovies } from "./api.js";

const searchInput = document.getElementById("searchInput");
const dropdown = document.getElementById("dropdown");

searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();
    if (query.length > 2) {
        const results = await searchMovies(query);
        displaySearchResults(results);
    } else {
        dropdown.innerHTML = "";
        dropdown.style.display = "none"; //Hide Dropdown
    }
});

function displaySearchResults(movies) {
    // Clear dropdown if no movies are found
    if (!Array.isArray(movies) || movies.length === 0) {
        dropdown.innerHTML = "<p>No results found</p>";
        dropdown.style.display = "block";
        return;
    }

    dropdown.innerHTML = movies
        .map(
            (movie) => `
        <div class="dropdown-item" onclick="window.location.href='../view/movieDetails.html?id=${movie.id}'">
            <img src="${movie.small_cover_image}" alt="${movie.title}" />
            <div>
                <p>${movie.title} (${movie.year})</p>
            </div>
        </div>`
        )
        .join("");
    dropdown.style.display = "block";
}
