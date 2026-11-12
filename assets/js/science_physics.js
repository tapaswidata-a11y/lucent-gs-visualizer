/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 36: General Science - Physics
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
    front: "What is the largest unit of astronomical distance and its value in light years?",
    back: "Parsec (Parallactic Second). 1 Parsec = 3.26 Light Years = 3.08 × 10¹⁶ metres (distance at which an astronomical unit subtends an angle of one arcsecond)."
  },
  {
    front: "At what specific temperature do the Celsius and Fahrenheit scales read the exact same numerical value?",
    back: "-40 degrees (-40°C = -40°F), derived from the relationship: C/5 = (F - 32)/9."
  },
  {
    front: "What is the escape velocity from the surface of Earth and why does the Moon lack an atmosphere?",
    back: "Earth escape velocity: 11.2 km/s. Moon escape velocity: ~2.38 km/s, which is lower than the root-mean-square (RMS) thermal velocity of gas molecules, allowing all gases to escape."
  },
  {
    front: "What is the anomalous expansion of water and at what temperature is its density maximum?",
    back: "Water contracts when heated from 0°C to 4°C and expands when cooled from 4°C to 0°C. Water reaches its maximum density (and minimum volume) at 4°C, allowing aquatic life to survive below frozen lakes."
  },
  {
    front: "Explain the optical principle behind optical fibers, desert mirages, and the sparkle of diamonds.",
    back: "Total Internal Reflection (TIR): Occurs when light travels from an optically denser medium to a rarer medium at an angle of incidence greater than the critical angle (i > θc)."
  },
  {
    front: "Which corrective lenses are prescribed for Myopia and Hypermetropia?",
    back: "Myopia (near-sightedness, image forms in front of retina): Concave lens (diverging). Hypermetropia (far-sightedness, image behind retina): Convex lens (converging)."
  },
  {
    front: "What is the minimum distance required between a sound source and reflecting surface to hear a distinct echo?",
    back: "Approximately 17.2 metres (in air at 20°C, speed = 343 m/s), based on the human ear's persistence of hearing of 0.1 seconds (2d = v × t => d = 343 × 0.1 / 2 = 17.15 m)."
  },
  {
    front: "Why does the sky appear blue during the day and red during sunrise and sunset?",
    back: "Rayleigh Scattering: Intensity of scattered light is inversely proportional to the 4th power of wavelength (I ∝ 1/λ⁴). Blue (shorter λ) scatters most during day; red (longest λ) travels through thick atmosphere without scattering at twilight."
  },
  {
    front: "What are the orbital characteristics and altitude of a Geostationary satellite?",
    back: "Altitude: ~35,786 km (~36,000 km) above equator; Orbital Period: 24 hours (synchronous with Earth's rotation); Direction: West to East; Orbital plane: Equatorial."
  },
  {
    front: "What happens to the period of a simple pendulum clock in summer versus winter?",
    back: "Period T = 2π√(L/g). In summer, thermal expansion increases length (L), increasing time period (clock runs slow / loses time). In winter, length contracts (clock runs fast / gains time)."
  },
  {
    front: "What is 1 commercial unit of electrical energy (1 kWh) in Joules?",
    back: "1 Kilowatt-hour (kWh) = 1,000 Watts × 3,600 seconds = 3.6 × 10⁶ Joules (3.6 Megajoules)."
  },
  {
    front: "Differentiate between Fleming's Left-Hand Rule and Right-Hand Rule.",
    back: "Left-Hand Rule (Electric Motors): Used to find direction of magnetic Force (Thumb = Force, Forefinger = Field, Middle = Current). Right-Hand Rule (Generators): Used to find direction of Induced Current."
  }
];

function renderFlashcards() {
  const container = document.getElementById('flashcardsContainer');
  if (!container) return;

  container.innerHTML = flashcardsData.map((card, idx) => `
    <div class="flashcard h-52 group [perspective:1000px] cursor-pointer" onclick="this.classList.toggle('flipped')">
      <div class="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg group-hover:border-cyan-500/40">
        
        <!-- Front -->
        <div class="absolute inset-0 p-4 flex flex-col justify-between [backface-visibility:hidden]">
          <div class="flex items-center justify-between text-[11px] font-mono text-cyan-400">
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
        <div class="absolute inset-0 p-4 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 rounded-2xl border border-cyan-500/30">
          <div class="flex items-center justify-between text-[11px] font-mono text-cyan-400">
            <span>ANSWER #${String(idx + 1).padStart(2, '0')}</span>
            <span class="text-slate-400 flex items-center gap-1"><i data-lucide="check" class="w-3 h-3 text-cyan-400"></i> Memorized</span>
          </div>
          <div class="text-xs text-slate-200 text-center px-1 leading-relaxed my-auto font-light">
            ${card.back}
          </div>
          <div class="text-[10px] text-cyan-400 text-center font-mono">
            Lucent GK Physics High-Yield
          </div>
        </div>

      </div>
    </div>
  `).join('');
}

// --- HIGH-YIELD PRELIMS QUIZ (5 Multiple-Choice Questions) ---
const quizData = [
  {
    question: "When a person moves from the Earth's equator towards the North or South Pole, the value of acceleration due to gravity (g):",
    options: [
      "Decreases continuously",
      "Increases continuously",
      "Remains constant",
      "Becomes zero"
    ],
    correct: 1,
    explanation: "Because Earth is an oblate spheroid with flattened poles (polar radius is ~21 km smaller than equatorial radius) and centrifugal force due to Earth's rotation is zero at poles, the value of 'g' is maximum at the poles and minimum at the equator."
  },
  {
    question: "A person suffering from Myopia (near-sightedness) is unable to see distant objects clearly because the image of distant objects is formed:",
    options: [
      "Behind the retina",
      "In front of the retina",
      "On the blind spot",
      "On the cornea"
    ],
    correct: 1,
    explanation: "In myopia, the eye's refractive power is excessively strong or the eyeball is too elongated, causing parallel light rays from distant objects to converge in front of the retina. It is corrected using a Concave (diverging) lens."
  },
  {
    question: "Why does water in a lake begin to freeze from the top surface downwards rather than from the bottom upwards during severe winter?",
    options: [
      "Ice is a good conductor of heat",
      "Water has its maximum density at 4°C",
      "Surface water absorbs solar radiation",
      "Bottom water has higher salinity"
    ],
    correct: 1,
    explanation: "Due to anomalous expansion, cooling surface water becomes densest at 4°C and sinks to the bottom. Once all water reaches 4°C, water colder than 4°C becomes lighter and stays at the surface, freezing into ice at 0°C while water below remains liquid at 4°C."
  },
  {
    question: "An astronaut on the Moon fires a high-velocity rifle. An observer standing 100 metres away will:",
    options: [
      "Hear the gunshot immediately",
      "Hear the gunshot after a noticeable time delay",
      "Not hear the gunshot at all",
      "Hear an amplified gunshot due to lower gravity"
    ],
    correct: 2,
    explanation: "Sound is a mechanical longitudinal wave requiring a material medium (air, liquid, or solid) to propagate. Because the Moon has no atmosphere (vacuum), sound waves cannot travel, and no gunshot sound can be heard."
  },
  {
    question: "Which of the following optical phenomena is primarily responsible for the sparkling brilliance observed in a cut diamond?",
    options: [
      "Interference of light",
      "Diffraction of light",
      "Total Internal Reflection",
      "Polarization of light"
    ],
    correct: 2,
    explanation: "Diamond has a very high refractive index (~2.42) and an exceptionally small critical angle (~24.4°). Skilled jewelers cut diamond facets so that light entering the stone strikes internal surfaces at angles greater than 24.4°, undergoing multiple Total Internal Reflections before exiting."
  }
];

let userAnswers = {};

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = quizData.map((q, qIdx) => `
    <div class="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5" id="question-${qIdx}">
      <div class="flex items-start gap-3">
        <span class="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
          ${qIdx + 1}
        </span>
        <h4 class="text-sm font-semibold text-slate-100 leading-snug">
          ${q.question}
        </h4>
      </div>

      <div class="space-y-2 pl-9">
        ${q.options.map((opt, optIdx) => `
          <label class="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all text-xs text-slate-300 option-label-${qIdx}" id="label-${qIdx}-${optIdx}">
            <input type="radio" name="question-${qIdx}" value="${optIdx}" class="text-cyan-500 focus:ring-cyan-400 bg-slate-900 border-slate-700" onchange="selectOption(${qIdx}, ${optIdx})">
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>

      <div id="explanation-${qIdx}" class="hidden pl-9 pt-2">
        <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
          <div class="font-bold text-cyan-400 flex items-center gap-1.5">
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

        label.classList.remove('border-cyan-500', 'bg-cyan-500/10', 'border-rose-500', 'bg-rose-500/10');

        if (optIdx === q.correct) {
          label.classList.add('border-cyan-500', 'bg-cyan-500/10', 'text-cyan-300');
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
        <div class="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-slate-900 border border-cyan-500/30 text-center space-y-1">
          <h3 class="text-base font-bold text-cyan-300">You Scored ${score} / ${quizData.length}</h3>
          <p class="text-xs text-slate-300">${score >= 4 ? 'Superb conceptual mastery of Lucent GK Physics laws and formulas!' : 'Review the detailed explanations above and revisit the core physical principles.'}</p>
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
      searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">Search over 40+ physical concepts in Chapter 36...</p>';
      return;
    }

    const items = [
      { title: "Newton's Laws of Motion", desc: "1st Law (Inertia), 2nd Law (F=ma), 3rd Law (Action-Reaction & Momentum)." },
      { title: "Gravitation & 'g' variation", desc: "g=9.8 m/s²; maximum at poles, minimum at equator, zero at center of Earth." },
      { title: "Escape Velocity (11.2 km/s)", desc: "Minimum velocity to break free from Earth's gravitational pull." },
      { title: "Geostationary Satellite", desc: "Altitude 35,786 km, 24 hr period, west to east, equatorial plane orbit." },
      { title: "Anomalous Expansion of Water", desc: "Maximum density and minimum volume at 4°C, sustaining aquatic life." },
      { title: "Temperature Scales (-40°)", desc: "Celsius and Fahrenheit meet at -40°; Absolute Zero is 0 K (-273.15°C)." },
      { title: "Total Internal Reflection (TIR)", desc: "Critical angle, optical fibers, mirages in deserts, sparkling diamonds." },
      { title: "Myopia & Hypermetropia", desc: "Near-sightedness (concave lens) vs Far-sightedness (convex lens)." },
      { title: "Sound Waves & Echo", desc: "Longitudinal waves, 343 m/s in air, 17.2 m minimum distance for echo." },
      { title: "Doppler Effect", desc: "Frequency change due to relative motion of sound/light source and observer." },
      { title: "Fleming's Rules", desc: "Left-Hand for electric motor force; Right-Hand for induced generator current." },
      { title: "1 kWh in Joules", desc: "1 commercial unit of electricity = 3.6 × 10⁶ Joules." }
    ];

    const matched = items.filter(it => it.title.toLowerCase().includes(query) || it.desc.toLowerCase().includes(query));

    if (matched.length === 0) {
      searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">No matching topics found.</p>';
    } else {
      searchResults.innerHTML = matched.map(m => `
        <div class="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
          <h5 class="text-xs font-bold text-cyan-300">${m.title}</h5>
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
