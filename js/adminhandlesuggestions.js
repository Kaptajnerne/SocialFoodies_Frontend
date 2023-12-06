import {fetchAnyUrl} from "/js/modulejson.js";

const suggestionContainer = document.getElementById("suggestion-container");

//Fetch Suggestion data
async function fetchSuggestionDetails() {
    try {
        const suggestionDataArray = await fetchAnyUrl(`http://localhost:8080/suggestion`);
        const row = document.createElement("div");
        row.className = "row";

        suggestionDataArray.forEach((suggestionData) => {
            const suggestionHtml = createSuggestionHtml(suggestionData);
            row.innerHTML += suggestionHtml;
        });
        suggestionContainer.appendChild(row);
    } catch (error) {
        console.error("Error fetching Suggestion details:", error);
    }
}

//Html for suggestions
function createSuggestionHtml(suggestionData) {
    const html = `
        <div class="col-md-4">
            <div class="card" style="margin-bottom: 25px">
                <div class="card-body">
                    <h5 class="card-title">${suggestionData.name}</h5>
                    <p style="font-size: 15px">${suggestionData.customer.email}</p>
                    <p class="suggestion-card-font">Beskrivelse: ${suggestionData.description}</p>
                    <p class="suggestion-card-font">Vegansk: ${suggestionData.vegan}</p>
                    <p class="suggestion-card-font">Nødder: ${suggestionData.nuts}</p>
                    <button class="btn btn-outline-dark convertToIceCream" data-suggestion='${JSON.stringify(suggestionData)}'>Konverter til kundeis</button>
                    <a href="editSuggestion.html?id=${suggestionData.iceCreamSuggestionID}" class="btn btn-outline-secondary">Rediger</a>
                    <button class="btn btn-outline-danger deleteSuggestion" data-suggestion-id="${suggestionData.iceCreamSuggestionID}">Slet</button>
                </div>
                </div>
            </div>
        </div>
    `;
    return html;

}

suggestionContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("deleteSuggestion")) {
        const suggestionId = event.target.getAttribute("data-suggestion-id");
        const confirmed = confirm("Er du sikker på, at du vil slette denne is-anbefaling?");

        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:8080/suggestion/${suggestionId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("Is-anbefaling slettet!");
                    // Reload the suggestions after deletion
                    window.location.href = 'adminIceCreamSuggestion.html';
                } else {
                    console.error("Error deleting suggestion");
                }
            } catch (error) {
                console.error("Error deleting suggestion:", error);
            }
        }
    }
});



async function convertToIceCream(suggestionData) {
    //Collect data
    const customerIceCreamData = {
        name: suggestionData.name,
        description: suggestionData.description,
        vegan: suggestionData.vegan,
        nuts: suggestionData.nuts,
        imageUrl: "https://paradis-is.dk/wp-content/uploads/2018/08/billede-er-pacc8a-vej_768x590-kopi-300x230.png",
    };
    //Send data in with AJAX
    try {
        const response = await fetch(`http://localhost:8080/customerIceCreams/${suggestionData.customer.customerID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customerIceCreamData),
        });

        if (response.ok) {
            console.log("Suggestion converted to customer ice cream successfully.");
            alert("Anbefalinger blev lavet til en kundeis");
            setTimeout(function () {
                window.location.href = "adminIceCreamSuggestion.html";
            })
        } else {
            console.error("Failed to convert suggestion to customer ice cream.");
            alert("Fejl. Anbefalingen blev ikke lavet til en kundeis");
        }
    } catch (error) {
        console.error("Error converting suggestion to customer ice cream:", error);
        alert("Fejl. Anbefalingen blev ikke lave til en kundeis");
    }
}

//Event listener to convert button
suggestionContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("convertToIceCream")) {
        const suggestionData = JSON.parse(event.target.getAttribute("data-suggestion"));
        convertToIceCream(suggestionData);
    } else if (event.target.classList.contains("editSuggestion")) {
        const suggestionId = event.target.getAttribute("data-suggestion-id");
        editSuggestion(suggestionId);
    }
});


fetchSuggestionDetails();
