import { fetchAnyUrl } from "/js/modulejson.js";

const customerIceCreamContainer = document.getElementById("customerIceCreamContainer");

async function fetchCustomerIceCreamDetails() {
    try {
        const customerIceCreamDataArray = await fetchAnyUrl(`http://localhost:8080/customerIceCreams`);
        const row = document.createElement("div");
        row.className = "row";

        customerIceCreamDataArray.forEach((customerIceCreamData) => {
            const customerIceCreamHtml = createCustomerIceCreamHtml(customerIceCreamData);
            row.innerHTML += customerIceCreamHtml;
        });
        customerIceCreamContainer.appendChild(row);
    } catch (error) {
        console.error("Error fetching customer ice cream details:", error);
    }
}

// Html for customer ice creams
function createCustomerIceCreamHtml(customerIceCreamData) {
    const html = `
        <div class="col-lg-4 ice-cream-column" style="background-color: #e1b4b7">
            <a href="adminCustomerIceCreamInfo.html?id=${customerIceCreamData.customerIceCreamID}" class="ice-cream-style">
                <div>
                    <img src="${customerIceCreamData.imageUrl}" class="ice-cream-img" alt="${customerIceCreamData.name}" style="width: 200px; height: 200px;">
                    <h3>${customerIceCreamData.name}</h3>
                </div>
            </a>
        </div>
    `;
    return html;
}



// Call the function
fetchCustomerIceCreamDetails();
