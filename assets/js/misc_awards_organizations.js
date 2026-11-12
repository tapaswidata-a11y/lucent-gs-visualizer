/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 41: Miscellaneous - Major Awards & International Organizations
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
    front: "When was Bharat Ratna instituted and who were its three inaugural recipients in 1954?",
    back: "Instituted on 2nd January 1954 by President Rajendra Prasad. Inaugural recipients: C. Rajagopalachari (last Governor-General), Dr. Sarvepalli Radhakrishnan (first VP), and Dr. C.V. Raman (Nobel physicist)."
  },
  {
    front: "Which two non-Indian foreign citizens have been honored with the Bharat Ratna?",
    back: "Khan Abdul Ghaffar Khan ('Frontier Gandhi' of Pakistan, 1987) and Nelson Mandela (anti-apartheid leader of South Africa, 1990)."
  },
  {
    front: "What is India's highest wartime gallantry decoration and who was its first recipient?",
    back: "Param Vir Chakra (PVC). First awarded posthumously to Major Somnath Sharma of 4 Kumaon Regiment for supreme valor at Badgam, Kashmir on 3rd November 1947."
  },
  {
    front: "In which city is the Nobel Peace Prize awarded, and where are all other Nobel Prizes presented?",
    back: "Nobel Peace Prize is presented in Oslo, Norway. All other Nobel Prizes (Physics, Chemistry, Medicine, Literature, Economics) are presented in Stockholm, Sweden on December 10."
  },
  {
    front: "Who was the first recipient of the Rajiv Gandhi / Major Dhyan Chand Khel Ratna Award?",
    back: "Chess Grandmaster Viswanathan Anand in 1991–92 (first Indian Grandmaster, 1988)."
  },
  {
    front: "Who was the first recipient of the Jnanpith Award and in which language did they write?",
    back: "G. Sankara Kurup in 1965 for his Malayalam poetry collection 'Odakkuzhal' (The Bamboo Flute)."
  },
  {
    front: "What are the six official languages recognized by the United Nations?",
    back: "Arabic, Chinese, English, French, Russian, and Spanish."
  },
  {
    front: "Which of the six principal organs of the United Nations is NOT headquartered in New York City?",
    back: "The International Court of Justice (ICJ), which is headquartered at the Peace Palace in The Hague, Netherlands (composed of 15 judges elected for 9-year terms)."
  },
  {
    front: "What are the five permanent members (P5) of the UN Security Council holding veto power?",
    back: "United States, United Kingdom, France, Russian Federation, and People's Republic of China."
  },
  {
    front: "Where are the headquarters of UNESCO, WHO, FAO, and UNEP located?",
    back: "UNESCO: Paris, France; WHO: Geneva, Switzerland; FAO: Rome, Italy; UNEP: Nairobi, Kenya."
  },
  {
    front: "Who was the first Indian to receive the Ramon Magsaysay Award ('Asia's Nobel')?",
    back: "Acharya Vinoba Bhave in 1958 for Community Leadership, celebrated for launching the Bhoodan (Land Gift) Movement."
  },
  {
    front: "For which specific scientific discovery did Sir C.V. Raman receive the 1930 Nobel Prize in Physics?",
    back: "The Raman Effect (inelastic scattering of light by molecules, discovering that scattered light contains photons with altered wavelengths; celebrated as National Science Day on 28th February)."
  }
];

function renderFlashcards() {
  const container = document.getElementById('flashcardsContainer');
  if (!container) return;

  container.innerHTML = flashcardsData.map((card, idx) => `
    <div class="flashcard h-52 group [perspective:1000px] cursor-pointer" onclick="this.classList.toggle('flipped')">
      <div class="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg group-hover:border-amber-500/40">
        
        <!-- Front -->
        <div class="absolute inset-0 p-4 flex flex-col justify-between [backface-visibility:hidden]">
          <div class="flex items-center justify-between text-[11px] font-mono text-amber-400">
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
        <div class="absolute inset-0 p-4 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 rounded-2xl border border-amber-500/30">
          <div class="flex items-center justify-between text-[11px] font-mono text-amber-400">
            <span>ANSWER #${String(idx + 1).padStart(2, '0')}</span>
            <span class="text-slate-400 flex items-center gap-1"><i data-lucide="check" class="w-3 h-3 text-amber-400"></i> Memorized</span>
          </div>
          <div class="text-xs text-slate-200 text-center px-1 leading-relaxed my-auto font-light">
            ${card.back}
          </div>
          <div class="text-[10px] text-amber-400 text-center font-mono">
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
    question: "Which of the following non-citizens of India was the FIRST foreigner to be conferred with the highest civilian honor, the Bharat Ratna?",
    options: [
      "Mother Teresa",
      "Nelson Mandela",
      "Khan Abdul Ghaffar Khan",
      "Dr. Martin Luther King Jr."
    ],
    correct: 2,
    explanation: "Khan Abdul Ghaffar Khan (the 'Frontier Gandhi' of Pakistan) was awarded the Bharat Ratna in 1987, becoming the first foreign citizen to receive it. Nelson Mandela was conferred the honor later in 1990. (Mother Teresa became an Indian naturalized citizen in 1948 before receiving the award in 1980)."
  },
  {
    question: "The Nobel Peace Prize is awarded annually in which city, distinct from the other five Nobel Prizes?",
    options: [
      "Stockholm, Sweden",
      "Oslo, Norway",
      "Geneva, Switzerland",
      "The Hague, Netherlands"
    ],
    correct: 1,
    explanation: "According to the 1895 will of Alfred Nobel, the Nobel Peace Prize is adjudicated by the Norwegian Nobel Committee and awarded in Oslo, Norway. The other five prizes (Physics, Chemistry, Medicine, Literature, and Economic Sciences) are presented in Stockholm, Sweden."
  },
  {
    question: "The International Court of Justice (ICJ), the principal judicial organ of the United Nations, is permanently seated in:",
    options: [
      "Geneva, Switzerland",
      "Vienna, Austria",
      "The Hague, Netherlands",
      "New York, USA"
    ],
    correct: 2,
    explanation: "The ICJ is the only one of the six principal UN organs not located in New York City. It sits at the Peace Palace in The Hague, Netherlands, and consists of a bench of 15 judges elected to 9-year terms by the General Assembly and Security Council."
  },
  {
    question: "Who was the first recipient of India's highest military decoration for wartime valor, the Param Vir Chakra (PVC)?",
    options: [
      "Major Somnath Sharma",
      "Company Havildar Major Piru Singh",
      "Subedar Major Bana Singh",
      "Captain Vikram Batra"
    ],
    correct: 0,
    explanation: "Major Somnath Sharma of the 4th Battalion, Kumaon Regiment, was posthumously awarded the first Param Vir Chakra for his legendary stand defending the Srinagar airfield against tribal invaders at Badgam on 3 November 1947."
  },
  {
    question: "Where are the headquarters of the United Nations Educational, Scientific and Cultural Organization (UNESCO) situated?",
    options: [
      "Geneva, Switzerland",
      "Paris, France",
      "London, United Kingdom",
      "Rome, Italy"
    ],
    correct: 1,
    explanation: "UNESCO, established on 16 November 1945 to promote international collaboration in education, science, culture, and World Heritage Site preservation, has its global headquarters located in Paris, France."
  }
];

let userAnswers = {};

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = quizData.map((q, qIdx) => `
    <div class="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5" id="question-${qIdx}">
      <div class="flex items-start gap-3">
        <span class="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
          ${qIdx + 1}
        </span>
        <h4 class="text-sm font-semibold text-slate-100 leading-snug">
          ${q.question}
        </h4>
      </div>

      <div class="space-y-2 pl-9">
        ${q.options.map((opt, optIdx) => `
          <label class="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all text-xs text-slate-300 option-label-${qIdx}" id="label-${qIdx}-${optIdx}">
            <input type="radio" name="question-${qIdx}" value="${optIdx}" class="text-amber-500 focus:ring-amber-400 bg-slate-900 border-slate-700" onchange="selectOption(${qIdx}, ${optIdx})">
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>

      <div id="explanation-${qIdx}" class="hidden pl-9 pt-2">
        <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
          <div class="font-bold text-amber-400 flex items-center gap-1.5">
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

        label.classList.remove('border-amber-500', 'bg-amber-500/10', 'border-rose-500', 'bg-rose-500/10');

        if (optIdx === q.correct) {
          label.classList.add('border-amber-500', 'bg-amber-500/10', 'text-amber-300');
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
        <div class="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-slate-900 border border-amber-500/30 text-center space-y-1">
          <h3 class="text-base font-bold text-amber-300">You Scored ${score} / ${quizData.length}</h3>
          <p class="text-xs text-slate-300">${score >= 4 ? 'Distinguished mastery of civil/military awards and United Nations bodies!' : 'Review the explanations above and revisit the headquarters locations.'}</p>
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
      searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">Search over 40+ awards & international organizations in Chapter 41...</p>';
      return;
    }

    const items = [
      { title: "Bharat Ratna", desc: "Highest civilian award est. 1954; 3 inaugural awardees; non-citizens Khan Abdul Ghaffar Khan & Mandela." },
      { title: "Nobel Prizes (Oslo vs Stockholm)", desc: "Peace in Oslo; Physics, Chem, Med, Lit, Econ in Stockholm; Tagore, Raman, Sen." },
      { title: "Param Vir Chakra (PVC)", desc: "Highest wartime gallantry award; Major Somnath Sharma in 1947 Badgam." },
      { title: "United Nations Organs", desc: "Est. 24 Oct 1945; 6 organs; ICJ in The Hague, Netherlands; UNSC P5 veto powers." },
      { title: "UN Specialized Agencies", desc: "UNESCO (Paris), WHO (Geneva), FAO (Rome), UNEP (Nairobi), ILO (Geneva)." },
      { title: "Khel Ratna & Arjuna Award", desc: "Major Dhyan Chand Khel Ratna first to Viswanathan Anand (1991-92)." },
      { title: "Jnanpith Award", desc: "Highest literary award in India est. 1961; first to G. Sankara Kurup (1965)." },
      { title: "Ramon Magsaysay Award", desc: "Asia's Nobel Prize; first recipient Acharya Vinoba Bhave (1958)." }
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
}

// INITIALIZE ON LOAD
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderFlashcards();
  renderQuiz();
  lucide.createIcons();
});
