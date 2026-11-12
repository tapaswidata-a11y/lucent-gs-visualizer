/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 20: British Viceroys & Constitutional Acts (1773–1947)
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
    if (e.deltaY < 0 && currentZoom < 3.5) {
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
    const title = container.getAttribute('data-title') || img?.alt || 'Historical Archive Image';
    const caption = container.getAttribute('data-caption') || '';
    if (img) openLightbox(img.src, title, caption);
  });
});

// --- FLASHCARDS DATA (VICEROYS & CONSTITUTIONAL ACTS) ---
const cardsData = [
  {
    q: "What were the key provisions of the Regulating Act of 1773?",
    a: "• Designated the Governor of Bengal as the <strong>Governor-General of Bengal</strong> (Warren Hastings was the first).<br>• Executive Council of 4 members created to assist him.<br>• Subordinated Madras and Bombay presidencies to Bengal.<br>• Established a <strong>Supreme Court at Fort William, Calcutta</strong> (1774) with Sir Elijah Impey as Chief Justice."
  },
  {
    q: "How did Pitt's India Act of 1784 establish a 'Dual System of Control'?",
    a: "It separated commercial and political affairs of the East India Company:<br>• <strong>Court of Directors:</strong> Managed commercial affairs.<br>• <strong>Board of Control:</strong> Appointed by the British Crown to oversee civil, military, and revenue affairs.<br>• For the first time, Company territories were called <em>'British possessions in India'</em>."
  },
  {
    q: "What major changes were introduced by the Charter Act of 1813?",
    a: "• Abolished the East India Company's trade monopoly in India, opening Indian trade to all British merchants.<br>• Preserved Company monopoly only in <strong>tea trade</strong> and <strong>trade with China</strong>.<br>• Granted ₹1 lakh annually for the revival and promotion of literature and science/education.<br>• Allowed Christian missionaries to enter India to propagate religion."
  },
  {
    q: "Why is the Charter Act of 1833 called the landmark act of centralization?",
    a: "• Governor-General of Bengal was redesignated as <strong>Governor-General of India</strong>, vesting in him all civil and military powers. <strong>Lord William Bentinck</strong> became the first Governor-General of India.<br>• Deprived Bombay and Madras governors of legislative powers.<br>• Ended commercial activities of EIC entirely; it became purely an administrative body.<br>• Added a fourth member (Law Member, <strong>Lord Macaulay</strong>) to the GG's Council and appointed the 1st Law Commission."
  },
  {
    q: "What were the main features of the Government of India Act 1858?",
    a: "Passed after the 1857 Revolt (known as the 'Act for the Better Government of India'):<br>• Liquidated the East India Company and transferred government, territories, and revenues directly to the <strong>British Crown</strong>.<br>• Abolished the Board of Control and Court of Directors.<br>• Created the office of <strong>Secretary of State for India</strong> (assisted by a 15-member Council of India in London).<br>• Governor-General became the <strong>Viceroy of India</strong> (Lord Canning was the first)."
  },
  {
    q: "What were the key features of the Indian Councils Act of 1861 and 1892?",
    a: "• <strong>1861 Act:</strong> Introduced the <strong>Portfolio System</strong> (instituted by Lord Canning). Empowered Viceroy to issue ordinances during emergencies (valid for 6 months). Restored legislative powers to Madras and Bombay.<br>• <strong>1892 Act:</strong> Introduced indirect election for non-official members. Granted members the right to discuss the annual financial budget and ask questions (with 6 days notice), though no supplementary questions or voting on budget."
  },
  {
    q: "What is 'Dyarchy' and in which act was it introduced?",
    a: "Dyarchy (rule by two authorities) was introduced in the <strong>Provinces</strong> by the <strong>Government of India Act 1919 (Montagu-Chelmsford Reforms)</strong>.<br>Provincial subjects were divided into:<br>1. <strong>Reserved Subjects</strong> (Police, Justice, Land Revenue, Finance) administered by Governor and his Executive Council without responsibility to legislature.<br>2. <strong>Transferred Subjects</strong> (Education, Health, Agriculture, Local Government) administered by Governor with elected Indian Ministers."
  },
  {
    q: "What were the monumental provisions of the Government of India Act 1935?",
    a: "• Proposed an <strong>All-India Federation</strong> consisting of British Indian provinces and princely states (never materialized).<br>• Abolished Dyarchy in provinces and introduced <strong>Provincial Autonomy</strong>.<br>• Introduced Dyarchy at the Centre (Foreign Affairs and Defence reserved).<br>• Created 3 legislative lists: Federal, Provincial, Concurrent.<br>• Established the <strong>Federal Court</strong> (1937) and <strong>Reserve Bank of India</strong> (1935).<br>• Extended communal franchises and separated Burma from India."
  },
  {
    q: "Why is Lord Cornwallis remembered as the 'Father of Civil Services in India'?",
    a: "• Separated commercial and administrative branches; banned private trade and acceptance of presents by Company servants.<br>• Organized covenanted civil service with high salaries and merit promotions.<br>• Established the <strong>Cornwallis Code (1793)</strong> based on separation of revenue collection from judicial administration.<br>• Introduced the <strong>Permanent Settlement of Bengal (1793)</strong>."
  },
  {
    q: "What was Lord Dalhousie's 'Doctrine of Lapse' and which states were annexed?",
    a: "A policy stipulating that if an Indian ruler of a protected state died without a natural male heir, his state would 'lapse' to the British Crown (adopted sons were denied sovereign succession).<br>States annexed in chronological order:<br>1. <strong>Satara</strong> (1848)<br>2. <strong>Jaitpur & Sambalpur</strong> (1849)<br>3. <strong>Baghat</strong> (1850)<br>4. <strong>Udaipur</strong> (1852)<br>5. <strong>Jhansi</strong> (1853)<br>6. <strong>Nagpur</strong> (1854).<br><em>Note: Awadh was annexed in 1856 on the pretext of 'misgovernance' (Outram Report), not the Doctrine of Lapse.</em>"
  },
  {
    q: "Why was Lord Ripon called 'Ripon the Good' and 'Father of Local Self-Government'?",
    a: "• <strong>Local Self-Government Resolution (1882):</strong> Established rural district boards and urban municipalities with non-official majorities and elected chairmen.<br>• Repealed Lord Lytton's repressive <strong>Vernacular Press Act</strong> (1882).<br>• Passed the <strong>First Factory Act (1881)</strong> to improve child labor conditions in factories.<br>• Conducted the <strong>First Synchronous Census of India</strong> (1881).<br>• Backed the <strong>Ilbert Bill (1883)</strong> allowing Indian judges to try European offenders."
  },
  {
    q: "Who was the only Viceroy of India to be murdered in office?",
    a: "<strong>Lord Mayo (1869–1872)</strong>. He was assassinated by an Afghan convict named Sher Ali Afridi at Port Blair in the Andaman Islands on 8 February 1872 during an official inspection visit. Mayo had introduced financial decentralization (1870) and conducted India's first non-synchronous census (1872)."
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
    question: "Which of the following British Acts ended the East India Company's trade monopoly in India, while retaining its monopoly only over tea trade and trade with China?",
    options: [
      "Regulating Act of 1773",
      "Charter Act of 1793",
      "Charter Act of 1813",
      "Charter Act of 1833"
    ],
    correct: 2,
    explanation: "The Charter Act of 1813 deprived the East India Company of its commercial trade monopoly in India, opening it to all private British merchants, while preserving its monopoly over tea trade and trade with China for another 20 years."
  },
  {
    question: "Who was the first Governor-General of India appointed under the Charter Act of 1833?",
    options: [
      "Lord Warren Hastings",
      "Lord Cornwallis",
      "Lord William Bentinck",
      "Lord Dalhousie"
    ],
    correct: 2,
    explanation: "Under the Charter Act of 1833, the Governor-General of Bengal was elevated to 'Governor-General of India', and Lord William Bentinck became the first person to hold this office."
  },
  {
    question: "Under Lord Dalhousie's Doctrine of Lapse, which of the following was the VERY FIRST Indian princely state to be annexed by the British?",
    options: [
      "Jhansi",
      "Satara",
      "Nagpur",
      "Sambalpur"
    ],
    correct: 1,
    explanation: "Satara in Maharashtra was the first state annexed under Dalhousie's Doctrine of Lapse in 1848, followed by Jaitpur and Sambalpur in 1849."
  },
  {
    question: "The famous 'Ilbert Bill Controversy' that shook British India in 1883 occurred during the viceroyalty of:",
    options: [
      "Lord Lytton",
      "Lord Ripon",
      "Lord Dufferin",
      "Lord Curzon"
    ],
    correct: 1,
    explanation: "The Ilbert Bill of 1883, introduced during the viceroyalty of Lord Ripon by law member Sir C.P. Ilbert, aimed to grant Indian district magistrates and sessions judges the power to try European British subjects, provoking fierce racist opposition from Anglo-Indians."
  },
  {
    question: "Which British Act introduced bicameralism (Council of State and Legislative Assembly) and direct elections for the first time in India at the Central level?",
    options: [
      "Indian Councils Act 1892",
      "Indian Councils Act 1909",
      "Government of India Act 1919",
      "Government of India Act 1935"
    ],
    correct: 2,
    explanation: "The Government of India Act 1919 (Montagu-Chelmsford Reforms) introduced a bicameral legislature at the Centre consisting of the Council of State (Upper House) and the Legislative Assembly (Lower House) with a majority of members chosen by direct election."
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
        <p class="text-sm text-slate-300 mt-2">${score >= 4 ? 'Excellent! You have mastered British Constitutional Acts and Viceroys.' : 'Good attempt! Review the master chronological tables above to master all prelims questions.'}</p>
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
  { title: "Regulating Act 1773 & Pitt's India Act 1784", anchor: "#constitutional-acts", text: "Governor of Bengal to Governor-General, Supreme Court Calcutta, Board of Control, Dual government." },
  { title: "Charter Acts (1793, 1813, 1833, 1853)", anchor: "#constitutional-acts", text: "End of trade monopoly, 1833 Governor General of India William Bentinck, open civil services exam 1853." },
  { title: "Government of India Act 1858", anchor: "#crown-rule-acts", text: "End of Company rule, Crown sovereignty, Secretary of State with 15 members, Viceroy Canning." },
  { title: "Indian Councils Acts (1861 & 1892)", anchor: "#crown-rule-acts", text: "Portfolio system Canning, ordinances, indirect election, budget discussion without voting." },
  { title: "Morley-Minto Reforms 1909 & GoI Act 1919", anchor: "#crown-rule-acts", text: "Separate communal electorates, S.P. Sinha, Dyarchy in provinces, bicameral legislature at Centre." },
  { title: "Government of India Act 1935", anchor: "#crown-rule-acts", text: "All-India Federation, Provincial Autonomy, Dyarchy at Centre, Federal Court 1937, Reserve Bank 1935." },
  { title: "Governors-General of Bengal (1773–1833)", anchor: "#gg-bengal", text: "Warren Hastings, Cornwallis Permanent Settlement, Wellesley Subsidiary Alliance, Lord Hastings Sagauli." },
  { title: "Governors-General of India (1833–1858)", anchor: "#gg-india", text: "William Bentinck Sati abolition, Metcalfe press liberator, Dalhousie Doctrine of Lapse, Railways 1853." },
  { title: "Viceroys of India (1858–1947)", anchor: "#viceroys-india", text: "Canning, Mayo murdered, Lytton Vernacular Press Act, Ripon Local Self-Govt, Curzon Bengal partition, Mountbatten." }
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
