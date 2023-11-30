// Add an event listener to the login button
document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", loginUser);
});

// Function to handle the login process
async function loginUser() {
    // Retrieve the email and password from the input fields
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Perform any necessary validation before making a request

    try {
        const loginData = {
            email: email,
            password: password
        };

        // Use the fetch API to make the login request with POST method
        const loginResponse = await fetch('http://localhost:8080/admins/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (loginResponse.ok) {
            // Login successful
            console.log("Login successful!");

            // Redirect the user to a page indicating successful login
            window.location.href = "adminIndex.html";
        } else {
            // Handle login failure
            console.error("Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
}
