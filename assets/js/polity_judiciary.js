/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 29: Indian Judiciary (Supreme Court & High Courts)
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
let startX = 0, startY = 0, translateX = 0, translateY = 0;

function openLightbox(src, title, caption) {
  const lightbox = document.getElementById('imageLightbox');
  const img = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const captionEl = document.getElementById('lightboxCaption');

  if (!lightbox || !img) return;

  img.src = src;
  titleEl.textContent = title || 'Judicial Architecture';
  captionEl.textContent = caption || '';

  currentZoom = 1;
  translateX = 0;
  translateY = 0;
  updateImageTransform();

  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('imageLightbox');
  if (!lightbox) return;
  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
  document.body.style.overflow = 'auto';
}

function updateImageTransform() {
  const img = document.getElementById('lightboxImg');
  if (img) {
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
  }
}

document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
document.getElementById('zoomInBtn')?.addEventListener('click', () => {
  if (currentZoom < 3.5) {
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

const lightboxImg = document.getElementById('lightboxImg');
if (lightboxImg) {
  lightboxImg.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0 && currentZoom < 3.5) {
      currentZoom += 0.2;
    } else if (e.deltaY > 0 && currentZoom > 0.5) {
      currentZoom -= 0.2;
    }
    updateImageTransform();
  });

  lightboxImg.addEventListener('mousedown', (e) => {
    if (currentZoom > 1) {
      isPanning = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      lightboxImg.style.cursor = 'grabbing';
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateImageTransform();
  });

  window.addEventListener('mouseup', () => {
    isPanning = false;
    if (lightboxImg) lightboxImg.style.cursor = 'grab';
  });
}

// --- CHAPTER SWITCHER DROPDOWN ---
const chapterDropdown = document.getElementById('chapterDropdown');
chapterDropdown?.addEventListener('change', (e) => {
  if (e.target.value) {
    window.location.href = e.target.value;
  }
});

// --- QUICK SEARCH MODAL (CTRL+K) ---
function openSearchModal() {
  const modal = document.getElementById('searchModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.getElementById('searchInput')?.focus();
}

function closeSearchModal() {
  const modal = document.getElementById('searchModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    openSearchModal();
  } else if (e.key === 'Escape') {
    closeSearchModal();
    closeLightbox();
  }
});

// --- 3D INTERACTIVE FLASHCARDS ---
const flashcardsData = [
  {
    q: "When was the Supreme Court of India inaugurated, and which institution did it replace?",
    a: "Inaugurated on January 28, 1950. It succeeded the Federal Court of India (established under the Government of India Act 1935) and also assumed the appellate jurisdiction of the British Privy Council."
  },
  {
    q: "What is the current sanctioned judicial strength of the Supreme Court of India?",
    a: "34 Judges (1 Chief Justice of India + 33 other judges), amended by the Supreme Court (Number of Judges) Amendment Act, 2019."
  },
  {
    q: "What are the constitutional qualifications to become a Judge of the Supreme Court under Article 124(3)?",
    a: "Citizen of India, and: 1) Judge of a High Court for at least 5 years; OR 2) Advocate of a High Court for at least 10 years; OR 3) A distinguished jurist in the opinion of the President. (Note: No minimum age limit is prescribed!)."
  },
  {
    q: "What is the retirement age of a Supreme Court judge versus a High Court judge?",
    a: "Supreme Court judge retires at 65 years. High Court judge retires at 62 years (raised from 60 to 62 by the 15th Constitutional Amendment Act, 1963)."
  },
  {
    q: "What does the Original Jurisdiction of the Supreme Court under Article 131 encompass?",
    a: "Exclusive jurisdiction over federal disputes: 1) Between the Government of India and one or more States; 2) Between GoI and any State(s) on one side and other State(s) on the other; 3) Between two or more States."
  },
  {
    q: "What is the Advisory Jurisdiction of the Supreme Court under Article 143, and is its opinion binding?",
    a: "The President may refer questions of law or fact of public importance or pre-constitutional treaties to the SC for opinion. The opinion rendered is purely advisory and is NOT binding on the President."
  },
  {
    q: "What is meant by the Supreme Court being a 'Court of Record' under Article 129?",
    a: "Its judgments and proceedings are recorded for perpetual memory and testimony; their evidentiary value cannot be questioned in any court. It also possesses inherent power to punish for contempt of itself."
  },
  {
    q: "In which landmark case did the Supreme Court invalidate the National Judicial Appointments Commission (NJAC) and 99th Constitutional Amendment?",
    a: "Supreme Court Advocates-on-Record Association v. Union of India (4th Judges Case, 2015), on the ground that it infringed upon the Independence of the Judiciary, an inviolable part of the Basic Structure."
  },
  {
    q: "How many High Courts are there currently in India, and which are the newest?",
    a: "25 High Courts. The newest are the High Court of Andhra Pradesh (at Amaravati) and the High Court of Telangana (at Hyderabad), established on January 1, 2019."
  },
  {
    q: "Which are the three oldest High Courts in India, and when were they established?",
    a: "Calcutta High Court (oldest, established July 1, 1862), Bombay High Court (August 14, 1862), and Madras High Court (August 15, 1862) under the Indian High Courts Act 1861."
  },
  {
    q: "Which constitutional amendment authorized Parliament to establish a common High Court for two or more States/UTs?",
    a: "The 7th Constitutional Amendment Act, 1956 (Article 231). Examples: Guwahati HC (Assam, Nagaland, Mizoram, Arunachal Pradesh) and Punjab & Haryana HC (Chandigarh)."
  },
  {
    q: "What is the legal status and appeal mechanism of an award made by a Lok Adalat?",
    a: "Under the Legal Services Authorities Act (NALSA) 1987, an award of a Lok Adalat is deemed to be a decree of a civil court, is final and binding on all parties, and NO APPEAL lies against it in any court."
  }
];

function renderFlashcards() {
  const container = document.getElementById('flashcardsContainer');
  if (!container) return;

  container.innerHTML = flashcardsData.map((card, idx) => `
    <div class="flashcard-wrapper h-48 cursor-pointer select-none perspective" onclick="this.classList.toggle('flipped')">
      <div class="flashcard relative w-full h-full rounded-2xl transition-transform duration-500 transform-style-3d shadow-lg border border-slate-800 bg-slate-900/90 hover:border-emerald-500/40">
        
        <!-- Front -->
        <div class="flashcard-front absolute inset-0 p-5 flex flex-col justify-between backface-hidden">
          <div class="flex items-center justify-between text-xs font-mono text-emerald-400">
            <span>CARD ${idx + 1} / ${flashcardsData.length}</span>
            <span class="text-[10px] text-slate-500 uppercase tracking-wider">Tap to Flip</span>
          </div>
          <p class="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">${card.q}</p>
          <div class="flex items-center gap-1.5 text-[11px] text-slate-400">
            <i data-lucide="help-circle" class="w-3.5 h-3.5 text-emerald-400"></i>
            <span>Question Prompt</span>
          </div>
        </div>

        <!-- Back -->
        <div class="flashcard-back absolute inset-0 p-5 flex flex-col justify-between backface-hidden rotate-y-180 bg-gradient-to-br from-slate-900 to-emerald-950/40 rounded-2xl border border-emerald-500/30">
          <div class="flex items-center justify-between text-xs font-mono text-cyan-400">
            <span>ANSWER</span>
            <span class="text-[10px] text-slate-400 uppercase tracking-wider">Tap to Re-flip</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">${card.a}</p>
          <div class="flex items-center gap-1.5 text-[11px] text-cyan-400">
            <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i>
            <span>Verified Prelims Fact</span>
          </div>
        </div>

      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

// --- PRELIMS QUIZ ENGINE ---
const quizQuestions = [
  {
    q: "Which of the following disputes falls outside the Original Jurisdiction of the Supreme Court of India under Article 131?",
    options: [
      "A dispute between the Government of India and the State of Kerala",
      "An inter-State river water dispute between Karnataka and Tamil Nadu",
      "A dispute between the State of Punjab and the State of Haryana regarding territorial boundaries",
      "A dispute between the Centre and one State against two other States"
    ],
    answer: 1,
    explanation: "Under Article 262(2) and the Inter-State River Water Disputes Act 1956, disputes regarding the use, distribution, or control of inter-state river waters are expressly excluded from the original jurisdiction of the Supreme Court."
  },
  {
    q: "Consider the following statements regarding the appointment of judges to the Supreme Court:\n1. The Collegium system was introduced by the 44th Constitutional Amendment Act.\n2. In the Third Judges Case (1998), the Supreme Court ruled that the CJI must consult a collegium of 4 senior-most judges.\n3. A distinguished jurist in the opinion of the President can be appointed as a High Court judge.\nWhich of the statements given above is/are correct?",
    options: [
      "2 only",
      "1 and 2 only",
      "2 and 3 only",
      "1, 2 and 3"
    ],
    answer: 0,
    explanation: "Statement 2 is correct. Statement 1 is false (Collegium evolved via judicial interpretations in Three Judges cases, not constitutional amendment). Statement 3 is false (the 'distinguished jurist' category exists ONLY for the Supreme Court under Art 124, NOT for High Courts under Art 217)."
  },
  {
    q: "Under which Article of the Constitution can the Supreme Court grant Special Leave to Appeal (SLP) against any judgment or order in any matter passed by any court or tribunal in India?",
    options: [
      "Article 131",
      "Article 136",
      "Article 141",
      "Article 143"
    ],
    answer: 1,
    explanation: "Article 136 grants the Supreme Court extraordinary plenary discretionary power to grant Special Leave Petition (SLP) from any judgment, decree, determination, sentence or order in any cause or matter passed by any court or tribunal in India (except military courts)."
  },
  {
    q: "The power of judicial superintendence over all subordinate courts and tribunals within its territorial jurisdiction is vested in the High Court under:",
    options: [
      "Article 225",
      "Article 226",
      "Article 227",
      "Article 228"
    ],
    answer: 2,
    explanation: "Article 227 gives every High Court the power of superintendence over all courts and tribunals (except armed forces tribunals) throughout the territories in relation to which it exercises jurisdiction."
  },
  {
    q: "Who among the following pioneered the concept of Public Interest Litigation (PIL) in the Supreme Court of India in the late 1970s and 1980s?",
    options: [
      "Justice H.R. Khanna and Justice M.H. Beg",
      "Justice P.N. Bhagwati and Justice V.R. Krishna Iyer",
      "Justice Y.V. Chandrachud and Justice A.N. Ray",
      "Justice J.S. Verma and Justice K. Subba Rao"
    ],
    answer: 1,
    explanation: "Justice P.N. Bhagwati and Justice V.R. Krishna Iyer pioneered Public Interest Litigation (PIL) / Social Action Litigation (SAL) in India, relaxing traditional rules of locus standi to ensure justice for underprivileged communities."
  }
];

let userAnswers = {};

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = quizQuestions.map((item, qIdx) => `
    <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3" id="quizQuestion_${qIdx}">
      <div class="flex items-start justify-between gap-3">
        <span class="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">QUESTION ${qIdx + 1}</span>
        <span class="text-[11px] text-slate-500">APSC / UPSC Prelims Pattern</span>
      </div>
      <p class="text-xs sm:text-sm font-semibold text-slate-100 whitespace-pre-line leading-relaxed">${item.q}</p>
      
      <div class="space-y-2 pt-2">
        ${item.options.map((opt, oIdx) => `
          <label class="flex items-center gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 cursor-pointer text-xs text-slate-300 transition-all quiz-option" id="label_${qIdx}_${oIdx}">
            <input type="radio" name="quiz_${qIdx}" value="${oIdx}" class="text-emerald-500 focus:ring-0 focus:ring-offset-0 bg-slate-900 border-slate-700" onchange="selectAnswer(${qIdx}, ${oIdx})">
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>

      <div id="explanation_${qIdx}" class="hidden pt-3 border-t border-slate-800/80 text-xs leading-relaxed"></div>
    </div>
  `).join('');
}

window.selectAnswer = function(qIdx, oIdx) {
  userAnswers[qIdx] = oIdx;
};

document.getElementById('submitQuizBtn')?.addEventListener('click', () => {
  let score = 0;
  quizQuestions.forEach((item, qIdx) => {
    const selected = userAnswers[qIdx];
    const explanationEl = document.getElementById(`explanation_${qIdx}`);
    if (!explanationEl) return;

    item.options.forEach((_, oIdx) => {
      const label = document.getElementById(`label_${qIdx}_${oIdx}`);
      if (!label) return;
      label.classList.remove('border-emerald-500', 'bg-emerald-500/10', 'border-rose-500', 'bg-rose-500/10');
      if (oIdx === item.answer) {
        label.classList.add('border-emerald-500', 'bg-emerald-500/10', 'text-emerald-200');
      } else if (selected === oIdx) {
        label.classList.add('border-rose-500', 'bg-rose-500/10', 'text-rose-200');
      }
    });

    if (selected === item.answer) {
      score++;
      explanationEl.className = "pt-3 border-t border-emerald-500/30 text-xs text-emerald-300";
      explanationEl.innerHTML = `<strong>Correct!</strong> ${item.explanation}`;
    } else {
      explanationEl.className = "pt-3 border-t border-rose-500/30 text-xs text-rose-300";
      explanationEl.innerHTML = `<strong>Incorrect.</strong> ${item.explanation}`;
    }
    explanationEl.classList.remove('hidden');
  });

  const banner = document.getElementById('quizScoreBanner');
  if (banner) {
    banner.classList.remove('hidden');
    banner.className = `p-4 rounded-2xl border text-center text-sm font-bold ${
      score >= 4 ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
    }`;
    banner.innerHTML = `You scored ${score} out of ${quizQuestions.length} (${Math.round((score/quizQuestions.length)*100)}%)! ${
      score === 5 ? 'Exceptional mastery over the Indian Judiciary & Jurisdictions!' : 'Review the collegium timeline and jurisdiction articles above.'
    }`;
  }
});

document.getElementById('resetQuizBtn')?.addEventListener('click', () => {
  userAnswers = {};
  renderQuiz();
  const banner = document.getElementById('quizScoreBanner');
  if (banner) banner.classList.add('hidden');
});

// --- SEARCH FILTER FOR SECTION CONTENT ---
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  if (!searchResults) return;

  if (query.length < 2) {
    searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">Type keywords to search sections...</p>';
    return;
  }

  const items = [
    { title: "Article 124 - Supreme Court of India", desc: "Establishment and constitution of SC; 34 judges; qualifications and appointment." },
    { title: "Article 129 - Court of Record", desc: "Supreme Court is a Court of Record; has power to punish for contempt of itself." },
    { title: "Article 131 - Original Jurisdiction", desc: "Exclusive jurisdiction over federal disputes between Centre and States." },
    { title: "Article 136 - Special Leave Petition (SLP)", desc: "Discretionary appellate power to grant special leave against any judgment or order." },
    { title: "Article 143 - Advisory Jurisdiction", desc: "Presidential reference on question of law or fact; advisory opinion not binding." },
    { title: "Article 214 - High Courts for States", desc: "There shall be a High Court for each State; 25 High Courts in India." },
    { title: "Article 226 - Writ Powers of High Court", desc: "Power of High Courts to issue writs for Fundamental Rights and ordinary legal rights." },
    { title: "Article 227 - Superintendence of High Court", desc: "High Court's supervisory jurisdiction over all subordinate courts and tribunals." },
    { title: "Collegium System", desc: "CJI + 4 senior-most judges for SC; CJI + 2 senior-most for HC. Evolved via 1981, 1993, 1998 rulings." },
    { title: "Public Interest Litigation (PIL)", desc: "Pioneered by Justice P.N. Bhagwati & V.R. Krishna Iyer; epistolary relaxed locus standi." },
    { title: "Lok Adalat", desc: "Statutory status under NALSA Act 1987. Final and binding award; no court fees." }
  ];

  const matched = items.filter(it => it.title.toLowerCase().includes(query) || it.desc.toLowerCase().includes(query));

  if (matched.length === 0) {
    searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">No matching topics found.</p>';
  } else {
    searchResults.innerHTML = matched.map(m => `
      <div class="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/30 transition-all">
        <h5 class="text-xs font-bold text-emerald-300">${m.title}</h5>
        <p class="text-[11px] text-slate-400 mt-0.5">${m.desc}</p>
      </div>
    `).join('');
  }
});

// INITIALIZE ON LOAD
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderFlashcards();
  renderQuiz();
  lucide.createIcons();
});
