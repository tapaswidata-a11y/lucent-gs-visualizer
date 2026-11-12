/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 28: Union Executive & Parliament of India
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
  titleEl.textContent = title || 'Parliamentary Architecture';
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
    q: "Who constitutes the Electoral College for the election of the President of India (Article 54)?",
    a: "Elected members of both Houses of Parliament (Lok Sabha & Rajya Sabha) + Elected members of Legislative Assemblies of all States + Elected members of Assemblies of Delhi and Puducherry. (Nominated members and State Legislative Councils DO NOT vote)."
  },
  {
    q: "What is the procedure and required majority for the impeachment of the President under Article 61?",
    a: "Resolution initiated in either House with 14 days written notice signed by 1/4th members. Passed by a special majority of NOT LESS THAN TWO-THIRDS OF THE TOTAL MEMBERSHIP of that House, then investigated and passed by 2/3rd total membership of the other House."
  },
  {
    q: "What is the maximum lifespan of an Ordinance promulgated by the President under Article 123?",
    a: "6 months and 6 weeks (must be approved by Parliament within 6 weeks from its reassembly, and max gap between sessions is 6 months)."
  },
  {
    q: "What constitutional ceiling was placed on the size of the Union Council of Ministers by the 91st Amendment Act, 2003?",
    a: "The total number of ministers, including the Prime Minister, shall NOT EXCEED 15% of the total strength of the Lok Sabha (House of the People)."
  },
  {
    q: "Under which Article can Rajya Sabha authorize Parliament to legislate on a State List subject in national interest?",
    a: "Article 249 (requires resolution supported by 2/3rd of members present and voting). Valid for one year at a time."
  },
  {
    q: "Which Article empowers Rajya Sabha alone to create a new All-India Service?",
    a: "Article 312 (requires resolution supported by 2/3rd of members present and voting). E.g., Indian Forest Service (IFS) created in 1966."
  },
  {
    q: "What is the maximum time period within which Rajya Sabha must return a Money Bill to Lok Sabha (Article 109)?",
    a: "14 days. If not returned within 14 days with or without recommendations, it is deemed to have been passed by both Houses in the form passed by Lok Sabha."
  },
  {
    q: "Who presides over a Joint Sitting of both Houses of Parliament summoned under Article 108?",
    a: "The Speaker of the Lok Sabha (or in absence, Deputy Speaker; or if absent, Deputy Chairman of Rajya Sabha. The Chairman of Rajya Sabha NEVER presides)."
  },
  {
    q: "What is the composition and chairmanship of the Public Accounts Committee (PAC)?",
    a: "22 members (15 from Lok Sabha and 7 from Rajya Sabha), elected annually by proportional representation. The Chairman is appointed by the Speaker from the Opposition party."
  },
  {
    q: "Which is the largest Parliamentary Committee, and what is its unique membership feature?",
    a: "The Estimates Committee (30 members). All 30 members are drawn EXCLUSIVELY from Lok Sabha; Rajya Sabha has no representation."
  },
  {
    q: "What is 'Zero Hour' in Indian Parliamentary proceedings, and what is its origin?",
    a: "An informal Indian parliamentary innovation originating in 1962. It begins immediately after Question Hour (~12 noon) where MPs raise urgent matters of public importance without prior notice."
  },
  {
    q: "What is the constitutional quorum required to constitute a sitting of either House of Parliament (Article 100)?",
    a: "One-tenth (10%) of the total number of members of the House (55 members in Lok Sabha, 25 members in Rajya Sabha)."
  }
];

function renderFlashcards() {
  const container = document.getElementById('flashcardsContainer');
  if (!container) return;

  container.innerHTML = flashcardsData.map((card, idx) => `
    <div class="flashcard-wrapper h-48 cursor-pointer select-none perspective" onclick="this.classList.toggle('flipped')">
      <div class="flashcard relative w-full h-full rounded-2xl transition-transform duration-500 transform-style-3d shadow-lg border border-slate-800 bg-slate-900/90 hover:border-amber-500/40">
        
        <!-- Front -->
        <div class="flashcard-front absolute inset-0 p-5 flex flex-col justify-between backface-hidden">
          <div class="flex items-center justify-between text-xs font-mono text-amber-400">
            <span>CARD ${idx + 1} / ${flashcardsData.length}</span>
            <span class="text-[10px] text-slate-500 uppercase tracking-wider">Tap to Flip</span>
          </div>
          <p class="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">${card.q}</p>
          <div class="flex items-center gap-1.5 text-[11px] text-slate-400">
            <i data-lucide="help-circle" class="w-3.5 h-3.5 text-amber-400"></i>
            <span>Question Prompt</span>
          </div>
        </div>

        <!-- Back -->
        <div class="flashcard-back absolute inset-0 p-5 flex flex-col justify-between backface-hidden rotate-y-180 bg-gradient-to-br from-slate-900 to-amber-950/40 rounded-2xl border border-amber-500/30">
          <div class="flex items-center justify-between text-xs font-mono text-emerald-400">
            <span>ANSWER</span>
            <span class="text-[10px] text-slate-400 uppercase tracking-wider">Tap to Re-flip</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">${card.a}</p>
          <div class="flex items-center gap-1.5 text-[11px] text-emerald-400">
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
    q: "Consider the following statements regarding the impeachment of the President of India:\n1. Nominated members of Parliament participate in the impeachment process.\n2. Elected members of State Legislative Assemblies participate in the impeachment process.\n3. The resolution must be passed by a majority of 2/3rd of members present and voting.\nWhich of the statements given above is/are correct?",
    options: [
      "1 only",
      "1 and 2 only",
      "2 and 3 only",
      "1, 2 and 3"
    ],
    answer: 0,
    explanation: "Statement 1 is correct (nominated MPs DO participate in impeachment). Statement 2 is false (State MLAs do NOT participate in impeachment). Statement 3 is false (it requires 2/3rd of the TOTAL MEMBERSHIP of each House, not just present and voting)."
  },
  {
    q: "Who among the following certifies whether a particular legislative bill is a Money Bill or not?",
    options: [
      "The President of India",
      "The Prime Minister",
      "The Speaker of the Lok Sabha",
      "The Union Finance Minister"
    ],
    answer: 2,
    explanation: "Under Article 110(3), the decision of the Speaker of the Lok Sabha as to whether a bill is a Money Bill is final and conclusive, and cannot be questioned in any court or either House."
  },
  {
    q: "A dead-lock between the Lok Sabha and the Rajya Sabha calls for a Joint Sitting of Parliament under Article 108 during the passage of:\n1. Ordinary Bill\n2. Money Bill\n3. Constitution Amendment Bill\nSelect the correct answer using the code below:",
    options: [
      "1 only",
      "1 and 2 only",
      "1 and 3 only",
      "1, 2 and 3"
    ],
    answer: 0,
    explanation: "A joint sitting can be summoned ONLY for an Ordinary Bill or Financial Bill. There is NO provision for a joint sitting in the case of a Money Bill (Lok Sabha has overriding power) or a Constitutional Amendment Bill (must be passed by each House separately by special majority)."
  },
  {
    q: "Which Parliamentary Committee is described as the 'Twin Sister' of the Estimates Committee and acts as the watchdog over government expenditure audited by the CAG?",
    options: [
      "Committee on Public Undertakings",
      "Public Accounts Committee (PAC)",
      "Business Advisory Committee",
      "Rules Committee"
    ],
    answer: 1,
    explanation: "The Public Accounts Committee (PAC), set up in 1921, examines the appropriation and finance accounts of the Government of India and the audit reports of the Comptroller and Auditor General (CAG)."
  },
  {
    q: "What is the maximum strength of the Council of Ministers in a State, as amended by the 91st Amendment Act 2003?",
    options: [
      "10% of total strength of the Legislative Assembly, with a minimum of 10 ministers",
      "15% of total strength of the Legislative Assembly, with a minimum of 12 ministers",
      "20% of total strength of the Legislative Assembly, with a minimum of 15 ministers",
      "No ceiling, left to Chief Minister's discretion"
    ],
    answer: 1,
    explanation: "Under Article 164(1A) inserted by the 91st Constitutional Amendment Act 2003, the total number of Ministers in a State shall not exceed 15% of the total strength of the Legislative Assembly, provided that the number shall not be less than 12."
  }
];

let userAnswers = {};

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = quizQuestions.map((item, qIdx) => `
    <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3" id="quizQuestion_${qIdx}">
      <div class="flex items-start justify-between gap-3">
        <span class="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">QUESTION ${qIdx + 1}</span>
        <span class="text-[11px] text-slate-500">APSC / UPSC Prelims Pattern</span>
      </div>
      <p class="text-xs sm:text-sm font-semibold text-slate-100 whitespace-pre-line leading-relaxed">${item.q}</p>
      
      <div class="space-y-2 pt-2">
        ${item.options.map((opt, oIdx) => `
          <label class="flex items-center gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 cursor-pointer text-xs text-slate-300 transition-all quiz-option" id="label_${qIdx}_${oIdx}">
            <input type="radio" name="quiz_${qIdx}" value="${oIdx}" class="text-amber-500 focus:ring-0 focus:ring-offset-0 bg-slate-900 border-slate-700" onchange="selectAnswer(${qIdx}, ${oIdx})">
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
      score === 5 ? 'Mastery over the President, Council of Ministers & Parliament achieved!' : 'Review the electoral formulas and committee compositions above.'
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
    { title: "Article 52 - President of India", desc: "There shall be a President of India; supreme commander of armed forces." },
    { title: "Article 54 - Presidential Electoral College", desc: "Elected members of Lok Sabha, Rajya Sabha, and State Legislative Assemblies." },
    { title: "Article 61 - Impeachment of President", desc: "For violation of the Constitution; 2/3rd majority of total membership of both Houses." },
    { title: "Article 72 - Pardoning Powers", desc: "Pardon, commutation, remission, respite, reprieve by President." },
    { title: "Article 74 - Council of Ministers", desc: "Council of Ministers headed by PM to aid and advise President." },
    { title: "Article 75(3) - Collective Responsibility", desc: "Council of Ministers is collectively responsible to the Lok Sabha." },
    { title: "Article 108 - Joint Sitting", desc: "President summons joint sitting; Speaker of Lok Sabha presides. For ordinary bills." },
    { title: "Article 110 - Money Bill", desc: "Speaker's decision final. Introduced only in Lok Sabha on presidential recommendation." },
    { title: "Article 123 - Ordinances", desc: "President's power to legislate when Parliament is not in session. Max life 6m + 6w." },
    { title: "Article 249 - Rajya Sabha State List Power", desc: "Rajya Sabha authorises Parliament to legislate on State List by 2/3rd vote." },
    { title: "Article 312 - All India Services", desc: "Rajya Sabha creates new All-India Services (IAS, IPS, IFS) by 2/3rd vote." },
    { title: "Public Accounts Committee (PAC)", desc: "22 members (15 LS + 7 RS), Chairman from Opposition, examines CAG reports." },
    { title: "Estimates Committee", desc: "30 members, all from Lok Sabha, largest parliamentary committee." }
  ];

  const matched = items.filter(it => it.title.toLowerCase().includes(query) || it.desc.toLowerCase().includes(query));

  if (matched.length === 0) {
    searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">No matching topics found.</p>';
  } else {
    searchResults.innerHTML = matched.map(m => `
      <div class="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/30 transition-all">
        <h5 class="text-xs font-bold text-amber-300">${m.title}</h5>
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
