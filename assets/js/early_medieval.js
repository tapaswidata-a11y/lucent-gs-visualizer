/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 8: Early Medieval Period & Invasions (650 AD – 1206 AD)
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
  { term: "Prithviraj Chauhan III", desc: "Heroic Chahamana ruler of Delhi-Ajmer; defeated Muhammad Ghori in the First Battle of Tarain (1191 AD) but was defeated in the Second Battle of Tarain (1192 AD)." },
  { term: "Rajaraja I", desc: "Great Chola emperor (985–1014 AD); conquered northern Ceylon (Anuradhapura) and built the majestic granite Brihadisvara (Rajarajeshvara) temple at Thanjavur." },
  { term: "Rajendra I", desc: "Son of Rajaraja I; annexed all of Sri Lanka, marched to the Ganga defeating Mahipala of Bengal, assumed title 'Gangaikondachola', and led naval conquests against Srivijaya (Sumatra/Malaya)." },
  { term: "Uttaramerur Inscription", desc: "Famous Chola inscription of Parantaka I (919 & 921 AD) detailing democratic village self-governance via the Sabha and Kudavolai (pot-ticket lottery) election system." },
  { term: "Mahmud of Ghazni", desc: "Ruler of Ghazni who led 17 plundering expeditions into India (1000–1027 AD), notably ransacking the sacred Somnath temple in Gujarat in 1025 AD." },
  { term: "Al-Biruni", desc: "Celebrated Persian polymath who accompanied Mahmud of Ghazni; composed the seminal encyclopedic account of Indian society, 'Kitab-ul-Hind' (Tahqiq-i-Hind)." },
  { term: "Tripartite Struggle", desc: "Centuries-long conflict between the Gurjara-Pratiharas, Palas of Bengal, and Rashtrakutas of the Deccan to control the imperial city of Kannauj." },
  { term: "Kailasa Temple at Ellora", desc: "Monolithic rock-cut architectural marvel carved out of a single basalt cliff from top to bottom by Rashtrakuta king Krishna I (8th century AD)." }
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
    q: "Who authored the famous biographical epic 'Prithviraj Raso' celebrating Prithviraj Chauhan?",
    a: "Court poet Chand Bardai, written in Braj Bhasha / early Hindi."
  },
  {
    q: "Which Chola emperor assumed the title 'Gangaikondachola' after his victorious expedition to the River Ganga?",
    a: "Rajendra I (1014–1044 AD), who founded the new capital city of Gangaikondacholapuram."
  },
  {
    q: "What was the unique electoral method prescribed in the Uttaramerur Inscriptions for Chola village assemblies?",
    a: "The 'Kudavolai' system—names of eligible candidates written on palm-leaf tickets and drawn from an earthen pot by a young boy."
  },
  {
    q: "Which Turkish invader sacked the renowned Somnath Temple of Gujarat in 1025 AD?",
    a: "Mahmud of Ghazni during his 16th expedition; the temple was defended by Bhima I of the Solanki dynasty."
  },
  {
    q: "In which battle did Muhammad Ghori defeat Prithviraj Chauhan, laying the foundation of Muslim rule in North India?",
    a: "The Second Battle of Tarain in 1192 AD near Karnal (modern Haryana)."
  },
  {
    q: "Who was the founder of the Pala dynasty of Bengal who was elected by local chieftains to end 'Matsyanyaya' (anarchy)?",
    a: "Gopala in 750 AD; his son Dharmapala founded the famous Vikramashila University."
  },
  {
    q: "Which monolithic temple at Ellora was carved out of a single rock from top to bottom by Rashtrakuta king Krishna I?",
    a: "The Kailasa Temple (Cave 16 at Ellora), dedicated to Lord Shiva."
  },
  {
    q: "Which Gahadavala king of Kannauj was defeated and killed by Muhammad Ghori at the Battle of Chandawar (1194 AD)?",
    a: "King Jaichandra Gahadavala."
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
    q: "The famous Brihadisvara (Rajarajeshvara) granite temple at Thanjavur was commissioned by which monarch?",
    options: [
      "Vijayalaya Chola",
      "Rajaraja I",
      "Rajendra I",
      "Kulottunga I"
    ],
    correct: 1,
    explanation: "Rajaraja I completed the colossal Brihadisvara Temple at Thanjavur in 1010 AD, crowning it with a monolithic 80-tonne granite dome."
  },
  {
    q: "The Tripartite Struggle for supremacy over Kannauj was fought between which three imperial powers?",
    options: [
      "Cholas, Pandyas, Cheras",
      "Pratiharas, Palas, Rashtrakutas",
      "Chauhans, Chandellas, Paramaras",
      "Kushanas, Guptas, Vakatakas"
    ],
    correct: 1,
    explanation: "The Gurjara-Pratiharas (West), Palas (East), and Rashtrakutas (Deccan) contested Kannauj for nearly two centuries."
  },
  {
    q: "Who was the Persian court scholar who authored the monumental Arabic treatise 'Kitab-ul-Hind'?",
    options: [
      "Al-Masudi",
      "Al-Biruni",
      "Firdausi",
      "Minhaj-us-Siraj"
    ],
    correct: 1,
    explanation: "Al-Biruni spent years studying Sanskrit, Hindu sciences, and philosophy, compiling his encyclopedic masterpiece 'Kitab-ul-Hind'."
  },
  {
    q: "The Khajuraho temples in Madhya Pradesh, famous for exquisite nagara architecture and sculptures, were built by:",
    options: [
      "Paramaras of Malwa",
      "Chandellas of Bundelkhand",
      "Solankis of Gujarat",
      "Kalachuris of Chedi"
    ],
    correct: 1,
    explanation: "The Chandella dynasty of Jejakabhukti (Bundelkhand) constructed the world-famous Kandariya Mahadeva and Lakshmana temples at Khajuraho."
  },
  {
    q: "Which Chola inscription offers the most comprehensive contemporary blueprint of democratic village autonomy in ancient/medieval India?",
    options: [
      "Aihole Inscription",
      "Uttaramerur Inscription",
      "Hathigumpha Inscription",
      "Junagadh Inscription"
    ],
    correct: 1,
    explanation: "The Uttaramerur inscriptions of Parantaka I (919 and 921 AD) lay down qualifications, committees (Variyams), and disqualifications for village assemblies."
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
        <h4 class="font-heading text-2xl font-bold text-white">Early Medieval Quiz Completed!</h4>
        <p class="text-slate-300 text-sm">
          You scored <strong class="text-amber-400 font-bold">${userScore} out of ${quizQuestions.length}</strong> (${percentage}%).
        </p>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          ${percentage >= 80 ? 'Mastery shown across Rajput dynasties, Chola governance, and Ghazni/Ghori incursions!' : 'Review the Tripartite struggle, Chola local administration, and Tarain battles above.'}
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
