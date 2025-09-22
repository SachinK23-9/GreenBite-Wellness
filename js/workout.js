
const workouts = {
  dumbbells: [
    { name: "💪 Bicep Curls", sets: "3", reps: "12" },
    { name: "🏋️ Shoulder Press", sets: "3", reps: "10-12" },
    { name: "🏋️ Squats", sets: "3", reps: "12" }
  ],
  bands: [
    { name: "🏃 Band Rows", sets: "3", reps: "12" },
    { name: "🏋️ Band Squats", sets: "3", reps: "15" },
    { name: "💪 Band Chest Press", sets: "3", reps: "10-12" }
  ]
};


const equipmentEl = document.getElementById("equipment");
const generateBtn = document.getElementById("generateBtn");
const cardsWrap = document.getElementById("workoutCards");
const searchInput = document.getElementById("searchInput");


const dailyTipEl = document.getElementById("dailyTip");
const markCompleteBtn = document.getElementById("markComplete");
const resetCountBtn = document.getElementById("resetCount");
const workoutCountEl = document.getElementById("workoutCount");

const TIPS = [
  "Warm up for 5–10 minutes before workouts.",
  "Hydrate before, during, and after your session.",
  "Focus on form first, weight second.",
  "Stretch after workouts to aid recovery.",
  "Protein helps muscle repair — include it in meals.",
  "Track progress weekly to stay motivated.",
  "Sleep 7–9 hours for better performance.",
  "Consistency beats intensity — show up!",
  "Breathe steadily; don’t hold your breath.",
  "Listen to your body and avoid overtraining."
];

function pickDailyTip(){
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth()+1)*100 + today.getDate();
  const idx = seed % TIPS.length;
  dailyTipEl.textContent = TIPS[idx];
}

const COUNT_KEY = "gb_workout_count";
function loadCount(){
  const n = parseInt(localStorage.getItem(COUNT_KEY) || "0", 10);
  workoutCountEl.textContent = n;
}
function incCount(){
  const n = parseInt(localStorage.getItem(COUNT_KEY) || "0", 10) + 1;
  localStorage.setItem(COUNT_KEY, String(n));
  loadCount();
}
function resetCount(){
  localStorage.setItem(COUNT_KEY, "0");
  loadCount();
}

function attachTimer(card){
  const svgProg = card.querySelector(".prog");
  const timeEl = card.querySelector(".time");
  const sel = card.querySelector(".duration");
  const start = card.querySelector(".start");
  const pause = card.querySelector(".pause");
  const reset = card.querySelector(".reset");

  const r = 40, circ = 2 * Math.PI * r;
  svgProg.style.strokeDasharray = circ;

  let duration = parseInt(sel.value, 10);
  let timeLeft = duration;
  let timer = null;

  function fmt(s){ const m = Math.floor(s/60), ss = s%60; return `${m}:${ss<10?"0":""}${ss}`; }
  function update(){
    timeEl.textContent = fmt(timeLeft);
    const ratio = timeLeft / duration;
    svgProg.style.strokeDashoffset = circ - (ratio * circ);
    svgProg.style.stroke = ratio > 0.6 ? "#00b894" : ratio > 0.3 ? "#f1c40f" : "#e74c3c";
  }
  function tick(){
    if (timeLeft > 0){ timeLeft--; update(); } else { clearInterval(timer); timer = null; }
  }

  sel.addEventListener("change", () => { duration = parseInt(sel.value,10); timeLeft = duration; update(); });
  start.addEventListener("click", () => { if (!timer) timer = setInterval(tick, 1000); });
  pause.addEventListener("click", () => { clearInterval(timer); timer = null; });
  reset.addEventListener("click", () => { clearInterval(timer); timer = null; timeLeft = duration; update(); });

  update();
}


function renderCards(list){
  cardsWrap.innerHTML = "";
  list.forEach(ex => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${ex.name}</h3>
      <p>Sets: ${ex.sets} • Reps: ${ex.reps}</p>

      <div class="ex-timer">
        <svg width="100" height="100" aria-hidden="true">
          <circle class="bg" r="40" cx="50" cy="50"></circle>
          <circle class="prog" r="40" cx="50" cy="50"></circle>
        </svg>
        <div class="time">0:30</div>
      </div>

      <div class="ex-controls">
        <select class="duration">
          <option value="30">30s</option>
          <option value="45" selected>45s</option>
          <option value="60">60s</option>
        </select>
        <button class="start">Start</button>
        <button class="pause">Pause</button>
        <button class="reset">Reset</button>
      </div>
    `;
    cardsWrap.appendChild(card);
    attachTimer(card);
  });
}


function generate(){
  const base = workouts[equipmentEl.value] || [];
  const q = (searchInput.value || "").trim().toLowerCase();
  const list = q ? base.filter(x => x.name.toLowerCase().includes(q)) : base;

  if (!list.length){
    cardsWrap.innerHTML = `<p>No workouts found.</p>`;
    return;
  }
  renderCards(list);
}


generateBtn.addEventListener("click", generate);


const heroBtn = document.getElementById("heroGenerateBtn");
if (heroBtn){
  heroBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#generator").scrollIntoView({ behavior: "smooth" });
    generate();
  });
}


if (searchInput){
  searchInput.addEventListener("input", generate);
}


pickDailyTip();
loadCount();
markCompleteBtn.addEventListener("click", incCount);
resetCountBtn.addEventListener("click", resetCount);


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