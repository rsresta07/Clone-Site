//* importing movieData.js
import { movieCategories } from "./movieData.js";

//* Function to filter movies and show the dropdown
function filterMovies() {
    const searchInput = document
        .getElementById("searchInput")
        .value.toLowerCase();
    const dropdown = document.getElementById("dropdown");
    dropdown.innerHTML = ""; // Clear previous results

    if (!searchInput) {
        dropdown.style.display = "none";
        return;
    }

    const movieSet = new Set(); // To store unique movies
    const filteredMovies = [
        ...movieCategories.flatMap((cat) => cat.movies),
    ].filter((movie) => movie.title.toLowerCase().includes(searchInput));

    if (filteredMovies.length > 0) {
        dropdown.style.display = "block";
        filteredMovies.forEach((movie) => {
            if (!movieSet.has(movie.title)) {
                movieSet.add(movie.title);

                const movieItem = document.createElement("div");
                movieItem.classList.add("dropdown-item");
                movieItem.innerHTML = `
                    <img src="${movie.img}" alt="${movie.title}" />
                    <span>${movie.title}</span>
                `;
                movieItem.addEventListener("click", () => {
                    alert(`${movie.title} has been selected!`);
                    dropdown.style.display = "none"; 
                });
                dropdown.appendChild(movieItem); 
            }
        });
    } else {
        dropdown.style.display = "none";
    }
}

// Event listener for search input
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", filterMovies);

// click listener to hide the dropdown when clicking outside
document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("dropdown");
    if (!searchInput.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = "none"; // Hide dropdown if clicked outside
    }
});