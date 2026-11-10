/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 7: The Gupta Empire & Harshavardhana (319 AD – 647 AD)
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
  { term: "Chandragupta I", desc: "First imperial Gupta sovereign (319–335 AD); assumed title 'Maharajadhiraja' and established the Gupta Era (319–320 AD); married Lichchhavi princess Kumaradevi." },
  { term: "Samudragupta (Napoleon of India)", desc: "Celebrated by V.A. Smith as the 'Indian Napoleon'. Court poet Harisena composed the Prayag Prashasti on the Allahabad Pillar. Struck Veena-playing gold coins and performed Ashvamedha." },
  { term: "Chandragupta II Vikramaditya", desc: "Eliminated the Western Kshatrapas (Rudrasimha III) taking the title 'Sakari' & 'Vikramaditya'. Patron of the Nine Gems (Navaratnas). Chinese pilgrim Fa-Hien visited during his reign." },
  { term: "Mehrauli Iron Pillar", desc: "Monolithic rustless iron pillar at Delhi celebrating King 'Chandra'; a metallurgical marvel that has stood uncorroded for over 1600 years." },
  { term: "Kumaragupta I Mahendraditya", desc: "Gupta emperor (415–455 AD) who founded the premier international university of Nalanda Mahavihara in Bihar." },
  { term: "Skandagupta Kramaditya", desc: "Successfully repulsed the violent White Hunas invasion. Repaired the Sudarshana Lake dam in Saurashtra (Junagadh inscription)." },
  { term: "Aryabhata", desc: "Celebrated astronomer-mathematician of the Gupta age. Composed 'Aryabhatiya' and 'Surya Siddhanta', discovering that Earth rotates on its axis and explaining solar/lunar eclipses." },
  { term: "Varahamihira", desc: "Astronomer and polymath, author of Panchasiddhantika, Brihatsamhita, and Brihat Jataka; member of the Navaratnas." },
  { term: "Kalidasa", desc: "The Shakespeare of India; composed masterpieces like Abhijnanashakuntalam, Meghaduta, Raghuvamsha, and Kumarasambhava in classical Sanskrit." },
  { term: "Harshavardhana", desc: "Ruler of Kannauj (606–647 AD) from Pushyabhuti dynasty; author of Ratnavali, Priyadarshika, and Nagananda. Defeated by Pulakeshin II at Narmada." },
  { term: "Hiuen Tsang (Xuanzang)", desc: "'Prince of Pilgrims'; Chinese Buddhist monk who spent 15 years in India during Harsha's reign and studied at Nalanda under Shilabhadra; wrote 'Si-Yu-Ki'." },
  { term: "Aihole Inscription", desc: "Composed in Sanskrit by Jain court poet Ravikirti (634 AD) on the Meguti temple wall, commemorating Chalukya king Pulakeshin II's victory over Harshavardhana." }
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
    q: "Who composed the Prayag Prashasti (Allahabad Pillar Inscription) in praise of Samudragupta?",
    a: "Court poet Harisena, written in classical Sanskrit in the Champu style (mixture of verse and prose)."
  },
  {
    q: "Which Chinese pilgrim visited India during the reign of Chandragupta II Vikramaditya?",
    a: "Fa-Hien (Faxian, 399–414 AD), who recorded the peaceful governance, absence of capital punishment, and vegetarianism."
  },
  {
    q: "Which Gupta emperor founded the internationally renowned Nalanda University?",
    a: "Kumaragupta I (Mahendraditya) in the 5th century AD at Badagaon near Rajgir (Bihar)."
  },
  {
    q: "What is the earliest epigraphical evidence of the practice of Sati in India?",
    a: "The Eran Stone Pillar Inscription in Madhya Pradesh dated 510 AD during the reign of Bhanugupta, mentioning the self-immolation of Goparaja's wife."
  },
  {
    q: "Name the astronomical treatise in which Aryabhata asserted that the Earth rotates on its own axis.",
    a: "Aryabhatiya (499 AD), which also calculated value of Pi (3.1416) and formulated rules for calculating area of triangles and eclipses."
  },
  {
    q: "Which Chalukya ruler defeated Emperor Harshavardhana on the banks of the Narmada River?",
    a: "Pulakeshin II of the Badami Chalukyas, celebrated in the 634 AD Aihole Inscription composed by court poet Ravikirti."
  },
  {
    q: "Name the three Sanskrit dramas authored by Emperor Harshavardhana himself.",
    a: "Ratnavali, Priyadarshika, and Nagananda."
  },
  {
    q: "Who was the Chancellor of Nalanda Mahavihara when Chinese monk Hiuen Tsang studied there?",
    a: "Acharya Shilabhadra, under whose guidance Hiuen Tsang studied Yogachara Buddhist philosophy."
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
    q: "On his gold coins, Samudragupta is depicted playing which musical instrument, demonstrating his love for fine arts?",
    options: [
      "Mridangam",
      "Veena (Lyre)",
      "Flute (Venu)",
      "Dholak"
    ],
    correct: 1,
    explanation: "Samudragupta struck the famous 'Lyrist / Veena' type gold coins bearing his portrait seated on a high couch playing the stringed Veena."
  },
  {
    q: "The famous Navaratnas (Nine Gems) adorned the imperial court of which ancient Indian monarch?",
    options: [
      "Chandragupta Maurya",
      "Samudragupta",
      "Chandragupta II Vikramaditya",
      "Harshavardhana"
    ],
    correct: 2,
    explanation: "Chandragupta II Vikramaditya's court at Ujjain patronized the Navaratnas, including Kalidasa, Varahamihira, Amarasimha, and Dhanvantari."
  },
  {
    q: "The Mehrauli Iron Pillar at Delhi commemorates the exploits of which king?",
    options: [
      "Ashoka",
      "King Chandra (Chandragupta II)",
      "Kanishka",
      "Skandagupta"
    ],
    correct: 1,
    explanation: "The inscription on the Mehrauli pillar commemorates King Chandra, identified by historians as Gupta Emperor Chandragupta II Vikramaditya."
  },
  {
    q: "Which Chinese pilgrim visited India during Harshavardhana's reign and wrote the comprehensive travelogue 'Si-Yu-Ki'?",
    options: [
      "Fa-Hien",
      "Hiuen Tsang (Xuanzang)",
      "I-Tsing (Yijing)",
      "Sung-Yun"
    ],
    correct: 1,
    explanation: "Hiuen Tsang arrived in 629 AD, studied at Nalanda, attended Harsha's assemblies at Kannauj and Prayag, and authored the 'Si-Yu-Ki'."
  },
  {
    q: "Who was the royal court poet of Harshavardhana who authored the biographical classic 'Harshacharita' and 'Kadambari'?",
    options: [
      "Banabhatta",
      "Harisena",
      "Bhavabhuti",
      "Dandin"
    ],
    correct: 0,
    explanation: "Banabhatta was Harsha's court poet who authored 'Harshacharita' (the first formal historical biography in Sanskrit) and 'Kadambari'."
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
        <h4 class="font-heading text-2xl font-bold text-white">Gupta & Harsha Quiz Completed!</h4>
        <p class="text-slate-300 text-sm">
          You scored <strong class="text-amber-400 font-bold">${userScore} out of ${quizQuestions.length}</strong> (${percentage}%).
        </p>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          ${percentage >= 80 ? 'Outstanding mastery of the Classical Golden Age of Ancient India!' : 'Good attempt! Review the rulers, Navaratnas, Nalanda, and Harsha above.'}
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
