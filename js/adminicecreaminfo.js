import { fetchAnyUrl } from "/js/modulejson.js";

const iceCreamInfoContainer = document.getElementById("ice-cream-info");
const urlParams = new URLSearchParams(window.location.search);
const iceCreamId = urlParams.get('id');

// Fetch ice cream details
async function fetchIceCreamDetails() {
    try {
        const iceCreamData = await fetchAnyUrl(`http://localhost:8080/iceCreams/${iceCreamId}`);
        const iceCreamInfoHtml = createIceCreamInfoHtml(iceCreamData);
        iceCreamInfoContainer.innerHTML = iceCreamInfoHtml;
    } catch (error) {
        console.error("Error fetching ice cream details:", error);
    }
}

// Create HTML for ice cream details
function createIceCreamInfoHtml(iceCreamData) {
    return `
        <div class="row">
            <div class="col-lg-6">
                <div class="ice-cream-page-img">
                    <img src="${iceCreamData.imageUrl}" class="ice-cream-page-img" alt="">
                </div>
            </div>
            <div class="col-lg-6">
                <h1>${iceCreamData.name}</h1>
                <p>Description: ${iceCreamData.description}</p>
                <p>Vegan: ${iceCreamData.vegan}</p>
                <p>Contains Nuts: ${iceCreamData.nuts}</p>
                <button class="btn btn-warning" onclick="window.location.href='editIceCream.html?id=${iceCreamData.iceCreamID}'">Edit Ice Cream</button>
                <button class="btn btn-danger" onclick="confirmDelete()">Delete Ice Cream</button>
            </div>
        </div>
    `;
}

// Call the function
fetchIceCreamDetails();

function confirmDelete() {
    if (confirm("Are you sure you want to delete this ice cream?")) {
        // Delete logic here
        console.log("Ice cream deleted!");
    }
}
