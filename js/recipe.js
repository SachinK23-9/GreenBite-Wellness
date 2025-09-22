// Modal logic
function openModal(id) {
  document.getElementById(id).style.display = "flex";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}



const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const cards = document.querySelectorAll('.recipe-card');

function filterRecipes() {
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  cards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const matchSearch = title.includes(search);
    const matchCategory = category === "all" || card.textContent.toLowerCase().includes(category);

    if (matchSearch && matchCategory) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
});




document.getElementById("newsletter-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("newsletter-email").value;
  
  if (email) {
    localStorage.setItem("newsletterEmail", email);
    document.getElementById("newsletter-msg").textContent = "✅ Thanks for subscribing!";
    document.getElementById("newsletter-form").reset();
  }
});


console.log("GreenBite page loaded");




