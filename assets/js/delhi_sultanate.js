/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 9: The Delhi Sultanate (1206 AD – 1526 AD)
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
  { term: "Iltutmish", desc: "Real consolidator of Delhi Sultanate; organized Turkan-i-Chahalgani (The Forty), introduced the Iqta system, and struck silver Tanka and copper Jital coins." },
  { term: "Razia Sultan", desc: "First and only female Muslim sovereign of medieval India (1236–1240 AD); ruled openly without veil; married Altunia; murdered at Kaithal." },
  { term: "Ghiyasuddin Balban", desc: "Exterminated the Forty nobles; formulated divine theory of kingship (Niyabat-i-Khudai, Zil-i-Ilahi); introduced Blood and Iron policy, Sijda, Paibos, and Persian festival Nauroz." },
  { term: "Alauddin Khalji", desc: "Assumed title 'Sikandar-i-Sani'; introduced Dagh (branding horses) and Chehra (descriptive rolls); revolutionary market control system with fixed prices under Shahna-i-Mandi; built Alai Darwaza." },
  { term: "Malik Kafur (Hazar Dinari)", desc: "Alauddin's military general who led the sensational southern campaigns against Devagiri (Yadavas), Warangal (Kakatiyas - Kohinoor diamond), Dvarasamudra, and Madurai." },
  { term: "Muhammad bin Tughlaq", desc: "Brilliant yet ill-starred Sultan; attempted transfer of capital to Daulatabad, token copper/brass currency, and Doab tax hike; hosted Moroccan traveler Ibn Battuta (author of Rihla)." },
  { term: "Firoz Shah Tughlaq", desc: "Constructed extensive canal irrigation networks; built cities like Firozabad, Hissar, and Jaunpur; established Diwan-i-Khairat (charity) and Diwan-i-Bandagan (slaves); imposed Jizya on Brahmans." },
  { term: "Amir Khusrau (Tuti-i-Hind)", desc: "Legendary court poet of 7 Sultans; disciple of Nizamuddin Auliya; created the Sitar and Tabla; pioneer of Qawwali and Khayal singing; authored Khazain-ul-Futuh and Tughlaqnama." },
  { term: "Sikandar Lodi", desc: "Greatest Lodi ruler; founded Agra in 1504 AD; formulated land measurement yard Gaz-i-Sikandari (32 digits); penned Persian verses under the nom-de-plume Gulrukhi." },
  { term: "First Battle of Panipat (1526)", desc: "Babur's Mughal army defeated and killed Sultan Ibrahim Lodi on 21 April 1526, bringing an end to the Delhi Sultanate and initiating the Mughal Empire." }
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
    q: "Which Delhi Sultan was known by the sobriquet 'Lakhbaksh' (giver of lakhs) for his liberal generosity?",
    a: "Qutbuddin Aibak (1206–1210 AD), who laid the foundation of the Slave dynasty and commenced the Qutb Minar."
  },
  {
    q: "Who introduced the pure silver coin 'Tanka' (175 grains) and copper coin 'Jital' in medieval India?",
    a: "Shamsuddin Iltutmish, who also organized the administrative corps of 'The Forty' (Turkan-i-Chahalgani)."
  },
  {
    q: "Which Sultan introduced the Persian court ceremonies of 'Sijda' (prostration) and 'Paibos' (kissing royal feet)?",
    a: "Ghiyasuddin Balban, to project the awe and unchallengeable majesty of the crown under his 'Blood and Iron' doctrine."
  },
  {
    q: "What was the system of 'Dagh' and 'Chehra' introduced by Alauddin Khalji?",
    a: "Dagh was the royal branding of war horses to prevent fraudulent substitution; Chehra (or Huliya) was the biometric/descriptive roll of each soldier."
  },
  {
    q: "Which Moroccan traveler served as the Chief Qazi of Delhi for eight years during Muhammad bin Tughlaq's reign?",
    a: "Ibn Battuta (arrived 1333 AD), who documented the empire's customs and royal eccentricities in his travel book 'Rihla'."
  },
  {
    q: "Which Delhi Sultan created the public welfare department 'Diwan-i-Khairat' and slave bureau 'Diwan-i-Bandagan'?",
    a: "Firoz Shah Tughlaq, who also founded the cities of Jaunpur, Hissar, and Firozabad."
  },
  {
    q: "Who founded the historic city of Agra in 1504 AD and made it his imperial capital in 1506?",
    a: "Sultan Sikandar Lodi, who also composed Persian poetry under the pen-name 'Gulrukhi'."
  },
  {
    q: "Who was the only Sultan of Delhi to be slain on the battlefield in Indian history?",
    a: "Ibrahim Lodi, defeated and killed by Babur at the First Battle of Panipat on 21 April 1526."
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
    q: "The celebrated military department 'Diwan-i-Arz' was first formally reorganized into an independent ministry by which Sultan?",
    options: [
      "Iltutmish",
      "Ghiyasuddin Balban",
      "Alauddin Khalji",
      "Muhammad bin Tughlaq"
    ],
    correct: 1,
    explanation: "Balban created an independent Diwan-i-Arz under Imad-ul-Mulk to modernize the army against Mongol incursions and internal revolts."
  },
  {
    q: "Under Alauddin Khalji's market control regulations, who was the supreme imperial officer in charge of supervising grain markets?",
    options: [
      "Barid-i-Mamalik",
      "Shahna-i-Mandi",
      "Mustakharaj",
      "Amir-i-Kohi"
    ],
    correct: 1,
    explanation: "The Shahna-i-Mandi was the superintendent of the central grain market who registered merchants and enforced fixed ceiling prices."
  },
  {
    q: "Muhammad bin Tughlaq introduced a specialized agricultural department called 'Diwan-i-Kohi' primarily to:",
    options: [
      "Collect religious taxes from non-Muslim peasants",
      "Bring uncultivated wasteland under state farming through credit (Sondhar)",
      "Confiscate agricultural land from Hindu Zamindars",
      "Export grain to Central Asia"
    ],
    correct: 1,
    explanation: "Diwan-i-Kohi extended direct agrarian credit (Sondhar) to farmers to cultivate virgin tracts and improve crop yields."
  },
  {
    q: "Which architectural monument in the Qutb Complex features the earliest authentic true horseshoe arch built on scientific Islamic principles?",
    options: [
      "Quwwat-ul-Islam Mosque",
      "Alai Darwaza",
      "Iltutmish's Tomb",
      "Tomb of Balban"
    ],
    correct: 1,
    explanation: "Built by Alauddin Khalji in 1311 AD, the Alai Darwaza is celebrated by art historians as the first true dome and scientific Islamic arch in India."
  },
  {
    q: "What was the chronological sequence of the five ruling dynasties of the Delhi Sultanate?",
    options: [
      "Slave ➔ Tughlaq ➔ Khalji ➔ Sayyid ➔ Lodi",
      "Slave ➔ Khalji ➔ Tughlaq ➔ Sayyid ➔ Lodi",
      "Khalji ➔ Slave ➔ Tughlaq ➔ Lodi ➔ Sayyid",
      "Slave ➔ Khalji ➔ Sayyid ➔ Tughlaq ➔ Lodi"
    ],
    correct: 1,
    explanation: "Slave (1206–1290) ➔ Khalji (1290–1320) ➔ Tughlaq (1320–1414) ➔ Sayyid (1414–1451) ➔ Lodi (1451–1526)."
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
        <h4 class="font-heading text-2xl font-bold text-white">Delhi Sultanate Quiz Completed!</h4>
        <p class="text-slate-300 text-sm">
          You scored <strong class="text-amber-400 font-bold">${userScore} out of ${quizQuestions.length}</strong> (${percentage}%).
        </p>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          ${percentage >= 80 ? 'Mastery demonstrated across all five dynasties, market reforms, and administrative organs!' : 'Review Balban, Alauddin Khalji, Muhammad bin Tughlaq, and Lodi rulers above.'}
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
