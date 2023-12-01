document.addEventListener('DOMContentLoaded', function () {
    const createIceCreamForm = document.getElementById('create-ice-cream-form');

    createIceCreamForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(createIceCreamForm);
        const iceCreamData = {
            name: formData.get('ice-cream-name'),
            description: formData.get('ice-cream-description'),
            vegan: formData.get('ice-cream-vegan') === 'true',
            nuts: formData.get('ice-cream-nuts') === 'true',
            imageUrl: formData.get('ice-cream-image-url')
        };

        try {
            const response = await fetch('http://localhost:8080/iceCreams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(iceCreamData),
            });

            if (response.ok) {
                alert('Ice Cream created successfully');
                createIceCreamForm.reset();
                window.location.href = 'adminIceCreams.html';
            } else {
                console.error('Error creating Ice Cream');
            }
        } catch (error) {
            console.error('Error creating Ice Cream:', error);
        }
    });
});
