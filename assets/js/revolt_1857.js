/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 17: The Great Revolt of 1857
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
  { topic: "Mangal Pandey", text: "Sepoy of the 34th Bengal Native Infantry at Barrackpore. On 29 March 1857, mutinied against the greased Enfield cartridges, shooting Lieutenant Baugh. Hanged on 8 April 1857." },
  { topic: "Outbreak at Meerut", text: "On 10 May 1857, sepoys of the 3rd Native Cavalry mutinied, broke open jail to free court-martialed comrades, and marched to Delhi shouting 'Chalo Dilli'." },
  { topic: "Bahadur Shah Zafar", text: "Proclaimed Shahenshah-e-Hindustan (Emperor of India) by rebel sepoys. Real military command held by General Bakht Khan. Captured at Humayun's tomb and exiled to Rangoon, Burma, dying in 1862." },
  { topic: "Rani Lakshmibai", text: "Queen of Jhansi (Manikarnika). Opposed British annexation under Doctrine of Lapse. Sir Hugh Rose called her 'the best and bravest military leader of the rebels'. Martyred on the battlefield near Gwalior on 18 June 1858." },
  { topic: "Nana Saheb", text: "Adopted son of Peshwa Baji Rao II whose pension was halted by Dalhousie. Led the revolt in Kanpur with military commander Tatya Tope (Ramchandra Pandurang) and Azimullah Khan. Escaped to Nepal." },
  { topic: "Kunwar Singh", text: "80-year-old Rajput zamindar of Jagdishpur (Arrah, Bihar). Fought brilliant guerrilla campaigns against British forces under William Taylor and Vincent Eyre; died on 26 April 1858." },
  { topic: "Begum Hazrat Mahal", text: "Wife of exiled Nawab Wajid Ali Shah of Awadh. Proclaimed her minor son Birjis Qadr as Nawab, leading fierce resistance at Lucknow against Sir Colin Campbell. Escaped to Nepal." },
  { topic: "Government of India Act 1858", text: "Enacted on 2 August 1858 transferring rule from East India Company to the British Crown. Created Secretary of State for India and gave Governor-General the title of Viceroy (Lord Canning)." },
  { topic: "Queen's Proclamation", text: "Read by Lord Canning at Allahabad Durbar on 1 November 1858. Withdrew Doctrine of Lapse, promised religious non-interference and treaty respect, marking the end of British territorial annexation." },
  { topic: "Peel Commission", text: "Appointed in 1858 to reorganize the British Indian Army. Established ratio of 1 European to 2 Indians in Bengal, and 1:3 in Madras/Bombay. Instituted martial/non-martial segregation." }
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
    q: "Who was the Governor-General of India during the outbreak of the Revolt of 1857?",
    a: "Lord Canning (1856–1862), who later became the First Viceroy of India after the Crown takeover in 1858."
  },
  {
    q: "Which British military general recaptured Delhi from the rebels in September 1857?",
    a: "John Nicholson (who was fatally wounded during the storming of Kashmiri Gate) assisted by Lieutenant Hudson."
  },
  {
    q: "What was the real name of Tatya Tope, the brilliant military commander of Nana Saheb?",
    a: "Ramchandra Pandurang. He carried on a legendary guerrilla war until betrayed by Mansingh in 1859 and hanged at Shivpuri."
  },
  {
    q: "Which British officer famously eulogized Rani Lakshmibai of Jhansi as 'the bravest and best military leader of the rebels'?",
    a: "Sir Hugh Rose, who commanded the Central India Field Force that captured Jhansi and Gwalior."
  },
  {
    q: "Who authored the famous 1909 book 'The Indian War of Independence of 1857'?",
    a: "Vinayak Damodar Savarkar (V.D. Savarkar), who framed the revolt as India's first unified national war for independence."
  },
  {
    q: "Where and on what date was Queen Victoria's historic 1858 Proclamation read out?",
    a: "At a grand royal Durbar in Allahabad on 1 November 1858, read out by the first Viceroy, Lord Canning."
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
    q: "At which military cantonment did Mangal Pandey revolt on 29 March 1857?",
    options: [
      "Meerut",
      "Barrackpore",
      "Berhampore",
      "Danapur"
    ],
    correct: 1,
    explanation: "Sepoy Mangal Pandey belonged to the 34th Bengal Native Infantry stationed at Barrackpore (near Calcutta), where he attacked his European officers."
  },
  {
    q: "Who commanded the rebel troops in Bihar from his base at Jagdishpur?",
    options: [
      "Kunwar Singh",
      "Amar Singh",
      "Maulvi Ahmadullah",
      "Khan Bahadur Khan"
    ],
    correct: 0,
    explanation: "80-year-old Rajput chieftain Kunwar Singh led the rebellion in Jagdishpur and Arrah (Bihar), inflicting heavy defeats on British detachments."
  },
  {
    q: "Which British commander successfully relieved and recaptured Lucknow in March 1858?",
    options: [
      "Sir Colin Campbell",
      "Sir James Outram",
      "Sir Henry Lawrence",
      "General Havelock"
    ],
    correct: 0,
    explanation: "Sir Colin Campbell (Commander-in-Chief), aided by Nepalese Gurkha regiments, recaptured Lucknow on 21 March 1858 from Begum Hazrat Mahal's forces."
  },
  {
    q: "Which official historian concluded: 'What began as a fight for religion ended as a war for independence'?",
    options: [
      "Dr. R.C. Majumdar",
      "Dr. S.N. Sen",
      "V.D. Savarkar",
      "Sir John Seeley"
    ],
    correct: 1,
    explanation: "Dr. S.N. Sen, appointed by the Government of India to write the official centenary history 'Eighteen Fifty-Seven' (1957), delivered this famous assessment."
  },
  {
    q: "Under the post-1857 military reorganization recommended by the Peel Commission, the ratio of European to Indian troops in the Bengal army was fixed at:",
    options: [
      "1 : 1",
      "1 : 2",
      "1 : 3",
      "1 : 5"
    ],
    correct: 1,
    explanation: "The Peel Commission fixed the proportion of British to Indian soldiers at 1:2 for the Bengal Army, and 1:3 for the Madras and Bombay Armies."
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
