/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 24: Indian Drainage Systems, Rivers & River Valley Projects
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
  titleEl.textContent = title || 'River Drainage Reference';
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
    const title = container.getAttribute('data-title') || img?.alt || 'River Drainage Reference';
    const caption = container.getAttribute('data-caption') || '';
    if (img) openLightbox(img.src, title, caption);
  });
});

// --- FLASHCARDS DATA (INDIAN DRAINAGE & RIVERS) ---
const cardsData = [
  {
    q: "What is the difference between Himalayan and Peninsular river systems?",
    a: "• <strong>Himalayan Rivers:</strong> Perennial (fed by glaciers and monsoon rain); antecedent drainage; youth stage with V-shaped valleys, gorges, and waterfalls; carry huge silt loads; navigable in plains.<br>• <strong>Peninsular Rivers:</strong> Seasonal (rain-fed); super-imposed / consequent drainage; mature graded profile with shallow, broad valleys; lower silt load; unnavigable due to rapids and waterfalls."
  },
  {
    q: "Describe the Indus (Sindhu) river and its five major Punjab tributaries (Panchnad).",
    a: "Originates from <strong>Bokhar Chu glacier</strong> near Lake Mansarovar in Tibet (known as <em>Singi Khamban</em> / Lion's Mouth). Enters India in Ladakh between Ladakh and Zaskar ranges.<br>• <strong>Jhelum (Vitasta):</strong> Verinag spring (Kashmir); passes Wular Lake.<br>• <strong>Chenab (Asikni):</strong> Chandra + Bhaga at Tandi (HP); largest Indus tributary.<br>• <strong>Ravi (Purushni):</strong> Originates near Rohtang Pass (HP).<br>• <strong>Beas (Vipasa):</strong> Originates at Beas Kund (HP); entirely in India; joins Sutlej at Harike.<br>• <strong>Sutlej (Satadru):</strong> Rakas Lake (Tibet); enters India via Shipki La; feeds Bhakra Dam."
  },
  {
    q: "What are the Panch Prayag (Five Holy Confluences) of the Alaknanda River?",
    a: "From North to South:<br>1. <strong>Vishnuprayag:</strong> Alaknanda + Dhauliganga<br>2. <strong>Nandaprayag:</strong> Alaknanda + Nandakini<br>3. <strong>Karnaprayag:</strong> Alaknanda + Pindar<br>4. <strong>Rudraprayag:</strong> Alaknanda + Mandakini (Kali Ganga)<br>5. <strong>Devprayag:</strong> Alaknanda + Bhagirathi. From Devprayag onwards, the combined river is called the <strong>Ganga</strong>."
  },
  {
    q: "List the major Left-Bank and Right-Bank tributaries of the Ganga.",
    a: "• <strong>Right-Bank:</strong> <em>Yamuna</em> (longest tributary, 1,376 km, joins at Prayagraj Triveni Sangam; fed by Chambal, Betwa, Ken, Sind) and <em>Son</em> (originates at Amarkantak plateau, joins near Patna).<br>• <strong>Left-Bank:</strong> Ramganga, <em>Gomti</em> (originates from Gomat Taal / Fulhar lake, Pilibhit, UP), <em>Ghaghara</em> (Karnali, largest tributary by volume), <em>Gandak</em>, <em>Kosi</em> ('Sorrow of Bihar' due to unpredictable flood avulsions), and Mahananda."
  },
  {
    q: "Trace the course of the Brahmaputra from Tibet to the Bay of Bengal.",
    a: "• Originates at <strong>Chemayungdung glacier</strong> near Mansarovar; flows east as <strong>Yarlung Tsangpo</strong>.<br>• Takes a hairpin U-turn around <strong>Namcha Barwa (7,756 m)</strong> and enters Arunachal Pradesh as <strong>Siang / Dihang</strong>.<br>• Joined by Dibang and Lohit to become the <strong>Brahmaputra</strong> in Assam.<br>• Encloses <strong>Majuli Island</strong> (world's largest inhabited river island).<br>• Enters Bangladesh near Dhubri as the <strong>Jamuna</strong>, unites with Padma, and enters Bay of Bengal as <strong>Meghna</strong>."
  },
  {
    q: "What is the Sundarbans Delta and why is it globally significant?",
    a: "Formed by the confluence of the Ganga, Brahmaputra, and Meghna rivers, the Sundarbans is the <strong>world's largest delta</strong> (spread across India and Bangladesh). Covered by the world's largest contiguous <strong>halophytic mangrove forest</strong> (dominated by <em>Sundari</em> trees / <em>Heritiera fomes</em>), it is a UNESCO World Heritage Site and the prime habitat of the Royal Bengal Tiger."
  },
  {
    q: "Why is the Godavari called 'Dakshin Ganga' and what are its features?",
    a: "At <strong>1,465 km</strong>, Godavari is the longest river of Peninsular India and second longest in India. Originates at <strong>Trimbakeshwar</strong> near Nashik (Maharashtra) and flows into Bay of Bengal through Andhra Pradesh. Major tributaries: <em>Penganga, Wainganga, Wardha (which unite as Pranhita), Indravati, Sabari, and Manjira</em>."
  },
  {
    q: "Why is the Cauvery (Kaveri) a unique perennial river in Peninsular India?",
    a: "Originates at <strong>Talakaveri</strong> in Brahmagiri Hills (Coorg, Karnataka). Unlike other peninsular rivers that dry up in winter, Cauvery receives copious rainfall in its upper catchment from the <strong>Southwest Monsoon (summer)</strong> and in its lower basin from the <strong>Northeast Monsoon (winter)</strong>. Features Shivasamudram falls (1902 hydro plant) and Hogenakkal falls."
  },
  {
    q: "Explain why Narmada and Tapti flow westward and form estuaries instead of deltas.",
    a: "Narmada (1,312 km) and Tapti (724 km) flow westwards through linear <strong>faulted Rift Valleys (Graben)</strong> created during the Himalayan collision, bounded by the Vindhya range on the north and Satpura range on the south. Because they flow through hard rocky channels with steep gradients, they carry minimal silt and discharge directly into the Arabian Sea, forming <strong>funnel-shaped Estuaries</strong> without deltas."
  },
  {
    q: "Which river in India crosses the Tropic of Cancer twice?",
    a: "The <strong>Mahi River</strong>. It originates in the Vindhya Range (Dhar district, Madhya Pradesh), flows northwards into Rajasthan (crossing the Tropic of Cancer the first time), then curves southwestwards through Gujarat (crossing the Tropic of Cancer a second time) before emptying into the Gulf of Khambhat."
  },
  {
    q: "What is the Luni River and what makes its drainage unique?",
    a: "Originating in the Aravalli Range near Pushkar (Ajmer, Rajasthan), the Luni (511 km) is the only major river of the Thar Desert. It represents <strong>Inland Drainage (Endorheic basin)</strong> because it never reaches the sea, instead getting lost and terminating in the salt marsh of the <strong>Rann of Kutch</strong> in Gujarat. Water is sweet up to Balotra, then becomes saline."
  },
  {
    q: "List India's major freshwater and saltwater lakes.",
    a: "• <strong>Freshwater:</strong> <em>Wular Lake</em> (J&K, largest freshwater lake in India, tectonic origin, fed by Jhelum), <em>Loktak Lake</em> (Manipur, famous for floating vegetative islands called <em>Phumdis</em> and Keibul Lamjao National Park), <em>Kolleru Lake</em> (AP).<br>• <strong>Saltwater / Brackish:</strong> <em>Chilika Lake</em> (Odisha, largest brackish water coastal lagoon in India), <em>Pulicat Lake</em> (Andhra/TN, barred by Sriharikota island), <em>Sambhar Lake</em> (Rajasthan, largest inland saltwater lake), <em>Vembanad Lake</em> (Kerala, longest lake in India)."
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
    question: "At which of the following Prayags does the Alaknanda River unite with the Bhagirathi River to officially form the river Ganga?",
    options: [
      "Vishnuprayag",
      "Karnaprayag",
      "Rudraprayag",
      "Devprayag"
    ],
    correct: 3,
    explanation: "At Devprayag in Tehri Garhwal district (Uttarakhand), the holy waters of the Alaknanda and Bhagirathi merge, and the resulting unified torrent flows downstream as the river Ganga."
  },
  {
    question: "Which of the following is the world's largest inhabited river island, formed by the braided channels of the Brahmaputra River?",
    options: [
      "Munroe Island",
      "Majuli Island",
      "Diu Island",
      "Havelock Island"
    ],
    correct: 1,
    explanation: "Majuli in Assam, situated between the main Brahmaputra River to the south and the Kherkutia Xuti (an anabranch) to the north, is officially recognized by Guinness World Records as the world's largest inhabited river island."
  },
  {
    question: "The famous 'Dhuandhar Falls' (Smoke Cascade) amidst the white marble rocks of Bhedaghat is formed by which river?",
    options: [
      "Mahanadi",
      "Godavari",
      "Narmada",
      "Chambal"
    ],
    correct: 2,
    explanation: "Dhuandhar Falls is situated on the Narmada River at Bhedaghat near Jabalpur in Madhya Pradesh, where the river plunges 30 meters through a narrow gorge of dazzling white marble."
  },
  {
    question: "Which of the following rivers flows through a faulted Rift Valley between the Vindhya and Satpura mountain ranges?",
    options: [
      "Yamuna",
      "Narmada",
      "Cauvery",
      "Mahanadi"
    ],
    correct: 1,
    explanation: "Narmada flows westwards through a structural rift valley (graben) formed by faulting between the Vindhyan range to the north and the Satpura range to the south."
  },
  {
    question: "The famous Loktak Lake, characterized by its unique floating circular islands of biomass called 'Phumdis', is located in which state?",
    options: [
      "Assam",
      "Meghalaya",
      "Manipur",
      "Mizoram"
    ],
    correct: 2,
    explanation: "Loktak Lake is located in Manipur. It is the largest natural freshwater lake in Northeast India, famous for its circular floating vegetative masses (phumdis) and the Keibul Lamjao National Park (home to the endangered Sangai brow-antlered deer)."
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
            ? 'border-cyan-500 bg-cyan-500/10 text-cyan-200' 
            : 'border-slate-800 hover:border-slate-700 bg-slate-800/40 text-slate-300'
        }">
          <input type="radio" name="quiz_q_${idx}" value="${oIdx}" class="w-4 h-4 text-cyan-500 focus:ring-cyan-400" ${
            isSelected ? 'checked' : ''
          } onchange="handleAnswerSelect(${idx}, ${oIdx})">
          <span class="text-sm font-medium">${opt}</span>
        </label>
      `;
    });

    qDiv.innerHTML = `
      <div class="flex items-start justify-between gap-4 mb-4">
        <h4 class="text-base font-semibold text-slate-100"><span class="text-cyan-400 mr-2">Q${idx + 1}.</span>${q.question}</h4>
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
      <div class="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center">
        <h3 class="text-2xl font-bold text-cyan-300">Your Score: ${score} / ${quizQuestions.length}</h3>
        <p class="text-sm text-slate-300 mt-2">${score >= 4 ? 'Outstanding mastery of Indian rivers, confluences, and drainage basins!' : 'Good effort! Review the Panch Prayag table and river systems above.'}</p>
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
  { title: "Indus River & Panchnad", anchor: "#indus-system", text: "Bokhar Chu glacier, Jhelum, Chenab, Ravi, Beas, Sutlej, Indus Waters Treaty 1960." },
  { title: "Ganga System & Panch Prayag", anchor: "#ganga-system", text: "Bhagirathi, Alaknanda, Vishnuprayag, Nandaprayag, Karnaprayag, Rudraprayag, Devprayag, Haridwar." },
  { title: "Ganga Tributaries: Yamuna, Son & Kosi", anchor: "#ganga-tributaries", text: "Yamuna longest right-bank, Son Amarkantak, Gomti Pilibhit, Ghaghara, Gandak, Kosi sorrow of Bihar." },
  { title: "Brahmaputra System & Majuli Island", anchor: "#brahmaputra-system", text: "Yarlung Tsangpo, Namcha Barwa U-turn, Dihang, Subansiri, Majuli world largest river island, Jamuna Bangladesh." },
  { title: "East-Flowing Rivers: Godavari, Krishna & Cauvery", anchor: "#peninsular-east", text: "Godavari Dakshin Ganga 1465 km Trimbakeshwar, Krishna Mahabaleshwar, Cauvery Talakaveri Shivasamudram perennial." },
  { title: "West-Flowing Rivers: Narmada, Tapti, Mahi & Luni", anchor: "#peninsular-west", text: "Narmada rift valley Dhuandhar marble falls, Tapti, Mahi crosses Tropic of Cancer twice, Luni inland drainage Rann of Kutch." },
  { title: "Major Lakes: Wular, Chilika, Loktak & Sambhar", anchor: "#lakes-waterfalls", text: "Wular largest freshwater, Chilika largest brackish lagoon, Loktak floating phumdis, Sambhar salt lake, Vembanad kayal." },
  { title: "Multipurpose River Valley Projects", anchor: "#dams-projects", text: "Bhakra Nangal Sutlej, Hirakud Mahanadi longest, Tehri Bhagirathi highest dam, Sardar Sarovar Narmada, DVC Damodar 1948." }
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
    <a href="${item.anchor}" onclick="closeSearchModal()" class="block p-4 rounded-xl bg-slate-800/40 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-500/30 transition-all">
      <h5 class="text-sm font-semibold text-cyan-400">${item.title}</h5>
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
