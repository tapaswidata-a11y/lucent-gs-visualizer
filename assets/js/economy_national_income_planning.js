/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 31: National Income & Economic Planning of India
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
  titleEl.textContent = title || 'Economic Landmark';
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
    q: "Who made the first attempt to estimate the National Income of India, and in which year?",
    a: "Dadabhai Naoroji in 1867–68 in his book 'Poverty and Un-British Rule in India', estimating a per capita income of ₹20 per year."
  },
  {
    q: "Who produced the first scientific estimate of India's National Income?",
    a: "Prof. V.K.R.V. Rao for the year 1931–32 using census of production and income methods."
  },
  {
    q: "What is the precise definition of 'National Income' in macroeconomics?",
    a: "Net National Product at Factor Cost (NNP at FC). It equals GNP at Market Price minus Depreciation minus Net Indirect Taxes (Indirect Taxes - Subsidies)."
  },
  {
    q: "What is the difference between Real GDP and Nominal GDP?",
    a: "Nominal GDP is evaluated at current market prices, whereas Real GDP is calculated at constant base-year prices, adjusted for inflation (Real GDP = Nominal GDP / GDP Deflator)."
  },
  {
    q: "On which economic growth model was the First Five-Year Plan (1951–56) based?",
    a: "The Harrod-Domar Model, prioritizing agriculture, irrigation, price stability, and major multipurpose river valley projects (Bhakra Nangal, Hirakud, DVC)."
  },
  {
    q: "On which economic model was the Second Five-Year Plan (1956–61) based, and what was its core thrust?",
    a: "The Nehru-Mahalanobis Model (P.C. Mahalanobis), focusing on rapid industrialization and heavy basic capital goods industries (setting up Rourkela, Bhilai, Durgapur steel plants)."
  },
  {
    q: "Why was the Third Five-Year Plan (1961–66) followed by 'Plan Holidays' (1966–69)?",
    a: "The 3rd Plan failed severely due to the 1962 Sino-Indian War, 1965 Indo-Pak War, and devastating droughts (1965–66). Government adopted three Annual Plans (1966–69) during which the Green Revolution was launched."
  },
  {
    q: "In which Five-Year Plan was the slogan 'Garibi Hatao' (Poverty Eradication) first introduced?",
    a: "The Fifth Five-Year Plan (1974–79), drafted by D.D. Dhar, focused on poverty removal and attainment of economic self-reliance, alongside the 20-Point Programme."
  },
  {
    q: "What was the 'Rolling Plan' and who originated its conceptual framework?",
    a: "Introduced by the Janata Party government in 1978 for 1978–80 after terminating the 5th Plan a year early. Concept was propounded by Swedish economist Gunnar Myrdal."
  },
  {
    q: "During which Plan period were the New Economic Policy (LPG: Liberalization, Privatization, Globalization) reforms initiated?",
    a: "During the 1990–92 Annual Plans interregnum (June 1991) under P.V. Narasimha Rao and Dr. Manmohan Singh, implemented during the Eighth Plan (1992–97)."
  },
  {
    q: "When was NITI Aayog established, and what earlier institution did it replace?",
    a: "Established on January 1, 2015, replacing the 65-year-old Planning Commission (established March 15, 1950) to foster cooperative federalism with a bottom-up approach."
  },
  {
    q: "Who serves as the ex-officio Chairman and who constitutes the Governing Council of NITI Aayog?",
    a: "The Prime Minister of India is the ex-officio Chairperson. The Governing Council comprises Chief Ministers of all States, Chief Ministers of UTs with legislatures (Delhi, Puducherry), and Lt. Governors of other UTs."
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
          <div class="flex items-center justify-between text-xs font-mono text-amber-400">
            <span>ANSWER</span>
            <span class="text-[10px] text-slate-400 uppercase tracking-wider">Tap to Re-flip</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">${card.a}</p>
          <div class="flex items-center gap-1.5 text-[11px] text-amber-400">
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
    q: "National Income of a country, from the perspective of National Accounts, is equivalent to:",
    options: [
      "Gross Domestic Product at Market Price (GDP at MP)",
      "Gross National Product at Factor Cost (GNP at FC)",
      "Net National Product at Factor Cost (NNP at FC)",
      "Net Domestic Product at Market Price (NDP at MP)"
    ],
    answer: 2,
    explanation: "In macroeconomic terminology and National Accounts Statistics, National Income is precisely defined as Net National Product at Factor Cost (NNP at FC)."
  },
  {
    q: "The Bombay Plan (1944), an influential blueprint for India's post-independence economic development, was authored by:",
    options: [
      "M.N. Roy",
      "Eight leading industrialists of Bombay",
      "Shriman Narayan Agarwal",
      "Jawaharlal Nehru and Subhas Chandra Bose"
    ],
    answer: 1,
    explanation: "The Bombay Plan ('A Plan of Economic Development for India') was drafted in 1944 by eight prominent Indian industrialists, including J.R.D. Tata, G.D. Birla, Purshotamdas Thakurdas, and John Mathai."
  },
  {
    q: "During which Five-Year Plan was the National Bank for Agriculture and Rural Development (NABARD) established?",
    options: [
      "Fourth Five-Year Plan",
      "Fifth Five-Year Plan",
      "Sixth Five-Year Plan",
      "Seventh Five-Year Plan"
    ],
    answer: 2,
    explanation: "NABARD was established on July 12, 1982 (during the Sixth Five-Year Plan 1980–85) on the recommendations of the B. Sivaraman Committee to oversee rural agricultural credit."
  },
  {
    q: "Which of the following bodies was established as an extra-constitutional and non-statutory body to approve the Five-Year Plans?",
    options: [
      "Finance Commission",
      "National Development Council (NDC)",
      "Inter-State Council",
      "Zonal Council"
    ],
    answer: 1,
    explanation: "The National Development Council (NDC) was established on August 6, 1952 by an executive resolution as an extra-constitutional, non-statutory advisory body to approve Five-Year Plans and ensure cooperation between Centre and States."
  },
  {
    q: "What is the primary difference in approach between NITI Aayog and the erstwhile Planning Commission?",
    options: [
      "NITI Aayog follows a centralized top-down approach, whereas the Planning Commission followed a bottom-up approach",
      "NITI Aayog acts as a think-tank promoting cooperative federalism with bottom-up planning, whereas Planning Commission imposed top-down five-year plans and allocated central funds",
      "NITI Aayog directly allocates funds to States, whereas the Planning Commission had no financial allocation powers",
      "NITI Aayog is a constitutional body, whereas Planning Commission was non-constitutional"
    ],
    answer: 1,
    explanation: "NITI Aayog is a policy think-tank that embodies cooperative federalism with bottom-up planning and does not possess fund allocation powers, whereas the Planning Commission dictated top-down resource allocation and Five-Year Plans."
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
      score === 5 ? 'Exceptional command over National Income & Economic Planning!' : 'Review the Five-Year Plans matrix and National Income formulas above.'
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
    { title: "Gross Domestic Product (GDP)", desc: "Total market value of all final goods and services produced within the domestic territory in a year." },
    { title: "Net National Product (NNP at FC)", desc: "National Income. GNP at Market Price minus Depreciation minus Net Indirect Taxes." },
    { title: "First Five-Year Plan (1951-56)", desc: "Harrod-Domar model; agriculture, irrigation, Bhakra Nangal, Hirakud, DVC." },
    { title: "Second Five-Year Plan (1956-61)", desc: "Nehru-Mahalanobis model; heavy capital goods, Bhilai, Rourkela, Durgapur steel plants." },
    { title: "Plan Holidays (1966-69)", desc: "Three annual plans following 3rd plan failure; Green Revolution launched." },
    { title: "Garibi Hatao (Fifth Plan 1974-79)", desc: "Poverty alleviation and self-reliance; 20-Point Programme." },
    { title: "Rolling Plan (1978-80)", desc: "Concept by Gunnar Myrdal; introduced by Janata Party government." },
    { title: "NITI Aayog (Jan 1, 2015)", desc: "National Institution for Transforming India; cooperative federalism, bottom-up think tank." },
    { title: "Dadabhai Naoroji (1867-68)", desc: "First estimate of National Income (₹20 per capita); Poverty and Un-British Rule in India." }
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
