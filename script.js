function openmenu() {
  window.location.href = 'menu.html';
}

function openprofile() {
  window.location.href = 'profile-page.html';
}
function about() {
  window.location.href = 'about.html';
}

function open_orders() {
  window.location.href = 'your-orders.html';
}

function opensignup() {
  window.location.href = 'signup.html';
}

function openlogin() {
  window.location.href = 'login.html';
}

// Example: Add click event to navigate or log a message when a card is clicked
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".account-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      console.log(`${card.querySelector("h2").textContent} clicked`);
      // Navigate to a specific page if needed
      // Example: window.location.href = "/orders.html";
    });
  });
});
