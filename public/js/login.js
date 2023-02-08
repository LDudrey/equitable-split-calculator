// Handles the user input for the login form
const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/api/profile");
    } else {
      alert("Failed to log in.");
    }
  }
};

// Handles the user input for the signup form
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/api/profile");
    } else {
      alert("Failed to sign up.");
    }
  }
};

// EventListener for login submit button
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

// EventListener for signup submit button
document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
