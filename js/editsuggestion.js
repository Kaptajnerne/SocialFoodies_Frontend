document.addEventListener('DOMContentLoaded', function () {
    const editSuggestionForm = document.getElementById('edit-suggestion-form');
    const suggestionIdInput = document.getElementById('suggestion-id');
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const veganInput = document.getElementById('vegan');
    const nutsInput = document.getElementById('nuts');

    // Get suggestion ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const iceCreamSuggestionID = urlParams.get('id');

    // Fetch suggestion details and populate the form
    async function fetchSuggestionDetails() {
        try {
            const response = await fetch(`http://localhost:8080/suggestion/${iceCreamSuggestionID}`);
            const suggestion = await response.json();

            suggestionIdInput.value = suggestion.id;
            nameInput.value = suggestion.name;
            descriptionInput.value = suggestion.description;
            nutsInput.checked = suggestion.nuts;
            veganInput.checked = suggestion.vegan;
        } catch (error) {
            console.error('Error fetching suggestion details:', error);
        }
    }

    editSuggestionForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const updatedSuggestinon = {
            name: nameInput.value,
            description: descriptionInput.value,
            nuts: nutsInput.checked,
            vegan: veganInput.checked
        };

        // Update iceCream details
        updateSuggestion(updatedSuggestinon);
    });

    async function updateSuggestion(updatedSuggestion) {
        try {
            const response = await fetch(`http://localhost:8080/iceCreams/${iceCreamSuggestionID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedSuggestion)
            });

            if (response.ok) {
                alert('Suggestion details updated successfully!');
                window.location.href = 'adminIceCreamSuggestion.html';
            } else {
                console.error('Error updating suggestion details');
            }
        } catch (error) {
            console.error('Error updating suggestion details:', error);
        }
    }

    // Fetch and populate iceCream details on page load
    fetchSuggestionDetails();
});
