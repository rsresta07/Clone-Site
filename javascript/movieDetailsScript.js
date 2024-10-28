const apiURL = "https://yts.mx/api/v2/";

async function fetchMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    try {
        const response = await axios.get(
            `${apiURL}movie_details.json?movie_id=${movieId}&with_cast=true`
        );
        const movie = response.data.data.movie;

        // Prepare movie data to add to the cart
        const movieData = {
            id: movieId,
            title: movie.title,
            price: (250.0).toFixed(2),
            poster: movie.medium_cover_image,
            description: movie.description_full,
            rating: movie.rating,
            genres: movie.genres,
            duration: movie.runtime,
            cast: movie.cast ? movie.cast.map((actor) => actor.name) : [],
        };

        // Event listener for adding to cart
        document.querySelector(".addCart-btn").addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Check if the movie is already in the cart
            if (!cart.some((item) => item.id === movieId)) {
                cart.push(movieData); 
                localStorage.setItem("cart", JSON.stringify(cart)); 

                const goToCart = confirm(
                    `${movie.title} has been added to the cart. Would you like to view your cart?`
                );
                if (goToCart) {
                    window.location.href = "/cart.html"; 
                }
            } else {
                alert("This movie is already in the cart.");
            }
        });

        // Update the movie details in the HTML
        document.getElementById("movieTitle").innerText = movie.title || "N/A";
        document.getElementById("moviePoster").src =
            movie.medium_cover_image || "";
        document.getElementById("movieDescription").innerText =
            movie.description_full || "No description available.";
        document.getElementById("movieRating").innerText =
            movie.rating ?? "N/A";
        document.getElementById("movieGenres").innerText = Array.isArray(
            movie.genres
        )
            ? movie.genres.join(", ")
            : "N/A";
        document.getElementById("movieDuration").innerText =
            movie.runtime ?? "N/A";
        document.getElementById(
            "moviePrice"
        ).innerText = `NPR ${(250.0).toFixed(2)}`;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        alert("Error fetching movie details. Please try again later.");
    }
}

fetchMovieDetails();
