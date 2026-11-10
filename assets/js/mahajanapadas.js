/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 3: Mahajanapada Period & Magadha Empire (600 BC – 325 BC)
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

lightboxViewport?.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (e.deltaY < 0 && currentZoom < 4) {
    currentZoom += 0.15;
  } else if (e.deltaY > 0 && currentZoom > 0.5) {
    currentZoom = Math.max(0.5, currentZoom - 0.15);
  }
  updateImageTransform();
});

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

// --- SEARCH MODAL & INDEX ---
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearchBtn = document.getElementById('closeSearchBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const mahajanapadaSearchDB = [
  { title: "16 Mahajanapadas Sources", category: "Sources", snippet: "Listed in Buddhist Anguttara Nikaya and Jain Bhagavati Sutra. Asmaka was the only southern Mahajanapada on Godavari.", link: "#mahajanapadas" },
  { title: "Bimbisara (Seniya)", category: "Haryanka Dynasty", snippet: "First Indian king with a standing regular army. Sent royal physician Jivaka to cure Avanti king Pradyota of jaundice.", link: "#dynasties" },
  { title: "Ajatashatru (Kunika)", category: "Haryanka Dynasty", snippet: "Killed father Bimbisara; used innovative weapons: Mahashilakantaka (catapult) and Rathamusala (chariot with mace). Convened 1st Buddhist Council at Rajgriha (483 BC).", link: "#dynasties" },
  { title: "Udayin", category: "Haryanka Dynasty", snippet: "Founded Pataliputra at the sacred confluence of the Ganga and Son rivers, shifting capital from Rajagriha.", link: "#dynasties" },
  { title: "Kalashoka (Kakavarna)", category: "Shishunaga Dynasty", snippet: "Shifted capital permanently to Pataliputra. Convened 2nd Buddhist Council at Vaishali (383 BC).", link: "#dynasties" },
  { title: "Mahapadma Nanda (Ekarat)", category: "Nanda Dynasty", snippet: "First empire builder of Indian history; assumed titles Ekarat and Sarvakshatrantaka (uprooter of all Kshatriyas).", link: "#dynasties" },
  { title: "Dhana Nanda (Agrammes)", category: "Nanda Dynasty", snippet: "Last Nanda ruler during Alexander's invasion. Greek texts call him Agrammes / Xandrames. Possessed massive army (200,000 infantry, 6,000 elephants).", link: "#dynasties" },
  { title: "Darius I Invasion (518 BC)", category: "Persian Invasion", snippet: "Persian emperor Darius annexed Punjab and Sindh, forming 20th Satrapy (province) of Persian Empire; introduced Kharosthi script and Aramaic.", link: "#invasions" },
  { title: "Alexander & Battle of Hydaspes (326 BC)", category: "Macedonian Invasion", snippet: "Alexander defeated King Porus on the river Jhelum (Hydaspes); impressed by Porus' bravery, restored his kingdom. Greek army mutinied at river Beas (Vipas).", link: "#invasions" }
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
    searchResults.innerHTML = '<p class="text-slate-500 text-center py-6">Type a keyword to search 16 Mahajanapadas, Magadha dynasties, Alexander, and Darius...</p>';
    return;
  }

  const matches = mahajanapadaSearchDB.filter(item => 
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

// --- FLASHCARD SYSTEM ---
const flashcards = [
  {
    category: "Mahajanapadas Geography",
    question: "Which was the ONLY Mahajanapada situated in South India, and on the banks of which river?",
    answer: "Asmaka (or Assaka), with its capital at Potana / Patali, located between the Narmada and Godavari rivers."
  },
  {
    category: "Magadha Ascendancy",
    question: "Who was the first Indian monarch recorded to maintain a regular standing army, earning the title 'Seniya'?",
    answer: "Bimbisara (544–492 BC), founder of the Haryanka Dynasty."
  },
  {
    category: "Military Innovation",
    question: "Which two innovative siege weapons were devised and used by Ajatashatru in his 16-year war against Vaishali?",
    answer: "1. Mahashilakantaka: A heavy stone-throwing catapult.\n2. Rathamusala: An armored chariot fitted with rotating blades and maces."
  },
  {
    category: "Persian Influence",
    question: "Which writing script was introduced in North-West India as a result of the Persian/Achaemenid invasion by Darius I?",
    answer: "Kharosthi script (derived from Persian Aramaic), written from right-to-left, which Ashoka later used for his North-Western edicts (Mansehra & Shahbazgarhi)."
  },
  {
    category: "Macedonian Invasion",
    question: "At which river did Alexander the Great's army stage a mutiny and refuse to march further into India?",
    answer: "River Vipas (modern Beas), fearing the enormous infantry and war elephants of Dhana Nanda's army."
  },
  {
    category: "Capital Transition",
    question: "Which Magadhan ruler founded the city of Pataliputra and shifted the royal capital there from Rajagriha?",
    answer: "Udayin (460–444 BC), son of Ajatashatru, built a fort at the confluence of the Ganga and Son rivers."
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
  const card = flashcards[currentCardIndex];
  cardCategory.textContent = `Topic: ${card.category}`;
  cardCounter.textContent = `${currentCardIndex + 1} / ${flashcards.length}`;
  
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
  currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
  isCardFlipped = false;
  updateFlashcardUI();
});

nextCardBtn?.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex + 1) % flashcards.length;
  isCardFlipped = false;
  updateFlashcardUI();
});

// --- INTERACTIVE MOCK QUIZ ---
const quizQuestions = [
  {
    q: "The list of 16 Mahajanapadas is famously found in which Buddhist and Jain scriptures?",
    options: [
      "Anguttara Nikaya and Bhagavati Sutra",
      "Digha Nikaya and Kalpa Sutra",
      "Vinaya Pitaka and Acharanga Sutra",
      "Mahavamsha and Parishishtaparvan"
    ],
    correct: 0,
    explanation: "The primary historical lists of the 16 Mahajanapadas are found in the Buddhist canonical text Anguttara Nikaya (Sutta Pitaka) and the Jain text Bhagavati Sutra."
  },
  {
    q: "Which physician was sent by Bimbisara to Ujjain when King Pradyota of Avanti was suffering from jaundice?",
    options: ["Charaka", "Sushruta", "Jivaka", "Dhanvantari"],
    correct: 2,
    explanation: "Bimbisara sent his royal court physician Jivaka to cure King Pradyota (Chanda Pradyota Mahasena) of Avanti, cementing diplomatic alliances."
  },
  {
    q: "Who was the founder of the Nanda Dynasty, who assumed the imperial title 'Ekarat' (Sole Monarch)?",
    options: ["Dhana Nanda", "Mahapadma Nanda", "Kalashoka", "Shishunaga"],
    correct: 1,
    explanation: "Mahapadma Nanda was the first historical empire builder of India. He uprooted old Kshatriya dynasties, earning the title 'Sarvakshatrantaka' and 'Ekarat'."
  },
  {
    q: "Alexander the Great fought the famous Battle of Hydaspes in 326 BC against King Porus on the banks of which river?",
    options: ["River Indus (Sindhu)", "River Jhelum (Vitasta)", "River Chenab (Asikni)", "River Ravi (Parushni)"],
    correct: 1,
    explanation: "The Battle of Hydaspes was fought on the river Jhelum (ancient Vitasta) against King Porus (Puru), ruler of the territory between Jhelum and Chenab."
  },
  {
    q: "Which Magadhan king transferred the capital permanently from Vaishali to Pataliputra and convened the Second Buddhist Council (383 BC)?",
    options: ["Bimbisara", "Ajatashatru", "Kalashoka (Kakavarna)", "Mahapadma Nanda"],
    correct: 2,
    explanation: "Kalashoka (Shishunaga Dynasty) shifted the capital permanently to Pataliputra and hosted the 2nd Buddhist Council at Vaishali in 383 BC (presided by Sabakami)."
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
        <h4 class="font-heading text-2xl font-bold text-white">Mahajanapada Quiz Completed!</h4>
        <p class="text-slate-300 text-sm">
          You scored <strong class="text-amber-400 font-bold">${userScore} out of ${quizQuestions.length}</strong> (${percentage}%).
        </p>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          ${percentage >= 80 ? 'Mastery of Lucent Mahajanapada & Invasions Chapter!' : 'Good attempt! Review the 16 states table and dynasty cards above.'}
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
