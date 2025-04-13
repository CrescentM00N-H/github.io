"use strict";

export async function loadFooterBar() {
    return fetch("./views/components/footer.html")
        .then(response => response.text())
        .then(data => {
            const footer = document.querySelector('footer');
            if (!footer) {
                console.error("footer element not found.");
                return;
            }
            footer.innerHTML = data;
        })
        .catch(error => {console.error("Unable to load footer.", error)});
}