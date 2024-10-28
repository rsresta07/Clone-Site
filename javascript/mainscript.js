//* importing movieData.js
// import { movieCategories } from "./movieData.js";

//* importing functions from api.js
import { fetchMovies } from "./api.js";

async function loadMovieDetails() {
    const movieDetailsContainer = document.getElementById("movies-container");
    movieDetailsContainer.innerHTML = `
        <div class="movies-section">
            <div class="movies-grid" id="grid-container">
                <!-- Movie cards will be inserted here -->
            </div>
        </div>`;

    try {
        // yesle chai movie list fetch garcha
        const movies = await fetchMovies();
        if (movies) {
            // Slice the movies array into three sections
            const popularMovies = movies.slice(0, 4);
            const latestMovies = movies.slice(4, 12);
            const upcomingMovies = movies.slice(12, 20);

            // Render each section with a heading
            movieDetailsContainer.innerHTML += createSectionHTML(
                "Popular Movies",
                "Browse More",
                popularMovies
            );
            movieDetailsContainer.innerHTML += createSectionHTML(
                "Latest Movies",
                "Browse All",
                latestMovies
            );
            movieDetailsContainer.innerHTML += createSectionHTML(
                "Upcoming Movies",
                "Request a Movie",
                upcomingMovies
            );
        }
    } catch (error) {
        console.error("Failed to load movies: " + error);
    }
}

// function jun le each HTML section generate garcha
function createSectionHTML(sectionTitle, loadMore, movies) {
    return `
        <div class="movies-section">
            <div class="category-title">
                <p class="category-section">${sectionTitle}</p>
                <a href="#" class="browse">${loadMore}</a>
            </div>
            <div class="movies-grid">
                ${movies.map((movie) => htmlCode(movie)).join("")}
            </div>
        </div>
    `;
}

function htmlCode(movie) {
    return `
        <div class="movie">
            <a href="../view/movieDetails.html?id=${movie.id}" class="movie-link"">
                <div class="movie-info">
                    <div class="rating">${movie.rating} / 10</div>
                        <div class="genre">${movie.genres.join("<br/>")}</div>
                        <div style="margin-top: 50px;">
                            <a href="../view/movieDetails.html?id=${
                                movie.id
                            }" class="poster-hover-details-btn">Details</a>
                        </div>
                    </div>
                    <img src="${movie.medium_cover_image}" alt="${movie.title}" />
                    <p class="p1">${movie.title}</p>
                    <p>${movie.year}</p>
            </a>
        </div>
    `;
}

// Load the sections on page load
document.addEventListener("DOMContentLoaded", loadMovieDetails);
