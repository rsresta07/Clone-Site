//* importing movieData.js
import { movieCategories } from "./movieData.js";

//* Yo Function le movie details load garcha
function loadMovieDetails() {
    const movieDetailsContainer = document.getElementById("movies-container");
    // movieDetailsContainer.innerHTML = "";

    movieCategories.forEach((categoryData) => {
        //* HTML content
        const movieHTML = ` 
            <div class="movies-section">
                <div class="category-title">
                    <p class="category-section">${categoryData.category}</p>
                    <a href="#" class="browse">${categoryData.loadMore}</a>
                </div>
                <div class="movies-grid">
                    ${categoryData.movies
                        .map((movie) => htmlCode(movie))
                        .join("")}
                </div>
                </div>
                
            </div>
        `;

        movieDetailsContainer.innerHTML += movieHTML;
    });
}

function htmlCode(movie) {
    return `
    <div class="movie">
        <a href="#" class="movie-link">
            <div class="movie-info">
                <div class="rating">${movie.rating} / 10</div>
                <div class="genre">${movie.genre}</div>   
                <a href="#" class="poster-hover-details-btn">Details</a> 
            </div>
            <img src="${movie.img}" />
            <p class="p1">${movie.title}</p>
            <p>${movie.year}</p>
        </a>
    </div>`;
}

// Load the sections on page load
document.addEventListener("DOMContentLoaded", loadMovieDetails);
