/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 32: Money, Banking & RBI Monetary Policy
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
  titleEl.textContent = title || 'Banking Architecture';
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
    q: "On the recommendation of which Royal Commission was the Reserve Bank of India (RBI) established?",
    a: "The Hilton Young Commission (Royal Commission on Indian Currency and Finance, 1926). Established on April 1, 1935 under the RBI Act 1934."
  },
  {
    q: "When was the Reserve Bank of India nationalized, and who was its first Indian Governor?",
    a: "Nationalized on January 1, 1949. Sir Chintaman Dwarkanath Deshmukh (C.D. Deshmukh) was the first Indian Governor (1943–1949)."
  },
  {
    q: "Who issues one-rupee currency notes and coins in India, and whose signature does a ₹1 note bear?",
    a: "Issued by the Ministry of Finance, Government of India (not RBI). The ₹1 note bears the signature of the Finance Secretary of India."
  },
  {
    q: "What constitutes 'Broad Money' (M3) in RBI's monetary aggregates?",
    a: "M3 = M1 (Currency with public + Demand deposits with banks + Other deposits with RBI) + Time Deposits with the banking system. It is the most commonly used measure of money supply."
  },
  {
    q: "What is the key difference between Cash Reserve Ratio (CRR) and Statutory Liquidity Ratio (SLR)?",
    a: "CRR is the percentage of NDTL that banks MUST keep in CASH with the RBI (earns no interest). SLR is the percentage of NDTL that banks must maintain with THEMSELVES in liquid assets (cash, gold, approved g-secs)."
  },
  {
    q: "What is the 'Repo Rate' and under what facility does the RBI operate it?",
    a: "Repo (Repurchase Option) Rate is the key policy interest rate at which the RBI lends short-term money to commercial banks against the pledge of government securities under the Liquidity Adjustment Facility (LAF)."
  },
  {
    q: "What is the composition and statutory mandate of the Monetary Policy Committee (MPC)?",
    a: "6 members (3 from RBI including Governor with casting vote + 3 external experts appointed by Central Govt). Mandate: maintain consumer price inflation (CPI) at 4% with a tolerance band of +/- 2% (2% to 6%)."
  },
  {
    q: "What is the 'Standing Deposit Facility' (SDF) introduced by the RBI in 2022?",
    a: "An uncollateralized liquidity absorption facility allowing banks to park overnight funds with the RBI without the RBI needing to provide government securities as collateral. Replaced reverse repo as floor of LAF corridor."
  },
  {
    q: "On what date were 14 major commercial banks nationalized in India, and under which Prime Minister?",
    a: "July 19, 1969 by Prime Minister Indira Gandhi through the Banking Companies (Acquisition and Transfer of Undertakings) Ordinance, 1969 (banks having deposits over ₹50 crore)."
  },
  {
    q: "What is the mandatory Priority Sector Lending (PSL) target for domestic scheduled commercial banks?",
    a: "40% of Adjusted Net Bank Credit (ANBC) or Credit Equivalent Amount of Off-Balance Sheet Exposure, whichever is higher, earmarked for Agriculture, MSME, Education, Housing, etc."
  },
  {
    q: "What is a Non-Performing Asset (NPA) and what are its three classifications?",
    a: "A loan or advance where interest or principal remains overdue for more than 90 days. Classified into: 1) Substandard (NPA <= 12 months); 2) Doubtful (NPA > 12 months); 3) Loss assets (uncollectible)."
  },
  {
    q: "What was the Imperial Bank of India, and what did it become after nationalization in 1955?",
    a: "Formed in 1921 by merging the three Presidency Banks (Bengal, Bombay, Madras). In 1955, on the recommendation of the Gorewala Committee, it was nationalized and renamed State Bank of India (SBI)."
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
    q: "When the Reserve Bank of India wants to curb inflationary pressures in the economy, which of the following actions is it most likely to take?",
    options: [
      "Decrease the Cash Reserve Ratio (CRR)",
      "Increase the Repo Rate and conduct Open Market sales of government securities",
      "Decrease the Statutory Liquidity Ratio (SLR)",
      "Lower the Marginal Standing Facility (MSF) rate"
    ],
    answer: 1,
    explanation: "To curb inflation (dear money policy), the RBI increases the policy repo rate (making borrowing costlier) and sells government securities in open market operations (absorbing excess liquidity from the banking system)."
  },
  {
    q: "Consider the following statements regarding the Monetary Policy Committee (MPC):\n1. It is a statutory body constituted under the Banking Regulation Act, 1949.\n2. The Governor of the Reserve Bank of India is the ex-officio Chairperson of the MPC.\n3. The MPC determines the policy repo rate required to achieve the inflation target.\nWhich of the statements given above are correct?",
    options: [
      "1 and 2 only",
      "2 and 3 only",
      "1 and 3 only",
      "1, 2 and 3"
    ],
    answer: 1,
    explanation: "Statements 2 and 3 are correct. Statement 1 is false because the MPC was constituted under Section 45ZB of the Reserve Bank of India Act, 1934 (as amended in 2016), not the Banking Regulation Act."
  },
  {
    q: "Under the Reserve Bank of India's prudential norms, an asset is classified as a 'Doubtful Asset' when it has remained in the substandard category for a period exceeding:",
    options: [
      "90 days",
      "180 days",
      "12 months",
      "3 years"
    ],
    answer: 2,
    explanation: "An asset is classified as substandard if it remains an NPA for up to 12 months. If it remains in the substandard category for a period exceeding 12 months, it is classified as a Doubtful Asset."
  },
  {
    q: "Which of the following is considered as the 'Narrow Money' aggregate in India?",
    options: [
      "M0",
      "M1",
      "M2",
      "M3"
    ],
    answer: 1,
    explanation: "M1 is known as Narrow Money because it represents only the most liquid components of money: Currency with the public + Demand deposits with the banking system + Other deposits with the RBI."
  },
  {
    q: "The 'Marginal Standing Facility' (MSF) was introduced by the RBI in 2011 to enable commercial banks to:",
    options: [
      "Borrow long-term funds without collateral",
      "Borrow overnight funds from RBI in emergency situations by dipping into their Statutory Liquidity Ratio (SLR) portfolio",
      "Lend directly to foreign multinational corporations",
      "Park excess cash reserves with international central banks"
    ],
    answer: 1,
    explanation: "MSF is a penal overnight borrowing window that allows scheduled commercial banks to borrow funds against government securities from the RBI, even dipping into their statutory SLR quota up to a specified limit."
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
      score === 5 ? 'Mastery over Banking, RBI, and Monetary Policy tools achieved!' : 'Review the monetary policy rates and NPA definitions above.'
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
    { title: "Reserve Bank of India (RBI)", desc: "Established April 1, 1935 on Hilton Young Commission recommendation. Nationalized 1949." },
    { title: "Cash Reserve Ratio (CRR)", desc: "Percentage of NDTL parked as cash with RBI. No interest earned." },
    { title: "Statutory Liquidity Ratio (SLR)", desc: "Liquid assets (cash, gold, g-secs) maintained with banks themselves." },
    { title: "Repo Rate & Reverse Repo", desc: "Key policy lending and borrowing rates under Liquidity Adjustment Facility (LAF)." },
    { title: "Standing Deposit Facility (SDF)", desc: "Uncollateralized liquidity absorption mechanism introduced in 2022." },
    { title: "Monetary Policy Committee (MPC)", desc: "6 members, flexible inflation target of 4% (+/- 2%) based on CPI." },
    { title: "Bank Nationalization 1969 & 1980", desc: "14 banks in 1969, 6 banks in 1980 under Prime Minister Indira Gandhi." },
    { title: "Priority Sector Lending (PSL)", desc: "40% of ANBC for scheduled commercial banks (agriculture, MSMEs, weaker sections)." },
    { title: "Non-Performing Assets (NPAs)", desc: "Overdue >90 days. Substandard (<=12m), Doubtful (>12m), and Loss assets." },
    { title: "Money Aggregates (M1, M2, M3, M4)", desc: "M1 is Narrow Money; M3 is Broad Money (M1 + Time Deposits)." }
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
