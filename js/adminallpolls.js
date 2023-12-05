import {fetchAnyUrl} from "/js/modulejson.js";

const pollContainer = document.getElementById("poll-container");

//Fetch poll data
async function fetchPollDetails() {
    try {
        const pollArray = await fetchAnyUrl(`http://localhost:8080/poll`);
        const row = document.createElement("div");
        row.className = "row";

        pollArray.forEach((pollData) => {
            const pollHtml = createPollHtml(pollData);
            row.innerHTML += pollHtml;
        });
        pollContainer.appendChild(row);
    } catch (error) {
        console.error("Error fetching Suggestion details:", error);
    }
}

//Html for poll
function createPollHtml(pollData) {
    const html = `
        <div class="col-md-4">
            <div class="card" style="margin-bottom: 25px">
                <div class="card-body">
                    <h5 class="card-title">Poll: ${pollData.pollID}</h5>
                    <p class="suggestion-card-font">Start date: ${pollData.startDate}</p>
                    <p class="suggestion-card-font">End date: ${pollData.endDate}</p>
                    <a href="adminPollDetails.html?id=${pollData.pollID}" class="btn btn-outline-dark convertToIceCream">Se afstemningens detaljer</a>
                </div>
            </div>
        </div>
    `;
    return html;
}

fetchPollDetails()