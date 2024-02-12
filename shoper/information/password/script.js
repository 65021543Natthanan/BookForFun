var currentUser = {
    email: "user@example.com",
    password: "initialPassword"
};

// Set initial values in the form
document.getElementById('editEmail').value = currentUser.email;
document.getElementById('editPassword').value = currentUser.password;

// Function to save user data
function saveUserData() {
    // Get data from the form
    var editedEmail = document.getElementById('editEmail').value;
    var editedPassword = document.getElementById('editPassword').value;

    // Update user object
    currentUser.email = editedEmail;
    currentUser.password = editedPassword;

    // Here you can send the updated user data to the server or update it in your database
    // For this example, we'll just log the updated data
    console.log("Updated User Data:", currentUser);

    // Optionally, you can display a success message to the user
    alert("User data updated successfully!");
}
function togglePassword() {
    var passwordInput = document.getElementById('editPassword');
    var passwordButton = document.querySelector('#editUserForm button');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordButton.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        passwordButton.textContent = 'Show';
    }
}