
const breathCircle = document.getElementById('breathCircle');
const breathText   = document.getElementById('breathText');
const breathPreset = document.getElementById('breathPreset');
const breathStart  = document.getElementById('breathStart');
const breathStop   = document.getElementById('breathStop');

let breathTimer = null;
let phaseIdx = 0; // 

function getDurations() {
  
  const v = breathPreset.value;
  if (v === '4-4-4')  return [4,4,4];
  if (v === '4-7-8')  return [4,7,8];
  return [5,5,5]; 
}
function setPhaseUI(phase){
  if (phase === 0){ 
    breathText.textContent = 'Breathe In';
    breathCircle.style.transform = 'scale(1.25)';
  } else if (phase === 1){
    breathText.textContent = 'Hold';
    breathCircle.style.transform = 'scale(1.25)';
  } else {
    breathText.textContent = 'Breathe Out';
    breathCircle.style.transform = 'scale(0.85)';
  }
}
function startBreathing(){
  stopBreathing();
  const [inhale, hold, exhale] = getDurations();
  const timeline = [inhale, hold, exhale];
  phaseIdx = 0;
  setPhaseUI(phaseIdx);

  let remaining = timeline[phaseIdx];
  breathTimer = setInterval(() => {
    remaining--;
    if (remaining <= 0){
      phaseIdx = (phaseIdx + 1) % 3;
      setPhaseUI(phaseIdx);
      remaining = timeline[phaseIdx];
    }
  }, 1000);
}
function stopBreathing(){
  clearInterval(breathTimer);
  breathTimer = null;
  breathText.textContent = 'Breathe In';
  breathCircle.style.transform = 'scale(1)';
}
breathStart.addEventListener('click', startBreathing);
breathStop.addEventListener('click', stopBreathing);




function makeTimer(displayEl, selectEl, startBtn, pauseBtn, resetBtn, onComplete){
  let seconds = parseInt(selectEl.value,10) * 60;
  let left = seconds;
  let t = null;

  function fmt(s){ const m = Math.floor(s/60), ss = s%60; return `${m}:${ss<10?'0':''}${ss}`; }
  function render(){ displayEl.textContent = fmt(left); }

  function start(){
    if (t) return;
    t = setInterval(() => {
      if (left > 0){ left--; render(); }
      else {
        clearInterval(t); t = null;
        onComplete?.(parseInt(selectEl.value,10)); // minutes
      }
    }, 1000);
  }
  function pause(){ clearInterval(t); t=null; }
  function reset(){ pause(); seconds = parseInt(selectEl.value,10) * 60; left = seconds; render(); }
  function updateFromSelect(){ seconds = parseInt(selectEl.value,10) * 60; left = seconds; render(); }

  startBtn.addEventListener('click', start);
  pauseBtn.addEventListener('click', pause);
  resetBtn.addEventListener('click', reset);
  selectEl.addEventListener('change', updateFromSelect);

  render();
}


const COUNT_KEY = "gb_mind_sessions_v1";
function loadSessions(){
  try { return JSON.parse(localStorage.getItem(COUNT_KEY) || "[]"); }
  catch { return []; }
}
function saveSessions(arr){ localStorage.setItem(COUNT_KEY, JSON.stringify(arr)); }

const sessCountEl = document.getElementById('sessCount');
const sessLogEl   = document.getElementById('sessLog');
const markBtn     = document.getElementById('markSession');
const resetBtn    = document.getElementById('resetSessions');

function renderSessions(){
  const arr = loadSessions();
  sessCountEl.textContent = arr.length;
  sessLogEl.innerHTML = arr.slice(-6).reverse().map(s =>
    `<li>${s.date} — ${s.kind} • ${s.minutes} min</li>`
  ).join('') || '<li>No sessions yet. Finish a timer or click “Add Session”.</li>';
}
function addSession(kind, minutes){
  const arr = loadSessions();
  const now = new Date();
  arr.push({
    kind,
    minutes,
    date: now.toLocaleString([], {year:'numeric', month:'short', day:'2-digit', hour:'2-digit', minute:'2-digit'})
  });
  saveSessions(arr);
  renderSessions();
}

markBtn.addEventListener('click', () => addSession('Manual', 0));
resetBtn.addEventListener('click', () => { saveSessions([]); renderSessions(); });


const medDisplay = document.getElementById('medDisplay');
const medSelect  = document.getElementById('medSelect');
makeTimer(
  medDisplay, medSelect,
  document.getElementById('medStart'),
  document.getElementById('medPause'),
  document.getElementById('medReset'),
  (mins) => addSession('Meditation', mins)
);

const pomoDisplay = document.getElementById('pomoDisplay');
const pomoSelect  = document.getElementById('pomoSelect');
makeTimer(
  pomoDisplay, pomoSelect,
  document.getElementById('pomoStart'),
  document.getElementById('pomoPause'),
  document.getElementById('pomoReset'),
  (mins) => addSession('Pomodoro', mins)
);


const SOUND_FILES = {
  rain:   'sounds/calming-rain-257596.mp3',
  forest: 'sounds/forest.mp3',
  ocean:  'sounds/ocean.mp3'
};
const active = { key: null, audio: null };

function toggleSound(key, button){
  if (active.key === key){
    active.audio?.pause();
    active.audio = null; active.key = null;
    button.classList.remove('active');
    return;
  }

  if (active.audio){
    active.audio.pause();
    document.querySelectorAll('.chip.active').forEach(b => b.classList.remove('active'));
  }
  const audio = new Audio(SOUND_FILES[key]);
  audio.loop = true; audio.volume = 0.6;
  audio.play().catch(()=>{}); 
  active.audio = audio; active.key = key;
  button.classList.add('active');
}
document.querySelectorAll('.chip').forEach(btn => {
  btn.addEventListener('click', () => toggleSound(btn.dataset.sound, btn));
});

renderSessions();

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