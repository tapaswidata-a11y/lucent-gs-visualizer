/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 16: Socio-Religious Reform Movements (19th–20th Century)
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
  { topic: "Raja Ram Mohan Roy", text: "Father of Indian Renaissance. Founded Atmiya Sabha (1815) and Brahmo Samaj (1828). Conferred title of 'Raja' by Akbar II. Instrumental in abolition of Sati (Regulation XVII of 1829 by Lord William Bentinck). Published 'Sambad Kaumudi' and 'Mirat-ul-Akhbar'." },
  { topic: "Arya Samaj", text: "Founded on 10 April 1875 at Bombay by Swami Dayanand Saraswati (Mula Shankar). Slogan: 'Go Back to the Vedas'. Infallibility of Vedas, rejection of idol worship and caste hierarchy. Authored 'Satyarth Prakash'. Founded DAV College Lahore (1886) and Gurukul Kangri (1902)." },
  { topic: "Ramakrishna Mission", text: "Founded on 1 May 1897 by Swami Vivekananda (Narendranath Datta) at Belur near Calcutta. Stressed service of God through service of the poor ('Daridra Narayana'). Vivekananda addressed the World Parliament of Religions in Chicago on 11 September 1893." },
  { topic: "Prarthana Samaj", text: "Founded in 1867 in Bombay by Dr. Atmaram Pandurang, inspired by Keshab Chandra Sen. Prominent leaders: Justice M.G. Ranade and R.G. Bhandarkar. Championed widow remarriage, women's education, and abolition of caste distinctions." },
  { topic: "Young Bengal Movement", text: "Led by Henry Vivian Derozio (1809–31), teacher at Hindu College Calcutta. Radical free-thinkers inspired by the French Revolution, attacking orthodoxy and advocating women's rights." },
  { topic: "Satyashodhak Samaj", text: "Founded in 1873 in Maharashtra by Mahatma Jyotirao Phule. Opposed Brahminical supremacy, championed education of Shudras, Ati-Shudras, and women. Authored 'Gulamgiri' (1873) and 'Shetkaryacha Asud'." },
  { topic: "Theosophical Society", text: "Founded in New York in 1875 by Madame Blavatsky and Col. Olcott; shifted to Adyar (Madras) in 1882. Annie Besant joined in 1889, founded Central Hindu College at Varanasi in 1898 (later BHU)." },
  { topic: "Self-Respect Movement", text: "Started in 1925 in Tamil Nadu by E.V. Ramaswamy Naicker ('Periyar'). Advocated anti-caste egalitarianism, self-respect marriages without Brahmin priests, and published 'Kudi Arasu'." },
  { topic: "Dr. B.R. Ambedkar", text: "Founded Bahishkrit Hitkarini Sabha (1924), Mahad Satyagraha (1927) for drinking water rights, Samaj Samata Sangh (1927), Independent Labour Party (1936). Periodicals: Mooknayak, Bahishkrit Bharat." },
  { topic: "Aligarh Movement", text: "Founded by Sir Syed Ahmad Khan. Established Mohammedan Anglo-Oriental (MAO) College at Aligarh in 1875 (became AMU in 1920). Published magazine 'Tahzib-ul-Akhlaq' to promote scientific and liberal education." }
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
    q: "Who conferred the title of 'Raja' upon Ram Mohan Roy and for what purpose?",
    a: "Mughal Emperor Akbar II in 1831, when appointing him as his envoy to the British King William IV to lobby for an increase in the imperial royal pension."
  },
  {
    q: "What was the landmark slogan raised by Swami Dayanand Saraswati, and which religious texts did he declare infallible?",
    a: "'Go back to the Vedas' (Vedo ki or lauto). He proclaimed the four Samhitas of the Vedas alone to be the infallible divine revelation of truth."
  },
  {
    q: "Which social reform act was enacted in 1856 primarily due to the tireless crusades of Ishwar Chandra Vidyasagar?",
    a: "The Hindu Widows' Remarriage Act of 1856 (Act XV of 1856), passed during Lord Dalhousie's administration and enacted under Lord Canning."
  },
  {
    q: "What was the significance of Swami Vivekananda's speech at the Chicago Parliament of Religions on 11 September 1893?",
    a: "He introduced the profound universal philosophy of Vedanta and Hinduism to the Western world, captivating the audience by addressing them as 'Sisters and Brothers of America'."
  },
  {
    q: "Who founded the 'Satyashodhak Samaj' (Truth-Seekers' Society) in 1873 and which seminal book did he author?",
    a: "Mahatma Jyotirao Phule (Jyotiba Phule) in Maharashtra, authoring 'Gulamgiri' (Slavery, 1873) dedicated to the abolition of caste slavery."
  },
  {
    q: "Which reform association secured the passage of the Native Marriage Act (Civil Marriage Act) of 1872?",
    a: "The Indian Reform Association formed by Keshab Chandra Sen in 1870, legalizing Brahmo marriages and fixing the minimum marriage age at 14 for girls and 18 for boys."
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
    q: "By which British regulation was the practice of Sati declared illegal and punishable by the criminal courts?",
    options: [
      "Regulation VII of 1822",
      "Regulation XVII of 1829",
      "Act XV of 1856",
      "Regulation III of 1818"
    ],
    correct: 1,
    explanation: "Under intense lobbying by Raja Ram Mohan Roy, Governor-General Lord William Bentinck enacted Regulation XVII of 1829 declaring Sati illegal and punishable as culpable homicide."
  },
  {
    q: "The 'Shuddhi Movement' aimed at reconverting former Hindus who had converted to other faiths was launched by:",
    options: [
      "Brahmo Samaj",
      "Prarthana Samaj",
      "Arya Samaj",
      "Theosophical Society"
    ],
    correct: 2,
    explanation: "Swami Dayanand Saraswati and the Arya Samaj initiated the Shuddhi movement to bring back individuals and communities into the Vedic fold."
  },
  {
    q: "The famous slogan 'One Caste, One Religion, One God for Man' (Oru Jathi, Oru Matham, Oru Daivam Manushyanu) was coined by:",
    options: [
      "Jyotiba Phule",
      "Sri Narayana Guru",
      "E.V. Ramaswamy Naicker",
      "Dr. B.R. Ambedkar"
    ],
    correct: 1,
    explanation: "Sri Narayana Guru, founder of the SNDP Yogam (1903) in Kerala, propounded this universalist egalitarian doctrine after establishing the Shiva temple at Aravippuram in 1888."
  },
  {
    q: "Which prominent social reformer established the 'Mahad Satyagraha' in 1927 for equal water rights?",
    options: [
      "Mahatma Gandhi",
      "Dr. B.R. Ambedkar",
      "Jyotiba Phule",
      "Periyar E.V. Ramasamy"
    ],
    correct: 1,
    explanation: "Dr. B.R. Ambedkar led the historic Mahad Satyagraha in March 1927 at the Chawdar tank in Kolaba district, asserting the fundamental human right of untouchables to draw public water."
  },
  {
    q: "The Mohammedan Anglo-Oriental (MAO) College at Aligarh was established in 1875 by:",
    options: [
      "Maulana Abul Kalam Azad",
      "Sir Syed Ahmad Khan",
      "Muhammad Iqbal",
      "Nawab Abdul Latif"
    ],
    correct: 1,
    explanation: "Sir Syed Ahmad Khan founded the MAO College in 1875 on the model of Cambridge and Oxford universities, which later expanded into Aligarh Muslim University in 1920."
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
