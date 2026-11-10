/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 10: Vijayanagar & Bahmani Kingdoms (1336 AD – 1646 AD)
 */

// --- THEME TOGGLE (LIGHT / DARK) ---
const themeToggleBtn = document.getElementById('themeToggleBtn');

function initTheme() {
  const savedTheme = localStorage.getItem('lucent_theme') || 'dark';
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = '<i data-lucide="moon" class="w-4 h-4 text-slate-700"></i>';
      themeToggleBtn.title = "Switch to Dark Theme";
    }
    localStorage.setItem('lucent_theme', 'light');
  } else {
    document.body.classList.remove('light-theme');
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = '<i data-lucide="sun" class="w-4 h-4 text-amber-400"></i>';
      themeToggleBtn.title = "Switch to White Theme";
    }
    localStorage.setItem('lucent_theme', 'dark');
  }
  lucide.createIcons();
}

themeToggleBtn?.addEventListener('click', () => {
  const isLight = document.body.classList.contains('light-theme');
  applyTheme(isLight ? 'dark' : 'light');
});

// --- FULL DETAIL IMAGE LIGHTBOX VIEWER ---
let currentZoom = 1;
let isPanning = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;

const lightboxModal = document.getElementById('fullImageViewerModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const zoomLevelDisplay = document.getElementById('zoomLevelDisplay');
const lightboxViewport = document.getElementById('lightboxViewport');

function openFullImageViewer(src, title, desc) {
  if (!lightboxModal) return;
  lightboxImg.src = src;
  lightboxTitle.textContent = title;
  lightboxDescription.innerHTML = desc;
  
  currentZoom = 1;
  translateX = 0;
  translateY = 0;
  updateImageTransform();
  
  lightboxModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeFullImageViewer() {
  if (!lightboxModal) return;
  lightboxModal.classList.remove('active');
  document.body.style.overflow = '';
}

function updateImageTransform() {
  if (!lightboxImg) return;
  lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
  if (zoomLevelDisplay) {
    zoomLevelDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
  }
}

document.getElementById('zoomInBtn')?.addEventListener('click', () => {
  if (currentZoom < 4) {
    currentZoom += 0.25;
    updateImageTransform();
  }
});

document.getElementById('zoomOutBtn')?.addEventListener('click', () => {
  if (currentZoom > 0.5) {
    currentZoom -= 0.25;
    updateImageTransform();
  }
});

document.getElementById('zoomResetBtn')?.addEventListener('click', () => {
  currentZoom = 1;
  translateX = 0;
  translateY = 0;
  updateImageTransform();
});

document.getElementById('closeLightboxBtn')?.addEventListener('click', closeFullImageViewer);

lightimageViewModalEvents: {
  lightboxViewport?.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      if (currentZoom < 4) currentZoom += 0.15;
    } else {
      if (currentZoom > 0.6) currentZoom -= 0.15;
    }
    updateImageTransform();
  });

  lightboxViewport?.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isPanning = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    lightboxViewport.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateImageTransform();
  });

  window.addEventListener('mouseup', () => {
    isPanning = false;
    if (lightboxViewport) lightboxViewport.style.cursor = 'grab';
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightboxModal?.classList.contains('active')) {
    closeFullImageViewer();
  }
});

// --- CHAPTER DROPDOWN ---
const chapterSelectorBtn = document.getElementById('chapterSelectorBtn');
const chapterDropdown = document.getElementById('chapterDropdown');

chapterSelectorBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  chapterDropdown?.classList.toggle('hidden');
});

document.addEventListener('click', () => {
  chapterDropdown?.classList.add('hidden');
});

// --- SEARCH MODAL LOGIC ---
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearchBtn = document.getElementById('closeSearchBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const searchData = [
  { term: "Harihara & Bukka", desc: "Brothers who founded the Vijayanagar Empire in 1336 AD under the spiritual guidance of sage Vidyaranya of Sringeri." },
  { term: "Krishnadeva Raya", desc: "Greatest monarch of Vijayanagar (Tuluva dynasty, 1509–1529 AD); titled 'Andhra Bhoja'; author of Amuktamalyada; patron of Ashtadiggajas (including Tenali Rama and Allasani Peddana)." },
  { term: "Battle of Talikota (1565)", desc: "Fought on 23 January 1565 between Vijayanagar (led by Rama Raya) and the combined Deccan Sultanates (Bijapur, Golconda, Ahmadnagar, Bidar); led to the total ruin of Hampi." },
  { term: "Nayankara System", desc: "Feudal military administrative system of Vijayanagar where military chiefs (Nayakas or Poligars) were assigned revenue territories (Amaram) in exchange for troops." },
  { term: "Ayagar System", desc: "Village administrative system in Vijayanagar consisting of a body of 12 hereditary functionaries (Ayagars) governing village affairs." },
  { term: "Mahmud Gawan", desc: "Renowned Prime Minister of the Bahmani Kingdom; founded the famous 3-storey Islamic College (Madarsa) at Bidar; executed unjustly in 1481 AD." },
  { term: "Gol Gumbaz of Bijapur", desc: "Mausoleum of Muhammad Adil Shah built in 1656 AD; features the world's second-largest unsupported dome and a legendary acoustic Whispering Gallery." },
  { term: "Charminar of Hyderabad", desc: "Magnificent four-minaret monument constructed in 1591 AD by Muhammad Quli Qutb Shah of Golconda to commemorate the end of a deadly plague epidemic." }
];

searchBtn?.addEventListener('click', () => {
  searchModal.classList.remove('hidden');
  searchModal.classList.add('flex');
  searchInput.focus();
});

closeSearchBtn?.addEventListener('click', () => {
  searchModal.classList.add('hidden');
  searchModal.classList.remove('flex');
});

searchModal?.addEventListener('click', (e) => {
  if (e.target === searchModal) {
    searchModal.classList.add('hidden');
    searchModal.classList.remove('flex');
  }
});

searchInput?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  if (!query) {
    searchResults.innerHTML = '<p class="text-slate-500 text-center py-4">Type a keyword to search across this module...</p>';
    return;
  }
  const filtered = searchData.filter(item => 
    item.term.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
  );
  if (filtered.length === 0) {
    searchResults.innerHTML = '<p class="text-slate-500 text-center py-4">No matching facts found.</p>';
    return;
  }
  searchResults.innerHTML = filtered.map(item => `
    <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/40 transition-all">
      <div class="font-heading text-amber-300 font-bold">${item.term}</div>
      <div class="text-slate-300 text-xs mt-1 leading-relaxed">${item.desc}</div>
    </div>
  `).join('');
});

// --- 3D FLASHCARD DECK (ACTIVE RECALL) ---
const flashcards = [
  {
    q: "Which Italian traveler visited the Vijayanagar Empire during the reign of Devaraya I in 1420 AD?",
    a: "Nicolo Conti, who provided an eye-witness account of the festival of Navaratri and the city's impregnable walls."
  },
  {
    q: "Who was the court poet titled 'Andhra Kavita Pitamaha' (Grandfather of Telugu Poetry) in Krishnadeva Raya's court?",
    a: "Allasani Peddana, author of the celebrated Telugu Kavya 'Manucharitam'."
  },
  {
    q: "Name the seminal political treatise composed in Telugu by Emperor Krishnadeva Raya.",
    a: "'Amuktamalyada' (story of Andal and statecraft advice for kings)."
  },
  {
    q: "Which Portuguese traveler described Krishnadeva Raya as 'a king who is loved and respected by all... chivalrous and gallant'?",
    a: "Domingo Paes, who visited Vijayanagar in 1520–1522 AD."
  },
  {
    q: "Which one of the five Deccan Sultanates did NOT participate in the Battle of Talikota against Vijayanagar?",
    a: "Berar (ruled by the Imad Shahi dynasty) did not take part due to enmity with Ahmadnagar."
  },
  {
    q: "What was the standard gold coin of the Vijayanagar Empire called by contemporary foreign merchants?",
    a: "Varaha (or Pagoda in European accounts), depicting images of Vishnu or bull/eagle."
  },
  {
    q: "Who was the ruler of Golconda who founded the city of Hyderabad and erected the Charminar in 1591 AD?",
    a: "Muhammad Quli Qutb Shah, who was also an accomplished Dakhani Urdu poet."
  },
  {
    q: "Which Bahmani sultan shifted the capital from Gulbarga to Bidar in 1424 AD?",
    a: "Ahmad Shah Wali, also renowned as 'Wali' (Saint) for his Sufi associations."
  }
];

let currentCardIdx = 0;
let isFlipped = false;

const flashcardInner = document.getElementById('flashcardInner');
const cardFrontText = document.getElementById('cardFrontText');
const cardBackText = document.getElementById('cardBackText');
const flashcardCountDisplay = document.getElementById('flashcardCountDisplay');
const prevCardBtn = document.getElementById('prevCardBtn');
const nextCardBtn = document.getElementById('nextCardBtn');

function updateFlashcardUI() {
  if (!cardFrontText) return;
  flashcardInner.classList.remove('flipped');
  isFlipped = false;
  const item = flashcards[currentCardIdx];
  cardFrontText.textContent = item.q;
  cardBackText.textContent = item.a;
  flashcardCountDisplay.textContent = `Card ${currentCardIdx + 1} of ${flashcards.length}`;
}

function toggleFlashcardFlip() {
  isFlipped = !isFlipped;
  flashcardInner.classList.toggle('flipped', isFlipped);
}

prevCardBtn?.addEventListener('click', () => {
  currentCardIdx = (currentCardIdx - 1 + flashcards.length) % flashcards.length;
  updateFlashcardUI();
});

nextCardBtn?.addEventListener('click', () => {
  currentCardIdx = (currentCardIdx + 1) % flashcards.length;
  updateFlashcardUI();
});

// --- 5-QUESTION PRELIMS MOCK QUIZ ---
const quizQuestions = [
  {
    q: "The Vijayanagar Empire was founded in 1336 AD during the reign of which Delhi Sultan?",
    options: [
      "Alauddin Khalji",
      "Ghiyasuddin Tughlaq",
      "Muhammad bin Tughlaq",
      "Firoz Shah Tughlaq"
    ],
    correct: 2,
    explanation: "Harihara and Bukka broke away from the service of Muhammad bin Tughlaq in 1336 AD to declare independence on the Tungabhadra."
  },
  {
    q: "The Ashtadiggajas (Eight Literary Pillars) of Telugu literature were patronized by:",
    options: [
      "Devaraya II",
      "Krishnadeva Raya",
      "Harihara II",
      "Rajaraja Chola"
    ],
    correct: 1,
    explanation: "Krishnadeva Raya's court (the Bhuvanavijayam) was adorned by eight Telugu poetic giants including Peddana and Tenali Ramakrishna."
  },
  {
    q: "The historic Battle of Talikota (Rakshasi-Tangadi) which crushed the Vijayanagar Empire was fought in:",
    options: [
      "1526 AD",
      "1556 AD",
      "1565 AD",
      "1576 AD"
    ],
    correct: 2,
    explanation: "Fought on 23 January 1565, leading to the capture of Rama Raya and the devastation of the capital Hampi."
  },
  {
    q: "The famous architectural feature of the Gol Gumbaz at Bijapur is its:",
    options: [
      "Panchatantra terracotta friezes",
      "Acoustic Whispering Gallery inside the world's second-largest dome",
      "Hanging marble pillars without support",
      "Glass mirror mosaics"
    ],
    correct: 1,
    explanation: "The Gol Gumbaz features a vast circular whispering gallery where the faintest whisper echoes up to 11 times."
  },
  {
    q: "In the Vijayanagar administrative system, the term 'Amaram' designated:",
    options: [
      "Tax on overseas maritime commerce",
      "Land grant assigned to military chiefs (Nayakas) for maintaining troops",
      "Direct crown agricultural estate",
      "Religious tribute paid to the Tirupati temple"
    ],
    correct: 1,
    explanation: "'Amaram' were revenue territories assigned to Nayakas to sustain stipulated quotas of elephants, horses, and foot soldiers."
  }
];

let quizIndex = 0;
let userScore = 0;
let answeredCurrent = false;

const quizQNum = document.getElementById('quizQNum');
const quizQuestionText = document.getElementById('quizQuestionText');
const quizOptionsList = document.getElementById('quizOptionsList');
const quizFeedback = document.getElementById('quizFeedback');
const nextQuizBtn = document.getElementById('nextQuizBtn');
const currentScore = document.getElementById('currentScore');

function renderQuizQuestion() {
  if (!quizQuestionText) return;
  answeredCurrent = false;
  const item = quizQuestions[quizIndex];
  quizQNum.textContent = `Q${quizIndex + 1}`;
  quizQuestionText.textContent = item.q;
  quizFeedback.className = 'hidden';
  nextQuizBtn.classList.add('hidden');
  nextQuizBtn.classList.remove('flex');

  quizOptionsList.innerHTML = item.options.map((opt, i) => `
    <button onclick="handleOptionSelect(${i})" class="quiz-option-btn w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 text-left text-xs font-medium text-slate-200 transition-all flex items-center justify-between">
      <span><strong class="text-amber-400 mr-2">${String.fromCharCode(65 + i)}.</strong> ${opt}</span>
      <span class="status-indicator"></span>
    </button>
  `).join('');
}

function handleOptionSelect(selectedIdx) {
  if (answeredCurrent) return;
  answeredCurrent = true;

  const item = quizQuestions[quizIndex];
  const optionButtons = quizOptionsList.querySelectorAll('.quiz-option-btn');

  if (selectedIdx === item.correct) {
    userScore++;
    currentScore.textContent = userScore;
    optionButtons[selectedIdx].classList.remove('border-slate-800', 'bg-slate-950/80');
    optionButtons[selectedIdx].classList.add('border-emerald-500', 'bg-emerald-500/20', 'text-emerald-200');
    
    quizFeedback.className = 'p-3.5 rounded-xl text-xs leading-relaxed bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 block';
    quizFeedback.innerHTML = `<strong>Correct!</strong> ${item.explanation}`;
  } else {
    optionButtons[selectedIdx].classList.remove('border-slate-800', 'bg-slate-950/80');
    optionButtons[selectedIdx].classList.add('border-rose-500', 'bg-rose-500/20', 'text-rose-200');
    
    optionButtons[item.correct].classList.remove('border-slate-800', 'bg-slate-950/80');
    optionButtons[item.correct].classList.add('border-emerald-500', 'bg-emerald-500/20', 'text-emerald-200');
    
    quizFeedback.className = 'p-3.5 rounded-xl text-xs leading-relaxed bg-rose-500/15 border border-rose-500/30 text-rose-300 block';
    quizFeedback.innerHTML = `<strong>Incorrect.</strong> The correct answer is <em>${item.options[item.correct]}</em>.<br><span class="text-slate-300 mt-1 block">${item.explanation}</span>`;
  }

  nextQuizBtn.classList.remove('hidden');
  nextQuizBtn.classList.add('flex');
  lucide.createIcons();
}

nextQuizBtn?.addEventListener('click', () => {
  quizIndex++;
  if (quizIndex < quizQuestions.length) {
    renderQuizQuestion();
  } else {
    const percentage = Math.round((userScore / quizQuestions.length) * 100);
    document.getElementById('quizQuestionBox').innerHTML = `
      <div class="text-center py-8 space-y-4">
        <div class="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center">
          <i data-lucide="award" class="w-8 h-8"></i>
        </div>
        <h4 class="font-heading text-2xl font-bold text-white">Vijayanagar & Bahmani Quiz Completed!</h4>
        <p class="text-slate-300 text-sm">
          You scored <strong class="text-amber-400 font-bold">${userScore} out of ${quizQuestions.length}</strong> (${percentage}%).
        </p>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          ${percentage >= 80 ? 'Superb mastery of Vijayanagar, Krishnadeva Raya, and the Deccan Sultanates!' : 'Good effort! Review the four dynasties, Battle of Talikota, and Gol Gumbaz above.'}
        </p>
        <button onclick="location.reload()" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all">
          Retake Quiz
        </button>
      </div>
    `;
    lucide.createIcons();
  }
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateFlashcardUI();
  renderQuizQuestion();
  lucide.createIcons();
});
