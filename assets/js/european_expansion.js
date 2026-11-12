/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 14: Arrival of Europeans & British Conquest of India (1498–1856 AD)
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
  { topic: "Vasco da Gama", text: "Portuguese navigator who landed at Calicut on 17 May 1498 via Cape of Good Hope; welcomed by Hindu King Zamorin (Samudri). Cargo fetched 60 times the cost of the expedition." },
  { topic: "Alfonso de Albuquerque", text: "Second Portuguese Viceroy (1509–15), considered the real founder of Portuguese power in the East. Captured Goa from the Sultan of Bijapur (Ismail Adil Shah) in 1510. Abolished Sati in Goa." },
  { topic: "Blue Water Policy", text: "Initiated by Francisco de Almeida (first Portuguese Viceroy, 1505–09) focusing on maritime naval supremacy in the Indian Ocean rather than territorial annexation on land." },
  { topic: "Dutch East India Company", text: "Formed in 1602 (VOC). Set up factories at Masulipatnam (1605), Pulicat (1610 - minted gold Pagodas), Surat (1616), Chinsurah (1653). Defeated by Clive in the Battle of Bedara (1759)." },
  { topic: "English Royal Charter", text: "Granted on 31 December 1600 by Queen Elizabeth I to 'Governor and Company of Merchants of London trading into the East Indies' with 15-year monopoly." },
  { topic: "Sir Thomas Roe", text: "Ambassador of King James I to Mughal Emperor Jahangir (1615–1619). Secured permission to establish English factories across the Mughal Empire, including Surat, Agra, and Ahmedabad." },
  { topic: "Founding of Calcutta", text: "Job Charnock selected Sutanuti in 1690, later combining it with Kalikata and Gobindapur in 1698. Fortified as Fort William in 1700 with Sir Charles Eyre as first President." },
  { topic: "Carnatic Wars", text: "Three Anglo-French wars (1746–63). 1st: Battle of St. Thome (1746). 2nd: Dupleix's proxy war. 3rd: Decisive Battle of Wandiwash (1760) won by Sir Eyre Coote against French General Lally." },
  { topic: "Battle of Plassey", text: "Fought on 23 June 1757 on the banks of Bhagirathi in Nadia district, Bengal. Robert Clive defeated Sirajuddaula due to treachery of Mir Jafar, Jagat Seth, Omichand, and Rai Durlabh." },
  { topic: "Battle of Buxar", text: "Fought on 22 October 1764. Major Hector Munro decisively defeated combined forces of Mir Qasim, Shuja-ud-Daula (Awadh), and Mughal Emperor Shah Alam II." },
  { topic: "Treaty of Allahabad", text: "Signed in August 1765 by Robert Clive. Mughal Emperor Shah Alam II granted the Diwani (fiscal rights) of Bengal, Bihar, and Orissa to the EIC in return for Rs 26 lakh annual tribute." },
  { topic: "Dual Government in Bengal", text: "Introduced by Robert Clive (1765–1772). Diwani (revenue collection) held by EIC; Nizamat (police & judicial administration) held by puppet Nawab. Abolished by Warren Hastings in 1772." },
  { topic: "Haidar Ali", text: "Started as a soldier, became Faujdar of Dindigul in 1755 (established French-assisted modern arsenal), overthrew Nanjaraj in 1761 to rule Mysore. Defeated by Eyre Coote at Porto Novo (1781); died 1782." },
  { topic: "Tipu Sultan", text: "The 'Tiger of Mysore' (1782–1799). Introduced new coinage, calendar, French Jacobin Club, planted Tree of Liberty at Seringapatam. Killed defending Seringapatam on 4 May 1799 during 4th Anglo-Mysore War." },
  { topic: "Treaty of Seringapatam", text: "Signed in 1792 ending the 3rd Anglo-Mysore War. Tipu surrendered half his dominions to British and allies (Marathas & Nizam) and paid Rs 3.3 crore indemnity." },
  { topic: "Subsidiary Alliance", text: "Devised by Lord Wellesley (1798). Indian ruler surrendered external affairs, hosted British subsidiary force, and kept British Resident. First signed by Nizam of Hyderabad (1798), then Mysore (1799), Tanjore (1799), Awadh (1801), Peshwa (1802)." },
  { topic: "Treaty of Bassein", text: "Signed on 31 December 1802 by Peshwa Baji Rao II after defeat by Holkar. Baji Rao II accepted Wellesley's Subsidiary Alliance, triggering 2nd Anglo-Maratha War." },
  { topic: "Maharaja Ranjit Singh", text: "Leader of Sukerchakia Misl, united Punjab, captured Lahore in 1799. Signed Treaty of Amritsar (1809) with Metcalfe fixing Sutlej as boundary. Possessed Koh-i-Noor diamond." },
  { topic: "Doctrine of Lapse", text: "Aggressive annexation policy by Lord Dalhousie (1848–56). Natural heirs only; adopted sons disqualified from inheriting sovereignty. First annexed: Satara (1848), then Jaitpur/Sambalpur (1849), Baghat (1850), Udaipur (1852), Jhansi (1853), Nagpur (1854). Awadh annexed on 'mal-administration' in 1856." }
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
    q: "Who was the first European to arrive in India via the direct sea route and in which year?",
    a: "Vasco da Gama (Portugal) on 17 May 1498 at the port of Calicut, guided by Gujarati pilot Abdul Majid and welcomed by the Hindu ruler Zamorin (Samudri)."
  },
  {
    q: "Which battle marked the decisive military triumph of the British East India Company over the combined armies of Awadh, the Mughal Emperor, and Mir Qasim?",
    a: "The Battle of Buxar on 22 October 1764, won by Major Hector Munro, establishing British paramountcy across Northern India."
  },
  {
    q: "What was the 'Dual Government' (Dyarchy) in Bengal and who abolished it?",
    a: "Introduced by Robert Clive in 1765: Diwani (fiscal revenue rights) with the Company, Nizamat (police & civil administration) with the Nawab. Warren Hastings abolished it in 1772, taking direct administrative control."
  },
  {
    q: "Which Indian state was the very first to enter into Lord Wellesley's 'Subsidiary Alliance' system?",
    a: "The Nizam of Hyderabad in September 1798, followed by Mysore in 1799, Tanjore in 1799, and Awadh in 1801."
  },
  {
    q: "On what official pretext did Lord Dalhousie annex the Kingdom of Awadh in 1856?",
    a: "On the pretext of 'mal-administration' and misgovernance based on the report of British Resident James Outram, deposing Nawab Wajid Ali Shah."
  },
  {
    q: "Which decisive battle in 1760 sealed the final collapse of French political ambitions in India?",
    a: "The Battle of Wandiwash (22 January 1760), where British General Sir Eyre Coote decisively defeated French General Count de Lally during the Third Carnatic War."
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
    q: "By which treaty did Mughal Emperor Shah Alam II grant the Diwani rights of Bengal, Bihar, and Orissa to the English East India Company?",
    options: [
      "Treaty of Alinagar (1757)",
      "Treaty of Allahabad (1765)",
      "Treaty of Mangalore (1784)",
      "Treaty of Salbai (1782)"
    ],
    correct: 1,
    explanation: "Under the Treaty of Allahabad (August 1765), signed between Robert Clive and Emperor Shah Alam II, the EIC acquired the Diwani rights in exchange for an annual tribute of Rs 26 lakh."
  },
  {
    q: "Tipu Sultan died defending his capital during which Anglo-Mysore War?",
    options: [
      "First Anglo-Mysore War (1767–69)",
      "Second Anglo-Mysore War (1780–84)",
      "Third Anglo-Mysore War (1790–92)",
      "Fourth Anglo-Mysore War (1799)"
    ],
    correct: 3,
    explanation: "Tipu Sultan was killed on 4 May 1799 at the gates of Seringapatam during the Fourth Anglo-Mysore War against the forces of Lord Wellesley and General Harris."
  },
  {
    q: "Which of the following was the FIRST state to be annexed under Lord Dalhousie's Doctrine of Lapse?",
    options: [
      "Jhansi (1853)",
      "Nagpur (1854)",
      "Satara (1848)",
      "Sambalpur (1849)"
    ],
    correct: 2,
    explanation: "Satara was the very first princely state annexed under the Doctrine of Lapse in 1848, followed by Jaitpur and Sambalpur in 1849, Udaipur in 1852, Jhansi in 1853, and Nagpur in 1854."
  },
  {
    q: "The Battle of Bedara (1759), which permanently eliminated Dutch commercial power in India, was won by the British under:",
    options: [
      "Warren Hastings",
      "Robert Clive",
      "Hector Munro",
      "Eyre Coote"
    ],
    correct: 1,
    explanation: "Robert Clive defeated the Dutch at the Battle of Bedara (Chinsurah) in November 1759, forcing the Dutch to abandon their Indian ambitions and concentrate on the East Indies (Indonesia)."
  },
  {
    q: "The Golden Farman, which granted the English Company duty-free trade in the port of Golconda in 1632, was issued by:",
    options: [
      "Sultan of Bijapur",
      "Sultan of Golconda",
      "Mughal Emperor Jahangir",
      "Raja of Chandragiri"
    ],
    correct: 1,
    explanation: "In 1632, the Sultan of Golconda issued the 'Golden Farman' allowing the English to trade freely in the ports of Golconda on an annual payment of 500 pagodas."
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
