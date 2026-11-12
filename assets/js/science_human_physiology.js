/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 39: Biology - Human Physiology & Health
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
    front: "Why are Mitochondria called the 'Powerhouse of the Cell' and what unique genetic feature do they possess?",
    back: "Mitochondria generate cellular energy in the form of ATP via aerobic Krebs cycle respiration. Uniquely, they possess their own circular DNA and 70S ribosomes (semi-autonomous endosymbiotic organelle)."
  },
  {
    front: "What is the lifespan of mature human Red Blood Cells (RBCs) and where is their cellular 'graveyard'?",
    back: "Lifespan: ~120 days. Graveyard and blood bank: The Spleen, which filters and breaks down aged, senescent erythrocytes."
  },
  {
    front: "Which blood group is the Universal Donor and which is the Universal Recipient?",
    back: "Universal Donor: O Negative (O−), because its RBCs lack A, B, and Rh antigens. Universal Recipient: AB Positive (AB+), because its plasma lacks anti-A, anti-B, and anti-Rh antibodies."
  },
  {
    front: "What anatomical structure functions as the natural primary pacemaker of the human heart?",
    back: "The Sinoatrial (SA) Node, located in the upper wall of the right atrium, which spontaneously generates electrical cardiac impulses."
  },
  {
    front: "Which metallic trace element is an essential structural component of Vitamin B12 (Cyanocobalamin)?",
    back: "Cobalt (Co). Deficiency of Vitamin B12 results in Pernicious Anemia and neurological degeneration."
  },
  {
    front: "What is the chemical composition of most human kidney stones (renal calculi)?",
    back: "Calcium Oxalate (CaC₂O₄), forming crystalline deposits in the renal calyces and ureters."
  },
  {
    front: "Which endocrine cells produce Insulin and what is the consequence of its deficiency?",
    back: "Beta (β) cells of the Islets of Langerhans in the Pancreas. Deficiency impairs glucose uptake, leading to Diabetes Mellitus (hyperglycemia)."
  },
  {
    front: "Differentiate between Diabetes Mellitus and Diabetes Insipidus.",
    back: "Diabetes Mellitus: Caused by deficiency of Insulin from pancreas (high blood sugar). Diabetes Insipidus: Caused by deficiency of Antidiuretic Hormone (ADH / Vasopressin) from posterior pituitary (excessive diluted urination without sugar)."
  },
  {
    front: "What causes Goiter and which endocrine gland does it affect?",
    back: "Deficiency of dietary Iodine impairs the synthesis of Thyroxine hormone, causing compensatory enlargement of the Thyroid Gland."
  },
  {
    front: "Which part of the human brain controls muscular balance, posture, and motor coordination?",
    back: "The Cerebellum (the 'little brain'), located below the cerebrum. Its functioning is notably depressed by alcohol consumption."
  },
  {
    front: "What are the classic deficiency diseases of Vitamin C and Vitamin D?",
    back: "Vitamin C (Ascorbic Acid) deficiency: Scurvy (bleeding gums, delayed wound healing). Vitamin D (Calciferol) deficiency: Rickets in children (soft bowlegs) and Osteomalacia in adults."
  },
  {
    front: "Which diagnostic blood test is used for detecting Typhoid and which for HIV/AIDS?",
    back: "Typhoid: Widal Test (detects antibodies against Salmonella enterica). HIV / AIDS: ELISA (Enzyme-Linked Immunosorbent Assay) for screening, confirmed by Western Blot."
  }
];

function renderFlashcards() {
  const container = document.getElementById('flashcardsContainer');
  if (!container) return;

  container.innerHTML = flashcardsData.map((card, idx) => `
    <div class="flashcard h-52 group [perspective:1000px] cursor-pointer" onclick="this.classList.toggle('flipped')">
      <div class="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg group-hover:border-rose-500/40">
        
        <!-- Front -->
        <div class="absolute inset-0 p-4 flex flex-col justify-between [backface-visibility:hidden]">
          <div class="flex items-center justify-between text-[11px] font-mono text-rose-400">
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
        <div class="absolute inset-0 p-4 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-950 rounded-2xl border border-rose-500/30">
          <div class="flex items-center justify-between text-[11px] font-mono text-rose-400">
            <span>ANSWER #${String(idx + 1).padStart(2, '0')}</span>
            <span class="text-slate-400 flex items-center gap-1"><i data-lucide="check" class="w-3 h-3 text-rose-400"></i> Memorized</span>
          </div>
          <div class="text-xs text-slate-200 text-center px-1 leading-relaxed my-auto font-light">
            ${card.back}
          </div>
          <div class="text-[10px] text-rose-400 text-center font-mono">
            Lucent GK Physiology High-Yield
          </div>
        </div>

      </div>
    </div>
  `).join('');
}

// --- HIGH-YIELD PRELIMS QUIZ (5 Multiple-Choice Questions) ---
const quizData = [
  {
    question: "Which of the following blood groups can safely be transfused to any patient in an emergency without prior cross-matching (Universal Red Cell Donor)?",
    options: [
      "O Rh-positive (O+)",
      "O Rh-negative (O−)",
      "AB Rh-positive (AB+)",
      "AB Rh-negative (AB−)"
    ],
    correct: 1,
    explanation: "O Rh-negative (O−) blood lacks A, B, and Rh(D) antigens on the surface of its erythrocytes, meaning the recipient's immune system will not produce agglutinating antibodies against the transfused cells, making it the universal RBC donor."
  },
  {
    question: "The essential metallic micronutrient present in the coordination sphere of Vitamin B12 (Cyanocobalamin) is:",
    options: [
      "Iron (Fe)",
      "Cobalt (Co)",
      "Zinc (Zn)",
      "Magnesium (Mg)"
    ],
    correct: 1,
    explanation: "Cobalt is the central metallic ion in Vitamin B12 (Cyanocobalamin). Its deficiency impairs erythrocyte maturation and DNA synthesis, resulting in Megaloblastic / Pernicious Anemia."
  },
  {
    question: "Which organelle inside the eukaryotic cell is equipped with acid hydrolase enzymes and colloquially designated as the 'Suicidal Bag'?",
    options: [
      "Ribosome",
      "Peroxisome",
      "Lysosome",
      "Golgi Apparatus"
    ],
    correct: 2,
    explanation: "Lysosomes (discovered by Christian de Duve) contain acidic hydrolytic enzymes capable of digesting cellular debris, foreign pathogens, and damaged organelles. When a cell undergoes autolysis or necrosis, lysosomes rupture and self-digest the cell, earning the moniker 'suicidal bags'."
  },
  {
    question: "Diabetes Insipidus is a metabolic disorder resulting from the deficiency or hyposecretion of which hormone?",
    options: [
      "Insulin",
      "Glucagon",
      "Antidiuretic Hormone (ADH / Vasopressin)",
      "Aldosterone"
    ],
    correct: 2,
    explanation: "Diabetes Insipidus occurs when the posterior pituitary gland secretes insufficient Antidiuretic Hormone (ADH / Vasopressin) or the kidneys fail to respond to ADH. This impairs water reabsorption in the nephron tubules, leading to extreme thirst and copious excretion of dilute urine (polyuria without glucose)."
  },
  {
    question: "The diagnostic serological procedure known as the 'Widal Test' is employed for confirming clinical infection by:",
    options: [
      "Mycobacterium tuberculosis",
      "Salmonella enterica serovar Typhi",
      "Vibrio cholerae",
      "Treponema pallidum"
    ],
    correct: 1,
    explanation: "The Widal test detects agglutinating antibodies against the O (somatic) and H (flagellar) antigens of Salmonella typhi, the bacterium responsible for enteric / typhoid fever."
  }
];

let userAnswers = {};

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = quizData.map((q, qIdx) => `
    <div class="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5" id="question-${qIdx}">
      <div class="flex items-start gap-3">
        <span class="w-6 h-6 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
          ${qIdx + 1}
        </span>
        <h4 class="text-sm font-semibold text-slate-100 leading-snug">
          ${q.question}
        </h4>
      </div>

      <div class="space-y-2 pl-9">
        ${q.options.map((opt, optIdx) => `
          <label class="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all text-xs text-slate-300 option-label-${qIdx}" id="label-${qIdx}-${optIdx}">
            <input type="radio" name="question-${qIdx}" value="${optIdx}" class="text-rose-500 focus:ring-rose-400 bg-slate-900 border-slate-700" onchange="selectOption(${qIdx}, ${optIdx})">
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>

      <div id="explanation-${qIdx}" class="hidden pl-9 pt-2">
        <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
          <div class="font-bold text-rose-400 flex items-center gap-1.5">
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

        label.classList.remove('border-rose-500', 'bg-rose-500/10', 'border-emerald-500', 'bg-emerald-500/10');

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
        <div class="p-4 rounded-2xl bg-gradient-to-r from-rose-500/20 via-pink-500/10 to-slate-900 border border-rose-500/30 text-center space-y-1">
          <h3 class="text-base font-bold text-rose-300">You Scored ${score} / ${quizData.length}</h3>
          <p class="text-xs text-slate-300">${score >= 4 ? 'Flawless recall of human organ systems, endocrine glands, and pathology!' : 'Review the detailed explanations above and revisit blood groups and vitamins.'}</p>
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
      searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">Search over 40+ physiological concepts in Chapter 39...</p>';
      return;
    }

    const items = [
      { title: "Mitochondria & ATP", desc: "Powerhouse of the cell, Krebs cycle, own circular DNA and 70S ribosomes." },
      { title: "RBCs & Spleen", desc: "Biconcave enucleated cells, 120-day lifespan, spleen is the graveyard of RBCs." },
      { title: "Universal Donor (O−) & Recipient (AB+)", desc: "Landsteiner ABO groups and Rh factor blood compatibility." },
      { title: "SA Node Cardiac Pacemaker", desc: "Spontaneous electrical impulse generator located in right atrium." },
      { title: "Vitamin B12 & Cobalt", desc: "Cyanocobalamin contains cobalt; deficiency causes pernicious anemia." },
      { title: "Insulin & Diabetes Mellitus", desc: "Pancreatic beta cells produce insulin; deficiency causes diabetes mellitus." },
      { title: "ADH & Diabetes Insipidus", desc: "Posterior pituitary hormone deficiency causes excessive diluted urination." },
      { title: "Goiter & Thyroid", desc: "Dietary iodine deficiency impairs thyroxine synthesis, enlarging thyroid." },
      { title: "Cerebellum Balance", desc: "Controls voluntary muscular coordination and posture; depressed by alcohol." },
      { title: "Vitamins C & D Deficiencies", desc: "Scurvy from vitamin C deficiency; Rickets in children from vitamin D deficiency." },
      { title: "Widal Test (Typhoid)", desc: "Serological diagnostic agglutination test for Salmonella typhi." },
      { title: "Kidney Nephron & Stones", desc: "Functional filtering unit; stones composed of calcium oxalate." }
    ];

    const matched = items.filter(it => it.title.toLowerCase().includes(query) || it.desc.toLowerCase().includes(query));

    if (matched.length === 0) {
      searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">No matching topics found.</p>';
    } else {
      searchResults.innerHTML = matched.map(m => `
        <div class="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-rose-500/30 transition-all">
          <h5 class="text-xs font-bold text-rose-300">${m.title}</h5>
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
