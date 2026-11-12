/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 18: Indian National Movement - Early Phase (1885-1919)
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
  titleEl.textContent = title || 'Historical Reference';
  captionEl.textContent = caption || '';

  // Reset transforms
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

// Lightbox Event Listeners
document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
document.getElementById('zoomInBtn')?.addEventListener('click', () => {
  if (currentZoom < 3) {
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

// Pan and drag functionality inside lightbox
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

  // Wheel zoom
  lightboxImg.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0 && currentZoom < 3.5) {
      currentZoom += 0.2;
    } else if (e.deltaY > 0 && currentZoom > 0.6) {
      currentZoom -= 0.2;
    }
    updateImageTransform();
  });
}

// Close lightbox on clicking outside background
document.getElementById('imageLightbox')?.addEventListener('click', (e) => {
  if (e.target.id === 'imageLightbox') {
    closeLightbox();
  }
});

// Attach click listeners to all expandable image containers
document.querySelectorAll('.expandable-image').forEach(container => {
  container.addEventListener('click', () => {
    const img = container.querySelector('img');
    const title = container.getAttribute('data-title') || img?.alt || 'Historical Archive Image';
    const caption = container.getAttribute('data-caption') || '';
    if (img) openLightbox(img.src, title, caption);
  });
});

// --- FLASHCARDS DATA (EARLY NATIONAL MOVEMENT 1885-1919) ---
const cardsData = [
  {
    q: "When and where was the Indian National Congress (INC) founded, and who was its first President?",
    a: "Founded on 28 December 1885 at Gokuldas Tejpal Sanskrit College, Bombay. Attended by 72 delegates. Formed under the guidance of retired civil servant Allan Octavian Hume (A.O. Hume). Womesh Chandra Bonnerjee (W.C. Bonnerjee) was elected the first President."
  },
  {
    q: "Who were the prominent Moderate leaders and what was their methodology?",
    a: "Key Leaders: Dadabhai Naoroji, Gopal Krishna Gokhale, Pherozeshah Mehta, Dinshaw Wacha, Surendranath Banerjee, Badruddin Tyabji.<br>Methodology: '3 Ps' — Prayer, Petition, and Protest. They believed in constitutional agitation within the British legal framework and aimed at Indianizing legislative councils."
  },
  {
    q: "Who were the leaders of the Extremist Phase (1905–1919) and what was their philosophy?",
    a: "The 'Lal-Bal-Pal' trio: Lala Lajpat Rai (Punjab), Bal Gangadhar Tilak (Maharashtra), Bipin Chandra Pal (Bengal), along with Sri Aurobindo Ghosh. They demanded complete 'Swaraj' (Self-Rule), promoted Swadeshi, national education, and mass boycott of foreign goods. Tilak proclaimed: <em>'Swaraj is my birthright and I shall have it.'</em>"
  },
  {
    q: "Why was the Partition of Bengal (1905) executed and how did Indians resist it?",
    a: "Announced by Lord Curzon on 20 July 1905; came into effect on 16 October 1905. Ostensibly for administrative convenience, the real motive was to divide Bengali nationalism along Hindu-Muslim communal lines. Observed as Day of Mourning and Raksha Bandhan; Rabindranath Tagore composed <em>'Amar Sonar Bangla'</em>. Led to the massive Swadeshi & Boycott Movement."
  },
  {
    q: "When was the All India Muslim League founded and by whom?",
    a: "Founded on 30 December 1906 at Dacca (now Dhaka) under the leadership of Nawab Salimullah of Dacca, Nawab Mohsin-ul-Mulk, and the Aga Khan (first permanent President). Its primary goal was to safeguard Muslim political rights and foster loyalty to the British Crown."
  },
  {
    q: "What caused the Surat Split of 1907 in the INC?",
    a: "Occurred at the 1907 Surat Session chaired by Rash Behari Ghosh. Friction erupted between Moderates and Extremists over extending the Swadeshi boycott outside Bengal and electing Tilak/Lajpat Rai as President. The split weakened the nationalist movement until the 1916 reunification."
  },
  {
    q: "What was the significance of the Morley-Minto Reforms (Indian Councils Act 1909)?",
    a: "Introduced separate electorates for Muslims (institutionalizing communal representation). Lord Minto came to be known as the 'Father of Communal Electorate'. Satyendra Prasad Sinha became the first Indian appointed to the Viceroy's Executive Council as Law Member."
  },
  {
    q: "Name the major revolutionary organizations in India and abroad during this period.",
    a: "• <strong>Anushilan Samiti</strong> (1902): Pramatha Mitra, Barindra Ghosh, Bhupendranath Dutta (Bengal)<br>• <strong>Abhinav Bharat Society</strong> (1904): V.D. Savarkar (Maharashtra)<br>• <strong>India House / Indian Home Rule Society</strong> (1905): Shyamji Krishna Varma, Madan Lal Dhingra (London)<br>• <strong>Ghadar Party</strong> (1913): Lala Har Dayal, Sohan Singh Bhakna, Kartar Singh Sarabha (San Francisco, USA)."
  },
  {
    q: "What were the two Home Rule Leagues established in 1916?",
    a: "1. <strong>Tilak's League</strong> (April 1916): Based at Poona; covered Maharashtra (excluding Bombay city), Karnataka, Central Provinces, and Berar. Organs: <em>Kesari</em> (Marathi) and <em>Mahratta</em> (English).<br>2. <strong>Annie Besant's League</strong> (Sept 1916): Based at Adyar (Madras); covered Bombay city and the rest of India. Organs: <em>New India</em> and <em>Commonweal</em>."
  },
  {
    q: "What was the Lucknow Pact of 1916 and why was it historic?",
    a: "Presided over by Ambica Charan Mazumdar. Two historic achievements:<br>1. Reunification of Moderates and Extremists after the 1907 split (facilitated by Tilak and Annie Besant).<br>2. Joint Agreement between the INC and the All India Muslim League, where Congress accepted separate electorates for Muslims in return for joint constitutional demands."
  },
  {
    q: "What was the Rowlatt Act (1919) and why was it called the 'Black Act'?",
    a: "Officially named the Anarchical and Revolutionary Crimes Act, 1919 (recommended by Sir Sidney Rowlatt). It empowered the government to arrest and detain any person without warrant and try them in camera without right to appeal. Popularly denounced as <em>'No Dalil, No Vakil, No Appeal'</em>."
  },
  {
    q: "What occurred during the Jallianwala Bagh Massacre on 13 April 1919?",
    a: "On Baisakhi day at Jallianwala Bagh, Amritsar, an unarmed crowd had gathered peacefully to protest the arrest of leaders Dr. Saifuddin Kitchlew and Dr. Satyapal. Brigadier-General Reginald Dyer blocked the only narrow exit and ordered troops to open fire without warning. Hundreds were killed. Rabindranath Tagore renounced his Knighthood; Mahatma Gandhi returned his Kaiser-i-Hind medal."
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
    question: "Who among the following was the first Indian to be appointed as a member of the Viceroy's Executive Council under the Morley-Minto Reforms of 1909?",
    options: [
      "Dadabhai Naoroji",
      "Satyendra Prasad Sinha",
      "Gopal Krishna Gokhale",
      "Rash Behari Ghosh"
    ],
    correct: 1,
    explanation: "Under the Indian Councils Act 1909 (Morley-Minto Reforms), Satyendra Prasad (S.P.) Sinha became the first Indian member of the Viceroy's Executive Council, appointed as the Law Member."
  },
  {
    question: "At which of the following sessions did the historic split between Moderates and Extremists take place in the Indian National Congress?",
    options: [
      "Banaras Session 1905",
      "Calcutta Session 1906",
      "Surat Session 1907",
      "Madras Session 1908"
    ],
    correct: 2,
    explanation: "The Surat Split occurred at the 1907 INC Session on the banks of river Tapti, chaired by Rash Behari Ghosh, over ideological disputes regarding Swadeshi and leadership."
  },
  {
    question: "The Ghadar Party was established in 1913 with its headquarters located in which city?",
    options: [
      "London",
      "San Francisco",
      "Berlin",
      "Vancouver"
    ],
    correct: 1,
    explanation: "The Ghadar Party was founded in 1913 by Lala Har Dayal, Sohan Singh Bhakna, and others with its headquarters at 'Yugantar Ashram' in San Francisco, USA."
  },
  {
    question: "In the 1916 Lucknow Session of the Indian National Congress, who presided over the historic reunification of Moderates and Extremists?",
    options: [
      "Ambica Charan Mazumdar",
      "Annie Besant",
      "Bal Gangadhar Tilak",
      "Madan Mohan Malaviya"
    ],
    correct: 0,
    explanation: "Ambica Charan Mazumdar was the President of the 1916 Lucknow Session of the INC, where both the Moderate-Extremist reunion and the Congress-League Lucknow Pact occurred."
  },
  {
    question: "In protest against the Jallianwala Bagh Massacre (13 April 1919), who among the following renounced his British Knighthood?",
    options: [
      "Mahatma Gandhi",
      "Rabindranath Tagore",
      "Subramania Iyer",
      "Syed Ahmad Khan"
    ],
    correct: 1,
    explanation: "Rabindranath Tagore renounced his British Knighthood in an open letter to Viceroy Lord Chelmsford, declaring that 'the time has come when badges of honour make our shame glaring in the incongruous context of humiliation'."
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
        <p class="text-sm text-slate-300 mt-2">${score >= 4 ? 'Outstanding mastery of Early National Movement prelims facts!' : 'Good attempt! Review the flashcards and key notes above to master all concepts.'}</p>
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
  { title: "Indian National Congress (1885)", anchor: "#foundation-inc", text: "Founded by A.O. Hume at Bombay, W.C. Bonnerjee first President, 72 delegates, Gokuldas Tejpal Sanskrit College." },
  { title: "Moderate Phase (1885-1905)", anchor: "#moderates-extremists", text: "Naoroji, Gokhale, Pherozeshah Mehta, 3Ps: Prayer, Petition, Protest, constitutional agitation, council reforms." },
  { title: "Extremist Phase (1905-1919)", anchor: "#moderates-extremists", text: "Lal-Bal-Pal, Tilak, Lajpat Rai, Bipin Pal, Aurobindo Ghosh, Swaraj is my birthright, Boycott, Swadeshi." },
  { title: "Partition of Bengal (1905)", anchor: "#partition-bengal", text: "Lord Curzon, 16 October 1905, Day of Mourning, Raksha Bandhan, Amar Sonar Bangla, Swadeshi movement." },
  { title: "All India Muslim League (1906)", anchor: "#muslim-league", text: "Founded at Dacca by Nawab Salimullah, Mohsin-ul-Mulk, Aga Khan, safeguarding Muslim political interests." },
  { title: "Surat Split (1907)", anchor: "#surat-split", text: "INC 1907 session, Rash Behari Ghosh, rupture between Moderates and Extremists over boycott scope and presidency." },
  { title: "Morley-Minto Reforms (1909)", anchor: "#morley-minto", text: "Indian Councils Act 1909, separate communal electorates for Muslims, S.P. Sinha first Indian member in Executive Council." },
  { title: "Revolutionary Movements & Societies", anchor: "#revolutionary-societies", text: "Anushilan Samiti, Abhinav Bharat, Ghadar Party San Francisco, Komagata Maru, India House London, Curzon Wyllie." },
  { title: "Home Rule League Movement (1916)", anchor: "#home-rule", text: "Tilak at Poona (Kesari, Mahratta) and Annie Besant at Adyar (New India, Commonweal), self-government demands." },
  { title: "Lucknow Pact (1916)", anchor: "#lucknow-pact", text: "Presided by A.C. Mazumdar, reunion of Moderates and Extremists, Congress-Muslim League joint constitutional pact." },
  { title: "Rowlatt Act (1919)", anchor: "#rowlatt-jallianwala", text: "Black Act, Sir Sidney Rowlatt, detention without trial, No Dalil No Vakil No Appeal, nation-wide Satyagraha." },
  { title: "Jallianwala Bagh Massacre (1919)", anchor: "#rowlatt-jallianwala", text: "13 April 1919, Amritsar, General Reginald Dyer, firing on peaceful crowd, Tagore renounced Knighthood, Hunter Committee." }
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

// Keyboard shortcuts (Escape & Ctrl+K)
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

// Chapter navigation selector
document.getElementById('chapterDropdown')?.addEventListener('change', (e) => {
  const target = e.target.value;
  if (target) window.location.href = target;
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderCard();
  renderQuiz();
  lucide.createIcons();
});
