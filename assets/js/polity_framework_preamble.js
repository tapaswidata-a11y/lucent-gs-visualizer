/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 26: Constitutional Framework, Evolution, Constituent Assembly, Preamble & Sources
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
  titleEl.textContent = title || 'Constitutional Document';
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
  lightboxImg.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0 && currentZoom < 3.5) {
      currentZoom += 0.2;
    } else if (e.deltaY > 0 && currentZoom > 0.5) {
      currentZoom -= 0.2;
    }
    updateImageTransform();
  });

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
    if (lightboxImg) lightboxImg.style.cursor = 'grab';
  });
}

// --- CHAPTER SWITCHER DROPDOWN ---
const chapterDropdown = document.getElementById('chapterDropdown');
chapterDropdown?.addEventListener('change', (e) => {
  if (e.target.value) {
    window.location.href = e.target.value;
  }
});

// --- QUICK SEARCH MODAL (CTRL+K) ---
function openSearchModal() {
  const modal = document.getElementById('searchModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.getElementById('searchInput')?.focus();
}

function closeSearchModal() {
  const modal = document.getElementById('searchModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    openSearchModal();
  } else if (e.key === 'Escape') {
    closeSearchModal();
    closeLightbox();
  }
});

// --- 3D INTERACTIVE FLASHCARDS ---
const flashcardsData = [
  {
    q: "Who was the temporary President of the Constituent Assembly during its inaugural meeting on Dec 9, 1946?",
    a: "Dr. Sachchidananda Sinha (the oldest member, following the French practice). Dr. Rajendra Prasad was elected permanent President on Dec 11, 1946."
  },
  {
    q: "Who moved the historic 'Objective Resolution' in the Constituent Assembly, and when?",
    a: "Pandit Jawaharlal Nehru on December 13, 1946. It was unanimously adopted on January 22, 1947, and later shaped the Preamble of the Constitution."
  },
  {
    q: "Who was appointed Constitutional Advisor to the Constituent Assembly?",
    a: "Sir B.N. Rau (Benegal Narsing Rau), who prepared the original draft of the Constitution."
  },
  {
    q: "Who chaired the 7-member Drafting Committee set up on August 29, 1947?",
    a: "Dr. B.R. Ambedkar (Chief Architect & Father of the Indian Constitution). Other members: Alladi Krishnaswamy Iyer, N. Gopalaswami Ayyangar, K.M. Munshi, Mohammad Saadulla, B.L. Mitter (replaced by N. Madhava Rau), and D.P. Khaitan (replaced by T.T. Krishnamachari)."
  },
  {
    q: "How much time did the Constituent Assembly take to complete the Constitution, and what was the expenditure?",
    a: "2 years, 11 months, and 18 days. Total expenditure incurred was approximately ₹64 lakhs."
  },
  {
    q: "Who was the master calligrapher of the original Constitution of India?",
    a: "Prem Behari Narain Raizada, handwritten in flowing italic style. Illuminated and decorated by artists of Shantiniketan led by Nandalal Bose and Beohar Rammanohar Sinha."
  },
  {
    q: "Which three words were added to the Preamble by the 42nd Constitutional Amendment Act of 1976?",
    a: "'SOCIALIST', 'SECULAR', and 'INTEGRITY' (amended the phrase 'unity of the Nation' to 'unity and integrity of the Nation')."
  },
  {
    q: "In which landmark case did the Supreme Court rule that the Preamble is an integral part of the Constitution and can be amended under Article 368 without altering the Basic Structure?",
    a: "Kesavananda Bharati v. State of Kerala (1973), which overturned the earlier Berubari Union Case (1960) verdict."
  },
  {
    q: "Which provisions of the Indian Constitution were borrowed from the Government of India Act 1935?",
    a: "Federal Scheme, Office of Governor, Judiciary, Public Service Commissions, Emergency Provisions, and administrative details (~60% of constitutional structure)."
  },
  {
    q: "From which country's constitution were the Directive Principles of State Policy (DPSP) borrowed?",
    a: "The Irish Constitution (Ireland), which had itself borrowed them from the Spanish Constitution. Also borrowed: nomination of 12 members to Rajya Sabha and presidential election method."
  },
  {
    q: "Which 4 states are covered under the autonomous tribal administration of the 6th Schedule?",
    a: "Assam, Meghalaya, Tripura, and Mizoram (Remember acronym: AMTM)."
  },
  {
    q: "Which Schedule contains the 22 officially recognized languages of India, and which amendments added languages to it?",
    a: "The 8th Schedule (originally 14 languages). Added: Sindhi (21st Amend 1967), Konkani, Manipuri & Nepali (71st Amend 1992), and Bodo, Dogri, Maithili & Santhali (92nd Amend 2003)."
  }
];

function renderFlashcards() {
  const container = document.getElementById('flashcardsContainer');
  if (!container) return;

  container.innerHTML = flashcardsData.map((card, idx) => `
    <div class="flashcard-wrapper h-48 cursor-pointer select-none perspective" onclick="this.classList.toggle('flipped')">
      <div class="flashcard relative w-full h-full rounded-2xl transition-transform duration-500 transform-style-3d shadow-lg border border-slate-800 bg-slate-900/90 hover:border-amber-500/40">
        
        <!-- Front -->
        <div class="flashcard-front absolute inset-0 p-5 flex flex-col justify-between backface-hidden">
          <div class="flex items-center justify-between text-xs font-mono text-amber-400">
            <span>CARD ${idx + 1} / ${flashcardsData.length}</span>
            <span class="text-[10px] text-slate-500 uppercase tracking-wider">Tap to Flip</span>
          </div>
          <p class="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">${card.q}</p>
          <div class="flex items-center gap-1.5 text-[11px] text-slate-400">
            <i data-lucide="help-circle" class="w-3.5 h-3.5 text-amber-400"></i>
            <span>Question Prompt</span>
          </div>
        </div>

        <!-- Back -->
        <div class="flashcard-back absolute inset-0 p-5 flex flex-col justify-between backface-hidden rotate-y-180 bg-gradient-to-br from-slate-900 to-amber-950/40 rounded-2xl border border-amber-500/30">
          <div class="flex items-center justify-between text-xs font-mono text-emerald-400">
            <span>ANSWER</span>
            <span class="text-[10px] text-slate-400 uppercase tracking-wider">Tap to Re-flip</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">${card.a}</p>
          <div class="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i>
            <span>Verified Prelims Fact</span>
          </div>
        </div>

      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

// --- PRELIMS QUIZ ENGINE ---
const quizQuestions = [
  {
    q: "The Constituent Assembly of India was constituted in November 1946 under the scheme formulated by:",
    options: [
      "The Cripps Mission (1942)",
      "The Cabinet Mission Plan (1946)",
      "The Wavell Plan (1945)",
      "The Mountbatten Plan (1947)"
    ],
    answer: 1,
    explanation: "The Constituent Assembly was formulated under the provisions of the Cabinet Mission Plan (1946), comprising Lord Pethick-Lawrence, Sir Stafford Cripps, and A.V. Alexander."
  },
  {
    q: "Which of the following features of the Indian Constitution is correctly matched with its country of origin?",
    options: [
      "Concurrent List — Canadian Constitution",
      "Procedure Established by Law — Japanese Constitution",
      "Nomination of Rajya Sabha members — Australian Constitution",
      "Advisory Jurisdiction of Supreme Court — Weimar Constitution of Germany"
    ],
    answer: 1,
    explanation: "Article 21 'Procedure Established by Law' is borrowed from Japan. Concurrent List is from Australia, RS nomination is from Ireland, and Advisory Jurisdiction is from Canada."
  },
  {
    q: "Consider the following statements regarding the Preamble to the Indian Constitution:\n1. It is non-justiciable in a court of law.\n2. It has been amended only once till date.\n3. In the Berubari Union case (1960), the Supreme Court declared that the Preamble is an integral part of the Constitution.\nWhich of the statements given above are correct?",
    options: [
      "1 and 2 only",
      "2 and 3 only",
      "1 and 3 only",
      "1, 2 and 3"
    ],
    answer: 0,
    explanation: "Statements 1 and 2 are correct. Statement 3 is incorrect because in Berubari (1960) SC ruled Preamble is NOT part of Constitution; it was in Kesavananda Bharati (1973) that SC ruled Preamble IS part of the Constitution."
  },
  {
    q: "The Tenth Schedule of the Indian Constitution, dealing with disqualification on grounds of defection, was added by which Constitutional Amendment Act?",
    options: [
      "42nd Amendment Act, 1976",
      "44th Amendment Act, 1978",
      "52nd Amendment Act, 1985",
      "61st Amendment Act, 1988"
    ],
    answer: 2,
    explanation: "The 52nd Amendment Act, 1985 introduced the 10th Schedule (Anti-Defection Law) under Rajiv Gandhi's tenure. It was later reinforced by the 91st Amendment Act, 2003."
  },
  {
    q: "Which Schedule of the Indian Constitution contains special administrative provisions for the tribal areas of Assam, Meghalaya, Tripura, and Mizoram?",
    options: [
      "Fifth Schedule",
      "Sixth Schedule",
      "Seventh Schedule",
      "Eighth Schedule"
    ],
    answer: 1,
    explanation: "The Sixth Schedule specifically governs Autonomous District Councils in the 4 northeastern states of Assam, Meghalaya, Tripura, and Mizoram (AMTM), whereas the Fifth Schedule governs Scheduled Areas in other states."
  }
];

let userAnswers = {};

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = quizQuestions.map((item, qIdx) => `
    <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3" id="quizQuestion_${qIdx}">
      <div class="flex items-start justify-between gap-3">
        <span class="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">QUESTION ${qIdx + 1}</span>
        <span class="text-[11px] text-slate-500">APSC / UPSC Prelims Pattern</span>
      </div>
      <p class="text-xs sm:text-sm font-semibold text-slate-100 whitespace-pre-line leading-relaxed">${item.q}</p>
      
      <div class="space-y-2 pt-2">
        ${item.options.map((opt, oIdx) => `
          <label class="flex items-center gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 cursor-pointer text-xs text-slate-300 transition-all quiz-option" id="label_${qIdx}_${oIdx}">
            <input type="radio" name="quiz_${qIdx}" value="${oIdx}" class="text-amber-500 focus:ring-0 focus:ring-offset-0 bg-slate-900 border-slate-700" onchange="selectAnswer(${qIdx}, ${oIdx})">
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>

      <div id="explanation_${qIdx}" class="hidden pt-3 border-t border-slate-800/80 text-xs leading-relaxed"></div>
    </div>
  `).join('');
}

window.selectAnswer = function(qIdx, oIdx) {
  userAnswers[qIdx] = oIdx;
};

document.getElementById('submitQuizBtn')?.addEventListener('click', () => {
  let score = 0;
  quizQuestions.forEach((item, qIdx) => {
    const selected = userAnswers[qIdx];
    const explanationEl = document.getElementById(`explanation_${qIdx}`);
    if (!explanationEl) return;

    item.options.forEach((_, oIdx) => {
      const label = document.getElementById(`label_${qIdx}_${oIdx}`);
      if (!label) return;
      label.classList.remove('border-emerald-500', 'bg-emerald-500/10', 'border-rose-500', 'bg-rose-500/10');
      if (oIdx === item.answer) {
        label.classList.add('border-emerald-500', 'bg-emerald-500/10', 'text-emerald-200');
      } else if (selected === oIdx) {
        label.classList.add('border-rose-500', 'bg-rose-500/10', 'text-rose-200');
      }
    });

    if (selected === item.answer) {
      score++;
      explanationEl.className = "pt-3 border-t border-emerald-500/30 text-xs text-emerald-300";
      explanationEl.innerHTML = `<strong>Correct!</strong> ${item.explanation}`;
    } else {
      explanationEl.className = "pt-3 border-t border-rose-500/30 text-xs text-rose-300";
      explanationEl.innerHTML = `<strong>Incorrect.</strong> ${item.explanation}`;
    }
    explanationEl.classList.remove('hidden');
  });

  const banner = document.getElementById('quizScoreBanner');
  if (banner) {
    banner.classList.remove('hidden');
    banner.className = `p-4 rounded-2xl border text-center text-sm font-bold ${
      score >= 4 ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
    }`;
    banner.innerHTML = `You scored ${score} out of ${quizQuestions.length} (${Math.round((score/quizQuestions.length)*100)}%)! ${
      score === 5 ? 'Exceptional command over Constitutional Evolution & Sources!' : 'Review the flashcards and tables above to solidify high-yield facts.'
    }`;
  }
});

document.getElementById('resetQuizBtn')?.addEventListener('click', () => {
  userAnswers = {};
  renderQuiz();
  const banner = document.getElementById('quizScoreBanner');
  if (banner) banner.classList.add('hidden');
});

// --- SEARCH FILTER FOR SECTION CONTENT ---
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  if (!searchResults) return;

  if (query.length < 2) {
    searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">Type keywords to search sections...</p>';
    return;
  }

  const items = [
    { title: "Cabinet Mission Plan 1946", desc: "Comprising Pethick-Lawrence, Stafford Cripps, and A.V. Alexander. Recommended Constituent Assembly." },
    { title: "First Meeting of Constituent Assembly", desc: "December 9, 1946. Temporary President Dr. Sachchidananda Sinha. Boycotted by Muslim League." },
    { title: "Objective Resolution", desc: "Moved by Jawaharlal Nehru on Dec 13, 1946; adopted Jan 22, 1947. Preamble blueprint." },
    { title: "Drafting Committee", desc: "Set up Aug 29, 1947, 7 members headed by Dr. B.R. Ambedkar. Completed in 2 years, 11 months, 18 days." },
    { title: "Prem Behari Narain Raizada", desc: "Master calligrapher of the original Indian Constitution in italic style; decorated by Nandalal Bose." },
    { title: "Preamble Keywords", desc: "SOVEREIGN, SOCIALIST, SECULAR, DEMOCRATIC, REPUBLIC; Justice, Liberty, Equality, Fraternity." },
    { title: "42nd Amendment Act 1976", desc: "Added Socialist, Secular, and Integrity to the Preamble. Known as 'Mini-Constitution'." },
    { title: "Sources: Government of India Act 1935", desc: "Federal scheme, Office of Governor, Judiciary, Public Service Commissions, Emergency details." },
    { title: "Sources: British Constitution (UK)", desc: "Parliamentary government, Rule of Law, Single citizenship, Writs, Cabinet system, Bicameralism." },
    { title: "Sources: US Constitution", desc: "Fundamental Rights, Judicial Review, Independence of Judiciary, Impeachment of President, Vice-President." },
    { title: "Sources: Irish Constitution (Ireland)", desc: "Directive Principles of State Policy (DPSP), Rajya Sabha nominations, Presidential election." },
    { title: "Sources: Australian Constitution", desc: "Concurrent List, Freedom of Trade and Commerce, Joint sitting of Parliament (Art 108)." },
    { title: "Seventh Schedule", desc: "Division of powers: Union List (100), State List (61), Concurrent List (52 items)." },
    { title: "Eighth Schedule", desc: "22 Official Languages: Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santhali, Sindhi, Tamil, Telugu, Urdu." },
    { title: "Tenth Schedule", desc: "Anti-Defection Law added by 52nd Amendment 1985; revised by 91st Amendment 2003." },
    { title: "Eleventh & Twelfth Schedules", desc: "73rd Amendment (Panchayati Raj - 29 items) and 74th Amendment (Municipalities - 18 items) 1992." }
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

// INITIALIZE ON LOAD
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderFlashcards();
  renderQuiz();
  lucide.createIcons();
});
