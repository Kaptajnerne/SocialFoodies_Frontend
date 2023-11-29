import {fetchAnyUrl} from "/js/modulejson.js";

const movieInfoContainer = document.getElementById("poll-container");
const urlParams = new URLSearchParams(window.location.search);
const pollID = urlParams.get('id');

//Fetch poll details and create HTML for poll options
async function fetchPollDetails() {
    try {
        const pollDataArray = await fetchAnyUrl(`http://localhost:8080/poll/${pollID}`);
        const row = document.createElement("div");
        row.className = "row";

        pollDataArray.forEach((pollData) => {
            const pollHtml = createPollHtml(pollData);
            row.innerHTML += pollHtml;
        });
        movieInfoContainer.appendChild(row);
    } catch (error) {
        console.error("Error fetching poll details:", error);
    }
}

//HTML for poll options
function createPollHtml(pollData) {
    let html = '';

    if (pollData.iceCream !== null) {
        html = `
            <div class="col-lg-4">
                <div class="ice-cream-vote" style="background-color: #fff7c5;">
                    <img src="${pollData.iceCream.imageUrl}" class="ice-cream-img" alt="">
                    <h3>${pollData.iceCream.name}</h3>
                    <p>${pollData.iceCream.description}</p>
                    <p>Vegansk: ${pollData.iceCream.vegan}</p>
                    <p>Nødder: ${pollData.iceCream.nuts}</p>
                    <button class="btn btn-dark" pollOption-id="${pollData.pollOptionID}">Stem</button>
                </div>
            </div>
        `;
    } else if (pollData.customerIceCream !== null) {
        html = `
            <div class="col-lg-4">
                <div class="ice-cream-vote" style="background-color: #fff7c5;">
                    <img src="${pollData.customerIceCream.imageUrl}" class="ice-cream-img" alt="">
                    <h3>${pollData.customerIceCream.name}</h3>
                    <p>${pollData.customerIceCream.description}</p>
                    <p>Vegansk: ${pollData.customerIceCream.vegan}</p>
                    <p>Nødder: ${pollData.customerIceCream.nuts}</p>
                    <button class="btn btn-dark" pollOption-id="${pollData.pollOptionID}">Stem</button>
                </div>
            </div>
        `;
    }
    return html;
}

console.log("Poll id: " + pollID);
fetchPollDetails();


//Open modal
function openVoteModal(pollOptionID) {
    document.getElementById('pollOptionID').value = pollOptionID;
    $('#voteModal').modal('show'); // Open the modal
}

//Handle vote submission
async function submitVote() {
    const email = document.getElementById('email').value;
    const pollOptionID = document.getElementById('pollOptionID').value;

    try {
        const response = await fetch(`http://localhost:8080/poll/${pollOptionID}/${email}/${pollID}`, {
            method: 'POST',
        });

        if (response.ok) {
            $('#voteModal').modal('hide');
            alert('Tak for din stemme!');
        } else {
            alert('Der skete en fejl. Prøv en gang til');
        }
    } catch (error) {
        console.error('Der skete en fejl i indsendningen af stemmen:', error);
    }
}

// Event listener to open vote modal
movieInfoContainer.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('btn-dark')) {
        const pollOptionID = event.target.getAttribute('pollOption-id');
        openVoteModal(pollOptionID);
    }
});

//Handles the vote submission when the "Send Stemme" button is clicked
document.getElementById('submitVote').addEventListener('click', submitVote);


