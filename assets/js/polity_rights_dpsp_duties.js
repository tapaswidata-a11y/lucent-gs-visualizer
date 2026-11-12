/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 27: Fundamental Rights, DPSP & Fundamental Duties
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
    q: "Why did Dr. B.R. Ambedkar describe Article 32 as the 'Heart and Soul of the Constitution'?",
    a: "Because without Article 32 (Right to Constitutional Remedies), all other Fundamental Rights would be mere paper declarations; it empowers citizens to directly approach the Supreme Court for issuance of writs."
  },
  {
    q: "What is the difference between the writ jurisdiction of the Supreme Court (Art 32) and High Courts (Art 226)?",
    a: "Under Art 32, SC can issue writs ONLY for enforcement of Fundamental Rights (it is a Fundamental Right itself). Under Art 226, High Courts can issue writs for FRs as well as 'for any other purpose' (ordinary legal rights) — giving HCs a broader writ jurisdiction."
  },
  {
    q: "Which writ literally translates to 'We Command', and against whom can it NOT be issued?",
    a: "Mandamus. It commands a public official to perform a statutory duty. It cannot be issued against a private individual, the President of India, or State Governors."
  },
  {
    q: "What are the three core protections guaranteed under Article 20 against arbitrary conviction?",
    a: "1) No ex-post facto criminal law (Art 20(1)), 2) No double jeopardy (Art 20(2) — cannot be prosecuted twice for same offence), 3) No self-incrimination (Art 20(3) — cannot be forced to witness against oneself)."
  },
  {
    q: "In which landmark case did the Supreme Court propound that Article 21 guarantees 'procedure established by law' must be just, fair, and reasonable ('Due Process')?",
    a: "Maneka Gandhi v. Union of India (1978). The court expanded Article 21 from mere animal existence to life with human dignity, overruling the narrow AK Gopalan (1950) ruling."
  },
  {
    q: "Which Constitutional Amendment Act made Elementary Education a Fundamental Right under Article 21A?",
    a: "The 86th Constitutional Amendment Act, 2002. It made free and compulsory education for all children between 6 to 14 years a Fundamental Right, implemented via the RTE Act 2009."
  },
  {
    q: "What was the original status of the Right to Property, and what is its present constitutional position?",
    a: "Originally a Fundamental Right under Art 19(1)(f) and Art 31. The 44th Amendment Act (1978) deleted it from Part III and made it an ordinary legal/constitutional right under Article 300A in Part XII."
  },
  {
    q: "Which Articles of the Constitution contain the Directive Principles of State Policy (DPSP), and can they be enforced in a court of law?",
    a: "Articles 36 to 51 in Part IV. Per Article 37, they are non-justiciable (cannot be enforced by courts), but are fundamental in the governance of the country."
  },
  {
    q: "Which Article of the Constitution directs the State to secure a Uniform Civil Code (UCC) for all citizens throughout India?",
    a: "Article 44 (under Liberal-Intellectual Directive Principles). Currently, Goa is the historic state with a Common Civil Code, and Uttarakhand became the first state to enact a UCC law in 2024."
  },
  {
    q: "Which Article embodies the Gandhian principle of organizing Village Panchayats as units of self-government?",
    a: "Article 40 of the Constitution, which later led to the 73rd Constitutional Amendment Act, 1992."
  },
  {
    q: "Which committee recommended the incorporation of Fundamental Duties into the Constitution, and by which amendment were they added?",
    a: "The Sardar Swaran Singh Committee (1976). Added to Part IVA under Article 51A by the 42nd Constitutional Amendment Act, 1976 (borrowed from USSR)."
  },
  {
    q: "How many Fundamental Duties are there currently, and which was the last duty added?",
    a: "11 Fundamental Duties (originally 10). The 11th duty (Art 51A(k) - duty of parents/guardians to provide education to their child aged 6 to 14) was added by the 86th Amendment Act, 2002."
  }
];

function renderFlashcards() {
  const container = document.getElementById('flashcardsContainer');
  if (!container) return;

  container.innerHTML = flashcardsData.map((card, idx) => `
    <div class="flashcard-wrapper h-48 cursor-pointer select-none perspective" onclick="this.classList.toggle('flipped')">
      <div class="flashcard relative w-full h-full rounded-2xl transition-transform duration-500 transform-style-3d shadow-lg border border-slate-800 bg-slate-900/90 hover:border-purple-500/40">
        
        <!-- Front -->
        <div class="flashcard-front absolute inset-0 p-5 flex flex-col justify-between backface-hidden">
          <div class="flex items-center justify-between text-xs font-mono text-purple-400">
            <span>CARD ${idx + 1} / ${flashcardsData.length}</span>
            <span class="text-[10px] text-slate-500 uppercase tracking-wider">Tap to Flip</span>
          </div>
          <p class="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">${card.q}</p>
          <div class="flex items-center gap-1.5 text-[11px] text-slate-400">
            <i data-lucide="help-circle" class="w-3.5 h-3.5 text-purple-400"></i>
            <span>Question Prompt</span>
          </div>
        </div>

        <!-- Back -->
        <div class="flashcard-back absolute inset-0 p-5 flex flex-col justify-between backface-hidden rotate-y-180 bg-gradient-to-br from-slate-900 to-purple-950/40 rounded-2xl border border-purple-500/30">
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
    q: "Which of the following Fundamental Rights cannot be suspended even during a National Emergency declared under Article 352?",
    options: [
      "Articles 14 and 19",
      "Articles 19 and 20",
      "Articles 20 and 21",
      "Articles 21 and 22"
    ],
    answer: 2,
    explanation: "By virtue of the 44th Constitutional Amendment Act, 1978, the right to protection in respect of conviction for offences (Article 20) and the right to life and personal liberty (Article 21) cannot be suspended during an emergency."
  },
  {
    q: "Which writ can be sought by any interested citizen, even if he or she is not the aggrieved party (exception to locus standi)?",
    options: [
      "Habeas Corpus",
      "Mandamus",
      "Certiorari",
      "Quo-Warranto"
    ],
    answer: 3,
    explanation: "The writ of Quo-Warranto ('By what authority?') challenges the illegal usurpation of a public substantive office and can be sought by any member of the public without having personal locus standi."
  },
  {
    q: "Which Article of the Constitution requires the State to take steps to separate the Judiciary from the Executive in the public services?",
    options: [
      "Article 45",
      "Article 48A",
      "Article 50",
      "Article 51"
    ],
    answer: 2,
    explanation: "Article 50 under Directive Principles of State Policy mandates the separation of the Judiciary from the Executive to ensure judicial independence."
  },
  {
    q: "The principle of 'Equal Pay for Equal Work' for both men and women is enshrined in the Indian Constitution as a:",
    options: [
      "Fundamental Right under Article 14",
      "Directive Principle of State Policy under Article 39(d)",
      "Fundamental Duty under Article 51A",
      "Statutory right under the Minimum Wages Act only"
    ],
    answer: 1,
    explanation: "Article 39(d) under Part IV (DPSP) directs the State to ensure equal pay for equal work for both men and women. The Supreme Court in Randhir Singh (1982) read it in conjunction with Art 14 to enforce it."
  },
  {
    q: "Consider the following statements regarding Fundamental Duties under Article 51A:\n1. They were incorporated upon the recommendation of the Sarkaria Commission.\n2. They apply to both Indian citizens and foreigners residing in India.\n3. The 11th duty was added by the 86th Constitutional Amendment Act 2002.\nWhich of the statements given above is/are correct?",
    options: [
      "3 only",
      "1 and 2 only",
      "2 and 3 only",
      "1, 2 and 3"
    ],
    answer: 0,
    explanation: "Statement 3 is correct. Statement 1 is false (recommended by Swaran Singh Committee, not Sarkaria Commission). Statement 2 is false (Fundamental Duties extend ONLY to citizens of India, not foreigners)."
  }
];

let userAnswers = {};

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = quizQuestions.map((item, qIdx) => `
    <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3" id="quizQuestion_${qIdx}">
      <div class="flex items-start justify-between gap-3">
        <span class="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">QUESTION ${qIdx + 1}</span>
        <span class="text-[11px] text-slate-500">APSC / UPSC Prelims Pattern</span>
      </div>
      <p class="text-xs sm:text-sm font-semibold text-slate-100 whitespace-pre-line leading-relaxed">${item.q}</p>
      
      <div class="space-y-2 pt-2">
        ${item.options.map((opt, oIdx) => `
          <label class="flex items-center gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 cursor-pointer text-xs text-slate-300 transition-all quiz-option" id="label_${qIdx}_${oIdx}">
            <input type="radio" name="quiz_${qIdx}" value="${oIdx}" class="text-purple-500 focus:ring-0 focus:ring-offset-0 bg-slate-900 border-slate-700" onchange="selectAnswer(${qIdx}, ${oIdx})">
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
      score >= 4 ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-purple-500/10 border-purple-500/40 text-purple-300'
    }`;
    banner.innerHTML = `You scored ${score} out of ${quizQuestions.length} (${Math.round((score/quizQuestions.length)*100)}%)! ${
      score === 5 ? 'Mastery over Fundamental Rights, Writs, DPSP & Duties achieved!' : 'Review the articles breakdown and flashcards to master trick prelims questions.'
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
    { title: "Article 12 - Definition of State", desc: "Includes Government, Parliament, state legislatures, local authorities, and statutory bodies." },
    { title: "Article 13 - Judicial Review", desc: "Laws inconsistent with or in derogation of Fundamental Rights shall be void." },
    { title: "Article 14 - Equality Before Law", desc: "Equality before law (British) and equal protection of the laws (US)." },
    { title: "Article 17 - Abolition of Untouchability", desc: "Enforced via Protection of Civil Rights Act 1955. Absolute right." },
    { title: "Article 19 - 6 Basic Freedoms", desc: "Speech, Assembly, Association, Movement, Residence, Profession. Reasonable restrictions." },
    { title: "Article 20 - Protection in Respect of Conviction", desc: "No ex-post facto law, no double jeopardy, no self-incrimination." },
    { title: "Article 21 - Right to Life & Liberty", desc: "Expanded in Maneka Gandhi (1978). Includes privacy (Puttaswamy 2017), livelihood, clean air." },
    { title: "Article 21A - Right to Education", desc: "Inserted by 86th Amendment 2002. Free education for children aged 6 to 14." },
    { title: "Article 32 - Right to Constitutional Remedies", desc: "Heart and soul of the Constitution. Power to issue 5 Writs (Habeas Corpus, Mandamus, etc.)." },
    { title: "Article 40 - Village Panchayats", desc: "Gandhian DPSP principle. Organized local self-government units." },
    { title: "Article 44 - Uniform Civil Code", desc: "Liberal DPSP principle. State shall endeavour to secure UCC for all citizens." },
    { title: "Article 50 - Separation of Judiciary", desc: "Separation of the Judiciary from the Executive in public services." },
    { title: "Article 51A - Fundamental Duties", desc: "Added by 42nd Amendment 1976 on Swaran Singh Committee recommendation. 11 duties." }
  ];

  const matched = items.filter(it => it.title.toLowerCase().includes(query) || it.desc.toLowerCase().includes(query));

  if (matched.length === 0) {
    searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">No matching topics found.</p>';
  } else {
    searchResults.innerHTML = matched.map(m => `
      <div class="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-purple-500/30 transition-all">
        <h5 class="text-xs font-bold text-purple-300">${m.title}</h5>
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
