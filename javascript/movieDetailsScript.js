const apiURL = "https://yts.mx/api/v2/";

async function fetchMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    try {
        const response = await axios.get(
            `${apiURL}movie_details.json?movie_id=${movieId}&with_cast=true`
        );
        console.log(response.data);
        const movie = response.data.data.movie;

        // Check if movie details exist in local storage
        let movieData = JSON.parse(localStorage.getItem("selectedMovie")) || {};

        // Log the retrieved movieData from localStorage
        console.log("Retrieved movieData from localStorage:", movieData);

        // Use a fixed price for all movies
        const fixedPrice = 250.0;

        // Only update localStorage if the movie title is different or movieData is empty
        if (!movieData.title || movieData.title !== movie.title) {
            movieData = {
                title: movie.title,
                price: fixedPrice.toFixed(2), // Set fixed price here
                poster: movie.medium_cover_image,
                description: movie.description_full,
                rating: movie.rating,
                genres: movie.genres,
                duration: movie.runtime,
                cast: movie.cast ? movie.cast.map((actor) => actor.name) : [],
            };

            // Save to localStorage only if it’s new data or title mismatch
            localStorage.setItem("selectedMovie", JSON.stringify(movieData));
            console.log("Updated movieData:", movieData); // Log updated movieData
        }

        // Check if elements exist before setting values
        const title = document.getElementById("movieTitle");
        const poster = document.getElementById("moviePoster");
        const description = document.getElementById("movieDescription");
        const rating = document.getElementById("movieRating");
        const genre = document.getElementById("movieGenres");
        const duration = document.getElementById("movieDuration");
        const actors = document.getElementById("movieActors");
        const price = document.getElementById("moviePrice");

        if (title) title.innerText = movie.title || "N/A";
        if (poster) poster.src = movie.medium_cover_image || "";
        if (description)
            description.innerText =
                movie.description_full || "No description available.";
        if (rating) rating.innerText = movie.rating ?? "N/A";
        if (genre)
            genre.innerText = Array.isArray(movie.genres)
                ? movie.genres.join(", ")
                : "N/A";
        if (duration) duration.innerText = movie.runtime ?? "N/A";

        // Displaying the cast
        if (actors)
            actors.innerText = movie.cast
                ? movie.cast.map((actor) => actor.name).join(", ")
                : "N/A";

        // Correctly formatting price for display
        if (price) {
            price.innerText = `NPR ${fixedPrice.toFixed(2)}`; // Display fixed price
        }
    } catch (error) {
        console.error("Error fetching movie details:", error);
        alert("Error fetching movie details. Please try again later.");
    }
}

// Call the function to fetch movie details
fetchMovieDetails();
