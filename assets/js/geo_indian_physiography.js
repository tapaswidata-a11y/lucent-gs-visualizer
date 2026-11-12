/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 23: Indian Physiography, Mountain Passes & Relief
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
  titleEl.textContent = title || 'Physiographic Reference';
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
    const title = container.getAttribute('data-title') || img?.alt || 'Physiographic Reference';
    const caption = container.getAttribute('data-caption') || '';
    if (img) openLightbox(img.src, title, caption);
  });
});

// --- FLASHCARDS DATA (INDIAN PHYSIOGRAPHY & RELIEF) ---
const cardsData = [
  {
    q: "What are the extreme cardinal points and dimensions of India's territory?",
    a: "• <strong>North:</strong> Indira Col (Ladakh) at 37°6' N.<br>• <strong>South (Mainland):</strong> Cape Comorin / Kanyakumari (Tamil Nadu) at 8°4' N.<br>• <strong>South (Indian Union):</strong> Indira Point / Pygmalion Point (Great Nicobar) at 6°45' N.<br>• <strong>West:</strong> Ghuar Mota (Gujarat) at 68°7' E.<br>• <strong>East:</strong> Kibithu (Arunachal Pradesh) at 97°25' E.<br>• North-South extent = <strong>3,214 km</strong>; East-West extent = <strong>2,933 km</strong>."
  },
  {
    q: "Through which 8 Indian States does the Tropic of Cancer (23°30' N) pass?",
    a: "From West to East:<br>1. <strong>Gujarat</strong><br>2. <strong>Rajasthan</strong><br>3. <strong>Madhya Pradesh</strong><br>4. <strong>Chhattisgarh</strong><br>5. <strong>Jharkhand</strong><br>6. <strong>West Bengal</strong><br>7. <strong>Tripura</strong><br>8. <strong>Mizoram</strong>."
  },
  {
    q: "What are the 3 longitudinal parallel ranges of the Himalayas?",
    a: "1. <strong>Himadri (Greater / Inner Himalayas):</strong> Average height 6,000 m. Contains the world's highest peaks: Everest (8,848.86 m), K2 (8,611 m), Kanchenjunga (8,586 m). Perennially snow-bound.<br>2. <strong>Himachal (Lesser / Middle Himalayas):</strong> Average height 3,700–4,500 m. Ranges: Pir Panjal, Dhauladhar, Mussoorie, Mahabharat. Famous for hill resorts.<br>3. <strong>Shiwaliks (Outer Himalayas):</strong> Average height 900–1,100 m. Formed of unconsolidated river gravel. Contains longitudinal valleys called <em>Duns</em> (e.g. Dehradun)."
  },
  {
    q: "Name the major mountain passes of Jammu & Kashmir and Ladakh.",
    a: "• <strong>Banihal Pass:</strong> Pierces the Pir Panjal range; contains the <em>Jawaharlal Tunnel</em>; connects Jammu to Srinagar (NH 44).<br>• <strong>Zoji La:</strong> Connects Srinagar with Kargil and Leh.<br>• <strong>Khardung La:</strong> Connects Leh to the Nubra Valley (one of the world's highest motorable passes).<br>• <strong>Burzil Pass:</strong> Connects Srinagar to the Gilgit Valley."
  },
  {
    q: "Name the major mountain passes of Himachal Pradesh, Uttarakhand, Sikkim & Arunachal.",
    a: "• <strong>Himachal Pradesh:</strong> <em>Shipki La</em> (Sutlej river enters India here; connects to Tibet); <em>Rohtang Pass</em> (Atal Tunnel; connects Kullu to Lahaul-Spiti); <em>Bara Lacha La</em> (Mandi to Leh).<br>• <strong>Uttarakhand:</strong> <em>Lipu Lekh</em> (Kailash-Mansarovar route), <em>Mana Pass</em>, <em>Niti Pass</em>.<br>• <strong>Sikkim:</strong> <em>Nathu La</em> (historic Silk Route branch to Tibet), <em>Jelep La</em> (Chumbi Valley route).<br>• <strong>Arunachal Pradesh:</strong> <em>Bomdi La</em> (connects to Lhasa), <em>Diphu Pass</em> (India-China-Myanmar tri-junction)."
  },
  {
    q: "Differentiate between the four morpho-physical belts of the Northern Plains (Bhabar, Tarai, Bhangar, Khadar).",
    a: "• <strong>Bhabar (8–10 km):</strong> Narrow porous belt along Shiwalik foothills composed of pebbles and boulders. Streams disappear underground.<br>• <strong>Tarai (10–20 km):</strong> Marshy, waterlogged, swampy belt south of Bhabar where underground streams re-emerge; dense forests (e.g. Kaziranga, Dudhwa).<br>• <strong>Bhangar:</strong> Older alluvium situated above regular floodplains; contains calcium nodules called <em>Kankar</em>.<br>• <strong>Khadar:</strong> Newer, fertile river alluvium renewed annually by floodwaters; ideal for intensive agriculture."
  },
  {
    q: "Why is the Chotanagpur Plateau called the 'Ruhr of India'?",
    a: "The Chotanagpur Plateau (covering Jharkhand, northern Odisha, and western West Bengal) contains India's richest concentration of metallic and fossil mineral wealth, including vast reserves of high-grade coal (Damodar valley), iron ore, bauxite, mica, and copper, paralleling Germany's famous Ruhr mineral basin."
  },
  {
    q: "What is the highest mountain peak in Peninsular / South India and in which hills is it located?",
    a: "<strong>Anamudi (2,695 meters)</strong>, located in the <strong>Anaimalai Hills</strong> of Kerala. It is the undisputed highest peak in Peninsular India and South of the Himalayas. The second highest peak is <strong>Doddabetta (2,637 m)</strong> in the Nilgiri Hills."
  },
  {
    q: "Where do the Western Ghats and Eastern Ghats meet?",
    a: "They converge at the <strong>Nilgiri Hills</strong> ('Blue Mountains') at the junction of Tamil Nadu, Kerala, and Karnataka. Doddabetta is the highest peak in the Nilgiris."
  },
  {
    q: "Name the three major passes across the Western Ghats (Sahyadris).",
    a: "1. <strong>Thal Ghat (Kasara Ghat):</strong> Connects Mumbai to Nashik / Kolkata.<br>2. <strong>Bhor Ghat:</strong> Connects Mumbai to Pune / Chennai.<br>3. <strong>Palghat (Palakkad Gap):</strong> Connects Palakkad (Kerala) with Coimbatore (Tamil Nadu)."
  },
  {
    q: "What are 'Kayals' in the coastal plains of India?",
    a: "<em>Kayals</em> are shallow lagoons, inlets, and backwaters found along the <strong>Malabar Coast (Kerala)</strong>, cut off from the sea by coastal sandbars. The largest kayal is <strong>Vembanad Lake</strong> (famous for the Nehru Trophy Snake Boat Race at Punnamada), and <strong>Ashtamudi Lake</strong>."
  },
  {
    q: "What are the 10 Degree, 9 Degree, and 8 Degree Channels in Indian geography?",
    a: "• <strong>Ten Degree Channel (10° N):</strong> Separates the <em>Andaman Islands</em> from the <em>Nicobar Islands</em> in the Bay of Bengal.<br>• <strong>Nine Degree Channel (9° N):</strong> Separates the island of <em>Minicoy</em> from the main <em>Lakshadweep archipelago</em>.<br>• <strong>Eight Degree Channel (8° N):</strong> Separates the Indian island of <em>Minicoy</em> from the <em>Republic of Maldives</em>."
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
    question: "The historic Nathu La Pass, which served as a branch of the ancient Silk Route, is situated in which Indian state?",
    options: [
      "Himachal Pradesh",
      "Uttarakhand",
      "Sikkim",
      "Arunachal Pradesh"
    ],
    correct: 2,
    explanation: "Nathu La is a Himalayan mountain pass located in East Sikkim on the Indo-China border at an altitude of 4,310 meters, connecting Sikkim with Tibet's Chumbi Valley."
  },
  {
    question: "Which of the following mountain passes connects Mumbai with Pune and Chennai across the Western Ghats?",
    options: [
      "Thal Ghat",
      "Bhor Ghat",
      "Palghat",
      "Haldighati"
    ],
    correct: 1,
    explanation: "Bhor Ghat connects Mumbai to Pune and the Deccan plateau (carrying the Mumbai-Pune Expressway and railway lines). Thal Ghat connects Mumbai with Nashik."
  },
  {
    question: "The 'Ten Degree Channel' (10° N Latitude) separates which two island groups in the Bay of Bengal?",
    options: [
      "North Andaman and South Andaman",
      "South Andaman and Little Andaman",
      "Andaman Islands and Nicobar Islands",
      "Minicoy and Maldives"
    ],
    correct: 2,
    explanation: "The Ten Degree Channel is a 150 km wide strait lying on the 10° N parallel of latitude, separating the Andaman group of islands to the north from the Nicobar group to the south."
  },
  {
    question: "The wet, marshy, and densely forested tract lying immediately south of the gravelly Bhabar belt in the Northern Plains is known as:",
    options: [
      "Bhangar",
      "Khadar",
      "Tarai",
      "Reh"
    ],
    correct: 2,
    explanation: "The Tarai is a low, marshy, and waterlogged belt south of the Bhabar where subterranean Himalayan streams re-emerge at the surface, creating lush wetland ecosystems."
  },
  {
    question: "Which of the following is the HIGHEST mountain peak in Peninsular India?",
    options: [
      "Doddabetta",
      "Anamudi",
      "Mahendragiri",
      "Kalsubai"
    ],
    correct: 1,
    explanation: "Anamudi (2,695 meters), located in the Anaimalai Hills of Kerala (Eravikulam National Park), is the highest peak in Peninsular India."
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
        <p class="text-sm text-slate-300 mt-2">${score >= 4 ? 'Superb! You have thoroughly mastered Indian physiography and mountain passes.' : 'Good attempt! Review the passes matrix and physiographic divisions above.'}</p>
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
  { title: "India Frontiers & Cardinal Limits", anchor: "#india-frontiers", text: "Indira Col north 37.6 N, Indira Point south 6.45 N, Kibithu east 97.25 E, Ghuar Mota west 68.7 E, 3287263 sq km." },
  { title: "Tropic of Cancer (23.5 N) States", anchor: "#india-frontiers", text: "Passes through 8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram." },
  { title: "The Himalayas: Himadri, Himachal & Shiwaliks", anchor: "#himalayas", text: "Mount Everest 8848.86 m, K2 Godwin Austen 8611 m, Kanchenjunga 8586 m, Pir Panjal, Dhauladhar, Duns Dehradun." },
  { title: "Master Himalayan Mountain Passes", anchor: "#himalayan-passes", text: "Banihal Jawaharlal tunnel, Zoji La, Rohtang Atal tunnel, Shipki La Sutlej, Lipu Lekh, Nathu La Sikkim, Bomdi La." },
  { title: "Northern Plains: Bhabar, Tarai, Bhangar, Khadar", anchor: "#northern-plains", text: "Bhabar porous pebbles, Tarai marshy forests, Bhangar older alluvium kankar, Khadar fertile new flood silt." },
  { title: "Peninsular Plateau & Chotanagpur", anchor: "#peninsular-plateau", text: "Gondwanaland ancient block, Chotanagpur Ruhr of India mineral rich, Malwa, Deccan trap basalt." },
  { title: "Western Ghats (Sahyadris) & Highest Peak Anamudi", anchor: "#western-ghats", text: "Anamudi 2695 m highest peak of South India Anaimalai, Doddabetta 2637 m Nilgiris, Thal Ghat, Bhor Ghat, Palghat gap." },
  { title: "Coastlines, Kayals & Island Channels", anchor: "#coasts-islands", text: "Konkan, Malabar Vembanad kayal backwaters, Coromandel coast, 10 Degree channel Andaman Nicobar, 9 Degree Minicoy, 8 Degree Maldives." }
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
