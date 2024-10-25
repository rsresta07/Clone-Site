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

        // Check if elements exist before setting values
        const movieTitleElement = document.getElementById("movieTitle");
        const moviePosterElement = document.getElementById("moviePoster");
        const movieDescriptionElement =
            document.getElementById("movieDescription");
        const movieRatingElement = document.getElementById("movieRating");
        const movieGenresElement = document.getElementById("movieGenres");
        const movieDurationElement = document.getElementById("movieDuration");
        // const movieDirectorsElement = document.getElementById("movieDirectors");
        const movieActorsElement = document.getElementById("movieActors");
        // const movieQualityElement = document.getElementById("movieQuality");

        if (movieTitleElement)
            movieTitleElement.innerText = movie.title || "N/A";
        if (moviePosterElement)
            moviePosterElement.src = movie.medium_cover_image || "";
        if (movieDescriptionElement)
            movieDescriptionElement.innerText =
                movie.description_full || "No description available.";
        if (movieRatingElement)
            movieRatingElement.innerText = movie.rating ?? "N/A";
        if (movieGenresElement)
            movieGenresElement.innerText = Array.isArray(movie.genres)
                ? movie.genres.join(", ")
                : "N/A";
        if (movieDurationElement)
            movieDurationElement.innerText = movie.runtime ?? "N/A";

        // Displaying the cast
        if (movieActorsElement) {
            movieActorsElement.innerText = movie.cast
                ? movie.cast.map((actor) => actor.name).join(", ")
                : "N/A";
        }

        // if (movieQualityElement)
        //     movieQualityElement.innerText = movie.quality || "N/A";
    } catch (error) {
        console.error("Error fetching movie details:", error);
        alert("Error fetching movie details. Please try again later.");
    }
}

// Call the function to fetch movie details
fetchMovieDetails();
