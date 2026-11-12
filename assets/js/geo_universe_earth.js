/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 21: Geography - The Universe, Solar System & The Earth
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
  titleEl.textContent = title || 'Astronomical Reference';
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
    if (lightboxImg) lightboxImg.style.cursor = currentZoom > 1 ? 'grab' : 'default';
  });

  lightboxImg.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0 && currentZoom < 4) {
      currentZoom += 0.2;
    } else if (e.deltaY > 0 && currentZoom > 0.6) {
      currentZoom -= 0.2;
    }
    updateImageTransform();
  });
}

document.getElementById('imageLightbox')?.addEventListener('click', (e) => {
  if (e.target.id === 'imageLightbox') closeLightbox();
});

document.querySelectorAll('.expandable-image').forEach(container => {
  container.addEventListener('click', () => {
    const img = container.querySelector('img');
    const title = container.getAttribute('data-title') || img?.alt || 'Astronomical Image';
    const caption = container.getAttribute('data-caption') || '';
    if (img) openLightbox(img.src, title, caption);
  });
});

// --- FLASHCARDS DATA (UNIVERSE, SOLAR SYSTEM & EARTH) ---
const cardsData = [
  {
    q: "What is the Big Bang Theory and who formulated it?",
    a: "The Big Bang Theory explains the origin of the universe from a singular dense point (primeval atom) approximately 13.8 billion years ago. Formulated by Belgian astronomer <strong>Georges Lemaître</strong> in 1927 and later substantiated by Edwin Hubble's discovery of the expanding universe (Hubble's Law) and Cosmic Microwave Background Radiation (CMBR)."
  },
  {
    q: "What are the astronomical units of distance: Light Year, Astronomical Unit (AU), and Parsec?",
    a: "• <strong>Light Year:</strong> Distance light travels in one Julian year = $9.46 \\times 10^{12}\\text{ km}$ ($9.46 \\times 10^{15}\\text{ m}$).<br>• <strong>Astronomical Unit (AU):</strong> Mean distance between Earth and Sun = $1.496 \\times 10^{8}\\text{ km}$ (~150 million km).<br>• <strong>Parsec (Parallax Second):</strong> Largest astronomical unit = $3.26\\text{ light years} = 3.0857 \\times 10^{13}\\text{ km}$."
  },
  {
    q: "Which planets in our solar system exhibit retrograde (clockwise) rotation?",
    a: "<strong>Venus</strong> and <strong>Uranus</strong> rotate clockwise from East to West on their axes (retrograde rotation), unlike the Earth and other planets which rotate from West to East (counter-clockwise)."
  },
  {
    q: "Why is Venus called 'Earth's Twin' and the hottest planet?",
    a: "Venus is nearly identical to Earth in size, mass, and density. It is the hottest planet in the solar system (surface temperature ~465°C) due to a runaway greenhouse effect caused by a dense atmosphere containing over <strong>96% Carbon Dioxide (CO₂)</strong> with clouds of sulphuric acid."
  },
  {
    q: "What is the Asteroid Belt and where is it located?",
    a: "The Asteroid Belt is a ring of rocky debris and minor planets orbiting the Sun between the orbits of <strong>Mars and Jupiter</strong>. Ceres is the largest asteroid in this belt (classified as a dwarf planet)."
  },
  {
    q: "Distinguish between Perihelion and Aphelion.",
    a: "• <strong>Perihelion:</strong> The point in Earth's elliptical orbit where it is closest to the Sun (~147 million km). Occurs around <strong>January 3</strong>.<br>• <strong>Aphelion:</strong> The point where Earth is farthest from the Sun (~152 million km). Occurs around <strong>July 4</strong>."
  },
  {
    q: "What are the Summer Solstice, Winter Solstice, and Equinoxes?",
    a: "• <strong>Summer Solstice (June 21):</strong> Sun is vertically overhead at the <em>Tropic of Cancer (23.5° N)</em>. Longest day in the Northern Hemisphere.<br>• <strong>Winter Solstice (December 22):</strong> Sun is vertically overhead at the <em>Tropic of Capricorn (23.5° S)</em>. Longest night in the Northern Hemisphere.<br>• <strong>Equinoxes (March 21 & Sept 23):</strong> Sun overhead at the Equator; days and nights are equal (12 hours each) worldwide."
  },
  {
    q: "What is the Indian Standard Time (IST) and which meridian is it based on?",
    a: "Indian Standard Time is based on the <strong>82°30' E (82.5° E)</strong> longitude passing through <strong>Mirzapur</strong> (near Prayagraj, Uttar Pradesh). IST is exactly <strong>5 hours and 30 minutes ahead of Greenwich Mean Time (GMT +5:30)</strong>."
  },
  {
    q: "What is the International Date Line (IDL) and why does it zig-zag?",
    a: "The IDL approximately follows the <strong>180° meridian</strong> through the Pacific Ocean. Crossing it westwards adds a day; crossing eastwards subtracts a day. It deviates (zig-zags) through the Bering Strait, Fiji, Tonga, and Kiribati to keep unified calendar dates within individual island nations and territories."
  },
  {
    q: "Describe the three concentric layers of Earth's interior (Crust, Mantle, Core).",
    a: "• <strong>Crust:</strong> Outermost solid layer (5–70 km). Continental crust is granitic/<strong>SIAL</strong> (Silica + Aluminium); Oceanic crust is basaltic/<strong>SIMA</strong> (Silica + Magnesium).<br>• <strong>Mantle:</strong> Extends to 2,900 km depth. Composed of dense silicate rocks. Upper part includes the semi-fluid <em>Asthenosphere</em>.<br>• <strong>Core (Barysphere):</strong> Extends from 2,900 km to center (6,371 km). Composed of <strong>NIFE</strong> (Nickel + Iron). Liquid outer core generates Earth's magnetic dynamo; solid inner core."
  },
  {
    q: "List the 5 major seismic boundary discontinuities of Earth's interior.",
    a: "1. <strong>Conrad:</strong> Boundary between Upper Crust and Lower Crust.<br>2. <strong>Mohorovičić (Moho):</strong> Boundary between Crust and Mantle.<br>3. <strong>Repetti:</strong> Boundary between Upper Mantle and Lower Mantle.<br>4. <strong>Gutenberg:</strong> Boundary between Lower Mantle and Outer Core.<br>5. <strong>Lehmann:</strong> Boundary between Liquid Outer Core and Solid Inner Core."
  },
  {
    q: "What is the difference between a Solar Eclipse and a Lunar Eclipse?",
    a: "• <strong>Solar Eclipse:</strong> Occurs on a <em>New Moon</em> day when the <strong>Moon passes between the Sun and Earth</strong> (Sun – Moon – Earth), casting its shadow on Earth.<br>• <strong>Lunar Eclipse:</strong> Occurs on a <em>Full Moon</em> night when the <strong>Earth passes between the Sun and Moon</strong> (Sun – Earth – Moon), casting Earth's shadow across the lunar surface."
  }
];

let currentCardIndex = 0;
let isFlipped = false;

function renderCard() {
  const questionEl = document.getElementById('cardQuestion');
  const answerEl = document.getElementById('cardAnswer');
  const counterEl = document.getElementById('cardCounter');
  const flashcard = document.getElementById('flashcard');

  if (!questionEl || !answerEl || !counterEl || !flashcard) return;

  flashcard.classList.remove('flipped');
  isFlipped = false;

  const card = cardsData[currentCardIndex];
  questionEl.innerHTML = card.q;
  answerEl.innerHTML = card.a;
  counterEl.textContent = `${currentCardIndex + 1} / ${cardsData.length}`;
}

document.getElementById('flashcard')?.addEventListener('click', () => {
  const flashcard = document.getElementById('flashcard');
  if (flashcard) {
    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
  }
});

document.getElementById('prevCard')?.addEventListener('click', () => {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    renderCard();
  }
});

document.getElementById('nextCard')?.addEventListener('click', () => {
  if (currentCardIndex < cardsData.length - 1) {
    currentCardIndex++;
    renderCard();
  }
});

// --- MOCK QUIZ DATA (5 HIGH-YIELD QUESTIONS) ---
const quizQuestions = [
  {
    question: "Which seismic discontinuity forms the transition boundary between Earth's Mantle and the Outer Core?",
    options: [
      "Mohorovičić Discontinuity",
      "Gutenberg Discontinuity",
      "Conrad Discontinuity",
      "Lehmann Discontinuity"
    ],
    correct: 1,
    explanation: "The Gutenberg Discontinuity, located at a depth of approximately 2,900 km, marks the sharp boundary where the solid rocky lower mantle gives way to the liquid iron-nickel outer core."
  },
  {
    question: "If the local time at Greenwich (0° longitude) is 12:00 Noon, what will be the Indian Standard Time (IST)?",
    options: [
      "5:00 PM",
      "5:30 PM",
      "6:00 PM",
      "6:30 PM"
    ],
    correct: 1,
    explanation: "Indian Standard Time is calculated based on 82°30' E meridian. Since 1° longitude equals 4 minutes, 82.5° × 4 min = 330 minutes = 5 hours 30 minutes ahead of GMT. Thus, 12:00 Noon + 5h 30m = 5:30 PM."
  },
  {
    question: "Which of the following planets in our solar system has the shortest rotation period (fastest day)?",
    options: [
      "Mercury",
      "Jupiter",
      "Earth",
      "Saturn"
    ],
    correct: 1,
    explanation: "Jupiter has the fastest rotation of all planets in our solar system, completing one full rotation on its axis in only about 9 hours and 55 minutes."
  },
  {
    question: "On which date does the Earth reach its closest position to the Sun (Perihelion)?",
    options: [
      "January 3",
      "March 21",
      "July 4",
      "December 22"
    ],
    correct: 0,
    explanation: "Perihelion occurs around January 3 each year when Earth is approximately 147 million kilometers from the Sun. Aphelion occurs around July 4 when Earth is 152 million kilometers away."
  },
  {
    question: "The phenomenon of 'Mid-Night Sun' is observed during the summer months in which region?",
    options: [
      "Equatorial belt",
      "Tropical regions",
      "Arctic and Antarctic Circles",
      "Mediterranean basin"
    ],
    correct: 2,
    explanation: "The Midnight Sun occurs in areas north of the Arctic Circle (66.5° N) and south of the Antarctic Circle (66.5° S) around the solstices, where the sun remains continuously above the horizon for 24 hours."
  }
];

let userAnswers = {};

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = '';
  quizQuestions.forEach((q, idx) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-lg';

    let optionsHtml = '';
    q.options.forEach((opt, oIdx) => {
      const isSelected = userAnswers[idx] === oIdx;
      optionsHtml += `
        <label class="flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
          isSelected 
            ? 'border-amber-500 bg-amber-500/10 text-amber-200' 
            : 'border-slate-800 hover:border-slate-700 bg-slate-800/40 text-slate-300'
        }">
          <input type="radio" name="quiz_q_${idx}" value="${oIdx}" class="w-4 h-4 text-amber-500 focus:ring-amber-400" ${
            isSelected ? 'checked' : ''
          } onchange="handleAnswerSelect(${idx}, ${oIdx})">
          <span class="text-sm font-medium">${opt}</span>
        </label>
      `;
    });

    qDiv.innerHTML = `
      <div class="flex items-start justify-between gap-4 mb-4">
        <h4 class="text-base font-semibold text-slate-100"><span class="text-amber-400 mr-2">Q${idx + 1}.</span>${q.question}</h4>
      </div>
      <div class="space-y-2 mb-4">
        ${optionsHtml}
      </div>
      <div id="quizResult_${idx}" class="hidden mt-3 p-4 rounded-xl text-sm leading-relaxed"></div>
    `;

    container.appendChild(qDiv);
  });
}

window.handleAnswerSelect = function(qIdx, oIdx) {
  userAnswers[qIdx] = oIdx;
  renderQuiz();
};

document.getElementById('submitQuizBtn')?.addEventListener('click', () => {
  let score = 0;
  quizQuestions.forEach((q, idx) => {
    const resDiv = document.getElementById(`quizResult_${idx}`);
    if (!resDiv) return;

    resDiv.classList.remove('hidden', 'bg-emerald-500/10', 'border-emerald-500/30', 'text-emerald-200', 'bg-rose-500/10', 'border-rose-500/30', 'text-rose-200');

    if (userAnswers[idx] === q.correct) {
      score++;
      resDiv.className = 'mt-3 p-4 rounded-xl text-sm leading-relaxed border bg-emerald-500/10 border-emerald-500/30 text-emerald-200';
      resDiv.innerHTML = `<strong>✓ Correct!</strong> ${q.explanation}`;
    } else {
      resDiv.className = 'mt-3 p-4 rounded-xl text-sm leading-relaxed border bg-rose-500/10 border-rose-500/30 text-rose-200';
      const chosen = userAnswers[idx] !== undefined ? q.options[userAnswers[idx]] : 'None';
      resDiv.innerHTML = `<strong>✗ Incorrect.</strong> You selected: <em>${chosen}</em>.<br>Correct answer: <strong>${q.options[q.correct]}</strong>.<br>${q.explanation}`;
    }
  });

  const scoreBanner = document.getElementById('quizScoreBanner');
  if (scoreBanner) {
    scoreBanner.innerHTML = `
      <div class="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
        <h3 class="text-2xl font-bold text-amber-300">Your Score: ${score} / ${quizQuestions.length}</h3>
        <p class="text-sm text-slate-300 mt-2">${score >= 4 ? 'Brilliant! You have mastered the Universe, Earth motions, and internal structure.' : 'Keep revising! Review the diagrams and summary tables above.'}</p>
      </div>
    `;
    scoreBanner.classList.remove('hidden');
    scoreBanner.scrollIntoView({ behavior: 'smooth' });
  }
});

document.getElementById('resetQuizBtn')?.addEventListener('click', () => {
  userAnswers = {};
  const scoreBanner = document.getElementById('quizScoreBanner');
  if (scoreBanner) scoreBanner.classList.add('hidden');
  renderQuiz();
});

// --- SEARCH MODAL FILTER ---
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchModal = document.getElementById('searchModal');

const searchableContent = [
  { title: "Big Bang Theory & Galaxies", anchor: "#universe-origin", text: "13.8 billion years, Georges Lemaître, expanding universe Hubble, Milky Way, Andromeda nearest galaxy." },
  { title: "Solar System: Sun & 8 Planets", anchor: "#solar-system", text: "Terrestrial inner planets, Jovian gas giants, Mercury 88 days, Venus twin hottest 96% CO2, Mars red Olympus Mons, Jupiter Ganymede, Saturn Titan." },
  { title: "Asteroids, Comets & Moon", anchor: "#celestial-bodies", text: "Asteroid belt between Mars and Jupiter, Ceres, Halley's comet 76 years, Moon Sea of Tranquility synchronous rotation." },
  { title: "Earth Motions: Rotation & Revolution", anchor: "#earth-motions", text: "23.5 degree tilt, West to East rotation 23h 56m, Coriolis effect, 365 days revolution, Perihelion Jan 3, Aphelion July 4." },
  { title: "Solstices, Equinoxes & Seasons", anchor: "#earth-motions", text: "Summer Solstice June 21 Tropic of Cancer, Winter Solstice Dec 22 Tropic of Capricorn, Equinoxes March 21 & Sept 23 equal day night." },
  { title: "Latitudes, Longitudes & Time Zones", anchor: "#lat-long-time", text: "1 degree latitude 111 km, 1 degree longitude 4 minutes, IST 82.5 E Mirzapur GMT +5:30, International Date Line 180 degrees." },
  { title: "Internal Structure: Crust, Mantle, Core", anchor: "#earth-interior", text: "SIAL continental, SIMA oceanic, Asthenosphere magma, NIFE liquid outer core dynamo, solid inner core." },
  { title: "Seismic Boundary Discontinuities", anchor: "#discontinuities", text: "Conrad upper-lower crust, Mohorovicic crust-mantle, Repetti upper-lower mantle, Gutenberg mantle-core, Lehmann outer-inner core." }
];

searchInput?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  if (!searchResults) return;

  if (query.length === 0) {
    searchResults.innerHTML = '<p class="text-slate-400 text-sm text-center py-6">Type keywords to search sections...</p>';
    return;
  }

  const filtered = searchableContent.filter(item => 
    item.title.toLowerCase().includes(query) || item.text.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    searchResults.innerHTML = '<p class="text-slate-400 text-sm text-center py-6">No matching sections found.</p>';
    return;
  }

  searchResults.innerHTML = filtered.map(item => `
    <a href="${item.anchor}" onclick="closeSearchModal()" class="block p-4 rounded-xl bg-slate-800/40 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/30 transition-all">
      <h5 class="text-sm font-semibold text-amber-400">${item.title}</h5>
      <p class="text-xs text-slate-300 mt-1">${item.text}</p>
    </a>
  `).join('');
});

window.openSearchModal = function() {
  if (searchModal) {
    searchModal.classList.remove('hidden');
    searchModal.classList.add('flex');
    searchInput?.focus();
  }
};

window.closeSearchModal = function() {
  if (searchModal) {
    searchModal.classList.add('hidden');
    searchModal.classList.remove('flex');
  }
};

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeSearchModal();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    openSearchModal();
  }
});

document.getElementById('chapterDropdown')?.addEventListener('change', (e) => {
  const target = e.target.value;
  if (target) window.location.href = target;
});

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderCard();
  renderQuiz();
  lucide.createIcons();
});
