document.addEventListener('DOMContentLoaded', function () {
    const deleteCustomerIceCreamForm = document.getElementById('delete-Customer-IceCream-form');
    const customerIceCreamIdInput = document.getElementById('customer-IceCream-id');

    // Get customer iceCream ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const customerIceCreamId = urlParams.get('id');

    // Fetch customer iceCream details and populate the form
    async function fetchCustomerIceCreamDetails() {
        try {
            const response = await fetch(`http://localhost:8080/customerIceCreams/${customerIceCreamId}`);
            const customerIceCream = await response.json();

            customerIceCreamIdInput.value = customerIceCream.customerIceCreamID;
        } catch (error) {
            console.error('Error fetching customer ice cream details:', error);
        }
    }

    deleteCustomerIceCreamForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Delete iceCream
        deleteCustomerIceCream();
    });

    async function deleteCustomerIceCream() {
        try {
            const response = await fetch(`http://localhost:8080/customerIceCreams/${customerIceCreamId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Customer icecream deleted successfully!');
                // Redirect to customer icecream management page after successful delete
                window.location.href = 'adminCustomerIceCreamInfo.html';
            } else {
                console.error('Error deleting customer icecream');
            }
        } catch (error) {
            console.error('Error deleting customer icecream:', error);
        }
    }

    // Fetch and populate iceCream details on page load
    fetchCustomerIceCreamDetails();
});
