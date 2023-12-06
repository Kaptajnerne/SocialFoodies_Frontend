document.addEventListener('DOMContentLoaded', function () {
    const editCustomerIceCreamForm = document.getElementById('edit-Customer-IceCream-form');
    const customerIceCreamIdInput = document.getElementById('customer-IceCream-id');
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const nutsInput = document.getElementById('nuts');
    const veganInput = document.getElementById('vegan');
    const imageUrlInput = document.getElementById('ImageUrl');

    // Get Customer iceCream ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const customerIceCreamId = urlParams.get('id');

    // Fetch Customer iceCream details and populate the form
    async function fetchCustomerIceCreamDetails() {
        try {
            const response = await fetch(`http://localhost:8080/customerIceCreams/${customerIceCreamId}`);
            const customerIceCream = await response.json();

            customerIceCreamIdInput.value = customerIceCream.customerIceCreamID;
            nameInput.value = customerIceCream.name;
            descriptionInput.value = customerIceCream.description;
            nutsInput.checked = customerIceCream.nuts; // use .checked for checkboxes
            veganInput.checked = customerIceCream.vegan; // use .checked for checkboxes
            imageUrlInput.value = customerIceCream.imageUrl; // Corrected variable name
        } catch (error) {
            console.error('Error fetching customer ice cream details:', error);
        }
    }

    editCustomerIceCreamForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const updatedCustomerIceCream = {
            name: nameInput.value,
            description: descriptionInput.value,
            nuts: nutsInput.checked,
            vegan: veganInput.checked,
            imageUrl: imageUrlInput.value // Corrected variable name
        };

        // Update iceCream details
        updateCustomerIceCream(updatedCustomerIceCream);
    });

    async function updateCustomerIceCream(updatedCustomerIceCream) {
        try {
            const response = await fetch(`http://localhost:8080/customerIceCreams/${customerIceCreamId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCustomerIceCream)
            });

            if (response.ok) {
                alert('Customer IceCream details updated successfully!');
                // Redirect to iceCream management page after successful update
                window.location.href = 'adminCustomerIceCreamInfo.html?id=' + customerIceCreamId;
            } else {
                console.error('Error updating customer iceCream details');
            }
        } catch (error) {
            console.error('Error updating customer iceCream details:', error);
        }
    }

    // Fetch and populate iceCream details on page load
    fetchCustomerIceCreamDetails();
});
