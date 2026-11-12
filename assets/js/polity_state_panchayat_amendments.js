/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 30: State Executive, Panchayati Raj, Emergency Provisions & Landmark Amendments
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
  titleEl.textContent = title || 'Governance Reference';
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
    q: "Under which Article can the Governor of a State reserve a Bill passed by the State Legislature for the consideration of the President?",
    a: "Article 200 (Reservation of Bills) and Article 201 (Bills reserved for consideration). When reserved, the President may assent, withhold assent, or direct the Governor to return it to the House."
  },
  {
    q: "What is the key difference between the Pardoning Power of the President (Art 72) and Governor (Art 161)?",
    a: "The President can pardon death sentences and sentences inflicted by a Court Martial. The Governor CANNOT pardon a death sentence (can only suspend, remit or commute it) and has no power over Court Martial sentences."
  },
  {
    q: "Which 6 Indian States currently have a bicameral legislature (Vidhan Sabha & Vidhan Parishad)?",
    a: "Andhra Pradesh, Bihar, Karnataka, Maharashtra, Telangana, and Uttar Pradesh. (Jammu & Kashmir lost its Council upon bifurcation in 2019)."
  },
  {
    q: "Which committee first recommended the establishment of a 3-tier Panchayati Raj system in 1957?",
    a: "The Balwant Rai Mehta Committee (1957). It recommended Gram Panchayat at village level, Panchayat Samiti at block level, and Zilla Parishad at district level."
  },
  {
    q: "Where was Panchayati Raj first inaugurated in independent India, and on what historic date?",
    a: "In Nagaur district, Rajasthan, on October 2, 1959 (Mahatma Gandhi's birth anniversary), inaugurated by Prime Minister Jawaharlal Nehru. Andhra Pradesh adopted it second in 1959."
  },
  {
    q: "What is the mandatory minimum reservation for women in Panchayati Raj Institutions under Article 243D?",
    a: "Not less than one-third (33%) of the total number of seats and offices of chairpersons (several states like Bihar, MP, Uttarakhand have enhanced it to 50%)."
  },
  {
    q: "Which constitutional amendment substituted the words 'armed rebellion' in place of 'internal disturbance' in Article 352?",
    a: "The 44th Constitutional Amendment Act, 1978, to prevent the future misuse of National Emergency as occurred during 1975–1977."
  },
  {
    q: "Which Fundamental Rights CANNOT be suspended even during the proclamation of a National Emergency under Article 352?",
    a: "Article 20 (Protection in respect of conviction for offences) and Article 21 (Protection of life and personal liberty), safeguarded by the 44th Amendment Act, 1978."
  },
  {
    q: "In which landmark judgment did the Supreme Court lay down strict guidelines against the arbitrary imposition of President's Rule under Article 356?",
    a: "S.R. Bommai v. Union of India (1994). The SC held that proclamation under Art 356 is subject to judicial review, floor test is mandatory, and secularism is part of basic structure."
  },
  {
    q: "Which Constitutional Amendment lowered the voting age for citizens from 21 years to 18 years?",
    a: "The 61st Constitutional Amendment Act, 1988 (amended Article 326), brought into force in 1989 under Rajiv Gandhi's tenure."
  },
  {
    q: "Which Constitutional Amendment introduced the Goods and Services Tax (GST) regime in India?",
    a: "The 101st Constitutional Amendment Act, 2016 (introduced Article 246A, 269A, and 279A for the GST Council), effective from July 1, 2017."
  },
  {
    q: "What is the subject matter of the 106th Constitutional Amendment Act, 2023 (Nari Shakti Vandan Adhiniyam)?",
    a: "It reserves one-third (33%) of seats for women in the Lok Sabha, State Legislative Assemblies, and the Legislative Assembly of NCT of Delhi for an initial period of 15 years."
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
    q: "Under Article 213, an Ordinance promulgated by the Governor of a State ceases to operate after how much time from the reassembly of the State Legislature?",
    options: [
      "4 weeks",
      "6 weeks",
      "6 months",
      "3 months"
    ],
    answer: 1,
    explanation: "Under Article 213(2)(a), an Ordinance promulgated by the Governor ceases to operate at the expiration of 6 weeks from the reassembly of the State Legislature, unless disapproved earlier by resolutions."
  },
  {
    q: "Which constitutional Article provides for the creation or abolition of Legislative Councils (Vidhan Parishad) in States by Parliament?",
    options: [
      "Article 168",
      "Article 169",
      "Article 170",
      "Article 171"
    ],
    answer: 1,
    explanation: "Article 169 empowers Parliament to create or abolish a Legislative Council if the Legislative Assembly of that State passes a resolution to that effect by a special majority (majority of total membership + 2/3rd present & voting)."
  },
  {
    q: "The State Election Commissioner for conducting elections to Panchayats (Article 243K) is appointed by:",
    options: [
      "The Chief Election Commissioner of India",
      "The President of India",
      "The Governor of the State",
      "The Chief Justice of the High Court"
    ],
    answer: 2,
    explanation: "Under Article 243K, the State Election Commissioner is appointed by the Governor of the State, but can only be removed from office in like manner and on like grounds as a Judge of a High Court."
  },
  {
    q: "Under Article 356, what is the maximum period for which President's Rule can remain in force in a State with periodic parliamentary approval?",
    options: [
      "1 year",
      "2 years",
      "3 years",
      "5 years"
    ],
    answer: 2,
    explanation: "Under Article 356(4), the maximum period for President's Rule is 3 years (approved by Parliament every 6 months). Continuation beyond 1 year requires a National Emergency and Election Commission certification."
  },
  {
    q: "The 103rd Constitutional Amendment Act, 2019 provided for:",
    options: [
      "Goods and Services Tax (GST)",
      "Constitutional status to the National Commission for Backward Classes (NCBC)",
      "10% reservation in education and public employment for Economically Weaker Sections (EWS)",
      "National Judicial Appointments Commission (NJAC)"
    ],
    answer: 2,
    explanation: "The 103rd Amendment Act, 2019 amended Articles 15 and 16 to insert clauses 15(6) and 16(6), enabling up to 10% reservation for Economically Weaker Sections (EWS) of citizens other than SC, ST, and SEBC."
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
      score === 5 ? 'Mastery over State Executive, Panchayati Raj & Amendments achieved!' : 'Review the committee timelines and emergency rules above.'
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
    { title: "Article 153 - Governor of State", desc: "Dual role as constitutional head and Centre's representative. Pleasure of President." },
    { title: "Article 161 - Pardoning Power of Governor", desc: "Cannot pardon death sentences or court martial sentences." },
    { title: "Article 169 - Legislative Council", desc: "Parliament can abolish or create Vidhan Parishad by special majority resolution of Assembly." },
    { title: "Article 213 - Governor's Ordinances", desc: "Promulgated when Assembly is in recess; ceases 6 weeks from reassembly." },
    { title: "73rd Amendment Act 1992", desc: "Part IX, 11th Schedule (29 items), 3-tier Panchayati Raj, 1/3rd women reservation." },
    { title: "74th Amendment Act 1992", desc: "Part IXA, 12th Schedule (18 items), Municipalities (Nagar Panchayat, Council, Corp)." },
    { title: "Article 352 - National Emergency", desc: "War, External Aggression, Armed Rebellion. Art 20 & 21 can never be suspended." },
    { title: "Article 356 - President's Rule", desc: "Failure of constitutional machinery in State. Max 3 years. S.R. Bommai guidelines." },
    { title: "Article 360 - Financial Emergency", desc: "Threat to financial credit. Never declared in India." },
    { title: "101st Amendment Act 2016", desc: "Goods and Services Tax (GST) - Art 246A, 269A, 279A (GST Council)." },
    { title: "103rd Amendment Act 2019", desc: "10% reservation for Economically Weaker Sections (EWS) - Articles 15(6) and 16(6)." },
    { title: "106th Amendment Act 2023", desc: "Nari Shakti Vandan Adhiniyam - 33% reservation for women in Lok Sabha and Assemblies." }
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
