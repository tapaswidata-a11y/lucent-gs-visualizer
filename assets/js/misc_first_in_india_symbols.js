/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 40: Miscellaneous - National Symbols, First in India & World
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
      themeToggleBtn.title = "Switch to Light Theme";
    }
    localStorage.setItem('lucent_theme', 'dark');
  }
  lucide.createIcons();
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const current = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });
}

// CHAPTER NAVIGATION DROPDOWN
const chapterDropdown = document.getElementById('chapterDropdown');
if (chapterDropdown) {
  chapterDropdown.addEventListener('change', (e) => {
    if (e.target.value) {
      window.location.href = e.target.value;
    }
  });
}

// --- ACTIVE RECALL FLASHCARDS (12 High-Yield Cards) ---
const flashcardsData = [
  {
    front: "What is the official ratio of the width to the length of the National Flag of India and who designed it?",
    back: "Ratio: 2 : 3 (Width : Length). Designed by freedom fighter Pingali Venkayya; adopted by Constituent Assembly on 22nd July 1947, featuring a navy-blue 24-spoke Ashoka Chakra."
  },
  {
    front: "From which ancient text is the National Motto 'Satyameva Jayate' inscribed below the State Emblem taken?",
    back: "Mundaka Upanishad, inscribed in Devanagari script beneath the Lion Capital of Ashoka at Sarnath (adopted on 26th January 1950)."
  },
  {
    front: "What is the official playing time of the full version of India's National Anthem?",
    back: "Approximately 52 seconds (short version: ~20 seconds). Written by Rabindranath Tagore, first sung on 27th December 1911 at the Calcutta Session of the Indian National Congress."
  },
  {
    front: "What is the National Song of India, who authored it, and from which novel was it taken?",
    back: "'Vande Mataram', composed in Sanskrit by Bankim Chandra Chattopadhyay in his 1882 Bengali novel 'Anandamath'; first sung at the 1896 INC session by Rabindranath Tagore."
  },
  {
    front: "Which calendar is adopted as the National Calendar of India and when does its first month begin?",
    back: "The Saka Calendar (based on Saka Era beginning in 78 AD). Adopted on 22nd March 1957. The first month is Chaitra (starts on 22nd March in a normal year and 21st March in a leap year)."
  },
  {
    front: "Who was the first Indian to receive a Nobel Prize and in which year and category?",
    back: "Rabindranath Tagore in 1913 in the field of Literature for his poetry collection 'Gitanjali' (first non-European Nobel laureate)."
  },
  {
    front: "Who was the first woman President and first woman Prime Minister of India?",
    back: "First Woman President: Smt. Pratibha Devisingh Patil (2007–2012). First Woman Prime Minister: Smt. Indira Gandhi (1966–1977, 1980–1984)."
  },
  {
    front: "Who was the first Indian in space and on which mission did he fly?",
    back: "Squadron Leader Rakesh Sharma on 3rd April 1984 aboard the Soviet spacecraft Soyuz T-11, spending 7 days 21 hours on the Salyut 7 space station."
  },
  {
    front: "Who was the first woman in the world to be elected Prime Minister of a country?",
    back: "Sirimavo Bandaranaike of Sri Lanka (then Ceylon), who assumed office on 21st July 1960."
  },
  {
    front: "Who was the first person to reach the South Pole and in which year?",
    back: "Norwegian explorer Roald Amundsen, who reached the South Pole on 14th December 1911, five weeks ahead of Robert Falcon Scott."
  },
  {
    front: "Who was the first woman Judge of the Supreme Court of India?",
    back: "Justice M. Fathima Beevi, appointed to the Supreme Court on 6th October 1989."
  },
  {
    front: "What is the National Aquatic Animal and National Heritage Animal of India?",
    back: "National Aquatic Animal: Ganges River Dolphin (Platanista gangetica - declared in 2009). National Heritage Animal: Indian Elephant (Elephas maximus - declared in 2010)."
  }
];

function renderFlashcards() {
  const container = document.getElementById('flashcardsContainer');
  if (!container) return;

  container.innerHTML = flashcardsData.map((card, idx) => `
    <div class="flashcard h-52 group [perspective:1000px] cursor-pointer" onclick="this.classList.toggle('flipped')">
      <div class="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg group-hover:border-amber-500/40">
        
        <!-- Front -->
        <div class="absolute inset-0 p-4 flex flex-col justify-between [backface-visibility:hidden]">
          <div class="flex items-center justify-between text-[11px] font-mono text-amber-400">
            <span>CARD #${String(idx + 1).padStart(2, '0')}</span>
            <span class="text-slate-400 flex items-center gap-1"><i data-lucide="rotate-cw" class="w-3 h-3"></i> Flip</span>
          </div>
          <div class="text-xs font-semibold text-slate-100 text-center px-1 my-auto">
            ${card.front}
          </div>
          <div class="text-[10px] text-slate-400 text-center font-mono">
            Click to reveal answer
          </div>
        </div>

        <!-- Back -->
        <div class="absolute inset-0 p-4 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 rounded-2xl border border-amber-500/30">
          <div class="flex items-center justify-between text-[11px] font-mono text-amber-400">
            <span>ANSWER #${String(idx + 1).padStart(2, '0')}</span>
            <span class="text-slate-400 flex items-center gap-1"><i data-lucide="check" class="w-3 h-3 text-amber-400"></i> Memorized</span>
          </div>
          <div class="text-xs text-slate-200 text-center px-1 leading-relaxed my-auto font-light">
            ${card.back}
          </div>
          <div class="text-[10px] text-amber-400 text-center font-mono">
            Lucent GK High-Yield Fact
          </div>
        </div>

      </div>
    </div>
  `).join('');
}

// --- HIGH-YIELD PRELIMS QUIZ (5 Multiple-Choice Questions) ---
const quizData = [
  {
    question: "The national motto of India, 'Satyameva Jayate' (Truth Alone Triumphs), inscribed in Devanagari script beneath the state emblem, is taken from which Upanishad?",
    options: [
      "Katha Upanishad",
      "Chandogya Upanishad",
      "Mundaka Upanishad",
      "Brihadaranyaka Upanishad"
    ],
    correct: 2,
    explanation: "'Satyameva Jayate' is a sacred mantra from verse 3.1.6 of the ancient Mundaka Upanishad. Following India's independence, it was adopted as the national motto on 26 January 1950 and engraved below the Lion Capital of Ashoka."
  },
  {
    question: "What is the constitutionally specified ratio of the width (height) to the length of the National Flag of India?",
    options: [
      "1 : 2",
      "2 : 3",
      "3 : 4",
      "3 : 5"
    ],
    correct: 1,
    explanation: "Under the Flag Code of India and the Constituent Assembly resolution of 22 July 1947, the ratio of the width to the length of the tricolor must strictly be 2 : 3."
  },
  {
    question: "Who was the first woman to be appointed as a Judge of the Supreme Court of India?",
    options: [
      "Justice Leila Seth",
      "Justice Anna Chandy",
      "Justice M. Fathima Beevi",
      "Justice Ruma Pal"
    ],
    correct: 2,
    explanation: "Justice M. Fathima Beevi was elevated to the Supreme Court of India on 6 October 1989, making her the first woman judge of the apex court. (Justice Leila Seth was the first woman Chief Justice of a High Court - Himachal Pradesh, 1991)."
  },
  {
    question: "The National Calendar of India based on the Saka Era commences on which Gregorian calendar date in a normal non-leap year?",
    options: [
      "1st January",
      "22nd March",
      "14th April",
      "1st May"
    ],
    correct: 1,
    explanation: "Adopted on 22 March 1957 alongside the Gregorian calendar, Chaitra 1 of the Saka National Calendar corresponds to 22 March in a normal year, and 21 March in a Gregorian leap year."
  },
  {
    question: "Who among the following was the first person in world history to set foot on the surface of the Moon?",
    options: [
      "Yuri Gagarin",
      "Neil Armstrong",
      "Buzz Aldrin",
      "Michael Collins"
    ],
    correct: 1,
    explanation: "American astronaut Neil Armstrong became the first human to step onto the lunar surface on 20 July 1969 during the Apollo 11 mission ('One small step for man, one giant leap for mankind'), followed shortly by Buzz Aldrin."
  }
];

let userAnswers = {};

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = quizData.map((q, qIdx) => `
    <div class="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5" id="question-${qIdx}">
      <div class="flex items-start gap-3">
        <span class="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
          ${qIdx + 1}
        </span>
        <h4 class="text-sm font-semibold text-slate-100 leading-snug">
          ${q.question}
        </h4>
      </div>

      <div class="space-y-2 pl-9">
        ${q.options.map((opt, optIdx) => `
          <label class="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all text-xs text-slate-300 option-label-${qIdx}" id="label-${qIdx}-${optIdx}">
            <input type="radio" name="question-${qIdx}" value="${optIdx}" class="text-amber-500 focus:ring-amber-400 bg-slate-900 border-slate-700" onchange="selectOption(${qIdx}, ${optIdx})">
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>

      <div id="explanation-${qIdx}" class="hidden pl-9 pt-2">
        <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
          <div class="font-bold text-amber-400 flex items-center gap-1.5">
            <i data-lucide="info" class="w-3.5 h-3.5"></i> Detailed Explanation:
          </div>
          <p>${q.explanation}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function selectOption(qIdx, optIdx) {
  userAnswers[qIdx] = optIdx;
}

const submitQuizBtn = document.getElementById('submitQuizBtn');
if (submitQuizBtn) {
  submitQuizBtn.addEventListener('click', () => {
    let score = 0;
    quizData.forEach((q, qIdx) => {
      const selected = userAnswers[qIdx];
      const explanationDiv = document.getElementById(`explanation-${qIdx}`);
      if (explanationDiv) explanationDiv.classList.remove('hidden');

      q.options.forEach((_, optIdx) => {
        const label = document.getElementById(`label-${qIdx}-${optIdx}`);
        if (!label) return;

        label.classList.remove('border-amber-500', 'bg-amber-500/10', 'border-rose-500', 'bg-rose-500/10');

        if (optIdx === q.correct) {
          label.classList.add('border-amber-500', 'bg-amber-500/10', 'text-amber-300');
        } else if (selected === optIdx && selected !== q.correct) {
          label.classList.add('border-rose-500', 'bg-rose-500/10', 'text-rose-300');
        }
      });

      if (selected === q.correct) {
        score++;
      }
    });

    const banner = document.getElementById('quizScoreBanner');
    if (banner) {
      banner.classList.remove('hidden');
      banner.innerHTML = `
        <div class="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-slate-900 border border-amber-500/30 text-center space-y-1">
          <h3 class="text-base font-bold text-amber-300">You Scored ${score} / ${quizData.length}</h3>
          <p class="text-xs text-slate-300">${score >= 4 ? 'Flawless recall of national symbols and historical firsts!' : 'Review the explanations above and revisit the national symbols dates.'}</p>
        </div>
      `;
    }
    lucide.createIcons();
  });
}

const resetQuizBtn = document.getElementById('resetQuizBtn');
if (resetQuizBtn) {
  resetQuizBtn.addEventListener('click', () => {
    userAnswers = {};
    const banner = document.getElementById('quizScoreBanner');
    if (banner) banner.classList.add('hidden');
    renderQuiz();
    lucide.createIcons();
  });
}

// --- FULL DETAIL IMAGE LIGHTBOX VIEWER ---
let currentZoom = 1;
let isPanning = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;

function openLightbox(src, title, caption) {
  const lightbox = document.getElementById('imageLightbox');
  const img = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const captionEl = document.getElementById('lightboxCaption');

  if (!lightbox || !img) return;

  img.src = src;
  if (titleEl) titleEl.textContent = title;
  if (captionEl) captionEl.textContent = caption;

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
  document.body.style.overflow = '';
}

function updateImageTransform() {
  const img = document.getElementById('lightboxImg');
  if (img) {
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
  }
}

const lightboxCloseBtn = document.getElementById('lightboxClose');
if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);

const zoomInBtn = document.getElementById('zoomInBtn');
if (zoomInBtn) {
  zoomInBtn.addEventListener('click', () => {
    currentZoom = Math.min(currentZoom + 0.25, 4);
    updateImageTransform();
  });
}

const zoomOutBtn = document.getElementById('zoomOutBtn');
if (zoomOutBtn) {
  zoomOutBtn.addEventListener('click', () => {
    currentZoom = Math.max(currentZoom - 0.25, 0.5);
    updateImageTransform();
  });
}

const zoomResetBtn = document.getElementById('zoomResetBtn');
if (zoomResetBtn) {
  zoomResetBtn.addEventListener('click', () => {
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
    updateImageTransform();
  });
}

const lightbox = document.getElementById('imageLightbox');
if (lightbox) {
  lightbox.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      currentZoom = Math.min(currentZoom + 0.15, 4);
    } else {
      currentZoom = Math.max(currentZoom - 0.15, 0.5);
    }
    updateImageTransform();
  }, { passive: false });

  const img = document.getElementById('lightboxImg');
  if (img) {
    img.addEventListener('mousedown', (e) => {
      isPanning = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      img.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isPanning) return;
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      updateImageTransform();
    });

    window.addEventListener('mouseup', () => {
      isPanning = false;
      if (img) img.style.cursor = 'grab';
    });
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeSearchModal();
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openSearchModal();
  }
});

// --- SEARCH MODAL ---
function openSearchModal() {
  const modal = document.getElementById('searchModal');
  const input = document.getElementById('searchInput');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (input) setTimeout(() => input.focus(), 50);
  }
}

function closeSearchModal() {
  const modal = document.getElementById('searchModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchInput && searchResults) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">Search over 40+ national symbols & historical firsts in Chapter 40...</p>';
      return;
    }

    const items = [
      { title: "National Flag (2:3)", desc: "Designed by Pingali Venkayya; adopted 22 July 1947; 24-spoke Ashoka Chakra." },
      { title: "National Emblem", desc: "Lion Capital of Ashoka at Sarnath; Satyameva Jayate from Mundaka Upanishad." },
      { title: "National Anthem (52 sec)", desc: "Jana Gana Mana by Rabindranath Tagore; first sung 1911 Calcutta INC session." },
      { title: "National Song (Vande Mataram)", desc: "Bankim Chandra Chattopadhyay's Anandamath; first sung 1896 INC session." },
      { title: "National Calendar (Saka Era)", desc: "Saka Era 78 AD; adopted 22 March 1957; first month is Chaitra." },
      { title: "First in India (Male)", desc: "Rajendra Prasad, Nehru, Tagore 1913, Rakesh Sharma 1984, Sukumar Sen, H.J. Kania." },
      { title: "First in India (Female)", desc: "Pratibha Patil, Indira Gandhi, Sarojini Naidu, Sucheta Kripalani, Fathima Beevi, Kiran Bedi." },
      { title: "First in World", desc: "Yuri Gagarin, Neil Armstrong, Amundsen (South Pole), Sirimavo Bandaranaike." },
      { title: "National Animal & Aquatic Animal", desc: "Royal Bengal Tiger (Panthera tigris); Ganges River Dolphin (Platanista gangetica)." }
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
}

// INITIALIZE ON LOAD
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderFlashcards();
  renderQuiz();
  lucide.createIcons();
});
