//Fetch the current poll ID
async function getCurrentPollID() {
    try {
        const response = await fetch('http://localhost:8080/poll/currentPollID');
        if (response.ok) {
            const pollID = await response.text();
            return pollID;
        } else {
            throw new Error('Failed to fetch current poll ID');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function updateHTMLCustomer() {
    const currentPollID = await getCurrentPollID();
    if (currentPollID !== null) {
        //Update link to customer poll
        const customerLink = document.getElementById("current-poll-customer");
        customerLink.href = `iceCreamPoll.html?id=${currentPollID}`;
    }
}
async function updateHTMLHeader() {
    const currentPollID = await getCurrentPollID();
    if (currentPollID !== null) {
        //Update link to customer poll
        const customerLink = document.getElementById("current-poll-header");
        customerLink.href = `iceCreamPoll.html?id=${currentPollID}`;
    }
}

async function updateHTMLAdmin() {
    const currentPollID = await getCurrentPollID();
    if (currentPollID !== null) {
        //Update link to admin current poll
        const adminLink = document.getElementById("current-poll-admin");
        adminLink.href = `adminPollDetails.html?id=${currentPollID}`;
    }
}

window.addEventListener("DOMContentLoaded", updateHTMLCustomer);
window.addEventListener("DOMContentLoaded", updateHTMLAdmin);
window.addEventListener("DOMContentLoaded", updateHTMLHeader);