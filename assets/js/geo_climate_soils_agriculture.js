/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 25: Climate, Soils, Natural Vegetation, Agriculture & Minerals of India
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

// --- FLASHCARDS DATA (CLIMATE, SOILS, CROPS & MINERALS) ---
const cardsData = [
  {
    q: "What type of climate does India have and what are the two branches of the Southwest Monsoon?",
    a: "India has a <strong>Tropical Monsoon Climate</strong> governed by the seasonal reversal of winds.<br>• <strong>Arabian Sea Branch:</strong> Strikes the Western Ghats (orographic rainfall >250 cm on windward side, rainshadow on Deccan); continues north to Gujarat and Punjab.<br>• <strong>Bay of Bengal Branch:</strong> Strikes Myanmar's Arakan Yoma, gets deflected westward into the Gangetic Plain, and causes world-record precipitation at <strong>Mawsynram</strong> (~1,187 cm) in Meghalaya."
  },
  {
    q: "What are Pre-Monsoon Showers in India and what are their local regional names?",
    a: "Occur during April–May due to local convectional storms:<br>• <strong>Mango Showers:</strong> Kerala and coastal Karnataka; aids in early ripening of mangoes.<br>• <strong>Cherry Blossom / Blossom Showers:</strong> Karnataka and Kerala; crucial for coffee flowering.<br>• <strong>Kalbaisakhi (Nor'westers):</strong> West Bengal; fierce thunderstorms beneficial for tea, jute, and paddy.<br>• <strong>Bardoli Chheerha:</strong> Assam; spring thunderstorms vital for tea cultivation.<br>• <strong>Loo:</strong> Scorching hot, dry winds in northern plains."
  },
  {
    q: "What are Western Disturbances and why are they economically vital for Indian agriculture?",
    a: "Western Disturbances are shallow extratropical cyclonic depressions originating over the <strong>Mediterranean Sea</strong> that travel eastward steered by the subtropical westerly jet stream. They arrive in Northwest India during winter (Dec–Feb), bringing light rainfall to Punjab, Haryana, and Western UP, which is indispensable for the winter <strong>Rabi wheat crop</strong>, and heavy snowfall to the Himalayas."
  },
  {
    q: "Why does Tamil Nadu (Coromandel Coast) receive its main rainfall during winter?",
    a: "During the summer Southwest Monsoon, the Coromandel Coast lies parallel to the Bay of Bengal branch and in the rain-shadow of the Western Ghats (Arabian Sea branch), receiving little rain. During winter (Oct–Dec), the <strong>Retreating / Northeast Monsoon</strong> picks up moisture over the warm waters of the Bay of Bengal and strikes the Tamil Nadu coast, causing heavy seasonal rainfall."
  },
  {
    q: "Describe Black Soil (Regur) and its agricultural significance.",
    a: "• <strong>Origin:</strong> Formed in situ by the weathering of volcanic basalt of the Deccan Traps (Maharashtra, Gujarat, MP, northern Karnataka).<br>• <strong>Properties:</strong> Highly argillaceous (clayey), deep black color, rich in iron, lime, calcium, and magnesium. Extremely high moisture-retention capacity; develops deep self-aerating cracks when dry ('self-ploughing').<br>• <strong>Crops:</strong> Ideal for <strong>Cotton</strong> (hence called 'Black Cotton Soil'), sugarcane, groundnut, and tobacco."
  },
  {
    q: "How does Laterite Soil form and which plantation crops thrive on it?",
    a: "• <strong>Formation:</strong> Formed under tropical conditions with high temperature and alternating wet and dry seasons through intense <strong>leaching (chemical wash-out)</strong> of silica and lime, leaving behind residual oxides of iron and aluminium.<br>• <strong>Characteristics:</strong> Highly acidic, poor in organic matter/humus, hardens like brick when exposed to air (Latin <em>later</em> = brick).<br>• <strong>Crops:</strong> Highly responsive to manuring; ideal for plantation crops: <strong>Tea, Coffee, Rubber, Cashewnut, and Cinchona</strong> (Western Ghats, Nilgiris, Meghalaya)."
  },
  {
    q: "What is the difference between Tropical Moist Deciduous and Tropical Evergreen Forests in India?",
    a: "• <strong>Tropical Wet Evergreen (Rain >200 cm):</strong> Dense multi-layered canopy, trees do not shed leaves simultaneously, valuable hardwoods (Ebony, Mahogany, Rosewood) in Western Ghats, NE India, and Andamans.<br>• <strong>Tropical Moist Deciduous (Rain 100–200 cm):</strong> The <strong>most widespread forest type in India (Monsoon Forest)</strong>. Trees shed leaves for 6–8 weeks in dry spring. Major commercial timbers: <strong>Teak, Sal, Sandalwood, Shisham, Mahua, and Bamboo</strong>."
  },
  {
    q: "What are the three main cropping seasons of India (Kharif, Rabi, Zaid)?",
    a: "• <strong>Kharif Season (Monsoon, Sown June–July, Harvested Sept–Oct):</strong> Requires high heat and moisture. Crops: <em>Rice (Paddy), Maize, Jowar, Bajra, Cotton, Jute, Groundnut, Soybean</em>.<br>• <strong>Rabi Season (Winter, Sown Oct–Dec, Harvested April–May):</strong> Requires cool climate and moderate moisture. Crops: <em>Wheat, Barley, Gram, Mustard, Peas, Linseed, Potato</em>.<br>• <strong>Zaid Season (Summer, March–June):</strong> Short inter-season crop between Rabi and Kharif. Crops: <em>Watermelon, Muskmelon, Cucumber, Vegetables, Fodder</em>."
  },
  {
    q: "What was the Green Revolution in India and who pioneered it?",
    a: "Launched in <strong>1966–67</strong> to attain food self-sufficiency. Relied on the introduction of High Yielding Varieties (HYV) of Mexican semi-dwarf wheat seeds (developed by Nobel Laureate <strong>Norman Borlaug</strong>), supported by expanded tube-well irrigation, chemical fertilizers, and pesticides. In India, it was spearheaded by agricultural scientist <strong>Dr. M.S. Swaminathan</strong> (Father of Green Revolution in India) and implemented in Punjab, Haryana, and Western UP."
  },
  {
    q: "Name the major iron ore belts of India and the distinction between Hematite and Magnetite.",
    a: "• <strong>Hematite (Fe₂O₃):</strong> Reddish ore, 60–70% iron content; most important industrial iron ore in India. Mined in Odisha (Badampahar, Mayurbhanj, Keonjhar), Jharkhand (Noamundi), and Chhattisgarh (<strong>Bailadila</strong> - largest mechanized open-cast mine in Asia, exports to Japan).<br>• <strong>Magnetite (Fe₃O₄):</strong> Black magnetic ore, 70%+ iron content. Found in Karnataka (<strong>Kudremukh</strong> - slurry pipeline to Mangalore port, Bababudan Hills)."
  },
  {
    q: "Differentiate between Gondwana and Tertiary coal in India and identify key coalfields.",
    a: "• <strong>Gondwana Coal (250 million years old):</strong> Accounts for <strong>98% of India's coal reserves</strong> and 99% of production. High-grade bituminous non-coking and coking coal located in river valleys (Damodar, Mahanadi, Son, Godavari). Leading fields: <strong>Jharia</strong> (Jharkhand - premier coking coal), <strong>Raniganj</strong> (WB - oldest coal mine, 1774), Bokaro, Singrauli.<br>• <strong>Tertiary Coal (15–60 million years old):</strong> Younger, high sulfur and moisture content. Found in Assam (Makum), Meghalaya, and <strong>Neyveli</strong> in Tamil Nadu (largest reserves of <strong>Lignite / Brown Coal</strong> in India)."
  },
  {
    q: "What are India's premier petroleum fields and atomic mineral deposits?",
    a: "• <strong>Petroleum:</strong><br>– <strong>Digboi (Assam):</strong> Oldest producing oilfield and refinery in India (drilled 1889, refinery 1901).<br>– <strong>Bombay High:</strong> Largest offshore oil deposit (discovered 1974, Sagar Samrat platform).<br>– Ankleshwar (Gujarat) and KG Basin (Krishna-Godavari offshore gas).<br>• <strong>Atomic Minerals:</strong><br>– <strong>Uranium:</strong> <em>Jaduguda</em>, Bhatin, Narwapahar in Singhbhum (Jharkhand); Tummalapalle (AP).<br>– <strong>Thorium:</strong> Derived from <strong>Monazite Sands</strong> of Kerala coastal placers (world's largest known thorium reserves)."
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
    question: "Which of the following soil types in India is formed in situ by the weathering of basaltic lava rocks of the Deccan Trap and is renowned for its high moisture retention?",
    options: [
      "Alluvial Soil",
      "Laterite Soil",
      "Black (Regur) Soil",
      "Red Soil"
    ],
    correct: 2,
    explanation: "Black Soil (Regur) is derived from the weathering of volcanic basalt of the Deccan plateau. Its fine clayey texture gives it high water-retention capacity and self-ploughing deep cracks when dry, making it ideal for cotton cultivation."
  },
  {
    question: "The winter rainfall experienced in Northwest India (Punjab, Haryana, Western UP) is primarily caused by which meteorological system?",
    options: [
      "Southwest Monsoon",
      "Northeast Monsoon",
      "Western Disturbances",
      "Tropical Cyclones of Bay of Bengal"
    ],
    correct: 2,
    explanation: "Western Disturbances are extratropical cyclones originating over the Mediterranean Sea that travel eastward into northern India, bringing vital winter rainfall that sustains the Rabi wheat crop."
  },
  {
    question: "Mawsynram, which holds the world record for the highest average annual rainfall (~1,187 cm), is situated in which mountain hills of Meghalaya?",
    options: [
      "Garo Hills",
      "Khasi Hills",
      "Jaintia Hills",
      "Mikir Hills"
    ],
    correct: 1,
    explanation: "Mawsynram is situated in the East Khasi Hills district of Meghalaya. Its funnel-shaped topography traps the moisture-laden clouds of the Bay of Bengal branch of the monsoon, triggering intense orographic rainfall."
  },
  {
    question: "Which of the following is the OLDEST oil refinery and producing oilfield in India and Asia?",
    options: [
      "Bombay High (Maharashtra)",
      "Ankleshwar (Gujarat)",
      "Digboi (Assam)",
      "Barauni (Bihar)"
    ],
    correct: 2,
    explanation: "Digboi in Assam is the birthplace of the Indian oil industry. Crude oil was first discovered here in 1889, and Asia's first oil refinery began operations at Digboi in 1901."
  },
  {
    question: "Thorium, a key atomic mineral for India's three-stage nuclear power programme, is extracted primarily from which coastal mineral deposit?",
    options: [
      "Bauxite of Odisha",
      "Monazite sand of Kerala",
      "Zircon of Gujarat",
      "Lignite of Tamil Nadu"
    ],
    correct: 1,
    explanation: "Monazite sands found along the coastal placers of Kerala (Palakkad and Kollam districts) and Tamil Nadu contain the world's richest known reserves of Thorium phosphate."
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
            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200' 
            : 'border-slate-800 hover:border-slate-700 bg-slate-800/40 text-slate-300'
        }">
          <input type="radio" name="quiz_q_${idx}" value="${oIdx}" class="w-4 h-4 text-emerald-500 focus:ring-emerald-400" ${
            isSelected ? 'checked' : ''
          } onchange="handleAnswerSelect(${idx}, ${oIdx})">
          <span class="text-sm font-medium">${opt}</span>
        </label>
      `;
    });

    qDiv.innerHTML = `
      <div class="flex items-start justify-between gap-4 mb-4">
        <h4 class="text-base font-semibold text-slate-100"><span class="text-emerald-400 mr-2">Q${idx + 1}.</span>${q.question}</h4>
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
      <div class="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
        <h3 class="text-2xl font-bold text-emerald-300">Your Score: ${score} / ${quizQuestions.length}</h3>
        <p class="text-sm text-slate-300 mt-2">${score >= 4 ? 'Phenomenal! You have mastered Indian climate, soil groups, agriculture, and mineral deposits.' : 'Good attempt! Review the mineral maps and monsoon branch explanations above.'}</p>
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
  { title: "Southwest & Northeast Monsoons", anchor: "#climate-monsoon", text: "Tropical monsoon climate, Arabian Sea branch, Bay of Bengal branch, Mawsynram Khasi hills, retreating monsoon Coromandel coast." },
  { title: "Pre-Monsoon Showers & Local Storms", anchor: "#pre-monsoon", text: "Mango showers Kerala, Cherry blossom coffee showers Karnataka, Kalbaisakhi West Bengal, Bardoli Chheerha Assam, Loo." },
  { title: "Western Disturbances (Winter Rains)", anchor: "#climate-monsoon", text: "Extratropical cyclones Mediterranean sea, winter rain Punjab Haryana wheat, snowfall Himalayas." },
  { title: "Soils of India (ICAR 8 Groups)", anchor: "#soils-india", text: "Alluvial 43 percent, Black regur basalt cotton self-ploughing, Red iron oxide, Laterite leaching tea coffee, Saline reh usar." },
  { title: "Natural Vegetation & Forest Types", anchor: "#forests-vegetation", text: "Tropical evergreen mahogany, tropical moist deciduous teak sal sandalwood most widespread, mangrove Sundari trees." },
  { title: "Cropping Seasons: Kharif, Rabi & Zaid", anchor: "#agriculture-crops", text: "Kharif monsoon rice cotton, Rabi winter wheat mustard, Zaid summer watermelon, Green Revolution M.S. Swaminathan 1966." },
  { title: "Iron Ore Belts: Hematite & Magnetite", anchor: "#minerals-energy", text: "Hematite 60-70 percent Bailadila Mayurbhanj, Magnetite Kudremukh Bababudan hills slurry pipeline." },
  { title: "Coal Reserves: Gondwana & Tertiary", anchor: "#minerals-energy", text: "Gondwana 98 percent bituminous Jharia Raniganj oldest 1774, Tertiary lignite brown coal Neyveli Tamil Nadu." },
  { title: "Petroleum & Atomic Minerals", anchor: "#minerals-energy", text: "Digboi Assam oldest 1889, Bombay High offshore Sagar Samrat, Monazite sand Kerala thorium, Jaduguda uranium." }
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
    <a href="${item.anchor}" onclick="closeSearchModal()" class="block p-4 rounded-xl bg-slate-800/40 hover:bg-emerald-500/10 border border-slate-800 hover:border-emerald-500/30 transition-all">
      <h5 class="text-sm font-semibold text-emerald-400">${item.title}</h5>
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
