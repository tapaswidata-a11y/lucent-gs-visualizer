/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 33: Union Budget, Taxation & Finance Commission
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
  titleEl.textContent = title || 'Fiscal Landmark';
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
    q: "Which Article of the Constitution requires the President to lay the Annual Financial Statement (Budget) before Parliament?",
    a: "Article 112. The word 'Budget' is never used in the Constitution; it is officially designated as the 'Annual Financial Statement' (AFS)."
  },
  {
    q: "What is the formula and economic meaning of 'Fiscal Deficit'?",
    a: "Fiscal Deficit = Total Expenditure - Total Receipts excluding borrowings. It represents the total borrowing requirements of the Government of India from all sources in a financial year."
  },
  {
    q: "What is the difference between Fiscal Deficit and Primary Deficit?",
    a: "Primary Deficit = Fiscal Deficit minus Interest Payments. It indicates the net borrowing requirement of the government excluding the burden of past accumulated debts."
  },
  {
    q: "What is an 'Effective Revenue Deficit' and when was it introduced in the Union Budget?",
    a: "Effective Revenue Deficit = Revenue Deficit minus Grants for Creation of Capital Assets given to States. Introduced in the 2011–12 Union Budget on the recommendation of the Rangarajan Committee."
  },
  {
    q: "Under which Constitutional Amendment Act was the Goods and Services Tax (GST) introduced in India?",
    a: "The 101st Constitutional Amendment Act, 2016, effective from July 1, 2017. It inserted Article 246A (concurrent tax power), Article 269A (IGST), and Article 279A (GST Council)."
  },
  {
    q: "What is the voting weightage structure in the GST Council under Article 279A?",
    a: "The Central Government has 1/3rd (33.33%) of total votes cast, and all State Governments combined have 2/3rd (66.67%) of total votes. Every decision requires a 3/4th (75%) weighted majority."
  },
  {
    q: "Which goods and commodities are currently kept outside the purview of the GST regime?",
    a: "Five petroleum products (crude oil, petrol/MS, high-speed diesel, natural gas, aviation turbine fuel - ATF) and alcoholic liquor for human consumption."
  },
  {
    q: "Under which Article of the Constitution is the Finance Commission constituted, and by whom?",
    a: "Article 280. Constituted by the President of India every fifth year (or earlier), consisting of a Chairman and 4 other members."
  },
  {
    q: "What share of net divisible central tax proceeds was recommended for horizontal devolution to States by the 15th Finance Commission?",
    a: "41% for the period 2021–26 (chaired by N.K. Singh). It retained the 14th FC's 42% benchmark, adjusting 1% downward for the newly created Union Territories of Jammu & Kashmir and Ladakh."
  },
  {
    q: "What is the primary difference between Direct Tax and Indirect Tax in public finance?",
    a: "For Direct Taxes (Income tax, Corporate tax), the impact and incidence fall on the same person (non-transferable and progressive). For Indirect Taxes (GST, Customs), the impact is on the dealer/producer but the incidence is shifted to the consumer (transferable and regressive)."
  },
  {
    q: "When was the 92-year-old separate Railway Budget merged back with the Union Budget, and which committee recommended it?",
    a: "In the 2017–18 Budget under Finance Minister Arun Jaitley, following the recommendations of the Bibek Debroy Committee. The Acworth Committee had separated them in 1924."
  },
  {
    q: "Who was appointed as the Chairman of the 16th Finance Commission in December 2023?",
    a: "Dr. Arvind Panagariya (former Vice-Chairman of NITI Aayog), tasked with making recommendations for the 5-year period starting April 1, 2026."
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
    q: "Which of the following items constitutes a 'Capital Receipt' of the Government of India?",
    options: [
      "Dividends and profits received from Public Sector Undertakings (PSUs)",
      "Disinvestment proceeds from the sale of government equity in Air India",
      "Interest received on loans granted to State Governments",
      "Fees and penalties collected by regulatory authorities"
    ],
    answer: 1,
    explanation: "Disinvestment proceeds reduce the financial assets of the government, hence classified as Non-Debt Capital Receipts. Dividends, interest receipts, and fees are Revenue Receipts as they neither create liabilities nor reduce assets."
  },
  {
    q: "Consider the following statements regarding the Goods and Services Tax (GST) Council:\n1. It is a statutory body constituted under the Central GST Act, 2017.\n2. The Union Minister of State in charge of Revenue or Finance is a member of the Council.\n3. Every decision of the Council is taken by a majority of not less than three-fourths of the weighted votes of the members present and voting.\nWhich of the statements given above are correct?",
    options: [
      "1 and 2 only",
      "2 and 3 only",
      "1 and 3 only",
      "1, 2 and 3"
    ],
    answer: 1,
    explanation: "Statements 2 and 3 are correct. Statement 1 is false because the GST Council is a CONSTITUTIONAL body created under Article 279A by the 101st Constitutional Amendment Act, 2016."
  },
  {
    q: "Which of the following criteria carried the highest weightage in the horizontal devolution formula adopted by the 15th Finance Commission?",
    options: [
      "Population (2011 Census)",
      "Income Distance",
      "Area of the State",
      "Forest and Ecology"
    ],
    answer: 1,
    explanation: "Under the 15th Finance Commission (N.K. Singh), 'Income Distance' carried the highest weightage of 45%, followed by Population 2011 (15%), Area (15%), Demographic Performance (12.5%), Forest & Ecology (10%), and Tax Effort (2.5%)."
  },
  {
    q: "The primary objective of the Fiscal Responsibility and Budget Management (FRBM) Act, 2003 was to:",
    options: [
      "Abolish all indirect taxes in India",
      "Ensure inter-generational equity in fiscal management and eliminate revenue deficit while capping fiscal deficit",
      "Regulate foreign exchange transactions under FEMA",
      "Provide statutory status to the Planning Commission"
    ],
    answer: 1,
    explanation: "The FRBM Act 2003 was enacted to institutionalize fiscal discipline, reduce India's fiscal deficit to 3% of GDP, eliminate revenue deficit, and improve public debt management."
  },
  {
    q: "Grants-in-aid to the States by the Union Government under Article 275 of the Constitution are recommended by:",
    options: [
      "NITI Aayog",
      "The Inter-State Council",
      "The Finance Commission of India",
      "The Public Accounts Committee"
    ],
    answer: 2,
    explanation: "Under Article 280(3)(b), it is the constitutional duty of the Finance Commission to recommend the principles which should govern the grants-in-aid of the revenues of the States out of the Consolidated Fund of India under Article 275."
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
      score === 5 ? 'Exceptional command over Union Budget, Taxation & Finance Commission!' : 'Review the deficit formulas and GST voting weights above.'
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
    { title: "Article 112 - Annual Financial Statement", desc: "Constitutional budget term; Revenue & Capital receipts and expenditures." },
    { title: "Fiscal Deficit", desc: "Total Expenditure minus Total Receipts excluding borrowings; reflects net borrowing need." },
    { title: "Revenue Deficit", desc: "Excess of revenue expenditure over revenue receipts; indicates government dis-saving." },
    { title: "Primary Deficit", desc: "Fiscal deficit minus interest payments on accumulated debt." },
    { title: "Goods and Services Tax (GST)", desc: "101st Amendment 2016; destination consumption tax with 5%, 12%, 18%, 28% slabs." },
    { title: "GST Council (Art 279A)", desc: "Federal body: 1/3rd Centre vote, 2/3rd States vote, 75% weighted majority needed." },
    { title: "Article 280 - Finance Commission", desc: "Quasi-judicial body appointed every 5 years by President for vertical and horizontal devolution." },
    { title: "15th Finance Commission (NK Singh)", desc: "Recommended 41% tax devolution to States for 2021-26; 45% income distance weight." },
    { title: "16th Finance Commission (Panagariya)", desc: "Constituted in Dec 2023 under Dr. Arvind Panagariya for 2026-31 period." },
    { title: "FRBM Act 2003", desc: "Fiscal Responsibility and Budget Management Act targeting 3% fiscal deficit." }
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
