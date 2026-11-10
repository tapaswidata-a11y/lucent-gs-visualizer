/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 12: The Maratha Empire & Later Mughals (1674 AD – 1818 AD)
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
  { term: "Chhatrapati Shivaji", desc: "Founder of the Maratha Empire; coronated at Raigad (1674 AD) assuming title Haindava Dharmoddharak; created the Ashtapradhan council; pioneered guerrilla tactics (Ganimi Kava)." },
  { term: "Treaty of Purandar (1665)", desc: "Signed between Shivaji and Mughal general Raja Jai Singh of Amber; Shivaji surrendered 23 forts and agreed to attend Agra court." },
  { term: "Ashtapradhan", desc: "Council of 8 ministers in Shivaji's administration: Peshwa (Prime Minister), Amatya (Finance), Waqenavis, Sachiv, Sumant (Foreign), Senapati, Panditrao, and Nyayadhish." },
  { term: "Chauth & Sardeshmukhi", desc: "Chauth was 1/4th (25%) protection tax levied on non-Maratha territories; Sardeshmukhi was an additional 1/10th (10%) sovereign assessment." },
  { term: "Peshwa Baji Rao I", desc: "Greatest cavalry general (1720–1740 AD); championed Hindu Pad-Padshahi; undefeated in 40+ battles; defeated Nizam at Palkhed and Bhopal; entered Delhi in 1737." },
  { term: "Third Battle of Panipat (1761)", desc: "Fought on 14 January 1761 between the Maratha army (Sadashivrao Bhau) and Afghan king Ahmad Shah Abdali; disastrous loss that shattered Maratha dreams of pan-Indian empire." },
  { term: "Nadir Shah's Invasion (1739)", desc: "Persian king Nadir Shah defeated Muhammad Shah Rangeela at Karnal, ransacking Delhi for 57 days and looting the Peacock Throne and Kohinoor diamond." },
  { term: "Farrukhsiyar's Farman (1717)", desc: "Mughal 'Magna Carta' granting the British East India Company duty-free trading privileges in Bengal in return for an annual tribute of Rs 3,000." },
  { term: "Bahadur Shah II Zafar", desc: "Last Mughal Emperor; symbolic figurehead of the 1857 Great Revolt; exiled by the British to Rangoon (Burma) where he died in 1862." }
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
    q: "At which fort was Shivaji Maharaj coronated as Chhatrapati in 1674 AD by Pandit Gaga Bhatt?",
    a: "Raigad Fort in Maharashtra, assuming the title 'Haindava Dharmoddharak' (Protector of Hindu Faith)."
  },
  {
    q: "What was the difference between 'Chauth' and 'Sardeshmukhi' taxes in the Maratha revenue system?",
    a: "'Chauth' was a 25% (1/4th) tax paid to avoid Maratha raids; 'Sardeshmukhi' was an additional 10% (1/10th) tribute claimed by the king as hereditary supreme head."
  },
  {
    q: "Who was the brilliant Maratha commander who proclaimed: 'Let us strike at the trunk of the withering tree, and the branches will fall off themselves'?",
    a: "Peshwa Baji Rao I (1720–1740 AD), who expanded Maratha power to the gates of Delhi and Punjab."
  },
  {
    q: "Who commanded the Maratha army at the disastrous Third Battle of Panipat on 14 January 1761?",
    a: "Sadashivrao Bhau (cousin of Peshwa Balaji Baji Rao) alongside young Vishwasrao, opposing Ahmad Shah Abdali."
  },
  {
    q: "Which Persian emperor plundered Delhi in 1739 AD and carried away the Peacock Throne and the Kohinoor Diamond?",
    a: "Nadir Shah, after defeating Mughal emperor Muhammad Shah 'Rangeela' at the Battle of Karnal."
  },
  {
    q: "In Shivaji's Ashtapradhan council, what was the portfolio of the minister designated as 'Sumant' or 'Dabir'?",
    a: "Foreign Minister in charge of external relations, foreign embassies, and diplomacy."
  },
  {
    q: "Which Mughal emperor granted the famous 1717 Farman giving the British East India Company duty-free trade in Bengal?",
    a: "Farrukhsiyar, often described by historians as the 'Magna Carta' of the East India Company."
  },
  {
    q: "Where was the last Mughal Emperor, Bahadur Shah II Zafar, exiled after the suppression of the 1857 Revolt?",
    a: "Rangoon (Yangon), Burma, where he died in captivity in 1862."
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
    q: "The Treaty of Purandar was signed in June 1665 between Chhatrapati Shivaji and which imperial Mughal general?",
    options: [
      "Shaista Khan",
      "Raja Jai Singh I of Amber",
      "Jaswant Singh of Marwar",
      "Dilir Khan"
    ],
    correct: 1,
    explanation: "Raja Jai Singh of Amber was appointed by Aurangzeb; he besieged Purandar and negotiated the treaty with Shivaji."
  },
  {
    q: "Which member of Shivaji's Ashtapradhan was responsible for the royal finances and auditing state accounts?",
    options: [
      "Peshwa",
      "Amatya (Majumdar)",
      "Sachiv (Shurnavis)",
      "Waqenavis"
    ],
    correct: 1,
    explanation: "The Amatya or Majumdar functioned as the Finance Minister and Accountant General of the kingdom."
  },
  {
    q: "Which Maratha queen valiantly led the resistance against the imperial armies of Aurangzeb between 1700 and 1707 AD?",
    options: [
      "Jijabai",
      "Soyarabai",
      "Tarabai",
      "Ahilyabai Holkar"
    ],
    correct: 2,
    explanation: "Tarabai (widow of Rajaram) acted as regent for her son Shivaji II and displayed stellar military leadership against Aurangzeb."
  },
  {
    q: "In the Third Battle of Panipat (1761), who was the Afghan Rohilla ally who supported Ahmad Shah Abdali against the Marathas?",
    options: [
      "Najib-ud-Daulah",
      "Shuja-ud-Daulah",
      "Mir Qasim",
      "Hafiz Rahmat Khan"
    ],
    correct: 0,
    explanation: "Najib-ud-Daulah (Rohilla chief) coordinated Abdali's logistics and cut off Maratha supply lines."
  },
  {
    q: "The independent regional state of Hyderabad was founded in 1724 AD by which Mughal viceroy?",
    options: [
      "Saadat Khan Burhan-ul-Mulk",
      "Murshid Quli Khan",
      "Mir Qamar-ud-din Khan (Nizam-ul-Mulk / Asaf Jah I)",
      "Zulfiqar Khan"
    ],
    correct: 2,
    explanation: "Nizam-ul-Mulk defeated the imperial governor Mubariz Khan at the Battle of Shakar Kheda in 1724, founding the Asaf Jahi dynasty."
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
        <h4 class="font-heading text-2xl font-bold text-white">Maratha & Later Mughal Quiz Completed!</h4>
        <p class="text-slate-300 text-sm">
          You scored <strong class="text-amber-400 font-bold">${userScore} out of ${quizQuestions.length}</strong> (${percentage}%).
        </p>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          ${percentage >= 80 ? 'Mastery demonstrated across Shivaji, the Ashtapradhan, Peshwas, and Later Mughals!' : 'Good effort! Review the Treaty of Purandar, Third Panipat, and Nadir Shah above.'}
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
