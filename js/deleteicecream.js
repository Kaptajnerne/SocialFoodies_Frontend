document.addEventListener('DOMContentLoaded', function () {
    const deleteIceCreamForm = document.getElementById('delete-iceCream-form');
    const iceCreamIdInput = document.getElementById('iceCream-id');

    // Get iceCream ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const iceCreamId = urlParams.get('id');

    // Fetch iceCream details and populate the form
    async function fetchIceCreamDetails() {
        try {
            const response = await fetch(`http://localhost:8080/iceCreams/${iceCreamId}`);
            const iceCream = await response.json();

            iceCreamIdInput.value = iceCream.iceCreamID;
        } catch (error) {
            console.error('Error fetching ice cream details:', error);
        }
    }

    deleteIceCreamForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Delete iceCream
        deleteIceCream();
    });

    async function deleteIceCream() {
        try {
            const response = await fetch(`http://localhost:8080/iceCreams/${iceCreamId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('IceCream deleted successfully!');
                // Redirect to iceCream management page after successful delete
                window.location.href = 'adminIceCreamInfo.html';
            } else {
                console.error('Error deleting iceCream');
            }
        } catch (error) {
            console.error('Error deleting iceCream:', error);
        }
    }

    // Fetch and populate iceCream details on page load
    fetchIceCreamDetails();
});
