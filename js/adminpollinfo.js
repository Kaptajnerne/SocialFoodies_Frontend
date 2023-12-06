import { fetchAnyUrl } from "/js/modulejson.js";

const pollContainer = document.getElementById("poll-container");
const pollOptionsContainer = document.getElementById("poll-options-container");
const urlParams = new URLSearchParams(window.location.search);
const pollID = urlParams.get('id');

function createPollInfoHtml(pollData, pollOptionsData) {
    let pollOptionsHtml = "";

    pollOptionsData.forEach((pollOptionData) => {
        pollOptionsHtml += createPollOptionsHtml(pollOptionData);
    });

    return `
        <div class="row">
            <div class="col-lg-3">
                <h1>Poll: ${pollData.pollID}</h1>
                <h5>Start date: ${pollData.startDate}</h5>
                <h5>End date: ${pollData.endDate}</h5>
            </div>
            <div class="col-lg-9" id="poll-options-container">
                <div class="row">
                    ${pollOptionsHtml}
                </div>
            </div>
        </div>
    `;

}

// Fetch poll details and poll options when the page loads
async function fetchPollDetails() {
    try {
        const pollData = await fetchAnyUrl(`http://localhost:8080/poll/${pollID}`);
        const pollOptionsData = await fetchAnyUrl(`http://localhost:8080/pollOption/poll/${pollID}`);
        const pollInfoHtml = createPollInfoHtml(pollData, pollOptionsData);
        pollContainer.innerHTML = pollInfoHtml;
    } catch (error) {
        console.error("Error fetching poll details:", error);
    }
}

//HTML for pollOption details
function createPollOptionsHtml(pollOptionData) {
    let html = "";
    if (pollOptionData.iceCream !== null) {
        html = `
            <div class="col-lg-4 card" style="margin: 0px;"> <!-- Få noget margin mellem hver card, uden det går ned på næste række. col-lg-3 er måske for småt-->
                <div class="card-body">
                    <img src="${pollOptionData.iceCream.imageUrl}" class="ice-cream-img" alt="">
                    <h3>${pollOptionData.iceCream.name}</h3>
                    <p>${pollOptionData.iceCream.description}</p>
                    <p>Vegansk: ${pollOptionData.iceCream.vegan}</p>
                    <p>Nødder: ${pollOptionData.iceCream.nuts}</p>
                    <p style="font-weight: bold">Total votes: ${pollOptionData.totalVotes}</p>
                </div>
            </div>
        `;
    } else if (pollOptionData.customerIceCream !== null) {
        html = `
            <div class="col-lg-4 card" style="margin: 5px">
                <div class="card-body">
                    <img src="${pollOptionData.customerIceCream.imageUrl}" class="ice-cream-img" alt="">
                    <h3>${pollOptionData.customerIceCream.name}</h3>
                    <p style="font-size: 15px">${pollOptionData.customerIceCream.customer.email}</p>
                    <p>${pollOptionData.customerIceCream.description}</p>
                    <p>Vegansk: ${pollOptionData.customerIceCream.vegan}</p>
                    <p>Nødder: ${pollOptionData.customerIceCream.nuts}</p>
                </div>
            </div>
        `;
    }
    return html;
}

fetchPollDetails();
