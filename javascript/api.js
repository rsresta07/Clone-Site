//* importing axios
// import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://yts.mx/api/v2/", // YTS ko base API URL
});

//* yo function le movie list fetch garcha
export const fetchMovies = async (page = 1) => {
    try {
        const response = await axiosInstance.get(`/list_movies.json`, {
            params: { page },
        });
        return response.data.data.movies;
    } catch (error) {
        console.error("Error fetching movies", error);
    }
};

//* yo function le details fetch garcha specific movie ko using ID
export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await axiosInstance.get(`/movie_details.json`, {
            params: { movie_id: movieId },
        });
        return response.data.data.movie;
    } catch (error) {
        console.error("Error fetching movie details", error);
    }
};

//* Function to search
export const searchMovies = async (query) => {
    try {
        const response = await axiosInstance.get(`/list_movies.json`, {
            params: { query_term: query },
        });
        console.log(response.data);
        return response.data.data.movies || [];
    } catch (error) {
        console.error("Error searching movies", error);
         return []; 
    }
};
