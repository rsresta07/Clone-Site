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

        const fixedPrice = 250.0;

        // Only update localStorage if the movie title is different or movieData is empty
        if (!movieData.title || movieData.title !== movie.title) {
            const discount = Math.floor(Math.random() * 51);

            movieData = {
                title: movie.title,
                price: fixedPrice.toFixed(2),
                poster: movie.medium_cover_image,
                description: movie.description_full,
                rating: movie.rating,
                genres: movie.genres,
                duration: movie.runtime,
                cast: movie.cast ? movie.cast.map((actor) => actor.name) : [],
                discount: discount,
            };


            localStorage.setItem("selectedMovie", JSON.stringify(movieData));
            console.log("Updated movieData:", movieData);
        }

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

        if (price) {
            price.innerText = `NPR ${fixedPrice.toFixed(2)}`; 
        }
    } catch (error) {
        console.error("Error fetching movie details:", error);
        alert("Error fetching movie details. Please try again later.");
    }
}

// Call the function to fetch movie details
fetchMovieDetails();
