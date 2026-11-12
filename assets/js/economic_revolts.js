/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 15: Economic Impact, Land Revenue & Popular Uprisings
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

  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal || e.target.classList.contains('lightbox-backdrop')) {
      closeFullImageViewer();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeFullImageViewer();
      closeSearchModal();
    }
  });
}

// Hook all zoomable images
document.querySelectorAll('[data-zoomable="true"]').forEach(el => {
  el.addEventListener('click', () => {
    const src = el.getAttribute('data-img-src') || el.querySelector('img')?.src;
    const title = el.getAttribute('data-img-title') || "Historical Artifact";
    const desc = el.getAttribute('data-img-desc') || "High-resolution historical capture from archival collections.";
    if (src) openFullImageViewer(src, title, desc);
  });
});

// --- SEARCH SYSTEM ---
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearchBtn = document.getElementById('closeSearchBtn');
const factSearchInput = document.getElementById('factSearchInput');
const searchResultsContainer = document.getElementById('searchResultsContainer');

const factsDatabase = [
  { topic: "Drain of Wealth Theory", text: "Dadabhai Naoroji formulated the Drain of Wealth in 'England's Debt to India' (1867) and his magnum opus 'Poverty and Un-British Rule in India' (1901). R.C. Dutt reinforced it in 'Economic History of India' (1901)." },
  { topic: "Permanent Settlement (Zamindari)", text: "Introduced by Lord Cornwallis in 1793 in Bengal, Bihar, Orissa, and Varanasi. Zamindars recognized as absolute owners. State share fixed at 10/11th; Zamindar retained 1/11th. Subject to Sunset Law." },
  { topic: "Ryotwari System", text: "Devised by Alexander Read (1792) and Thomas Munro (1820) in Madras, Bombay, and Assam (51% of British India). Direct revenue agreement with the cultivator (Ryot) for 20–30 years, amounting to 45–55% of gross produce." },
  { topic: "Mahalwari System", text: "Devised by Holt Mackenzie (1819) and modified by Martin Bird (1833) in Gangetic Valley, NWFP, and Punjab (30% of British India). Revenue settled village by village (Mahal) with the Lumberdar (village head)." },
  { topic: "Santhal Rebellion", text: "1855–1856 in Damin-i-Koh (Rajmahal Hills). Led by brothers Sidhu, Kanhu, Chand, and Bhairav against corrupt British police, zamindars, and moneylenders (Mahajans). Resulted in the creation of Santhal Parganas district." },
  { topic: "Munda Rebellion (Ulgulan)", text: "1899–1900 in Ranchi. Led by Bhagwan Birsa Munda against erosion of Khuntkatti (communal tribal landholding) and Dikus (explitative outsiders). Led to the Chotanagpur Tenancy Act of 1908." },
  { topic: "Indigo Revolt (Nil Bidroho)", text: "1859–1860 in Nadia and Jessore (Bengal). Led by Digambar Biswas and Bishnu Biswas against coercive European planters. Dinabandhu Mitra dramatized it in the famous Bengali play 'Nil Darpan'." },
  { topic: "Sanyasi & Fakir Rebellion", text: "1763–1800 in Bengal. Dispossessed peasants, demobilized soldiers, and Sanyasis led by Majnu Shah, Chirag Ali, and Bhawani Pathak. Featured in Bankim Chandra's 'Anandamath' containing 'Vande Mataram'." },
  { topic: "Deccan Riots", text: "1875 in Poona and Ahmednagar. Maratha peasants revolted against extortionate Marwari and Gujarati moneylenders, burning debt bonds. Led to the Deccan Agriculturalists Relief Act of 1879." },
  { topic: "Kol Mutiny", text: "1831–1832 in Chotanagpur (Singhbhum, Ranchi, Palamau). Led by Buddhu Bhagat against British revenue officials and outsiders encroaching on tribal ancestral lands." }
];

function openSearchModal() {
  if (!searchModal) return;
  searchModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  factSearchInput?.focus();
  renderSearchResults('');
}

function closeSearchModal() {
  if (!searchModal) return;
  searchModal.classList.add('hidden');
  document.body.style.overflow = '';
}

function renderSearchResults(query) {
  if (!searchResultsContainer) return;
  const q = query.toLowerCase().trim();
  const filtered = factsDatabase.filter(f => f.topic.toLowerCase().includes(q) || f.text.toLowerCase().includes(q));
  
  if (filtered.length === 0) {
    searchResultsContainer.innerHTML = `
      <div class="p-8 text-center text-slate-400 text-sm">
        <i data-lucide="help-circle" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
        No matching concepts found for "<span class="text-amber-400">${query}</span>".
      </div>`;
  } else {
    searchResultsContainer.innerHTML = filtered.map(item => `
      <div class="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all">
        <div class="text-xs font-bold text-amber-400 mb-1 flex items-center justify-between">
          <span>${item.topic}</span>
          <span class="text-[10px] text-slate-400 font-mono">Lucent GK Core</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">${item.text}</p>
      </div>
    `).join('');
  }
  lucide.createIcons();
}

searchBtn?.addEventListener('click', openSearchModal);
closeSearchBtn?.addEventListener('click', closeSearchModal);
factSearchInput?.addEventListener('input', (e) => renderSearchResults(e.target.value));

// --- CHAPTER DROPDOWN ---
const chapterSelectorBtn = document.getElementById('chapterSelectorBtn');
const chapterDropdown = document.getElementById('chapterDropdown');

chapterSelectorBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  chapterDropdown?.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (!chapterDropdown?.contains(e.target) && e.target !== chapterSelectorBtn) {
    chapterDropdown?.classList.add('hidden');
  }
});

// --- FLASHCARDS LOGIC ---
const flashcardsData = [
  {
    q: "In which book did Dadabhai Naoroji systematically present the 'Drain of Wealth' theory?",
    a: "In 'Poverty and Un-British Rule in India' (published 1901), following his initial 1867 paper 'England's Debt to India'."
  },
  {
    q: "Under the Permanent Settlement of 1793, what fraction of land revenue was fixed for the British Government versus the Zamindar?",
    a: "The Government share was fixed perpetually at 10/11th of the total rental, while the Zamindar was entitled to retain 1/11th as his remuneration."
  },
  {
    q: "Who were the leaders of the historic Santhal Rebellion of 1855–56 in the Rajmahal Hills?",
    a: "Four Murmu brothers: Sidhu, Kanhu, Chand, and Bhairav, mobilizing over 10,000 Santhals in the Damin-i-Koh region."
  },
  {
    q: "What was the 'Sunset Law' associated with the Permanent Settlement?",
    a: "If a Zamindar failed to deposit the specified revenue installment into the British treasury by sunset of the due date, his entire estate was auctioned by the Government."
  },
  {
    q: "Which Bengali play by Dinabandhu Mitra exposed the brutal exploitation of indigo farmers by European planters?",
    a: "'Nil Darpan' (The Mirror of Indigo), published in Dhaka in 1860 and translated into English by Michael Madhusudan Dutt under the pseudonym of Rev. James Long."
  },
  {
    q: "What did the term 'Diku' signify during the Munda rebellion led by Birsa Munda?",
    a: "'Diku' was the tribal derogatory term for exploitative outsiders—non-tribal moneylenders, zamindars, contractors, and British revenue police."
  }
];

let currentCardIndex = 0;
const cardInner = document.getElementById('flashcardInner');
const cardQuestion = document.getElementById('flashcardQuestion');
const cardAnswer = document.getElementById('flashcardAnswer');
const cardCounter = document.getElementById('flashcardCounter');

function updateFlashcard() {
  if (!cardInner) return;
  cardInner.classList.remove('flipped');
  setTimeout(() => {
    cardQuestion.textContent = flashcardsData[currentCardIndex].q;
    cardAnswer.textContent = flashcardsData[currentCardIndex].a;
    if (cardCounter) {
      cardCounter.textContent = `${currentCardIndex + 1} / ${flashcardsData.length}`;
    }
  }, 150);
}

document.getElementById('flashcard')?.addEventListener('click', () => {
  cardInner?.classList.toggle('flipped');
});

document.getElementById('prevCardBtn')?.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex - 1 + flashcardsData.length) % flashcardsData.length;
  updateFlashcard();
});

document.getElementById('nextCardBtn')?.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex + 1) % flashcardsData.length;
  updateFlashcard();
});

// --- QUIZ SYSTEM ---
const quizQuestions = [
  {
    q: "The Ryotwari Settlement was introduced primarily in which provinces of British India?",
    options: [
      "Bengal and Bihar",
      "Madras and Bombay",
      "Punjab and United Provinces",
      "Central Provinces and Awadh"
    ],
    correct: 1,
    explanation: "Devised by Alexander Read and formalized by Sir Thomas Munro (Governor of Madras, 1820), the Ryotwari system covered 51% of British India, primarily in Madras and Bombay."
  },
  {
    q: "Who was the author of the landmark treatise 'Economic History of India' (1901)?",
    options: [
      "Dadabhai Naoroji",
      "Romesh Chunder Dutt (R.C. Dutt)",
      "M.G. Ranade",
      "G.K. Gokhale"
    ],
    correct: 1,
    explanation: "R.C. Dutt, a retired ICS officer, authored the classic two-volume 'Economic History of India' (1901), analyzing the catastrophic economic drain caused by British colonial policies."
  },
  {
    q: "The historic Santhal Uprising of 1855–56 led to the administrative creation of which distinct entity?",
    options: [
      "Kolhan Government Estate",
      "Santhal Parganas District",
      "Damin-i-Koh Autonomous Council",
      "Chotanagpur Agency"
    ],
    correct: 1,
    explanation: "Following the suppression of the rebellion, the British enacted Act 37 of 1855 creating the separate non-regulation district of 'Santhal Parganas' carved out of Bhagalpur and Birbhum."
  },
  {
    q: "The Sanyasi Rebellion (1763–1800) in Bengal was immortalized in which famous novel by Bankim Chandra Chatterjee?",
    options: [
      "Durgeshnandini",
      "Kapalkundala",
      "Anandamath",
      "Devi Chaudhurani"
    ],
    correct: 2,
    explanation: "Bankim Chandra Chatterjee's patriotic novel 'Anandamath' (1882) is set against the backdrop of the Sanyasi rebellion and contains the national song 'Vande Mataram'."
  },
  {
    q: "The 'Deccan Agriculturalists Relief Act' of 1879 was passed by the British administration in response to:",
    options: [
      "The Santhal Insurrection",
      "The Deccan Riots of 1875",
      "The Indigo Revolt of 1859",
      "The Pabna Agrarian League"
    ],
    correct: 1,
    explanation: "The Deccan Riots of 1875 in Poona and Ahmednagar against usurious Gujarati and Marwari moneylenders forced the British Government to pass the Deccan Agriculturalists Relief Act in 1879 to restrain moneylenders."
  }
];

let quizAnswers = new Array(quizQuestions.length).fill(null);

function renderQuiz() {
  const quizContainer = document.getElementById('quizContainer');
  if (!quizContainer) return;
  
  quizContainer.innerHTML = quizQuestions.map((q, qIdx) => `
    <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-left transition-all">
      <div class="flex items-start justify-between gap-4 mb-4">
        <h4 class="text-sm sm:text-base font-semibold text-slate-100 flex items-center gap-2.5">
          <span class="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center shrink-0 border border-amber-500/30">${qIdx + 1}</span>
          <span>${q.q}</span>
        </h4>
        <span id="quizBadge_${qIdx}" class="text-[11px] font-bold px-2 py-0.5 rounded-full hidden"></span>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
        ${q.options.map((opt, oIdx) => `
          <button 
            type="button" 
            onclick="selectQuizOption(${qIdx}, ${oIdx})" 
            id="optBtn_${qIdx}_${oIdx}" 
            class="quiz-option-btn text-xs sm:text-sm p-3 rounded-xl border border-slate-700/80 bg-slate-800/60 hover:bg-slate-800 hover:border-amber-400/50 text-slate-300 font-medium text-left transition-all flex items-center justify-between">
            <span>${opt}</span>
            <span class="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center shrink-0 indicator"></span>
          </button>
        `).join('')}
      </div>

      <div id="quizExplain_${qIdx}" class="hidden mt-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
        <span class="font-bold text-amber-400">Explanation:</span> ${q.explanation}
      </div>
    </div>
  `).join('');
}

window.selectQuizOption = function(qIdx, oIdx) {
  quizAnswers[qIdx] = oIdx;
  const q = quizQuestions[qIdx];
  const isCorrect = (oIdx === q.correct);
  
  // Update button styles
  q.options.forEach((_, idx) => {
    const btn = document.getElementById(`optBtn_${qIdx}_${idx}`);
    if (!btn) return;
    btn.disabled = true;
    btn.classList.remove('hover:bg-slate-800', 'hover:border-amber-400/50');
    
    if (idx === q.correct) {
      btn.classList.add('bg-emerald-950/60', 'border-emerald-500', 'text-emerald-200');
      btn.querySelector('.indicator').innerHTML = '<i data-lucide="check" class="w-3 h-3 text-emerald-400"></i>';
    } else if (idx === oIdx && !isCorrect) {
      btn.classList.add('bg-rose-950/60', 'border-rose-500', 'text-rose-200');
      btn.querySelector('.indicator').innerHTML = '<i data-lucide="x" class="w-3 h-3 text-rose-400"></i>';
    } else {
      btn.classList.add('opacity-50');
    }
  });

  // Badge
  const badge = document.getElementById(`quizBadge_${qIdx}`);
  if (badge) {
    badge.classList.remove('hidden');
    if (isCorrect) {
      badge.className = "text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      badge.textContent = "Correct";
    } else {
      badge.className = "text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30";
      badge.textContent = "Incorrect";
    }
  }

  // Explanation
  const explain = document.getElementById(`quizExplain_${qIdx}`);
  if (explain) explain.classList.remove('hidden');

  updateQuizScore();
  lucide.createIcons();
};

function updateQuizScore() {
  let correctCount = 0;
  quizAnswers.forEach((ans, idx) => {
    if (ans === quizQuestions[idx].correct) correctCount++;
  });

  const scoreDisplay = document.getElementById('quizScoreDisplay');
  if (scoreDisplay) {
    scoreDisplay.textContent = `Score: ${correctCount} / ${quizQuestions.length}`;
  }
}

// Reset Quiz
document.getElementById('resetQuizBtn')?.addEventListener('click', () => {
  quizAnswers = new Array(quizQuestions.length).fill(null);
  renderQuiz();
  const scoreDisplay = document.getElementById('quizScoreDisplay');
  if (scoreDisplay) scoreDisplay.textContent = `Score: 0 / ${quizQuestions.length}`;
  lucide.createIcons();
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateFlashcard();
  renderQuiz();
  lucide.createIcons();
});
