/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 6: Post-Mauryan / Pre-Gupta & Sangam Period (185 BC – 319 AD)
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
  { term: "Pushyamitra Shunga", desc: "Founder of Shunga dynasty (185 BC), performed two Ashvamedha sacrifices assisted by sage Patanjali (author of Mahabhashya)." },
  { term: "Garuda Pillar of Besnagar", desc: "Erected at Vidisha by Greek envoy Heliodorus, devotee of Lord Vasudeva (Bhagavatism), during reign of Shunga king Bhagabhadra." },
  { term: "Gautamiputra Satakarni", desc: "Greatest Satavahana king (106–130 AD), defeated Kshatrapa Nahapana, styled 'Ekabrahmana' and 'Trisamudrapitapoyavahana'." },
  { term: "Hathigumpha Inscription", desc: "Udayagiri hill inscription in Prakrit language and Brahmi script, recording the 13-year achievements of King Kharavela of Kalinga (Cheti dynasty)." },
  { term: "Menander / Milinda", desc: "Most famous Indo-Greek ruler; converted to Buddhism by monk Nagasena as immortalized in the Pali treatise 'Milindapanho'." },
  { term: "Rudradaman I", desc: "Western Kshatrapa (Saka) ruler of Ujjain; renovated Sudarshana lake and issued the first-ever long inscription in chaste classical Sanskrit at Junagadh (150 AD)." },
  { term: "Kanishka I", desc: "Greatest Kushan king (78–101 AD), founded the Saka Era (78 AD), convened 4th Buddhist Council in Kashmir, patron of Charaka and Ashvaghosha." },
  { term: "Gandhara School of Art", desc: "Greco-Buddhist art in northwest India using grey sandstone/stucco, depicting realistic muscular Buddha with wavy hair and Greek toga drapery." },
  { term: "Mathura School of Art", desc: "Indigenous sculptural style in spotted red sandstone, producing early images of Buddha, Mahavira, and Brahmanical deities like Vishnu and Shiva." },
  { term: "Tolkappiyam", desc: "Earliest surviving Tamil grammar and literary treatise authored by Tolkappiyar, product of the 2nd Tamil Sangam at Kapadapuram." },
  { term: "Silappadikaram", desc: "Renowned Tamil epic authored by Ilango Adigal, revolving around Kannagi, Kovalan, and Madhavi; instituted the Pattini (chaste wife) cult." },
  { term: "Tirukkural", desc: "Compound treatise on virtue, wealth, and love by Saint Tiruvalluvar, celebrated as the 'Bible of the Tamil Land'." }
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
    q: "Who was the priest who officiated the two Ashvamedha sacrifices of Pushyamitra Shunga?",
    a: "Sage Patanjali, the celebrated grammarian and philosopher who composed the 'Mahabhashya' (commentary on Panini's Ashtadhyayi)."
  },
  {
    q: "Which Indo-Greek ambassador erected the famous Garuda Pillar at Besnagar (Vidisha)?",
    a: "Heliodorus, ambassador of king Antialcidas of Taxila, who dedicated the pillar to Lord Vasudeva and embraced the Bhagavata faith."
  },
  {
    q: "Who were the first rulers in ancient Indian history to issue gold coins bearing royal portraits and inscriptions?",
    a: "The Indo-Greeks (Bactrian Greeks), followed on an imperial scale by the Kushanas (Vima Kadphises and Kanishka)."
  },
  {
    q: "Which Satavahana king is referred to in the Nasik Prashasti as 'Ekabrahmana'?",
    a: "Gautamiputra Satakarni (106–130 AD), who defeated the Western Kshatrapa ruler Nahapana and revived Satavahana fortunes."
  },
  {
    q: "What is the historical significance of the Junagadh Rock Inscription of Rudradaman I (150 AD)?",
    a: "It is the first-ever long inscription composed in chaste, classical Sanskrit, recording the repair of the Sudarshana Lake originally built under the Mauryas."
  },
  {
    q: "Which historical calendar era was founded by Kushan Emperor Kanishka I in 78 AD?",
    a: "The Saka Era (78 AD), which is adopted by the Government of India as its official National Civil Calendar."
  },
  {
    q: "Who presided over the 4th Buddhist Council convened by Kanishka at Kundalvana in Kashmir?",
    a: "Presided by Vasumitra with Ashvaghosha (author of Buddhacharita) serving as vice-president; it codified the split into Hinayana and Mahayana."
  },
  {
    q: "Name the ancient Tamil grammar text that is the only surviving literary work of the Second Sangam.",
    a: "Tolkappiyam, composed by Tolkappiyar, dealing comprehensively with orthography, etymology, and poetics/society."
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
    q: "The philosophical dialogue between Indo-Greek King Menander and Buddhist monk Nagasena is compiled in which classical text?",
    options: [
      "Dipavamsa",
      "Milindapanho",
      "Mahavastu",
      "Lalitavistara"
    ],
    correct: 1,
    explanation: "'Milindapanho' (Questions of Milinda) is a canonical Pali text recording philosophical inquiries between Menander and Nagasena."
  },
  {
    q: "Which foreign dynasty's coins depicted Shiva holding a trident accompanied by the bull Nandi, proving the king's Shaiva devotion?",
    options: [
      "Indo-Greeks (Demetrius)",
      "Kushanas (Vima Kadphises)",
      "Western Kshatrapas (Chastana)",
      "Parthians (Gondophernes)"
    ],
    correct: 1,
    explanation: "Vima Kadphises (Kushan) adopted the title 'Sarvaloka Ishvara Mahishvara' and issued extensive gold coins depicting Shiva and Nandi."
  },
  {
    q: "The famous Hathigumpha inscription on Udayagiri Hills near Bhubaneswar describes the reign of which king?",
    options: [
      "Gautamiputra Satakarni",
      "Rudradaman I",
      "Kharavela of Kalinga",
      "Pushyamitra Shunga"
    ],
    correct: 2,
    explanation: "The Hathigumpha inscription, written in Prakrit and Brahmi script, gives a biographical year-by-year account of Chedi King Kharavela."
  },
  {
    q: "Charaka, the famous ancient Indian physician and author of 'Charaka Samhita', was patronized in the court of which monarch?",
    options: [
      "Chandragupta Maurya",
      "Kanishka I",
      "Gautamiputra Satakarni",
      "Rudradaman I"
    ],
    correct: 1,
    explanation: "Charaka was the court physician of Kushan emperor Kanishka I at Purushapura (Peshawar)."
  },
  {
    q: "In the Sangam epic 'Silappadikaram', who is the heroine who burnt down Madurai in vengeance for her husband Kovalan's wrongful execution?",
    options: [
      "Madhavi",
      "Kannagi",
      "Manimekalai",
      "Andal"
    ],
    correct: 1,
    explanation: "Kannagi proved her husband's innocence by showing her ruby-filled anklet, leading to the establishment of the Pattini (chaste wife) cult."
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
        <h4 class="font-heading text-2xl font-bold text-white">Post-Maurya & Sangam Quiz Completed!</h4>
        <p class="text-slate-300 text-sm">
          You scored <strong class="text-amber-400 font-bold">${userScore} out of ${quizQuestions.length}</strong> (${percentage}%).
        </p>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          ${percentage >= 80 ? 'Mastery demonstrated across Indo-Greeks, Kushanas, Satavahanas, and Sangam epics!' : 'Good effort! Review the rulers, art schools, and Tamil literature above.'}
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
