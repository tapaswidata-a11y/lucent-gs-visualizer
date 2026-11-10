/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 5: The Mauryan Empire (322 BC – 185 BC)
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

// --- SEARCH DATABASE ---
const mauryaSearchDB = [
  { title: "Kalinga War (261 BC)", category: "Ashoka", snippet: "Fought in Ashoka's 9th regnal year. Described vividly in 13th Major Rock Edict; transformed Bherighosha into Dhammaghosha.", link: "#ashoka" },
  { title: "Decipherment of Ashokan Inscriptions", category: "Epigraphy", snippet: "Deciphered by James Prinsep in 1837. Written in Prakrit, Greek, and Aramaic using Brahmi and Kharosthi scripts.", link: "#edicts" },
  { title: "Arthashastra of Kautilya", category: "Administration", snippet: "Treatise on statecraft, economics, espionage, and warfare composed of 15 Adhikaranas (books). Saptanga theory of state.", link: "#administration" },
  { title: "Indica of Megasthenes", category: "Sources", snippet: "Account of Mauryan society and municipal governance by Greek ambassador of Seleucus Nicator. Mentions 7 castes and absence of slavery in India.", link: "#overview" },
  { title: "Samaharta & Sannidhata", category: "Officers", snippet: "Samaharta was the Chief Collector of Revenue; Sannidhata was the Chief Treasury Officer.", link: "#administration" },
  { title: "Brihadratha", category: "Fall of Mauryas", snippet: "Last Mauryan emperor, assassinated in 185 BC by his commander-in-chief Pushyamitra Shunga during a military review.", link: "#decline" }
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
    searchResults.innerHTML = '<p class="text-slate-500 text-center py-6">Type a keyword to search Ashoka, Kautilya, Kalinga war, and edicts...</p>';
    return;
  }

  const matches = mauryaSearchDB.filter(item => 
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
    category: "Ashokan Edicts",
    question: "In which Major Rock Edict does Ashoka give the heart-rending account of the Kalinga War?",
    answer: "Major Rock Edict XIII (13th Rock Edict). It records that 100,000 were slain and 150,000 carried away captive."
  },
  {
    category: "Epigraphy & Decipherment",
    question: "Who was the first scholar to successfully decipher the Ashokan Brahmi inscriptions and in which year?",
    answer: "James Prinsep, a civil servant and numismatist of the Asiatic Society of Bengal, in the year 1837."
  },
  {
    category: "Mauryan Administration",
    question: "What were the primary responsibilities of the 'Samaharta' and 'Sitadhyaksha' in Kautilya's Arthashastra?",
    answer: "Samaharta: Chief Collector General of Revenue.\nSitadhyaksha: Superintendent of Crown Agricultural Lands (Sita)."
  },
  {
    category: "Greek Diplomacy",
    question: "Which Seleucid Greek diplomat served at Pataliputra and authored the famous book 'Indica'?",
    answer: "Megasthenes, sent by Seleucus I Nicator to the court of Chandragupta Maurya around 302 BC."
  },
  {
    category: "Emperor's Personal Name",
    question: "In which four minor rock inscriptions does the actual personal name 'Ashoka' appear instead of 'Devanampriya'?",
    answer: "Maski, Gurjara, Nittur, and Udegolam."
  },
  {
    category: "End of Dynasty",
    question: "Who was the last Mauryan king and who assassinated him in 185 BC to establish the Shunga Dynasty?",
    answer: "Brihadratha was assassinated by his Brahmin Commander-in-Chief, Pushyamitra Shunga, during a military parade."
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
    q: "The Saptanga Theory of State (Seven Limbs of the State) was propounded by Chanakya in which ancient treatise?",
    options: ["Indica", "Arthashastra", "Mudrarakshasa", "Nitisara"],
    correct: 1,
    explanation: "Kautilya's Arthashastra details the Saptanga theory: Swami (King), Amatya (Ministers), Janapada (Territory & People), Durga (Fort), Kosha (Treasury), Danda (Army), and Mitra (Allies)."
  },
  {
    q: "Which Mauryan emperor embraced Jainism and passed away by performing the ritual fasting to death (Sallekhana) at Shravanabelagola?",
    options: ["Chandragupta Maurya", "Bindusara", "Ashoka", "Dasharatha"],
    correct: 0,
    explanation: "Chandragupta Maurya abdicated the throne, travelled south to Karnataka with Jain monk Bhadrabahu, and died of Sallekhana at Chandragiri hill."
  },
  {
    q: "Ashoka appointed special judicial and welfare officers called 'Dhamma Mahamattas' in which regnal year?",
    options: ["9th regnal year", "14th regnal year", "20th regnal year", "26th regnal year"],
    correct: 1,
    explanation: "As recorded in Major Rock Edict V, Ashoka created the post of Dhamma Mahamattas in his 14th regnal year to propagate Dhamma and prevent miscarriages of justice."
  },
  {
    q: "Which Greek ruler sent Deimachus as an ambassador to the court of Bindusara?",
    options: ["Seleucus I Nicator", "Antiochus I of Syria", "Ptolemy II Philadelphus", "Alexander of Epirus"],
    correct: 1,
    explanation: "Antiochus I of Syria sent Deimachus as ambassador to Bindusara. Ptolemy II of Egypt sent Dionysius."
  },
  {
    q: "The Ashokan rock edicts found at Shahbazgarhi and Mansehra (Pakistan) were engraved in which script?",
    options: ["Brahmi Script", "Kharosthi Script", "Greek Script", "Aramaic Script"],
    correct: 1,
    explanation: "In the North-West, Ashokan inscriptions (Shahbazgarhi & Mansehra) were written in the local Kharosthi script (derived from Aramaic, written right-to-left)."
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
        <h4 class="font-heading text-2xl font-bold text-white">Mauryan Quiz Completed!</h4>
        <p class="text-slate-300 text-sm">
          You scored <strong class="text-amber-400 font-bold">${userScore} out of ${quizQuestions.length}</strong> (${percentage}%).
        </p>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          ${percentage >= 80 ? 'Exceptional mastery of Lucent Mauryan Empire Chapter!' : 'Good effort! Review the edicts and administrative officials above.'}
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
