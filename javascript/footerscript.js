// Footer items as an array of objects
const footerItems = [
    "YTS © 2011 - 2024",
    "Blog",
    "DMCA",
    "API",
    "RSS",
    "Contact",
    "Browse Movies",
    "Requests",
    "Login",
    "Language",
];

//* Function: load footer items
function loadFooterItems() {
    const footerList = document.getElementById("footer-list");
    footerList.innerHTML = "";

    //*  HTML for each footer item
    footerItems.forEach((item) => {
        footerList.innerHTML += `<li><a href="#">${item}</a></li>
            <li>-</li>`;
    });
}


document.addEventListener("DOMContentLoaded", loadFooterItems);
