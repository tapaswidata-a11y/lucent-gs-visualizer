/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 22: Geomorphology, Climatology & Oceanography
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
  titleEl.textContent = title || 'Geographical Reference';
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
    const title = container.getAttribute('data-title') || img?.alt || 'Geographical Reference';
    const caption = container.getAttribute('data-caption') || '';
    if (img) openLightbox(img.src, title, caption);
  });
});

// --- FLASHCARDS DATA (GEOMORPHOLOGY, CLIMATOLOGY & OCEANS) ---
const cardsData = [
  {
    q: "How are the three major rock types classified and what are their typical examples?",
    a: "• <strong>Igneous:</strong> Primary rocks formed by cooling and solidification of molten magma/lava. Plutonic (Granite, Gabbro) vs Volcanic (Basalt, Pumice).<br>• <strong>Sedimentary:</strong> Formed by deposition of strata/sediments. Mechanically formed (Sandstone, Shale), Organically formed (Limestone, Coal), Chemically formed (Rock salt, Gypsum). Contains fossils.<br>• <strong>Metamorphic:</strong> Formed under thermal/dynamic metamorphism. Examples: Granite → Gneiss; Shale → Slate; Sandstone → Quartzite; Limestone → Marble."
  },
  {
    q: "What are P-waves, S-waves, and L-waves during an earthquake?",
    a: "• <strong>P-waves (Primary):</strong> Longitudinal/compressional; fastest; travel through solids, liquids, and gases.<br>• <strong>S-waves (Secondary):</strong> Transverse/shear; slower than P-waves; travel <em>only through solids</em> (cannot penetrate liquid outer core, producing an S-wave shadow zone beyond 105°).<br>• <strong>L-waves (Surface / Rayleigh & Love):</strong> Slowest; travel along Earth's surface; cause the most catastrophic destruction."
  },
  {
    q: "Why is Mount Stromboli called the 'Lighthouse of the Mediterranean'?",
    a: "Mount Stromboli is an active volcano situated in the Aeolian Islands of the Tyrrhenian Sea, Italy. It has been erupting almost continuously for over 2,000 years with dramatic incandescent gas and lava explosions visible from great distances at night, earning it the epithet <em>'Lighthouse of the Mediterranean'</em>."
  },
  {
    q: "Describe the thermal structure and characteristics of the 5 atmospheric layers.",
    a: "1. <strong>Troposphere (0–18 km):</strong> All weather occurs here; temperature drops with height at Normal Lapse Rate (<strong>6.5°C per 1,000 m</strong>).<br>2. <strong>Stratosphere (18–50 km):</strong> Temperature rises; contains the <strong>Ozone Layer (15–35 km)</strong> absorbing UV radiation; ideal for flying jet aircraft.<br>3. <strong>Mesosphere (50–80 km):</strong> Coldest layer (down to -100°C); meteors burn here.<br>4. <strong>Thermosphere / Ionosphere (80–400 km):</strong> High temperature; contains ions reflecting radio waves; Auroras occur here.<br>5. <strong>Exosphere (400+ km):</strong> Merges into interplanetary space; contains light hydrogen and helium."
  },
  {
    q: "What are the Doldrums and the Horse Latitudes?",
    a: "• <strong>Doldrums (Equatorial Low Pressure Trough):</strong> Located between 5° N and 5° S. Characterized by calm, sluggish air currents and intense convectional rainfall (Inter-Tropical Convergence Zone / ITCZ).<br>• <strong>Horse Latitudes (Sub-Tropical High Pressure Belts):</strong> Located between 30° and 35° N and S. Characterized by calm, descending dry air currents. Legend says Spanish ships sailing to America threw horses overboard to lighten vessels trapped in calm winds."
  },
  {
    q: "What are the Roaring Forties, Furious Fifties, and Screaming Sixties?",
    a: "These are fierce, uninterrupted <strong>Westerly winds</strong> blowing in the Southern Hemisphere between latitudes 40° S and 60° S. Because there are no large continental landmasses to obstruct their flow in the southern oceans, they blow with extraordinary strength and regularity."
  },
  {
    q: "Name five famous local winds and their geographical regions.",
    a: "• <strong>Chinook ('Snow Eater'):</strong> Warm, dry wind on the eastern slopes of the Rocky Mountains (North America).<br>• <strong>Foehn:</strong> Warm, dry wind on the northern slopes of the Alps (Europe).<br>• <strong>Sirocco:</strong> Hot, dry, dust-laden wind blowing from the Sahara across the Mediterranean, causing 'Blood Rain' in southern Italy.<br>• <strong>Harmattan ('The Doctor'):</strong> Cool, dry dust wind blowing from Sahara to Guinea Coast (West Africa), bringing relief from sticky humidity.<br>• <strong>Loo:</strong> Scorching hot, dry afternoon wind blowing in the plains of Northern India during May–June."
  },
  {
    q: "How does wind circulate in Cyclones and Anticyclones across hemispheres?",
    a: "• <strong>Cyclone (Low Pressure center):</strong> Winds spiral inwards.<br>– Northern Hemisphere: <strong>Counter-Clockwise (Anti-Clockwise)</strong><br>– Southern Hemisphere: <strong>Clockwise</strong><br>• <strong>Anticyclone (High Pressure center):</strong> Winds spiral outwards.<br>– Northern Hemisphere: <strong>Clockwise</strong><br>– Southern Hemisphere: <strong>Counter-Clockwise</strong>."
  },
  {
    q: "What is the deepest point in the world ocean and which trench is it located in?",
    a: "The deepest point on Earth is <strong>Challenger Deep</strong> in the <strong>Mariana Trench</strong>, located in the western Pacific Ocean, plunging to an astounding depth of approximately <strong>11,034 meters (36,200 feet)</strong> below sea level."
  },
  {
    q: "What are the world's most saline water bodies?",
    a: "Average ocean salinity is 35‰ (parts per thousand). The most saline water bodies are:<br>1. <strong>Lake Van (Turkey):</strong> 330‰<br>2. <strong>Dead Sea (Jordan/Israel):</strong> 238‰<br>3. <strong>Great Salt Lake (Utah, USA):</strong> 220‰."
  },
  {
    q: "Distinguish between Spring Tides and Neap Tides.",
    a: "• <strong>Spring Tides (Highest tides):</strong> Occur twice a month during <em>New Moon and Full Moon</em>, when the Sun, Earth, and Moon are aligned in a straight line (<strong>Syzygy</strong>). Gravitational forces combine to produce 20% higher high tides.<br>• <strong>Neap Tides (Lowest tides):</strong> Occur during the <em>First and Third Quarter Moon</em>, when the Sun and Moon are at right angles to each other (<strong>Quadrature</strong>) relative to Earth, counteracting each other's gravitational pull."
  },
  {
    q: "List the major warm and cold currents of the Atlantic and Pacific Oceans.",
    a: "• <strong>Atlantic Ocean:</strong><br>– Warm: <em>Gulf Stream</em>, North Atlantic Drift, Brazil Current.<br>– Cold: <em>Labrador Current</em>, Canaries Current, Benguela Current, Falkland Current.<br>• <strong>Pacific Ocean:</strong><br>– Warm: <em>Kuroshio (Japan) Current</em>, East Australian Current.<br>– Cold: <em>Oyashio (Kuril) Current</em>, California Current, <em>Peru (Humboldt) Current</em>."
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
    question: "In which atmospheric layer is the protective Ozone Layer (Ozonosphere) concentrated?",
    options: [
      "Troposphere",
      "Stratosphere",
      "Mesosphere",
      "Thermosphere"
    ],
    correct: 1,
    explanation: "The Ozone Layer is concentrated in the Stratosphere between 15 km and 35 km altitude, where it absorbs harmful ultraviolet (UV-B and UV-C) solar radiation."
  },
  {
    question: "Which of the following local winds is known as the 'Doctor' because it brings dry, healthy relief from tropical humidity along the Guinea Coast of West Africa?",
    options: [
      "Chinook",
      "Harmattan",
      "Sirocco",
      "Mistral"
    ],
    correct: 1,
    explanation: "The Harmattan is a cool, dry, dust-bearing trade wind blowing southwest from the Sahara to the Gulf of Guinea. Its dry air provides pleasant relief from coastal humidity, hence termed 'The Doctor'."
  },
  {
    question: "What is the direction of wind circulation in a Tropical Cyclone in the Northern Hemisphere?",
    options: [
      "Clockwise",
      "Anti-Clockwise (Counter-Clockwise)",
      "Straight inwards with no rotation",
      "Varies randomly with altitude"
    ],
    correct: 1,
    explanation: "Due to the Coriolis force, air rushing towards the central low pressure in the Northern Hemisphere is deflected to its right, producing a counter-clockwise (anti-clockwise) cyclonic vortex."
  },
  {
    question: "Which of the following ocean currents is a COLD ocean current flowing along the western coast of South America?",
    options: [
      "Brazil Current",
      "Gulf Stream",
      "Peru (Humboldt) Current",
      "Kuroshio Current"
    ],
    correct: 2,
    explanation: "The Peru (or Humboldt) Current is a major cold, nutrient-rich ocean current flowing equatorward along the western coast of South America (Chile and Peru)."
  },
  {
    question: "When limestone undergoes thermal metamorphism under intense heat and pressure, it transforms into which metamorphic rock?",
    options: [
      "Gneiss",
      "Slate",
      "Quartzite",
      "Marble"
    ],
    correct: 3,
    explanation: "Limestone (a sedimentary rock consisting of calcium carbonate) recrystallizes under intense metamorphism into crystalline Marble."
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
            ? 'border-blue-500 bg-blue-500/10 text-blue-200' 
            : 'border-slate-800 hover:border-slate-700 bg-slate-800/40 text-slate-300'
        }">
          <input type="radio" name="quiz_q_${idx}" value="${oIdx}" class="w-4 h-4 text-blue-500 focus:ring-blue-400" ${
            isSelected ? 'checked' : ''
          } onchange="handleAnswerSelect(${idx}, ${oIdx})">
          <span class="text-sm font-medium">${opt}</span>
        </label>
      `;
    });

    qDiv.innerHTML = `
      <div class="flex items-start justify-between gap-4 mb-4">
        <h4 class="text-base font-semibold text-slate-100"><span class="text-blue-400 mr-2">Q${idx + 1}.</span>${q.question}</h4>
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
      <div class="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-center">
        <h3 class="text-2xl font-bold text-blue-300">Your Score: ${score} / ${quizQuestions.length}</h3>
        <p class="text-sm text-slate-300 mt-2">${score >= 4 ? 'Masterful performance! You have grasped physical geography and oceanography principles.' : 'Good attempt! Review the rock tables and ocean currents map above.'}</p>
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
  { title: "Rock Types: Igneous, Sedimentary & Metamorphic", anchor: "#rocks-geomorphology", text: "Granite, basalt, sandstone, limestone, marble, quartzite, rock cycle, intrusive and extrusive." },
  { title: "Earthquakes: P, S & L Waves", anchor: "#earthquakes", text: "Focus, epicenter, primary longitudinal, secondary shear solid only shadow zone, surface destructive, Richter scale." },
  { title: "Volcanoes & Stromboli", anchor: "#volcanoes", text: "Active, dormant, extinct, Stromboli lighthouse of Mediterranean, Pacific Ring of Fire 75% volcanoes, Barren Island." },
  { title: "Atmosphere Layers: Troposphere to Exosphere", anchor: "#atmosphere-layers", text: "Normal lapse rate 6.5 C per km, stratosphere ozone layer, mesosphere coldest, ionosphere radio waves auroras." },
  { title: "Planetary Wind Belts & Doldrums", anchor: "#wind-belts", text: "Equatorial low doldrums ITCZ, subtropical high horse latitudes, trade winds, westerlies roaring forties, polar easterlies." },
  { title: "Local Winds: Chinook, Sirocco, Harmattan & Loo", anchor: "#local-winds", text: "Chinook snow eater, Foehn Alps, Sirocco blood rain, Harmattan the doctor, Loo north India hot wind." },
  { title: "Cyclones & Anticyclones", anchor: "#cyclones", text: "Low pressure counter-clockwise in north, clockwise in south, typhoons, hurricanes, willy willies." },
  { title: "Oceans, Trenches & Salinity", anchor: "#oceans-relief", text: "Mariana trench challenger deep 11034m, average salinity 35 parts per thousand, Lake Van 330, Dead Sea 238." },
  { title: "Ocean Currents & Tides", anchor: "#ocean-currents", text: "Spring tides syzygy, neap tides quadrature, Gulf Stream warm, Labrador cold, Kuroshio, Humboldt Peru, Sargasso Sea." }
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
    <a href="${item.anchor}" onclick="closeSearchModal()" class="block p-4 rounded-xl bg-slate-800/40 hover:bg-blue-500/10 border border-slate-800 hover:border-blue-500/30 transition-all">
      <h5 class="text-sm font-semibold text-blue-400">${item.title}</h5>
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
