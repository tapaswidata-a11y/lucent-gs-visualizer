/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 35: Foreign Trade, Balance of Payments & International Organizations
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
    front: "What is the key difference between Balance of Trade (BoT) and Balance of Payments (BoP)?",
    back: "Balance of Trade (BoT) includes only visible merchandise exports and imports. Balance of Payments (BoP) is an all-inclusive systematic record of all economic transactions (merchandise, invisibles/services, transfers, and capital flows) between residents and the rest of the world."
  },
  {
    front: "What are the components of the Current Account in BoP?",
    back: "1. Merchandise Trade (visible goods); 2. Invisibles, which comprise Services (IT software, travel, transport), Transfers (remittances, gifts, grants), and Income (profits, dividends, interest)."
  },
  {
    front: "What items constitute the Capital Account of BoP?",
    back: "Foreign Investments (FDI and FPI/FII), External Loans (External Commercial Borrowings - ECBs, bilateral/multilateral debt), and Banking Capital (NRI deposits like FCNR and NRE)."
  },
  {
    front: "What is the status of Rupee Convertibility in India?",
    back: "Current Account: Fully convertible since August 1994 (under IMF Article VIII). Capital Account: Partial convertibility, guided by the Tarapore Committee recommendations (1997 & 2006)."
  },
  {
    front: "What are the four components of India's Foreign Exchange (Forex) Reserves?",
    back: "1. Foreign Currency Assets (FCA - USD, Euro, GBP, Yen); 2. Gold reserves held by RBI; 3. Special Drawing Rights (SDR) with IMF; 4. Reserve Tranche Position (RTP) in IMF."
  },
  {
    front: "Which two institutions are known as the 'Bretton Woods Twins' and when were they founded?",
    back: "International Monetary Fund (IMF) and the International Bank for Reconstruction and Development (IBRD / World Bank), created at the 1944 Bretton Woods Conference in New Hampshire, USA."
  },
  {
    front: "What five institutions constitute the World Bank Group?",
    back: "1. IBRD; 2. IDA (International Development Association - 'soft loan window'); 3. IFC (International Finance Corporation); 4. MIGA (Multilateral Investment Guarantee Agency); 5. ICSID (India is NOT a member of ICSID)."
  },
  {
    front: "When was the World Trade Organization (WTO) established and which treaty created it?",
    back: "Established on 1st January 1995 through the Marrakesh Agreement concluded at the end of the Uruguay Round of GATT (1986–1994), headquartered in Geneva, Switzerland."
  },
  {
    front: "Explain the 'Green Box', 'Blue Box', and 'Amber Box' subsidies under the WTO Agreement on Agriculture.",
    back: "Green Box: Non-trade distorting subsidies allowed without limit (R&D, pest control). Blue Box: Direct payments linked to production limiting programs (amber box with limits). Amber Box: Trade-distorting price supports subject to reduction (Aggregate Measurement of Support - AMS)."
  },
  {
    front: "What are TRIPS and TRIMS under the WTO framework?",
    back: "TRIPS: Trade-Related Aspects of Intellectual Property Rights (patents, copyrights, trademarks, GI tags). TRIMS: Trade-Related Investment Measures (prohibits domestic content requirements on foreign investors)."
  },
  {
    front: "What is the Special Drawing Right (SDR) and what currencies are in its valuation basket?",
    back: "An international reserve asset created by the IMF in 1969 ('paper gold'). Its basket comprises 5 currencies: US Dollar, Euro, Chinese Renminbi (added 2016), Japanese Yen, and British Pound Sterling."
  },
  {
    front: "Where are the headquarters of ADB, NDB, and AIIB located?",
    back: "Asian Development Bank (ADB): Manila, Philippines (est. 1966). New Development Bank (NDB): Shanghai, China (est. 2014 by BRICS). Asian Infrastructure Investment Bank (AIIB): Beijing, China (est. 2016; India is 2nd largest shareholder)."
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
    question: "Which of the following bodies of the World Bank Group is India NOT a member of?",
    options: [
      "International Development Association (IDA)",
      "International Finance Corporation (IFC)",
      "Multilateral Investment Guarantee Agency (MIGA)",
      "International Centre for Settlement of Investment Disputes (ICSID)"
    ],
    correct: 3,
    explanation: "India is a founding member of IBRD, IDA, and IFC, and joined MIGA in 1994. India is not a member of ICSID because ICSID awards cannot be challenged in domestic courts, conflicting with Indian sovereignty."
  },
  {
    question: "Remittances sent by Non-Resident Indians (NRIs) to their families in India are recorded under which specific component of the Balance of Payments?",
    options: [
      "Capital Account - Banking Capital",
      "Current Account - Invisibles (Unilateral Transfers)",
      "Capital Account - Foreign Direct Investment",
      "Current Account - Merchandise Trade"
    ],
    correct: 1,
    explanation: "Remittances are private unilateral transfers (one-way transfers without economic quid pro quo) and are accounted for under the Invisibles section of the Current Account."
  },
  {
    question: "The Tarapore Committees constituted by the Reserve Bank of India in 1997 and 2006 were tasked with providing a roadmap for:",
    options: [
      "Full Convertibility on Current Account",
      "Full Capital Account Convertibility (FCAC)",
      "Phasing out Cash Reserve Ratio (CRR)",
      "Nationalization of Private Commercial Banks"
    ],
    correct: 1,
    explanation: "Both S.S. Tarapore Committees (1997 and 2006) laid down preconditions and roadmaps for Full Capital Account Convertibility (FCAC), including fiscal deficit reduction, low inflation, and non-performing asset reduction."
  },
  {
    question: "Under the World Trade Organization (WTO) Agreement on Agriculture, agricultural subsidies that distort international trade and production are categorized under the:",
    options: [
      "Green Box",
      "Blue Box",
      "Amber Box",
      "Red Box"
    ],
    correct: 2,
    explanation: "Amber box supports are trade-distorting agricultural subsidies (e.g. minimum support prices, input subsidies on power and fertilizer). Under WTO rules, these are subject to reduction commitments and quantified via Aggregate Measurement of Support (AMS)."
  },
  {
    question: "Which currency was latest included in the International Monetary Fund's Special Drawing Rights (SDR) valuation basket in October 2016?",
    options: [
      "Swiss Franc (CHF)",
      "Chinese Renminbi (Yuan)",
      "Indian Rupee (INR)",
      "Australian Dollar (AUD)"
    ],
    correct: 1,
    explanation: "The IMF Executive Board added the Chinese Renminbi (Yuan) to the SDR basket on October 1, 2016, joining the US Dollar, Euro, Japanese Yen, and British Pound Sterling as an internationally freely usable currency."
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
          <p class="text-xs text-slate-300">${score >= 4 ? 'Brilliant mastery of BoP accounts, WTO rules, and global financial bodies!' : 'Review the explanations above and revisit the Bretton Woods & WTO agreements.'}</p>
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
      searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">Search over 30+ keywords in Chapter 35...</p>';
      return;
    }

    const items = [
      { title: "Balance of Payments (BoP)", desc: "Systematic record of all economic transactions between residents and foreign nations." },
      { title: "Current Account", desc: "Merchandise trade, services (IT software), remittances/transfers, and investment income." },
      { title: "Capital Account", desc: "FDI, FPI, External Commercial Borrowings (ECBs), and NRI banking capital." },
      { title: "Tarapore Committee", desc: "Roadmap and conditions for Full Capital Account Convertibility (FCAC)." },
      { title: "Foreign Exchange Reserves", desc: "FCA, Gold, Special Drawing Rights (SDR), and Reserve Tranche Position (RTP)." },
      { title: "IMF (International Monetary Fund)", desc: "Bretton Woods 1944, Washington D.C., BOP stabilization and SDR issuance." },
      { title: "World Bank Group (IBRD, IDA, IFC, MIGA, ICSID)", desc: "Long-term development financing; India is not a member of ICSID." },
      { title: "World Trade Organization (WTO)", desc: "Marrakesh Agreement 1995, Geneva; successor to GATT 1947." },
      { title: "TRIPS & TRIMS", desc: "Intellectual property rights and investment measures under WTO." },
      { title: "Agriculture Boxes (Green, Blue, Amber)", desc: "Non-distorting vs production-limiting vs trade-distorting AMS agricultural subsidies." },
      { title: "Special Drawing Rights (SDR)", desc: "IMF currency basket: USD, Euro, Renminbi, Yen, Pound Sterling." },
      { title: "ADB, NDB & AIIB", desc: "Asian Development Bank (Manila), New Development Bank (Shanghai), Asian Infrastructure Investment Bank (Beijing)." }
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
