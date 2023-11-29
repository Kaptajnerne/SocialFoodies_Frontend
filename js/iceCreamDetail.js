// iceCreamDetail.js

import { fetchAnyUrl } from "/js/modulejson.js";

const iceCreamInfoContainer = document.getElementById("ice-cream-info");
const urlParams = new URLSearchParams(window.location.search);
const iceCreamId = urlParams.get('id');

// Fetch ice cream details
// Fetch ice cream details
async function fetchIceCreamDetails() {
    try {
        const iceCreamData = await fetchAnyUrl (`http://localhost:8080/iceCreams/${icecr}`)
        console.log("Fetched Ice Cream Data:", iceCreamData); // Log the fetched data to the console
        const iceCreamInfoHtml = createIceCreamInfoHtml(iceCreamData);
        iceCreamInfoContainer.innerHTML = iceCreamInfoHtml;
    } catch (error) {
        console.error("Error fetching ice cream details:", error);
    }
}


// Create HTML for ice cream details
function createIceCreamInfoHtml(iceCreamData) {
    return `
        <div class="card">
            <img src="${iceCreamData.movieImageUrl}" height="200" width="200" alt="${iceCreamData.name}">
            <div class="card-body">
                <h5 class="card-title">${iceCreamData.name}</h5>
                <p class="card-text">${iceCreamData.description}</p>
                <!-- Add other ice cream details here -->
            </div>
        </div>
    `;
}

fetchIceCreamDetails();
