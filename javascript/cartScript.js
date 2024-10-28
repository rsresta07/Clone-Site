document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();
    calculateBill();
});

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = "";

    let subTotal = 0;
    cart.forEach((movie) => {
        // Create elements for each movie item
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title} poster" />
            <div class="cart-item-details">
                <h3>${movie.title}</h3>
                <p>Price: NPR ${movie.price}</p>
                <button onclick="removeFromCart('${movie.id}')">Remove</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
        subTotal += parseFloat(movie.price);
    });

    document.getElementById("subTotal").innerText = `NPR ${subTotal.toFixed(
        2
    )}`;
    document.getElementById("grandTotal").innerText = `NPR ${subTotal.toFixed(
        2
    )}`;
}

function removeFromCart(movieId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((movie) => movie.id !== movieId);
    localStorage.setItem("cart", JSON.stringify(cart)); 
    displayCartItems(); 
    calculateBill(); 
}

function calculateBill() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const subTotalElement = document.getElementById("subTotal");
    const discountElement = document.getElementById("discount");
    const grandTotalElement = document.getElementById("grandTotal");

    const discountRate = 10; 

    let subTotal = cart.reduce(
        (total, movie) => total + parseFloat(movie.price),
        0
    );
    const discountAmount = (subTotal * discountRate) / 100;
    const grandTotal =
        subTotal - discountAmount;

    subTotalElement.innerText = `NPR ${subTotal.toFixed(2)}`;
    discountElement.innerText = `NPR -${discountAmount.toFixed(2)}`;
    grandTotalElement.innerText = `NPR ${grandTotal.toFixed(2)}`;
}
