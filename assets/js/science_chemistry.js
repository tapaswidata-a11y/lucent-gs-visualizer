/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 37: General Science - Chemistry
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
    front: "What is the Modern Periodic Law formulated by Henry Moseley (1913)?",
    back: "The physical and chemical properties of elements are periodic functions of their atomic numbers (Z), not their atomic masses as originally proposed by Mendeleev."
  },
  {
    front: "Which elements are liquid at room temperature (25°C / 298 K)?",
    back: "Mercury (Hg - the only liquid metal) and Bromine (Br - the only liquid non-metal). Caesium (Cs) and Gallium (Ga) melt just above room temperature (approx 28.5°C–29.8°C)."
  },
  {
    front: "What are the chemical formula and composition of Plaster of Paris (PoP)?",
    back: "Calcium Sulfate Hemihydrate: CaSO₄·½H₂O (or 2CaSO₄·H₂O), produced by gently heating Gypsum (CaSO₄·2H₂O) to 373 K (100°C)."
  },
  {
    front: "What is Aqua Regia and what is its exact volumetric ratio?",
    back: "A highly corrosive fuming farrago of 1 part concentrated Nitric Acid (HNO₃) to 3 parts concentrated Hydrochloric Acid (HCl) [Ratio 1:3], capable of dissolving noble metals like Gold and Platinum."
  },
  {
    front: "What is the odorant added to domestic LPG cylinders to detect gas leakage?",
    back: "Ethyl Mercaptan (Ethanethiol - C₂H₅SH). Pure LPG (liquefied propane and butane) is naturally odorless; ethyl mercaptan imparts a strong pungent sulfur odor."
  },
  {
    front: "Why does German Silver have that name, and what is its actual elemental composition?",
    back: "German Silver contains NO silver at all! It is an alloy composed of Copper (approx 60%), Zinc (approx 20%), and Nickel (approx 20%), named solely for its silver-white lustrous appearance."
  },
  {
    front: "Which element has the highest Electronegativity and which has the highest Electron Affinity?",
    back: "Highest Electronegativity: Fluorine (F = 4.0 on Pauling scale). Highest Electron Affinity (releases most energy on electron gain): Chlorine (Cl)."
  },
  {
    front: "What process is used to harden natural rubber and who invented it?",
    back: "Vulcanization: Heating natural rubber with elemental Sulfur (creating disulfide cross-links), patented by Charles Goodyear in 1839 to increase tensile strength and elasticity."
  },
  {
    front: "Differentiate between an Isotope, Isobar, and Isotone.",
    back: "Isotopes: Same atomic number Z, different mass number A (e.g., ¹H, ²H, ³H). Isobars: Same mass number A, different atomic number Z (e.g., ⁴⁰Ar, ⁴⁰Ca). Isotones: Same number of neutrons (A − Z = constant)."
  },
  {
    front: "What chemical coating gives non-stick cookware its friction-free surface?",
    back: "Polytetrafluoroethylene (PTFE), commercially known as Teflon, a fluorocarbon polymer with high thermal stability and extremely low coefficient of friction."
  },
  {
    front: "Which radioisotope is used in the treatment of cancer and which in thyroid disorders?",
    back: "Cancer radiotherapy: Cobalt-60 (⁶⁰Co - gamma emitter). Thyroid gland diagnostics and goiter therapy: Iodine-131 (¹³¹I)."
  },
  {
    front: "What is an Amalgam and which metal does NOT form an amalgam?",
    back: "An alloy of Mercury with any other metal. Iron (Fe) does not form an amalgam, which is why liquid mercury is historically stored and transported in iron flasks."
  }
];

function renderFlashcards() {
  const container = document.getElementById('flashcardsContainer');
  if (!container) return;

  container.innerHTML = flashcardsData.map((card, idx) => `
    <div class="flashcard h-52 group [perspective:1000px] cursor-pointer" onclick="this.classList.toggle('flipped')">
      <div class="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg group-hover:border-purple-500/40">
        
        <!-- Front -->
        <div class="absolute inset-0 p-4 flex flex-col justify-between [backface-visibility:hidden]">
          <div class="flex items-center justify-between text-[11px] font-mono text-purple-400">
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
        <div class="absolute inset-0 p-4 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 rounded-2xl border border-purple-500/30">
          <div class="flex items-center justify-between text-[11px] font-mono text-purple-400">
            <span>ANSWER #${String(idx + 1).padStart(2, '0')}</span>
            <span class="text-slate-400 flex items-center gap-1"><i data-lucide="check" class="w-3 h-3 text-purple-400"></i> Memorized</span>
          </div>
          <div class="text-xs text-slate-200 text-center px-1 leading-relaxed my-auto font-light">
            ${card.back}
          </div>
          <div class="text-[10px] text-purple-400 text-center font-mono">
            Lucent GK Chemistry High-Yield
          </div>
        </div>

      </div>
    </div>
  `).join('');
}

// --- HIGH-YIELD PRELIMS QUIZ (5 Multiple-Choice Questions) ---
const quizData = [
  {
    question: "Which of the following compounds is chemically known as 'Plaster of Paris'?",
    options: [
      "Calcium Carbonate (CaCO₃)",
      "Calcium Sulfate Dihydrate (CaSO₄·2H₂O)",
      "Calcium Sulfate Hemihydrate (CaSO₄·½H₂O)",
      "Calcium Oxychloride (CaOCl₂)"
    ],
    correct: 2,
    explanation: "Plaster of Paris is calcium sulfate hemihydrate (CaSO₄·½H₂O). When mixed with water, it rehydrates rapidly back into gypsum (CaSO₄·2H₂O) with a slight expansion in volume, making it ideal for bone fracture casts and architectural moldings."
  },
  {
    question: "In the modern periodic table, which element possesses the highest electron gain enthalpy (electron affinity)?",
    options: [
      "Fluorine (F)",
      "Chlorine (Cl)",
      "Oxygen (O)",
      "Nitrogen (N)"
    ],
    correct: 1,
    explanation: "Although Fluorine has the highest electronegativity, Chlorine has the highest electron affinity (most negative electron gain enthalpy). Fluorine's exceptionally small 2p orbital creates significant inter-electronic repulsion, whereas Chlorine's larger 3p orbital accommodates an incoming electron with greater energy release."
  },
  {
    question: "The alloy known as 'German Silver' contains which of the following combinations of metals?",
    options: [
      "Silver, Copper, and Zinc",
      "Copper, Zinc, and Nickel",
      "Silver, Aluminium, and Tin",
      "Copper, Tin, and Lead"
    ],
    correct: 1,
    explanation: "German Silver contains no elemental silver (Ag = 0%). It is a ternary alloy composed of roughly 60% Copper, 20% Zinc, and 20% Nickel, prized for its silvery appearance and corrosion resistance."
  },
  {
    question: "What is the volumetric mixing ratio of concentrated Nitric Acid (HNO₃) to concentrated Hydrochloric Acid (HCl) in 'Aqua Regia'?",
    options: [
      "3 : 1",
      "1 : 3",
      "1 : 1",
      "2 : 3"
    ],
    correct: 1,
    explanation: "Aqua Regia is formulated by mixing concentrated HNO₃ and concentrated HCl in a 1 : 3 volume ratio. The mixture generates nascent chlorine and nitrosyl chloride (NOCl) that react with noble metals such as gold (Au) to form soluble chlorauric acid [HAuCl₄]."
  },
  {
    question: "Which gas is the primary constituent of both Compressed Natural Gas (CNG) and Biogas (Gobar Gas)?",
    options: [
      "Propane (C₃H₈)",
      "Butane (C₄H₁₀)",
      "Methane (CH₄)",
      "Ethylene (C₂H₄)"
    ],
    correct: 2,
    explanation: "Methane (CH₄) constitutes over 85–90% of Compressed Natural Gas (CNG) and 55–70% of Biogas produced through anaerobic digestion of organic matter. In contrast, domestic LPG primarily consists of Liquefied Butane and Propane."
  }
];

let userAnswers = {};

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = quizData.map((q, qIdx) => `
    <div class="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5" id="question-${qIdx}">
      <div class="flex items-start gap-3">
        <span class="w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
          ${qIdx + 1}
        </span>
        <h4 class="text-sm font-semibold text-slate-100 leading-snug">
          ${q.question}
        </h4>
      </div>

      <div class="space-y-2 pl-9">
        ${q.options.map((opt, optIdx) => `
          <label class="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all text-xs text-slate-300 option-label-${qIdx}" id="label-${qIdx}-${optIdx}">
            <input type="radio" name="question-${qIdx}" value="${optIdx}" class="text-purple-500 focus:ring-purple-400 bg-slate-900 border-slate-700" onchange="selectOption(${qIdx}, ${optIdx})">
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>

      <div id="explanation-${qIdx}" class="hidden pl-9 pt-2">
        <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
          <div class="font-bold text-purple-400 flex items-center gap-1.5">
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

        label.classList.remove('border-purple-500', 'bg-purple-500/10', 'border-rose-500', 'bg-rose-500/10');

        if (optIdx === q.correct) {
          label.classList.add('border-purple-500', 'bg-purple-500/10', 'text-purple-300');
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
        <div class="p-4 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/10 to-slate-900 border border-purple-500/30 text-center space-y-1">
          <h3 class="text-base font-bold text-purple-300">You Scored ${score} / ${quizData.length}</h3>
          <p class="text-xs text-slate-300">${score >= 4 ? 'Mastery of chemical formulas, ores, and periodic trends achieved!' : 'Review the detailed explanations above and revisit the core chemical salts and alloys.'}</p>
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
      searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">Search over 40+ chemical terms in Chapter 37...</p>';
      return;
    }

    const items = [
      { title: "Moseley's Periodic Law", desc: "Properties are periodic functions of atomic number (Z), 7 periods and 18 groups." },
      { title: "Periodic Trends", desc: "Atomic radius increases down group, decreases along period; electronegativity highest in Fluorine." },
      { title: "Plaster of Paris", desc: "Calcium sulfate hemihydrate (CaSO₄·½H₂O) made by heating gypsum to 373 K." },
      { title: "Aqua Regia (1:3)", desc: "1 part conc. HNO₃ to 3 parts conc. HCl; dissolves gold and platinum." },
      { title: "German Silver", desc: "Contains NO silver; alloy of 60% Copper, 20% Zinc, 20% Nickel." },
      { title: "Allotropes of Carbon", desc: "Diamond (sp3, hardest), Graphite (sp2, conducts electricity), Fullerenes (C60), Graphene." },
      { title: "LPG & Ethyl Mercaptan", desc: "Liquefied Butane + Propane; C₂H₅SH added for leak odor detection." },
      { title: "CNG & Biogas", desc: "Methane (CH₄) is primary constituent (>85% in CNG, 55-70% in Biogas)." },
      { title: "Vulcanization of Rubber", desc: "Heating natural rubber with sulfur to form cross-links (Goodyear 1839)." },
      { title: "Ores of Metals", desc: "Bauxite (Al), Haematite (Fe), Galena (Pb), Cinnabar (Hg), Pitchblende (U)." },
      { title: "pH Scale & Blood pH", desc: "Sorenson 1909; human blood pH maintained tightly at 7.35 to 7.45." },
      { title: "Radioisotopes in Medicine", desc: "Cobalt-60 for cancer radiotherapy; Iodine-131 for thyroid disorders." }
    ];

    const matched = items.filter(it => it.title.toLowerCase().includes(query) || it.desc.toLowerCase().includes(query));

    if (matched.length === 0) {
      searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">No matching topics found.</p>';
    } else {
      searchResults.innerHTML = matched.map(m => `
        <div class="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-purple-500/30 transition-all">
          <h5 class="text-xs font-bold text-purple-300">${m.title}</h5>
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
