const submitButton = document.getElementById("submitButton");

async function submitForm() {
    // Get the form element
    const iceCreamForm = document.getElementById("iceCreamForm");

    const formData = {
        name: iceCreamForm.querySelector("#iceCreamName").value,
        description: iceCreamForm.querySelector("#description").value,
        vegan: iceCreamForm.querySelector("#isVegan").checked,
        nuts: iceCreamForm.querySelector("#containsNuts").checked,
        email: iceCreamForm.querySelector("#email").value,
    };

    try {
        const response = await fetch("http://localhost:8080/suggestion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const responseData = await response.json();

        if (response.ok) {
            alert("Ice cream suggestion submitted successfully!");
            iceCreamForm.reset();
            setTimeout(function () {
                window.location.href = 'iceCreamSuggestion.html';
            });
        } else {
            alert(`Error submitting ice cream suggestion. Server response: ${response.status} - ${responseData.message}`);
            console.error('Error creating movie');
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while submitting the form. Please try again later.");
    }
}

submitButton.addEventListener("click", submitForm);
