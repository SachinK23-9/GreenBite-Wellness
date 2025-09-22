
const toast = document.getElementById('toast');
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

const form = document.getElementById('contactForm');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const messageEl = document.getElementById('message');
const formMsg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const msg = messageEl.value.trim();

  if (!name || !email || !msg){
    formMsg.textContent = "Please fill out all fields.";
    formMsg.style.color = "#b91c1c";
    return;
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk){
    formMsg.textContent = "Please enter a valid email address.";
    formMsg.style.color = "#b91c1c";
    return;
  }

  formMsg.textContent = "Thanks! Your message has been sent.";
  formMsg.style.color = "#065f46";
  showToast("Message sent ✅");


  form.reset();
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