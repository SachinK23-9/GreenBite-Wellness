
const quotes = [
  "Nourish your body, calm your mind, elevate your spirit.",
  "Take care of your body. It's the only place you have to live.",
  "Healthy habits are the key to a happy life.",
  "Eat well, move daily, stay positive, live fully."
];

let quoteIndex = 0;
const quoteText = document.getElementById('quote-text');

setInterval(() => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  quoteText.style.opacity = 0;
  setTimeout(() => {
    quoteText.textContent = quotes[quoteIndex];
    quoteText.style.opacity = 1;
  }, 800);
}, 3000);


document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
});


const tips = [
  "Start your day with a large glass of water to jumpstart your metabolism.",
  "Set hourly reminders to drink water regularly throughout the day.",
  "Add lemon, cucumber, or mint for a refreshing flavor boost.",
  "Drink a glass of water 30 minutes before each meal to aid digestion.",
  "Use a bottle with measurements to track your daily intake.",
  "Snack on water-rich foods like cucumber, oranges, and watermelon.",
  "Swap soda with sparkling water for hydration without the sugar.",
  "Stay hydrated before, during, and after your workouts."
];

let tipIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
  const tipElement = document.getElementById("tip-text");

 
  tipElement.classList.add("fade", "show");

  function rotateTips() {
  
    tipElement.classList.remove("show");

    
    setTimeout(() => {
      tipIndex = (tipIndex + 1) % tips.length;
      tipElement.textContent = tips[tipIndex];
      tipElement.classList.add("show"); 
    }, 500);
  }

  setInterval(rotateTips, 3000);
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

