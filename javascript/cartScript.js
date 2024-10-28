document.addEventListener("DOMContentLoaded", () => {
    const movieData = JSON.parse(localStorage.getItem("selectedMovie"));

    if (movieData) {
        const originalPrice = parseFloat(movieData.price);
        const discount = movieData.discount || 0;

        const finalPrice = originalPrice - discount;

        document.getElementById("cartTitle").innerText =
            movieData.title || "N/A";
        document.getElementById(
            "cartPrice"
        ).innerText = `NPR ${originalPrice.toFixed(2)}`;
        document.getElementById(
            "subTotal"
        ).innerText = `NPR ${originalPrice.toFixed(2)}`;
        document.getElementById(
            "discount"
        ).innerText = `NPR -${discount.toFixed(2)}`;
        document.getElementById(
            "grandTotal"
        ).innerText = `NPR ${finalPrice.toFixed(2)}`;
    } else {
        alert("No movie added to cart.");
    }
});
