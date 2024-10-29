document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();
});

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = ""; // Clear existing items

    cart.forEach((movie, index) => {
        // Create elements for each movie item
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title} poster" />
            <div class="cart-item-details">
                <h3>${movie.title}</h3>
                <p style="color:#28a745">NPR ${movie.price}</p>
                <button class="remove">Remove</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);

        cartItem
            .querySelector(".remove")
            .addEventListener("click", () => removeItem(index));
    });

    calculateBill();
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // index valid cha ki chaina check garcha
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCartItems();
    }
}

function calculateBill() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const subTotalElement = document.getElementById("subTotal");
    const discountElement = document.getElementById("discount");
    const grandTotalElement = document.getElementById("grandTotal");

    const discountRate = 10;

    // Calculate the subtotal
    const subTotal = cart.reduce(
        (total, movie) => total + parseFloat(movie.price),
        0
    );

    const discountAmount = (subTotal * discountRate) / 100;
    const grandTotal = subTotal - discountAmount;

    subTotalElement.innerText = `NPR ${subTotal.toFixed(2)}`;
    discountElement.innerText = `NPR -${discountAmount.toFixed(2)}`;
    grandTotalElement.innerText = `NPR ${grandTotal.toFixed(2)}`;
}
