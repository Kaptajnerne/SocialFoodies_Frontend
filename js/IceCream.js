// iceCream.js

// Function to fetch and render ice cream data
function renderIceCreams() {
    fetch('http://localhost:8080/iceCreams')
        .then(response => response.json())
        .then(data => {
            const iceCreamContainer = document.getElementById('iceCreamContainer');
            data.forEach((iceCream, index) => {
                const iceCreamColumn = document.createElement('div');
                iceCreamColumn.classList.add('col-lg-4', 'ice-cream-column');
                iceCreamColumn.style.backgroundColor = getRandomColor(); // Use a function to get random background color

                const iceCreamStyle = document.createElement('div'); // Changed from 'a' to 'div' for simplicity
                iceCreamStyle.classList.add('ice-cream-style');

                const iceCreamTitle = document.createElement('h3');
                iceCreamTitle.textContent = iceCream.name;

                const iceCreamImage = document.createElement('img');
                iceCreamImage.src = iceCream.movieImageUrl; // Assuming movieImageUrl is the correct attribute name
                iceCreamImage.alt = iceCream.name + ' Image';

                iceCreamImage.style.width = '200px'; // Adjust this value according to your needs
                iceCreamImage.style.height = '200px';

                iceCreamStyle.appendChild(iceCreamTitle);
                iceCreamStyle.appendChild(iceCreamImage); // Add the image element
                iceCreamColumn.appendChild(iceCreamStyle);
                iceCreamContainer.appendChild(iceCreamColumn);

                // Check if the index is a multiple of 3 (3 ice creams per row)
                if ((index + 1) % 3 === 0) {
                    iceCreamContainer.appendChild(document.createElement('div'));
                }
            });
        })
        .catch(error => console.error('Error fetching ice cream data:', error));
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', renderIceCreams);

// Function to generate a random background color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
