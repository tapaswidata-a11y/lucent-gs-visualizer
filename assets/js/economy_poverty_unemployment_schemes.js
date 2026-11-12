/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 34: Poverty, Unemployment & Flagship Schemes
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
      themeToggleBtn.title = "Switch to Light Theme";
    }
    localStorage.setItem('lucent_theme', 'dark');
  }
  lucide.createIcons();
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const current = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });
}

// CHAPTER NAVIGATION DROPDOWN
const chapterDropdown = document.getElementById('chapterDropdown');
if (chapterDropdown) {
  chapterDropdown.addEventListener('change', (e) => {
    if (e.target.value) {
      window.location.href = e.target.value;
    }
  });
}

// --- ACTIVE RECALL FLASHCARDS (12 High-Yield Cards) ---
const flashcardsData = [
  {
    front: "What was Dadabhai Naoroji's initial concept for estimating poverty in India?",
    back: "In 1867-68, he formulated the 'Jail Cost of Living' (estimating ₹16 to ₹35 per capita per year based on prisoner diets) in his book 'Poverty and Un-British Rule in India'."
  },
  {
    front: "What minimum daily caloric intake did the Y.K. Alagh Task Force (1979) establish?",
    back: "2,400 calories per person per day in rural areas and 2,100 calories per person per day in urban areas, based on differing physical labor requirements."
  },
  {
    front: "What major methodological shift did the Suresh Tendulkar Committee (2009) introduce?",
    back: "Shifted away from calorie norms to Mixed Reference Period (MRP) consumption expenditure across health, education, and nutrition (arriving at ₹27/day rural and ₹33/day urban; 21.9% poverty in 2011-12)."
  },
  {
    front: "What did the C. Rangarajan Committee (2014) recommend as the poverty line?",
    back: "Based on Modified Mixed Reference Period (MMRP): monthly per capita expenditure of ₹972 (₹32/day) in rural areas and ₹1,407 (₹47/day) in urban areas (resulting in 29.5% poverty)."
  },
  {
    front: "What are the three dimensions and indicator count in NITI Aayog's Multidimensional Poverty Index (MPI)?",
    back: "3 equally weighted dimensions: Health, Education, and Standard of Living, encompassing 12 indicators based on the Alkire-Foster methodology and NFHS data."
  },
  {
    front: "What is 'Disguised Unemployment' and where is it predominantly observed?",
    back: "A state where more people are engaged in an activity than needed, resulting in Marginal Productivity of Labor being zero (MPL = 0). Characteristic of Indian subsistence agriculture."
  },
  {
    front: "Differentiate between Structural and Frictional Unemployment.",
    back: "Structural: Long-term mismatch between skills possessed by workers and skills required by employers. Frictional: Temporary transitional unemployment while switching between jobs."
  },
  {
    front: "What are the three unemployment measurement approaches used by NSO (NSSO)?",
    back: "1. Usual Principal and Subsidiary Status (UPSS - chronic, 365 days); 2. Current Weekly Status (CWS - 1 hr in reference week); 3. Current Daily Status (CDS - each day of week, most comprehensive)."
  },
  {
    front: "What legal entitlements are guaranteed under MGNREGA 2005?",
    back: "Statutory guarantee of 100 days wage employment per rural household for unskilled manual work, 1/3 reservation for women, unemployment allowance if not provided within 15 days, and 60:40 wage:material ratio."
  },
  {
    front: "What are the loan limits under the three categories of PM MUDRA Yojana?",
    back: "Shishu: Loans up to ₹50,000; Kishore: Loans from ₹50,000 to ₹5 Lakh; Tarun: Loans from ₹5 Lakh to ₹10 Lakh (extended to ₹20 Lakh in Budget 2024 for past borrowers)."
  },
  {
    front: "What is the financial cover provided under Ayushman Bharat PM-JAY?",
    back: "₹5 Lakh health coverage per family per year for secondary and tertiary care hospitalization across public and empaneled private hospitals (cashless and paperless)."
  },
  {
    front: "What is the economic interpretation of the Gini Coefficient and Lorenz Curve?",
    back: "Lorenz curve plots cumulative share of income against cumulative population. Gini Coefficient measures area between Lorenz curve and line of absolute equality (0 = perfect equality, 1 = absolute inequality)."
  }
];

function renderFlashcards() {
  const container = document.getElementById('flashcardsContainer');
  if (!container) return;

  container.innerHTML = flashcardsData.map((card, idx) => `
    <div class="flashcard h-52 group [perspective:1000px] cursor-pointer" onclick="this.classList.toggle('flipped')">
      <div class="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg group-hover:border-emerald-500/40">
        
        <!-- Front -->
        <div class="absolute inset-0 p-4 flex flex-col justify-between [backface-visibility:hidden]">
          <div class="flex items-center justify-between text-[11px] font-mono text-emerald-400">
            <span>CARD #${String(idx + 1).padStart(2, '0')}</span>
            <span class="text-slate-400 flex items-center gap-1"><i data-lucide="rotate-cw" class="w-3 h-3"></i> Flip</span>
          </div>
          <div class="text-xs font-semibold text-slate-100 text-center px-1 my-auto">
            ${card.front}
          </div>
          <div class="text-[10px] text-slate-400 text-center font-mono">
            Click to reveal answer
          </div>
        </div>

        <!-- Back -->
        <div class="absolute inset-0 p-4 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 rounded-2xl border border-emerald-500/30">
          <div class="flex items-center justify-between text-[11px] font-mono text-emerald-400">
            <span>ANSWER #${String(idx + 1).padStart(2, '0')}</span>
            <span class="text-slate-400 flex items-center gap-1"><i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> Memorized</span>
          </div>
          <div class="text-xs text-slate-200 text-center px-1 leading-relaxed my-auto font-light">
            ${card.back}
          </div>
          <div class="text-[10px] text-emerald-400 text-center font-mono">
            Lucent GK High-Yield Fact
          </div>
        </div>

      </div>
    </div>
  `).join('');
}

// --- HIGH-YIELD PRELIMS QUIZ (5 Multiple-Choice Questions) ---
const quizData = [
  {
    question: "Under the Suresh Tendulkar Committee recommendations (2009), what was the estimated percentage of the population living Below Poverty Line (BPL) in India for the year 2011-12?",
    options: [
      "29.5%",
      "21.9%",
      "37.2%",
      "15.8%"
    ],
    correct: 1,
    explanation: "Based on Tendulkar methodology, India's poverty headcount ratio fell to 21.9% in 2011-12 (25.7% rural, 13.7% urban), down from 37.2% in 2004-05. The Rangarajan Committee estimated it at 29.5% for 2011-12."
  },
  {
    question: "Which of the following forms of unemployment is characterized by the condition where the Marginal Productivity of Labor (MPL) is equal to zero?",
    options: [
      "Frictional Unemployment",
      "Structural Unemployment",
      "Disguised Unemployment",
      "Cyclical Unemployment"
    ],
    correct: 2,
    explanation: "Disguised unemployment occurs when more workers are engaged in an activity than required. If surplus workers are withdrawn, total output remains unchanged; therefore, their marginal productivity is zero (MPL = 0)."
  },
  {
    question: "The NITI Aayog National Multidimensional Poverty Index (MPI) assesses poverty across which three equally-weighted dimensions?",
    options: [
      "Income, Employment, and Infrastructure",
      "Health, Education, and Standard of Living",
      "Caloric intake, Housing, and Sanitation",
      "Nutrition, Clean Drinking Water, and Banking"
    ],
    correct: 1,
    explanation: "Aligned with the global Oxford OPHI/UNDP Multidimensional Poverty Index, NITI Aayog evaluates MPI across 3 equally-weighted dimensions: Health (weight 1/3), Education (weight 1/3), and Standard of Living (weight 1/3), subdivided into 12 indicators."
  },
  {
    question: "Under the provisions of the Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) 2005, what is the statutory wage:material expenditure ratio mandated at the Gram Panchayat level?",
    options: [
      "50:50",
      "75:25",
      "60:40",
      "80:20"
    ],
    correct: 2,
    explanation: "MGNREGA legally mandates a 60:40 ratio between wages for unskilled labor and expenditure on skilled/semi-skilled materials, ensuring the scheme remains labor-intensive and community-asset generating."
  },
  {
    question: "In the Pradhan Mantri MUDRA Yojana (PMMY), what is the loan disbursement ceiling under the 'Kishore' category?",
    options: [
      "Loans up to ₹50,000",
      "Loans from ₹50,000 up to ₹5,00,000",
      "Loans from ₹5,00,000 up to ₹10,00,000",
      "Loans from ₹10,00,000 up to ₹20,00,000"
    ],
    correct: 1,
    explanation: "MUDRA categorizes micro-enterprises into three tiers: Shishu (covering loans up to ₹50,000), Kishore (covering loans above ₹50,000 and up to ₹5,00,000), and Tarun (covering loans above ₹5,00,000 and up to ₹10,00,000)."
  }
];

let userAnswers = {};

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = quizData.map((q, qIdx) => `
    <div class="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5" id="question-${qIdx}">
      <div class="flex items-start gap-3">
        <span class="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
          ${qIdx + 1}
        </span>
        <h4 class="text-sm font-semibold text-slate-100 leading-snug">
          ${q.question}
        </h4>
      </div>

      <div class="space-y-2 pl-9">
        ${q.options.map((opt, optIdx) => `
          <label class="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all text-xs text-slate-300 option-label-${qIdx}" id="label-${qIdx}-${optIdx}">
            <input type="radio" name="question-${qIdx}" value="${optIdx}" class="text-emerald-500 focus:ring-emerald-400 bg-slate-900 border-slate-700" onchange="selectOption(${qIdx}, ${optIdx})">
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>

      <div id="explanation-${qIdx}" class="hidden pl-9 pt-2">
        <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
          <div class="font-bold text-emerald-400 flex items-center gap-1.5">
            <i data-lucide="info" class="w-3.5 h-3.5"></i> Detailed Explanation:
          </div>
          <p>${q.explanation}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function selectOption(qIdx, optIdx) {
  userAnswers[qIdx] = optIdx;
}

const submitQuizBtn = document.getElementById('submitQuizBtn');
if (submitQuizBtn) {
  submitQuizBtn.addEventListener('click', () => {
    let score = 0;
    quizData.forEach((q, qIdx) => {
      const selected = userAnswers[qIdx];
      const explanationDiv = document.getElementById(`explanation-${qIdx}`);
      if (explanationDiv) explanationDiv.classList.remove('hidden');

      q.options.forEach((_, optIdx) => {
        const label = document.getElementById(`label-${qIdx}-${optIdx}`);
        if (!label) return;

        label.classList.remove('border-emerald-500', 'bg-emerald-500/10', 'border-rose-500', 'bg-rose-500/10');

        if (optIdx === q.correct) {
          label.classList.add('border-emerald-500', 'bg-emerald-500/10', 'text-emerald-300');
        } else if (selected === optIdx && selected !== q.correct) {
          label.classList.add('border-rose-500', 'bg-rose-500/10', 'text-rose-300');
        }
      });

      if (selected === q.correct) {
        score++;
      }
    });

    const banner = document.getElementById('quizScoreBanner');
    if (banner) {
      banner.classList.remove('hidden');
      banner.innerHTML = `
        <div class="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-slate-900 border border-emerald-500/30 text-center space-y-1">
          <h3 class="text-base font-bold text-emerald-300">You Scored ${score} / ${quizData.length}</h3>
          <p class="text-xs text-slate-300">${score >= 4 ? 'Exceptional mastery of Indian poverty metrics and welfare schemes!' : 'Review the explanations above and revisit the key committee numbers.'}</p>
        </div>
      `;
    }
    lucide.createIcons();
  });
}

const resetQuizBtn = document.getElementById('resetQuizBtn');
if (resetQuizBtn) {
  resetQuizBtn.addEventListener('click', () => {
    userAnswers = {};
    const banner = document.getElementById('quizScoreBanner');
    if (banner) banner.classList.add('hidden');
    renderQuiz();
    lucide.createIcons();
  });
}

// --- FULL DETAIL IMAGE LIGHTBOX VIEWER ---
let currentZoom = 1;
let isPanning = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;

function openLightbox(src, title, caption) {
  const lightbox = document.getElementById('imageLightbox');
  const img = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const captionEl = document.getElementById('lightboxCaption');

  if (!lightbox || !img) return;

  img.src = src;
  if (titleEl) titleEl.textContent = title;
  if (captionEl) captionEl.textContent = caption;

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
  document.body.style.overflow = '';
}

function updateImageTransform() {
  const img = document.getElementById('lightboxImg');
  if (img) {
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
  }
}

const lightboxCloseBtn = document.getElementById('lightboxClose');
if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);

const zoomInBtn = document.getElementById('zoomInBtn');
if (zoomInBtn) {
  zoomInBtn.addEventListener('click', () => {
    currentZoom = Math.min(currentZoom + 0.25, 4);
    updateImageTransform();
  });
}

const zoomOutBtn = document.getElementById('zoomOutBtn');
if (zoomOutBtn) {
  zoomOutBtn.addEventListener('click', () => {
    currentZoom = Math.max(currentZoom - 0.25, 0.5);
    updateImageTransform();
  });
}

const zoomResetBtn = document.getElementById('zoomResetBtn');
if (zoomResetBtn) {
  zoomResetBtn.addEventListener('click', () => {
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
    updateImageTransform();
  });
}

const lightbox = document.getElementById('imageLightbox');
if (lightbox) {
  lightbox.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      currentZoom = Math.min(currentZoom + 0.15, 4);
    } else {
      currentZoom = Math.max(currentZoom - 0.15, 0.5);
    }
    updateImageTransform();
  }, { passive: false });

  const img = document.getElementById('lightboxImg');
  if (img) {
    img.addEventListener('mousedown', (e) => {
      isPanning = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      img.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isPanning) return;
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      updateImageTransform();
    });

    window.addEventListener('mouseup', () => {
      isPanning = false;
      if (img) img.style.cursor = 'grab';
    });
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeSearchModal();
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openSearchModal();
  }
});

// --- SEARCH MODAL ---
function openSearchModal() {
  const modal = document.getElementById('searchModal');
  const input = document.getElementById('searchInput');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (input) setTimeout(() => input.focus(), 50);
  }
}

function closeSearchModal() {
  const modal = document.getElementById('searchModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchInput && searchResults) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">Search over 30+ keywords in Chapter 34...</p>';
      return;
    }

    const items = [
      { title: "Tendulkar Committee (2009)", desc: "MRP consumption expenditure, ₹27 rural and ₹33 urban poverty lines." },
      { title: "Rangarajan Committee (2014)", desc: "MMRP methodology, ₹32 rural and ₹47 urban poverty lines, 29.5% poverty." },
      { title: "Alagh Committee (1979)", desc: "Calorie norms: 2400 kcal rural, 2100 kcal urban daily intake." },
      { title: "Lakdawala Committee (1993)", desc: "Disaggregated poverty lines using state-specific CPI-AL and CPI-IW indices." },
      { title: "NITI Aayog MPI", desc: "Multidimensional Poverty Index with 3 dimensions (Health, Education, Standard of Living) and 12 indicators." },
      { title: "Disguised Unemployment", desc: "Surplus workers where marginal productivity of labor equals zero (MPL = 0)." },
      { title: "Structural Unemployment", desc: "Mismatch between job requirements and worker skills." },
      { title: "MGNREGA 2005", desc: "Legal guarantee of 100 days wage employment per rural household; 60:40 wage:material ratio." },
      { title: "PM-KISAN", desc: "₹6,000 annual income support in 3 equal installments of ₹2,000 directly into farmer bank accounts." },
      { title: "PM Jan Dhan Yojana (PMJDY)", desc: "Universal financial inclusion, zero balance accounts, RuPay debit cards, and overdraft facility." },
      { title: "PM MUDRA Yojana", desc: "Micro-enterprise loans across Shishu (up to ₹50k), Kishore (₹50k-₹5L), and Tarun (₹5L-₹10L/₹20L)." },
      { title: "Ayushman Bharat PM-JAY", desc: "World's largest health assurance scheme providing ₹5 Lakh annual secondary and tertiary coverage per family." },
      { title: "Lorenz Curve & Gini Coefficient", desc: "Graphical and statistical measure of income inequality (0 = absolute equality, 1 = absolute inequality)." }
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
}

// INITIALIZE ON LOAD
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderFlashcards();
  renderQuiz();
  lucide.createIcons();
});
