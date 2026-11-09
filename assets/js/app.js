/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 1: Harappan / Indus Valley Civilization
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
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;

const lightboxModal = document.getElementById('fullImageViewerModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const zoomLevelDisplay = document.getElementById('zoomLevelDisplay');
const lightboxViewport = document.getElementById('lightboxViewport');

function openFullImageViewer(src, title, desc) {
  if (!lightboxModal) return;
  lightboxImg.src = src;
  lightboxTitle.textContent = title;
  lightboxDescription.innerHTML = desc;
  
  currentZoom = 1;
  translateX = 0;
  translateY = 0;
  updateImageTransform();

  lightboxModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeFullImageViewer() {
  if (!lightboxModal) return;
  lightboxModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function updateImageTransform() {
  if (!lightboxImg) return;
  lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
  if (zoomLevelDisplay) {
    zoomLevelDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
  }
}

document.getElementById('zoomInBtn')?.addEventListener('click', () => {
  if (currentZoom < 4) {
    currentZoom += 0.25;
    updateImageTransform();
  }
});

document.getElementById('zoomOutBtn')?.addEventListener('click', () => {
  if (currentZoom > 0.5) {
    currentZoom = Math.max(0.5, currentZoom - 0.25);
    updateImageTransform();
  }
});

document.getElementById('zoomResetBtn')?.addEventListener('click', () => {
  currentZoom = 1;
  translateX = 0;
  translateY = 0;
  updateImageTransform();
});

document.getElementById('closeLightboxBtn')?.addEventListener('click', closeFullImageViewer);

// Mouse wheel zoom in lightbox
lightboxViewport?.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (e.deltaY < 0 && currentZoom < 4) {
    currentZoom += 0.15;
  } else if (e.deltaY > 0 && currentZoom > 0.5) {
    currentZoom = Math.max(0.5, currentZoom - 0.15);
  }
  updateImageTransform();
});

// Drag to pan in lightbox
lightboxViewport?.addEventListener('mousedown', (e) => {
  if (currentZoom > 1) {
    isPanning = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
  }
});

window.addEventListener('mousemove', (e) => {
  if (isPanning) {
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateImageTransform();
  }
});

window.addEventListener('mouseup', () => {
  isPanning = false;
});

// --- ARTIFACTS METADATA FOR POPUP ---
const artifactsData = {
  dancing_girl: {
    title: "Bronze Dancing Girl",
    site: "Mohenjodaro (HR Area)",
    material: "Bronze (Lost-Wax / Cire Perdue)",
    image: "assets/images/dancing_girl.jpg",
    desc: "Discovered by Ernest Mackay in 1926. This 10.5 cm figurine is regarded as a masterpiece of ancient metallurgy. Depicting a young woman standing confidently with right hand on her hip and left arm covered with 24–25 bangles, holding a small bowl. Her naturalistic 'Tribhanga' posture and coiled hair bun demonstrate world-class artistic sensibility in the Bronze Age.",
    examNote: "Lucent Highlight: Proves Harappans had perfected the cire perdue (lost-wax casting) method and used copper-tin alloys. Located at the National Museum, New Delhi."
  },
  priest_king: {
    title: "Steatite 'Priest-King' Sculpture",
    site: "Mohenjodaro (DK Area)",
    material: "Fired White Steatite (Soapstone)",
    image: "assets/images/priest_king.jpg",
    desc: "Found in 1927 in a brick-lined room. Measures 17.5 cm in height. Portrays a bearded man with a neatly trimmed beard, shaved upper lip, and contemplative half-closed almond eyes. He wears a filleted diadem with a circular jewel on his forehead, an identical armband, and a cloak embossed with trefoil (three-leaf clover) motifs draped over his left shoulder.",
    examNote: "Lucent Highlight: Often associated with the ruling elite or priest class of the civilization. Preserved at the National Museum of Pakistan, Karachi."
  },
  pashupati_seal: {
    title: "Pashupati Seal (Proto-Shiva)",
    site: "Mohenjodaro",
    material: "Carved Steatite Stamp Seal",
    image: "assets/images/pashupati_seal.jpg",
    desc: "Discovered by Sir John Marshall. Features a three-faced (tricephalic) male deity sitting in a yogic asana (Padmasana) on a low platform with heels pressed together. He wears a horned headdress. He is surrounded by 4 wild animals: Elephant and Tiger to his right, and Rhinoceros and Water Buffalo to his left. Two horned antelopes/deer stand beneath his seat.",
    examNote: "Lucent Highlight: The most cited proof of Proto-Shiva worship in pre-Vedic India. Lingam (phallic) worship was also prevalent."
  },
  great_bath: {
    title: "The Great Bath",
    site: "Mohenjodaro (Citadel Mound)",
    material: "Burnt Bricks, Gypsum Mortar & Bitumen",
    image: "assets/images/great_bath.jpg",
    desc: "A monumental public water basin measuring 11.88 m north-south, 7.01 m east-west, and 2.43 m deep. Flanked on north and south by brick staircases. Built with finely fitted burnt bricks laid on edge, bonded with gypsum mortar, and sealed with a 3 cm thick waterproof layer of natural bitumen (asphalt). Surrounded by a portico and dressing rooms.",
    examNote: "Lucent Highlight: Widely recognized as a communal tank for ritualistic purification bathing before ceremonies on the Citadel. S.R. Rao and Marshall praised its hydraulic engineering."
  },
  lothal: {
    title: "World's First Tidal Dockyard",
    site: "Lothal (Gujarat)",
    material: "Baked Kiln Bricks",
    image: "assets/images/lothal_dockyard.jpg",
    desc: "Excavated by S.R. Rao in 1954 on the Bhogava river (Gulf of Khambhat). A massive rectangular trapezoidal basin (214 m × 36 m) with a water inlet lock gate. Sluice gates allowed ships to float in during high tide and remain docked during low tide for loading and unloading cargo.",
    examNote: "Lucent Highlight: Connected the Indus valley directly with Sumerian ports (Ur, Susa, Dilmun, Makan). Found with Persian circular seals, rice husks, and double burials."
  },
  dholavira: {
    title: "Cascade of Giant Water Reservoirs",
    site: "Dholavira (Khadir Bet, Kutch, Gujarat)",
    material: "Dressed Sandstone & Rock-Cut Masonry",
    image: "assets/images/dholavira.jpg",
    desc: "Discovered by J.P. Joshi and excavated by R.S. Bisht. Features 16 giant rock-cut reservoirs to catch monsoon runoff from the seasonal streams Manhar and Mansar in the arid Rann of Kutch. Dholavira is also famous for being the ONLY Indus city divided into 3 distinct sectors: Citadel, Middle Town, and Lower Town.",
    examNote: "Lucent Highlight: Unearthed a famous 10-character Indus signboard inscribed on crystalline gypsum (civic advertisement board) and a huge public stadium."
  }
};

// Modal Functions
function openModal(key) {
  const data = artifactsData[key];
  if (!data) return;

  document.getElementById('modalImg').src = data.image;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalSite').textContent = data.site;
  document.getElementById('modalMaterial').textContent = data.material;
  document.getElementById('modalDesc').textContent = data.desc;
  document.getElementById('modalExamNote').textContent = data.examNote;

  const modal = document.getElementById('artifactModal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeModal() {
  const modal = document.getElementById('artifactModal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Close on backdrop or Esc key
document.getElementById('artifactModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'artifactModal') closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeSearch();
    closeFullImageViewer();
  }
});

// --- SITES FILTERING ---
const filterButtons = document.querySelectorAll('.site-filter-btn');
const siteCards = document.querySelectorAll('.site-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('bg-amber-500', 'text-slate-950', 'font-bold');
      b.classList.add('bg-slate-800', 'text-slate-300');
    });
    btn.classList.remove('bg-slate-800', 'text-slate-300');
    btn.classList.add('bg-amber-500', 'text-slate-950', 'font-bold');

    const filter = btn.getAttribute('data-filter');

    siteCards.forEach(card => {
      const country = card.getAttribute('data-country');
      const type = card.getAttribute('data-type');

      if (filter === 'all') {
        card.style.display = 'block';
      } else if (filter === 'india') {
        card.style.display = (country === 'india') ? 'block' : 'none';
      } else if (filter === 'pakistan') {
        card.style.display = (country === 'pakistan') ? 'block' : 'none';
      } else if (filter === 'coastal') {
        card.style.display = (type === 'coastal') ? 'block' : 'none';
      }
    });
  });
});

// --- CHAPTER DROPDOWN TOGGLE ---
const chapterBtn = document.getElementById('chapterSelectorBtn');
const chapterDropdown = document.getElementById('chapterDropdown');

chapterBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  chapterDropdown.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (chapterDropdown && !chapterDropdown.contains(e.target) && e.target !== chapterBtn) {
    chapterDropdown.classList.add('hidden');
  }
});

// --- SEARCH MODAL & INDEX ---
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearchBtn = document.getElementById('closeSearchBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const searchableDatabase = [
  { title: "Great Granary", category: "Mohenjodaro", snippet: "The largest building of the Indus civilization discovered at Mohenjodaro.", link: "#sites" },
  { title: "Great Bath", category: "Mohenjodaro", snippet: "Waterproofed ritual bathing tank made of burnt bricks, gypsum mortar, and bitumen.", link: "#artifacts" },
  { title: "Dockyard of Lothal", category: "Lothal (Gujarat)", snippet: "World's earliest known tidal brick basin excavated on the Bhogava river by S.R. Rao in 1954.", link: "#artifacts" },
  { title: "Dancing Girl", category: "Mohenjodaro", snippet: "Bronze figurine cast via lost-wax technique (cire perdue), standing in Tribhanga posture.", link: "#artifacts" },
  { title: "Pashupati Seal (Proto-Shiva)", category: "Religion", snippet: "Yogic deity surrounded by Elephant, Tiger, Rhinoceros, Buffalo, and two deer.", link: "#religion" },
  { title: "Meluhha", category: "Trade", snippet: "Sumerian cuneiform name for the Indus region. Intermediates: Dilmun (Bahrain) & Makan (Makran).", link: "#trade" },
  { title: "Sindhon", category: "Agriculture", snippet: "Greek name for Cotton, because the Harappans were the first in the world to cultivate it.", link: "#sites" },
  { title: "Boustrophedon Script", category: "Script", snippet: "Writing style from right-to-left and left-to-right alternately, evident on Kalibangan potsherds.", link: "#religion" },
  { title: "Chanhudaro", category: "Sites", snippet: "Only Indus site without a citadel. Famous for lipstick, inkpot, and bead-making factory.", link: "#sites" },
  { title: "Surkotada", category: "Gujarat", snippet: "The only Indus site where actual horse bones were discovered.", link: "#sites" },
  { title: "Dholavira", category: "Gujarat", snippet: "16 rock-cut reservoirs, only city divided into 3 parts, and 10-symbol signboard.", link: "#sites" },
  { title: "Kalibangan", category: "Rajasthan", snippet: "Earliest ploughed field in the world, 7 fire altars, camel bones, and decorated bricks.", link: "#sites" },
  { title: "Banawali", category: "Haryana", snippet: "Radial town planning, lack of systematic drainage system, and terracotta toy plough.", link: "#sites" },
  { title: "Iron Absent", category: "Metallurgy", snippet: "Iron was completely UNKNOWN to Indus people. They were in the Bronze/Copper age.", link: "#overview" },
  { title: "Rakhigarhi", category: "Haryana", snippet: "Largest Indus site situated in modern India (Ghaggar basin).", link: "#sites" },
  { title: "Mortimer Wheeler Theory", category: "Decline", snippet: "Attributed decline to Aryan invasion: 'Indra stands accused!' Rigveda mentions Hariyumpia.", link: "#decline" }
];

function openSearch() {
  searchModal.classList.remove('hidden');
  searchInput.value = '';
  searchInput.focus();
  renderSearchResults('');
}

function closeSearch() {
  searchModal.classList.add('hidden');
}

searchBtn?.addEventListener('click', openSearch);
closeSearchBtn?.addEventListener('click', closeSearch);

function renderSearchResults(query) {
  const q = query.trim().toLowerCase();
  if (!q) {
    searchResults.innerHTML = '<p class="text-slate-500 text-center py-6">Type a keyword to search all sites, finds, trade commodities, and decline theories...</p>';
    return;
  }

  const matches = searchableDatabase.filter(item => 
    item.title.toLowerCase().includes(q) || 
    item.category.toLowerCase().includes(q) || 
    item.snippet.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    searchResults.innerHTML = `<p class="text-slate-400 text-center py-6">No matching facts found for "<span class="text-amber-400">${query}</span>".</p>`;
    return;
  }

  searchResults.innerHTML = matches.map(m => `
    <a href="${m.link}" onclick="closeSearch()" class="block p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/60 transition-all">
      <div class="flex items-center justify-between">
        <span class="font-bold text-white text-xs">${m.title}</span>
        <span class="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">${m.category}</span>
      </div>
      <p class="text-[11px] text-slate-400 mt-1">${m.snippet}</p>
    </a>
  `).join('');
}

searchInput?.addEventListener('input', (e) => {
  renderSearchResults(e.target.value);
});

// --- FLASHCARD SYSTEM ---
const flashcards = [
  {
    category: "City Planning",
    question: "Which is the ONLY Indus Valley site discovered without a Citadel?",
    answer: "Chanhudaro (Sindh, Pakistan) — It was an industrial bead-making and craft town excavated by N.G. Majumdar and Mackay."
  },
  {
    category: "Geographical Boundaries",
    question: "What are the extreme Northern and Southern outposts of the Indus Civilization?",
    answer: "Northernmost: Manda (Chenab, Jammu & Kashmir)\nSouthernmost: Daimabad (Pravara, Maharashtra) [Earlier Bhagatrav]"
  },
  {
    category: "Agriculture & Economy",
    question: "What did the ancient Greeks call Cotton produced by the Harappans and why?",
    answer: "They called it 'Sindhon' because the Harappans were the earliest producers in the world, originating from the Sindh region."
  },
  {
    category: "Religious Beliefs",
    question: "Which four animals surround Pashupati Mahadeva on the famous Mohenjodaro seal?",
    answer: "Elephant, Tiger (right side) and Rhinoceros, Buffalo (left side) — along with two deer standing at his feet."
  },
  {
    category: "Trade & Metallurgy",
    question: "Which major metal was completely UNKNOWN to the people of the Indus Civilization?",
    answer: "Iron (Fe). The Indus civilization belonged to the Bronze Age / Chalcolithic era. Iron was introduced in India later during the Later Vedic Period (c. 1000 BC)."
  },
  {
    category: "Archaeological Architecture",
    question: "Which is the largest individual building discovered in the entire Indus Valley Civilization?",
    answer: "The Great Granary at Mohenjodaro (measuring 45.71 m length × 15.23 m width)."
  }
];

let currentCardIndex = 0;
let isCardFlipped = false;

const cardContent = document.getElementById('cardContent');
const cardCategory = document.getElementById('cardCategory');
const cardCounter = document.getElementById('cardCounter');
const flashcardInner = document.getElementById('flashcardInner');
const flashcardBox = document.getElementById('flashcardBox');
const prevCardBtn = document.getElementById('prevCardBtn');
const nextCardBtn = document.getElementById('nextCardBtn');
const flipCardBtn = document.getElementById('flipCardBtn');

function updateFlashcardUI() {
  const card = flashcards[currentCardIndex];
  cardCategory.textContent = `Topic: ${card.category}`;
  cardCounter.textContent = `${currentCardIndex + 1} / ${flashcards.length}`;
  
  if (isCardFlipped) {
    cardContent.textContent = card.answer;
    cardContent.classList.add('text-amber-300');
    cardContent.classList.remove('text-white');
    flashcardInner.classList.add('border-amber-500');
  } else {
    cardContent.textContent = card.question;
    cardContent.classList.remove('text-amber-300');
    cardContent.classList.add('text-white');
    flashcardInner.classList.remove('border-amber-500');
  }
}

function toggleCardFlip() {
  isCardFlipped = !isCardFlipped;
  updateFlashcardUI();
}

flashcardBox?.addEventListener('click', toggleCardFlip);
flipCardBtn?.addEventListener('click', toggleCardFlip);

prevCardBtn?.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
  isCardFlipped = false;
  updateFlashcardUI();
});

nextCardBtn?.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex + 1) % flashcards.length;
  isCardFlipped = false;
  updateFlashcardUI();
});

// --- INTERACTIVE MOCK QUIZ ---
const quizQuestions = [
  {
    q: "The Harappans were the earliest people in the ancient world to produce which of the following agricultural commodities?",
    options: ["Barley", "Wheat", "Cotton", "Mustard"],
    correct: 2,
    explanation: "According to Lucent GK, Harappans were the earliest people to produce cotton in the ancient world. For this reason, the Greeks named it 'Sindhon' (originating from Sindh)."
  },
  {
    q: "Which Indus site has yielded the unique archaeological evidence of an ancient ploughed field?",
    options: ["Harappa", "Kalibangan", "Banawali", "Lothal"],
    correct: 1,
    explanation: "A furrowed/ploughed field surface dating to the Pre-Harappan phase was discovered at Kalibangan (Rajasthan) on the banks of the Ghaggar river."
  },
  {
    q: "In Sumerian cuneiform inscriptions, which ancient name was given to the Indus Valley region?",
    options: ["Dilmun", "Makan", "Meluhha", "Bactria"],
    correct: 2,
    explanation: "Sumerian texts refer to maritime trade with 'Meluhha' (the Indus region), while 'Dilmun' was Bahrain and 'Makan' was the Makran coast."
  },
  {
    q: "Which of the following Indus sites is unique for being divided into THREE distinct architectural parts rather than two?",
    options: ["Dholavira", "Surkotada", "Rakhigarhi", "Mohenjodaro"],
    correct: 0,
    explanation: "Dholavira (Kutch, Gujarat) is the only Indus city divided into three parts: the Citadel (Castle and Bailey), the Middle Town, and the Lower Town."
  },
  {
    q: "Who among the following archaeologists famously asserted that 'Indra stands accused of causing the decline of the Indus Civilisation'?",
    options: ["Sir John Marshall", "Sir Mortimer Wheeler", "Ernest Mackay", "Walter Fairservis"],
    correct: 1,
    explanation: "Sir Mortimer Wheeler proposed the Aryan Invasion theory based on Rigvedic hymns praising Indra as 'Purandara' (destroyer of forts) and unburied skeletons at Mohenjodaro."
  }
];

let quizIndex = 0;
let userScore = 0;
let answeredCurrent = false;

const quizQNum = document.getElementById('quizQNum');
const quizQuestionText = document.getElementById('quizQuestionText');
const quizOptionsList = document.getElementById('quizOptionsList');
const quizFeedback = document.getElementById('quizFeedback');
const nextQuizBtn = document.getElementById('nextQuizBtn');
const currentScore = document.getElementById('currentScore');

function renderQuizQuestion() {
  answeredCurrent = false;
  const item = quizQuestions[quizIndex];
  quizQNum.textContent = `Q${quizIndex + 1}`;
  quizQuestionText.textContent = item.q;
  quizFeedback.className = 'hidden';
  nextQuizBtn.classList.add('hidden');
  nextQuizBtn.classList.remove('flex');

  quizOptionsList.innerHTML = item.options.map((opt, i) => `
    <button onclick="handleOptionSelect(${i})" class="quiz-option-btn w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 text-left text-xs font-medium text-slate-200 transition-all flex items-center justify-between">
      <span><strong class="text-amber-400 mr-2">${String.fromCharCode(65 + i)}.</strong> ${opt}</span>
      <span class="status-indicator"></span>
    </button>
  `).join('');
}

function handleOptionSelect(selectedIdx) {
  if (answeredCurrent) return;
  answeredCurrent = true;

  const item = quizQuestions[quizIndex];
  const optionButtons = quizOptionsList.querySelectorAll('.quiz-option-btn');

  if (selectedIdx === item.correct) {
    userScore++;
    currentScore.textContent = userScore;
    optionButtons[selectedIdx].classList.remove('border-slate-800', 'bg-slate-950/80');
    optionButtons[selectedIdx].classList.add('border-emerald-500', 'bg-emerald-500/20', 'text-emerald-200');
    
    quizFeedback.className = 'p-3.5 rounded-xl text-xs leading-relaxed bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 block';
    quizFeedback.innerHTML = `<strong>Correct!</strong> ${item.explanation}`;
  } else {
    optionButtons[selectedIdx].classList.remove('border-slate-800', 'bg-slate-950/80');
    optionButtons[selectedIdx].classList.add('border-rose-500', 'bg-rose-500/20', 'text-rose-200');
    
    optionButtons[item.correct].classList.remove('border-slate-800', 'bg-slate-950/80');
    optionButtons[item.correct].classList.add('border-emerald-500', 'bg-emerald-500/20', 'text-emerald-200');
    
    quizFeedback.className = 'p-3.5 rounded-xl text-xs leading-relaxed bg-rose-500/15 border border-rose-500/30 text-rose-300 block';
    quizFeedback.innerHTML = `<strong>Incorrect.</strong> The correct answer is <em>${item.options[item.correct]}</em>.<br><span class="text-slate-300 mt-1 block">${item.explanation}</span>`;
  }

  nextQuizBtn.classList.remove('hidden');
  nextQuizBtn.classList.add('flex');
  lucide.createIcons();
}

nextQuizBtn?.addEventListener('click', () => {
  quizIndex++;
  if (quizIndex < quizQuestions.length) {
    renderQuizQuestion();
  } else {
    const percentage = Math.round((userScore / quizQuestions.length) * 100);
    quizQuestionBox.innerHTML = `
      <div class="text-center py-8 space-y-4">
        <div class="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center">
          <i data-lucide="award" class="w-8 h-8"></i>
        </div>
        <h4 class="font-heading text-2xl font-bold text-white">Quiz Completed!</h4>
        <p class="text-slate-300 text-sm">
          You scored <strong class="text-amber-400 font-bold">${userScore} out of ${quizQuestions.length}</strong> (${percentage}%).
        </p>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          ${percentage >= 80 ? 'Outstanding mastery of Lucent Ancient India Section 1!' : 'Good effort! Review the site cards and flashcards above to score 100%.'}
        </p>
        <button onclick="restartQuiz()" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all">
          Retake Quiz
        </button>
      </div>
    `;
    lucide.createIcons();
  }
});

function restartQuiz() {
  quizIndex = 0;
  userScore = 0;
  currentScore.textContent = '0';
  location.reload();
}

// Initialise
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateFlashcardUI();
  renderQuizQuestion();
  lucide.createIcons();
});
