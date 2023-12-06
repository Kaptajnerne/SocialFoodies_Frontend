import { fetchAnyUrl } from "/js/modulejson.js";

const customerIceCreamInfoContainer = document.getElementById("customer-ice-cream-info");
const urlParams = new URLSearchParams(window.location.search);
const customerIceCreamId = urlParams.get('id');

// Fetch customer ice cream details
async function fetchCustomerIceCreamDetails() {
    try {
        const customerIceCreamData = await fetchAnyUrl(`http://localhost:8080/customerIceCreams/${customerIceCreamId}`);
        const customerIceCreamInfoHtml = createCustomerIceCreamInfoHtml(customerIceCreamData);
        customerIceCreamInfoContainer.innerHTML = customerIceCreamInfoHtml;

        // Attach delete functionality
        const deleteButton = document.getElementById("delete-button");
        deleteButton.addEventListener("click", () => confirmDelete(customerIceCreamId));
    } catch (error) {
        console.error("Error fetching customer ice cream details:", error);
    }
}

// Create HTML for customer ice cream details
function createCustomerIceCreamInfoHtml(customerIceCreamData) {
    return `
        <div class="row">
            <div class="col-lg-6">
                <div class="ice-cream-page-img">
                    <img src="${customerIceCreamData.imageUrl}" class="img-fluid" alt="${customerIceCreamData.name}">
                </div>
            </div>
            <div class="col-lg-6">
                <h1>${customerIceCreamData.name}</h1>
                <p>Description: ${customerIceCreamData.description}</p>
                <p>Vegan: ${customerIceCreamData.vegan}</p>
                <p>Contains Nuts: ${customerIceCreamData.nuts}</p>
            </div>
            <div class="col-lg-12 mt-3">
                <button class="btn btn-primary float-end mx-2" onclick="window.location.href='editCustomerIceCream.html?id=${customerIceCreamData.customerIceCreamID}'">Edit</button>
                <button id="delete-button" class="btn btn-danger float-end">Delete</button>
            </div>
        </div>
    `;
}

// Function to confirm and initiate delete
function confirmDelete(customerIceCreamId) {
    const confirmation = confirm("Are you sure you want to delete this costumer ice cream?");
    if (confirmation) {
        // Perform delete action
        deleteCustomerIceCream(customerIceCreamId);
    }
}

// Function to delete customer ice cream
async function deleteCustomerIceCream(customerIceCreamId) {
    try {
        const response = await fetch(`http://localhost:8080/customerIceCreams/${customerIceCreamId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Customer iceCream deleted successfully!');
            // Redirect to adminIceCreams page after successful delete
            window.location.href = 'http://localhost:63342/SocialFoodies_Frontend/adminCustomerIceCreams.html';
        } else {
            console.error('Error deleting customer iceCream');
        }
    } catch (error) {
        console.error('Error deleting customer iceCream:', error);
    }
}


fetchCustomerIceCreamDetails();
