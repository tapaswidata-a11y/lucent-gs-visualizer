/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 38: Biology - Botany & Ecology
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
    front: "From which source molecule is Oxygen (O₂) released during plant photosynthesis?",
    back: "Exclusively from the photolysis of Water (H₂O), NOT from Carbon Dioxide (CO₂), as demonstrated experimentally by Ruben, Kamen, and Van Niel using the oxygen-18 (¹⁸O) radioisotope."
  },
  {
    front: "Which metallic element is present at the center of the Chlorophyll molecule?",
    back: "Magnesium (Mg²⁺), held coordinately within the central porphyrin ring structure of chlorophyll."
  },
  {
    front: "In which colors of the visible light spectrum is the rate of photosynthesis highest and lowest?",
    back: "Rate of photosynthesis is maximum in Red light, high in Blue light, and minimum / virtually zero in Green light (green light is largely reflected by chlorophyll)."
  },
  {
    front: "Which plant hormone is exclusively in gaseous form and what is its primary function?",
    back: "Ethylene (C₂H₄): Promotes the natural ripening of fruits, leaf abscission, and senescence. (In commercial artificial ripening, Calcium Carbide generates acetylene gas)."
  },
  {
    front: "What is an Apple classified as botanically, and why is it termed a 'False Fruit' (Pseudocarp)?",
    back: "A False Fruit (Pseudocarp): Because the edible fleshy part of an apple develops from the floral Thalamus (receptacle), rather than exclusively from the ovary."
  },
  {
    front: "What are Lichens and why are they considered excellent bio-indicators of environmental pollution?",
    back: "Symbiotic mutualistic association between an Alga (phycobiont - produces food) and a Fungus (mycobiont - provides water/shelter). Lichens are extremely sensitive to Sulfur Dioxide (SO₂) air pollution and cannot grow in polluted urban areas."
  },
  {
    front: "Differentiate between the transport functions of Xylem and Phloem.",
    back: "Xylem: Transports water and dissolved minerals unidirectionally upwards from roots to leaves. Phloem: Translocates synthesized soluble organic sugars (photosynthates) bidirectionally from source (leaves) to sinks (roots, fruits)."
  },
  {
    front: "Which plant hormone is known as the 'Stress Hormone' and what does it do during drought?",
    back: "Abscisic Acid (ABA): Induces rapid closure of stomata during water stress to prevent transpiration water loss, and maintains seed dormancy."
  },
  {
    front: "State Raymond Lindeman's 10% Law of Energy Transfer in ecosystems.",
    back: "Only approximately 10% of the net energy entering one trophic level is transferred and incorporated into the next higher trophic level; ~90% is dissipated as metabolic respiration heat."
  },
  {
    front: "Why is the Ecological Pyramid of Biomass in an aquatic (ocean/pond) ecosystem inverted?",
    back: "Because phytoplankton (primary producers) have an exceptionally rapid turnover rate and short lifespan; their standing crop biomass at any single moment is much lower than the biomass of longer-lived zooplankton and predatory fish."
  },
  {
    front: "What is Biomagnification and which chemical pesticide is a classic example?",
    back: "The progressive accumulation and concentration increase of a non-biodegradable toxic substance (e.g., DDT or Methylmercury) at each successive trophic level along the food chain."
  },
  {
    front: "Why is Bryophyta called the 'Amphibians of the Plant Kingdom'?",
    back: "Because bryophytes live on damp terrestrial soil but require external water for sexual reproduction (flagellated antherozoids must swim through water to fertilize the archegonium)."
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
            Lucent GK Botany High-Yield
          </div>
        </div>

      </div>
    </div>
  `).join('');
}

// --- HIGH-YIELD PRELIMS QUIZ (5 Multiple-Choice Questions) ---
const quizData = [
  {
    question: "During oxygenic photosynthesis in green plants, the oxygen gas (O₂) released into the atmosphere is derived from:",
    options: [
      "Carbon dioxide (CO₂)",
      "Water (H₂O)",
      "Ribulose bisphosphate (RuBP)",
      "Glucose (C₆H₁₂O₆)"
    ],
    correct: 1,
    explanation: "Oxygen released during photosynthesis originates exclusively from the light-dependent splitting (photolysis) of water molecules (2H₂O → 4H⁺ + 4e⁻ + O₂) within the thylakoid lumen of chloroplasts, as verified by isotopic tracing with ¹⁸O."
  },
  {
    question: "Which of the following plant hormones is synthesized in a gaseous state and regulates the natural ripening of fruits?",
    options: [
      "Indole-3-acetic acid (Auxin)",
      "Gibberellic acid (GA)",
      "Ethylene",
      "Abscisic acid (ABA)"
    ],
    correct: 2,
    explanation: "Ethylene is the only naturally occurring gaseous plant hormone. It stimulates fruit ripening, breaking of dormancy, and organ senescence. Calcium carbide, which generates acetylene gas upon contact with moisture, is frequently used for illegal artificial fruit ripening."
  },
  {
    question: "In an aquatic ecosystem (such as a pond or open ocean), the Ecological Pyramid of Biomass is typically:",
    options: [
      "Always strictly upright",
      "Inverted",
      "Spindle-shaped",
      "Bell-shaped"
    ],
    correct: 1,
    explanation: "In aquatic environments, primary producers (microscopic phytoplankton) have a very small standing biomass at any given time due to their short lifespans and rapid turnover, whereas consumers (zooplankton and fish) are larger and live longer. Hence, the pyramid of biomass is inverted."
  },
  {
    question: "Lichens represent a mutualistic symbiotic association between which two organisms, and are sensitive indicators of which pollutant?",
    options: [
      "Bacteria and Fungi; Carbon Monoxide (CO)",
      "Algae and Fungi; Sulfur Dioxide (SO₂)",
      "Algae and Bryophytes; Nitrogen Dioxide (NO₂)",
      "Fungi and Higher Plant Roots; Ozone (O₃)"
    ],
    correct: 1,
    explanation: "Lichens consist of an algal partner (phycobiont) and a fungal partner (mycobiont). Because they absorb nutrients directly from the air and lack a protective cuticle, they are acutely poisoned by sulfur dioxide (SO₂) pollution and serve as bio-indicators of clean air."
  },
  {
    question: "The edible part of an Apple develops from which floral structure, making it a classic 'False Fruit' (Pseudocarp)?",
    options: [
      "Enlarged Ovary wall",
      "Fleshy Thalamus (Receptacle)",
      "Fused Calyx and Corolla",
      "Cotyledons"
    ],
    correct: 1,
    explanation: "A true fruit develops exclusively from the fertilized ovary. In an apple, pear, and strawberry, the edible flesh is derived from the enlarged, fleshy thalamus (receptacle) that surrounds the core ovary, classifying them as false fruits (pseudocarps)."
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
          <p class="text-xs text-slate-300">${score >= 4 ? 'Exceptional command of botany physiology and ecological principles!' : 'Review the detailed explanations above and revisit plant hormones and pyramids.'}</p>
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
      searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">Search over 40+ botanical and ecological terms in Chapter 38...</p>';
      return;
    }

    const items = [
      { title: "Photosynthesis (Water Splitting)", desc: "Oxygen comes from photolysis of H₂O; Magnesium is central ion in chlorophyll." },
      { title: "Plant Hormones (Auxin, Ethylene, ABA)", desc: "Auxin for elongation, Ethylene gaseous fruit ripening, ABA stress hormone." },
      { title: "Lichens & SO₂ Pollution", desc: "Algal-fungal mutualism; acute bio-indicators of sulfur dioxide pollution." },
      { title: "Xylem & Phloem", desc: "Xylem water upward unidirectional; Phloem organic food bidirectional translocation." },
      { title: "Bryophyta (Plant Amphibians)", desc: "Lack vascular bundles; require water for sexual antherozoid fertilization." },
      { title: "Lindeman's 10% Law", desc: "Only ~10% of net energy passes from one trophic level to the next." },
      { title: "Inverted Aquatic Biomass Pyramid", desc: "Phytoplankton standing crop is smaller than zooplankton and fish." },
      { title: "Biomagnification", desc: "Progressive toxicant accumulation across trophic levels (e.g., DDT and Mercury)." },
      { title: "Apple as False Fruit (Pseudocarp)", desc: "Edible flesh originates from floral thalamus, not ovary." },
      { title: "Modified Roots & Stems", desc: "Pneumatophores (Rhizophora), Rhizome (Ginger), Tuber (Potato eye buds)." }
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
