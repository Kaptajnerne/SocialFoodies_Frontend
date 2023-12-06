async function loginUser() {
    //Retrieve data and make it a data object
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const loginData = {
            email: email,
            password: password
        };

        //Make login request with data
        const loginResponse = await fetch('http://localhost:8080/admins/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (loginResponse.ok) {
            console.log("Login successful!");
            window.location.href = "adminIndex.html";
        } else {
            console.error("Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
}

//Event listener for button
document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", loginUser);
});