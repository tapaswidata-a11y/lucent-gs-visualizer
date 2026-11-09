/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 2: Vedic Culture (1500 BC – 600 BC)
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
  document.body.style.overflow = 'auto';
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
    currentZoom = Math.max(0.5, currentZoom - 0.25);
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

// Mouse wheel zoom in lightbox
lightboxViewport?.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (e.deltaY < 0 && currentZoom < 4) {
    currentZoom += 0.15;
  } else if (e.deltaY > 0 && currentZoom > 0.5) {
    currentZoom = Math.max(0.5, currentZoom - 0.15);
  }
  updateImageTransform();
});

// Drag to pan in lightbox
lightboxViewport?.addEventListener('mousedown', (e) => {
  if (currentZoom > 1) {
    isPanning = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
  }
});

window.addEventListener('mousemove', (e) => {
  if (isPanning) {
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateImageTransform();
  }
});

window.addEventListener('mouseup', () => {
  isPanning = false;
});

// --- CHAPTER DROPDOWN TOGGLE ---
const chapterBtn = document.getElementById('chapterSelectorBtn');
const chapterDropdown = document.getElementById('chapterDropdown');

chapterBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  chapterDropdown.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (chapterDropdown && !chapterDropdown.contains(e.target) && e.target !== chapterBtn) {
    chapterDropdown.classList.add('hidden');
  }
});

// --- SEARCH MODAL & INDEX FOR VEDIC CULTURE ---
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearchBtn = document.getElementById('closeSearchBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const vedicSearchableDatabase = [
  { title: "Satyameva Jayate", category: "Upanishad", snippet: "National motto taken from Mundaka Upanishad ('Truth Alone Triumphs').", link: "#literature" },
  { title: "Gayatri Mantra", category: "Rig Veda", snippet: "Found in Mandala 3 of Rig Veda, composed by Sage Vishwamitra and addressed to Solar deity Savitri.", link: "#vedas" },
  { title: "Dasrajan War (Battle of Ten Kings)", category: "Rig Veda", snippet: "Mandala 7 describes King Sudas defeating a coalition of 10 kings on the river Parushni (Ravi).", link: "#vedas" },
  { title: "Purusha Sukta", category: "Rig Veda", snippet: "Mandala 10 hymn explaining the cosmic origin of the 4 Varnas (Brahmana, Kshatriya, Vaishya, Shudra).", link: "#vedas" },
  { title: "Shatapatha Brahmana", category: "Yajur Veda", snippet: "Oldest and largest Brahmana; details agricultural rituals, 24-oxen ploughs, and the Videha Madhava story.", link: "#literature" },
  { title: "Boghazkai Inscription", category: "Origins", snippet: "1400 BC clay tablet from Asia Minor (Turkey) invoking 4 Vedic gods: Indra, Varuna, Mitra, and Nasatyas.", link: "#overview" },
  { title: "Sama Veda", category: "Music", snippet: "The Book of Chants; origin of 7 musical notes (Sapta Svara) and Indian classical music (Dhrupad).", link: "#vedas" },
  { title: "Ashtadhyayi", category: "Vedanga", snippet: "Composed by Panini; world's earliest systematic Sanskrit grammar book.", link: "#literature" },
  { title: "Iron (Shyama / Krishna Ayas)", category: "Technology", snippet: "Discovered c. 1000 BC at Atranjikhera (UP); revolutionized agriculture in the Later Vedic Period.", link: "#comparison" },
  { title: "Shad-Darshanas", category: "Philosophy", snippet: "Six orthodox schools: Samkhya (Kapila), Yoga (Patanjali), Nyaya (Gautama), Vaisheshika (Kanada), Mimamsa (Jaimini), Vedanta (Badarayana).", link: "#literature" },
  { title: "Brihadaranyaka Upanishad", category: "Vedanta", snippet: "Oldest and largest Upanishad; contains Yajnavalkya-Gargi dialogue and 'Tamaso Ma Jyotirgamaya'.", link: "#literature" },
  { title: "Saraswati River (Naditama)", category: "Rivers", snippet: "Most sacred river of Rigvedic period; praised as Naditama (best of rivers) and Devitama.", link: "#rivers" },
  { title: "Popular Tribal Assemblies", category: "Polity", snippet: "Sabha (elders), Samiti (general folk), and Vidatha (oldest folk assembly, attended by women).", link: "#comparison" },
  { title: "Four Ashramas", category: "Society", snippet: "First mentioned in Jabala Upanishad: Brahmacharya, Grihastha, Vanaprastha, and Sannyasa.", link: "#literature" }
];

function openSearch() {
  searchModal.classList.remove('hidden');
  searchInput.value = '';
  searchInput.focus();
  renderSearchResults('');
}

function closeSearch() {
  searchModal.classList.add('hidden');
}

searchBtn?.addEventListener('click', openSearch);
closeSearchBtn?.addEventListener('click', closeSearch);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSearch();
    closeFullImageViewer();
  }
});

function renderSearchResults(query) {
  const q = query.trim().toLowerCase();
  if (!q) {
    searchResults.innerHTML = '<p class="text-slate-500 text-center py-6">Type a keyword to search all Vedas, Upanishads, Darshanas, rituals, and rivers...</p>';
    return;
  }

  const matches = vedicSearchableDatabase.filter(item => 
    item.title.toLowerCase().includes(q) || 
    item.category.toLowerCase().includes(q) || 
    item.snippet.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    searchResults.innerHTML = `<p class="text-slate-400 text-center py-6">No matching facts found for "<span class="text-amber-400">${query}</span>".</p>`;
    return;
  }

  searchResults.innerHTML = matches.map(m => `
    <a href="${m.link}" onclick="closeSearch()" class="block p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/60 transition-all">
      <div class="flex items-center justify-between">
        <span class="font-bold text-white text-xs">${m.title}</span>
        <span class="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">${m.category}</span>
      </div>
      <p class="text-[11px] text-slate-400 mt-1">${m.snippet}</p>
    </a>
  `).join('');
}

searchInput?.addEventListener('input', (e) => {
  renderSearchResults(e.target.value);
});

// --- FLASHCARD SYSTEM FOR VEDIC CULTURE ---
const vedicFlashcards = [
  {
    category: "Vedic Literature",
    question: "From which ancient Upanishad is India's national motto 'Satyameva Jayate' taken?",
    answer: "Mundaka Upanishad (Atharva Veda tradition). It also famously compares ritualistic sacrifices to 'leaky boats'."
  },
  {
    category: "Rigvedic Hymns",
    question: "Where is the famous Gayatri Mantra found and who composed it?",
    answer: "Found in Mandala 3 of the Rig Veda. Composed by Sage Vishwamitra and addressed to the solar deity Savitri."
  },
  {
    category: "Wars & Geography",
    question: "On the banks of which river was the Battle of Ten Kings (Dasrajan War) fought?",
    answer: "River Parushni (modern Ravi). King Sudas of the Bharata tribe defeated a confederacy of 10 kings."
  },
  {
    category: "Indian Philosophy",
    question: "Which sage propounded the Vaisheshika philosophy and what scientific concept did it introduce?",
    answer: "Sage Kanada (also known as Uluka). He introduced the early Atomic Theory of Matter (Paramanu)."
  },
  {
    category: "Social Structure",
    question: "In which Vedic text are all FOUR Ashramas explicitly mentioned for the first time?",
    answer: "Jabala Upanishad (Brahmacharya, Grihastha, Vanaprastha, and Sannyasa)."
  },
  {
    category: "Sacrifices & Kingship",
    question: "What was the purpose of the Vajapeya and Ashvamedha Yajnas in the Later Vedic period?",
    answer: "Ashvamedha: Horse sacrifice to claim unquestioned imperial supremacy over traversed lands.\nVajapeya: Royal chariot race that rejuvenated the king's physical vigour and prestige."
  }
];

let currentCardIndex = 0;
let isCardFlipped = false;

const cardContent = document.getElementById('cardContent');
const cardCategory = document.getElementById('cardCategory');
const cardCounter = document.getElementById('cardCounter');
const flashcardInner = document.getElementById('flashcardInner');
const flashcardBox = document.getElementById('flashcardBox');
const prevCardBtn = document.getElementById('prevCardBtn');
const nextCardBtn = document.getElementById('nextCardBtn');
const flipCardBtn = document.getElementById('flipCardBtn');

function updateFlashcardUI() {
  const card = vedicFlashcards[currentCardIndex];
  cardCategory.textContent = `Topic: ${card.category}`;
  cardCounter.textContent = `${currentCardIndex + 1} / ${vedicFlashcards.length}`;
  
  if (isCardFlipped) {
    cardContent.textContent = card.answer;
    cardContent.classList.add('text-amber-300');
    cardContent.classList.remove('text-white');
    flashcardInner.classList.add('border-amber-500');
  } else {
    cardContent.textContent = card.question;
    cardContent.classList.remove('text-amber-300');
    cardContent.classList.add('text-white');
    flashcardInner.classList.remove('border-amber-500');
  }
}

function toggleCardFlip() {
  isCardFlipped = !isCardFlipped;
  updateFlashcardUI();
}

flashcardBox?.addEventListener('click', toggleCardFlip);
flipCardBtn?.addEventListener('click', toggleCardFlip);

prevCardBtn?.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex - 1 + vedicFlashcards.length) % vedicFlashcards.length;
  isCardFlipped = false;
  updateFlashcardUI();
});

nextCardBtn?.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex + 1) % vedicFlashcards.length;
  isCardFlipped = false;
  updateFlashcardUI();
});

// --- INTERACTIVE MOCK QUIZ FOR VEDIC CULTURE ---
const vedicQuizQuestions = [
  {
    q: "The famous dialogue between the young seeker Nachiketa and Yama (God of Death) is found in which Upanishad?",
    options: ["Brihadaranyaka Upanishad", "Katha Upanishad", "Chhandogya Upanishad", "Mundaka Upanishad"],
    correct: 1,
    explanation: "The philosophical conversation on the nature of immortality and the soul (Atman) between Nachiketa and Yama is in the Katha Upanishad."
  },
  {
    q: "The Boghazkai inscription (c. 1400 BC) discovered in Asia Minor (Turkey) mentions which four Vedic deities?",
    options: [
      "Agni, Soma, Surya, and Vayu",
      "Indra, Varuna, Mitra, and Nasatyas",
      "Brahma, Vishnu, Mahesh, and Indra",
      "Pashupati, Rudra, Maruts, and Pushan"
    ],
    correct: 1,
    explanation: "The treaty between the Hittites and Mitannis invokes four Rigvedic deities: Indra, Varuna, Mitra, and the Nasatyas (Ashvins)."
  },
  {
    q: "Which of the following is the oldest and largest Brahmana, detailing extensive agricultural rituals and 24-oxen ploughs?",
    options: ["Aitareya Brahmana", "Gopatha Brahmana", "Shatapatha Brahmana", "Panchavimsha Brahmana"],
    correct: 2,
    explanation: "Shatapatha Brahmana (attached to Shukla Yajur Veda) is the oldest and most voluminous Brahmana text."
  },
  {
    q: "In the Rigvedic period, what was the term 'Gavishti' used to denote?",
    options: ["Search for knowledge", "Warfare or Quest for Cows", "Sacrificial altar", "Praising the gods"],
    correct: 1,
    explanation: "In pastoral Early Vedic society, cattle (Gau) was wealth, and inter-clan clashes or raids were termed 'Gavishti' (literally 'quest for cows')."
  },
  {
    q: "Which of the following orthodox schools of philosophy (Darshanas) was founded by Sage Kapila?",
    options: ["Nyaya", "Vaisheshika", "Samkhya", "Uttara-Mimamsa"],
    correct: 2,
    explanation: "Samkhya is the oldest philosophical system, founded by Sage Kapila. It posits a dualism between Purusha (spirit) and Prakriti (matter)."
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
  answeredCurrent = false;
  const item = vedicQuizQuestions[quizIndex];
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

  const item = vedicQuizQuestions[quizIndex];
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
  if (quizIndex < vedicQuizQuestions.length) {
    renderQuizQuestion();
  } else {
    const percentage = Math.round((userScore / vedicQuizQuestions.length) * 100);
    document.getElementById('quizQuestionBox').innerHTML = `
      <div class="text-center py-8 space-y-4">
        <div class="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center">
          <i data-lucide="award" class="w-8 h-8"></i>
        </div>
        <h4 class="font-heading text-2xl font-bold text-white">Vedic Quiz Completed!</h4>
        <p class="text-slate-300 text-sm">
          You scored <strong class="text-amber-400 font-bold">${userScore} out of ${vedicQuizQuestions.length}</strong> (${percentage}%).
        </p>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          ${percentage >= 80 ? 'Exceptional mastery of Lucent Vedic Culture Module!' : 'Good effort! Review the comparative matrix and flashcards above to ace it.'}
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
