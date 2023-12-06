document.addEventListener('DOMContentLoaded', function () {
    const editIceCreamForm = document.getElementById('edit-iceCream-form');
    const iceCreamIdInput = document.getElementById('iceCream-id');
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const nutsInput = document.getElementById('nuts');
    const veganInput = document.getElementById('vegan');
    const imageUrlInput = document.getElementById('ImageUrl');

    const urlParams = new URLSearchParams(window.location.search);
    const iceCreamId = urlParams.get('id');

    //Fetch iceCream details and populate the form
    async function fetchIceCreamDetails() {
        try {
            const response = await fetch(`http://localhost:8080/iceCreams/${iceCreamId}`);
            const iceCream = await response.json();

            iceCreamIdInput.value = iceCream.iceCreamID;
            nameInput.value = iceCream.name;
            descriptionInput.value = iceCream.description;
            nutsInput.checked = iceCream.nuts;
            veganInput.checked = iceCream.vegan;
            imageUrlInput.value = iceCream.imageUrl;
        } catch (error) {
            console.error('Error fetching ice cream details:', error);
        }
    }

    editIceCreamForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const updatedIceCream = {
            name: nameInput.value,
            description: descriptionInput.value,
            nuts: nutsInput.checked,
            vegan: veganInput.checked,
            imageUrl: imageUrlInput.value
        };

        updateIceCream(updatedIceCream);
    });

    async function updateIceCream(updatedIceCream) {
        try {
            const response = await fetch(`http://localhost:8080/iceCreams/${iceCreamId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedIceCream)
            });

            if (response.ok) {
                alert('IceCream details updated successfully!');
                window.location.href = 'adminIceCreamInfo.html?id=' + iceCreamId;
            } else {
                console.error('Error updating iceCream details');
            }
        } catch (error) {
            console.error('Error updating iceCream details:', error);
        }
    }

    fetchIceCreamDetails();
});
