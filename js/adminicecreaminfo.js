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

        // Attach delete functionality
        const deleteButton = document.getElementById("delete-button");
        deleteButton.addEventListener("click", () => confirmDelete(iceCreamId));
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
                    <img src="${iceCreamData.imageUrl}" class="img-fluid" alt="${iceCreamData.name}">
                </div>
            </div>
            <div class="col-lg-6">
                <h1>${iceCreamData.name}</h1>
                <p>Description: ${iceCreamData.description}</p>
                <p>Vegan: ${iceCreamData.vegan}</p>
                <p>Contains Nuts: ${iceCreamData.nuts}</p>
            </div>
            <div class="col-lg-12 mt-3">
                <button class="btn btn-primary float-end mx-2" onclick="window.location.href='editIceCream.html?id=${iceCreamData.iceCreamID}'">Edit</button>
                <button id="delete-button" class="btn btn-danger float-end">Delete</button>
            </div>
        </div>
    `;
}

// Function to confirm and initiate delete
function confirmDelete(iceCreamId) {
    const confirmation = confirm("Are you sure you want to delete this ice cream?");
    if (confirmation) {
        // Perform delete action
        deleteIceCream(iceCreamId);
    }
}

// Function to delete ice cream
// Function to delete ice cream
async function deleteIceCream(iceCreamId) {
    try {
        const response = await fetch(`http://localhost:8080/iceCreams/${iceCreamId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('IceCream deleted successfully!');
            // Redirect to adminIceCreams page after successful delete
            window.location.href = 'http://localhost:63342/SocialFoodies_Frontend/adminIceCreams.html';
        } else {
            console.error('Error deleting iceCream');
        }
    } catch (error) {
        console.error('Error deleting iceCream:', error);
    }
}


fetchIceCreamDetails();
