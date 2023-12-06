import { fetchAnyUrl } from "/js/modulejson.js";
const iceCreamContainer = document.getElementById("iceCreamContainer");

async function fetchIceCreamDetails() {
    try {
        const iceCreamDataArray = await fetchAnyUrl(`http://localhost:8080/iceCreams`);
        const row = document.createElement("div");
        row.className = "row";

        iceCreamDataArray.forEach((iceCreamData) => {
            const iceCreamHtml = createIceCreamHtml(iceCreamData);
            row.innerHTML += iceCreamHtml;
        });
        iceCreamContainer.appendChild(row);
    } catch (error) {
        console.error("Error fetching icecream details:", error);
    }
}

//Html for ice creams
function createIceCreamHtml(iceCreamData) {
    const html = `
        <div class="col-lg-4 ice-cream-column" style="background-color: #e1b4b7">
            <a href="iceCreamInfo.html?id=${iceCreamData.iceCreamID}" class="ice-cream-style">
                <img src="${iceCreamData.imageUrl}" class="ice-cream-img" alt="${iceCreamData.name}">
                <h3>${iceCreamData.name}</h3>
            </a>
        </div>
    `;
    return html;
}

fetchIceCreamDetails();
