/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 11: The Mughal Empire & Sher Shah Suri (1526 AD – 1707 AD)
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
  { term: "Babur (Zahiruddin Muhammad)", desc: "Founder of Mughal Empire; defeated Ibrahim Lodi at 1st Battle of Panipat (1526) and Rana Sanga at Khanwa (1527); introduced Tulghuma and artillery; authored Tuzuk-i-Baburi in Turki." },
  { term: "Sher Shah Suri", desc: "Founder of Second Afghan Empire; built the Grand Trunk Road (Sadak-i-Azam), issued pure silver coin 'Rupiya' (178 grains), introduced Patta and Qabuliyat, and built Rohtas Fort and Sasaram mausoleum." },
  { term: "Akbar the Great", desc: "Won 2nd Battle of Panipat (1556) and Haldighati (1576); introduced Mansabdari and Dahsala (Todar Mal) land revenue systems; built Fatehpur Sikri and Buland Darwaza; promulgated Din-i-Ilahi (1582)." },
  { term: "Navaratnas of Akbar", desc: "Nine luminaries: Birbal, Abul Fazl (author of Akbarnama), Faizi, Tansen (musician), Raja Todar Mal (finance), Raja Man Singh, Abdul Rahim Khan-i-Khana, Fakir Aziao-Din, and Mullah Do-Piyaza." },
  { term: "Jahangir (Salim)", desc: "Installed Zanjir-i-Adl (Chain of Justice); patronized master painters Ustad Mansur and Abul Hasan; granted commercial concessions to British envoys Hawkins (1608) and Sir Thomas Roe (1615)." },
  { term: "Shah Jahan (Khurram)", desc: "Golden Age of Mughal Architecture ('Prince of Builders'); erected Taj Mahal, Red Fort (Delhi), Jama Masjid, Moti Masjid, and Peacock Throne (studded with Kohinoor)." },
  { term: "Aurangzeb Alamgir", desc: "Puritanical ruler titled 'Zinda Pir'; reimposed Jizya (1679); executed Guru Tegh Bahadur (1675); annexed Bijapur (1686) and Golconda (1687); built Badshahi Mosque and Bibi ka Maqbara." }
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
    q: "In which battle did Babur adopt the battle tactical system of 'Tulghuma' and 'Rumi' artillery deployment?",
    a: "The First Battle of Panipat on 21 April 1526, crushing Ibrahim Lodi's army with matchlocks and field cannons."
  },
  {
    q: "Who introduced the standardized pure silver coin 'Rupiya' weighing 178 grains, the ancestor of modern Indian Rupee?",
    a: "Sher Shah Suri (1540–1545 AD), who also regularized the copper 'Dam'."
  },
  {
    q: "Which Mughal emperor issued the 'Mahzarnama' (Infallibility Decree) in 1579 AD, making himself supreme arbiter in religious disputes?",
    a: "Emperor Akbar the Great, drafted by Sheikh Mubarak (father of Abul Fazl and Faizi)."
  },
  {
    q: "What was the 'Dahsala' or 'Zabti' system of land revenue introduced by Raja Todar Mal in 1580 AD?",
    a: "Revenue assessment based on the 10-year rolling average of crop yield and local prices; state share was 1/3rd in cash."
  },
  {
    q: "Who was the English ambassador sent by King James I who spent 3 years at Jahangir's court securing factory concessions?",
    a: "Sir Thomas Roe (arrived 1615 AD at Surat), securing permission to establish British trading posts."
  },
  {
    q: "Who was the chief architect of the Taj Mahal commissioned by Emperor Shah Jahan?",
    a: "Ustad Ahmad Lahori (assisted by Mir Abd-ul Karim), completed in 1648 AD."
  },
  {
    q: "Which Sikh Guru was executed by Aurangzeb in 1675 AD at Delhi's Chandni Chowk for defying forced religious conversions?",
    a: "The 9th Sikh Guru, Guru Tegh Bahadur (commemorated at Gurdwara Sis Ganj Sahib)."
  },
  {
    q: "In the Mughal Mansabdari system, what did the dual metrics 'Zat' and 'Sawar' represent?",
    a: "'Zat' determined the personal military rank, status, and salary; 'Sawar' specified the exact number of mounted cavalry troopers the mansabdar had to maintain."
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
    q: "The Buland Darwaza at Fatehpur Sikri was constructed by Akbar to commemorate his decisive conquest of:",
    options: [
      "Kashmir",
      "Bengal",
      "Gujarat",
      "Malwa"
    ],
    correct: 2,
    explanation: "Erected in 1575 AD, the 54-metre high Buland Darwaza celebrated Akbar's victory over Gujarat in 1572–73."
  },
  {
    q: "Under the Dahsala land revenue categorization, land that was continuously cultivated every year without fallow was called:",
    options: [
      "Parauti",
      "Polaj",
      "Chachar",
      "Banjar"
    ],
    correct: 1,
    explanation: "'Polaj' was prime agrarian land cultivated each season yielding regular revenue without leaving it fallow."
  },
  {
    q: "The only Hindu noble in Akbar's court to formally accept the syncretic ethical order 'Din-i-Ilahi' was:",
    options: [
      "Raja Man Singh",
      "Raja Todar Mal",
      "Raja Birbal (Mahesh Das)",
      "Raja Bhagwan Das"
    ],
    correct: 2,
    explanation: "Raja Birbal was the sole Hindu who embraced Akbar's Din-i-Ilahi; Man Singh and Todar Mal respectfully declined."
  },
  {
    q: "Which master miniature painter was honoured with the title 'Nadir-ul-Asr' by Emperor Jahangir for his portraits of birds and wildlife?",
    options: [
      "Abul Hasan",
      "Ustad Mansur",
      "Daswant",
      "Basawan"
    ],
    correct: 1,
    explanation: "Jahangir conferred 'Nadir-ul-Asr' on Ustad Mansur for his botanical and ornithological studies (including the Siberian crane and dodo)."
  },
  {
    q: "In which year did Emperor Aurangzeb reimpose the Jizya tax on non-Muslim subjects across the Mughal Empire?",
    options: [
      "1658 AD",
      "1669 AD",
      "1679 AD",
      "1686 AD"
    ],
    correct: 2,
    explanation: "Aurangzeb reimposed Jizya in 1679 AD (115 years after its abolition by Akbar in 1564), provoking widespread protests."
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
        <h4 class="font-heading text-2xl font-bold text-white">Mughal Empire Quiz Completed!</h4>
        <p class="text-slate-300 text-sm">
          You scored <strong class="text-amber-400 font-bold">${userScore} out of ${quizQuestions.length}</strong> (${percentage}%).
        </p>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          ${percentage >= 80 ? 'Mastery demonstrated across Babur, Sher Shah, Akbar, Shah Jahan, and Aurangzeb!' : 'Good effort! Review the battles, revenue systems, and architectural monuments above.'}
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
