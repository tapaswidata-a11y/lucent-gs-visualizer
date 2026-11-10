/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 4: Religious Movements (Buddhism & Jainism)
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

lightboxViewport?.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (e.deltaY < 0 && currentZoom < 4) {
    currentZoom += 0.15;
  } else if (e.deltaY > 0 && currentZoom > 0.5) {
    currentZoom = Math.max(0.5, currentZoom - 0.15);
  }
  updateImageTransform();
});

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

// --- SEARCH DATABASE ---
const religionSearchDB = [
  { title: "Dharmachakrapravartana", category: "Buddhism", snippet: "Buddha's first sermon delivered to 5 disciples at Deer Park in Sarnath ('Setting the Wheel of Law in Motion').", link: "#buddhism" },
  { title: "Four Buddhist Councils", category: "Buddhism", snippet: "1st Rajgriha (Ajatashatru), 2nd Vaishali (Kalashoka), 3rd Pataliputra (Ashoka), 4th Kundalvana (Kanishka).", link: "#buddhist-councils" },
  { title: "Hinayana vs Mahayana", category: "Buddhism", snippet: "Hinayana (Pali, orthodox, no idol worship); Mahayana (Sanskrit, Buddha as god, Bodhisattvas, idol worship). Formalized at 4th Council.", link: "#buddhist-councils" },
  { title: "Tripitakas (Three Baskets)", category: "Buddhism Literature", snippet: "Vinaya Pitaka (rules of conduct), Sutta Pitaka (teachings/sermons), Abhidhamma Pitaka (philosophical analysis).", link: "#buddhism" },
  { title: "Kaivalya of Mahavira", category: "Jainism", snippet: "Attained supreme enlightenment under a Sal tree at Jrimbhikagrama on the banks of river Rijupalika at age 42.", link: "#jainism" },
  { title: "Five Mahavratas", category: "Jainism", snippet: "Ahimsa, Satya, Asteya, Aparigraha, and Brahmacharya (added by 24th Tirthankara Mahavira).", link: "#jainism" },
  { title: "Anekantavada & Syadavada", category: "Jain Philosophy", snippet: "Core Jain epistemology: doctrine of manifold aspects of reality and the relativity of knowledge (sevenfold predication).", link: "#jainism" },
  { title: "Shvetambaras vs Digambaras", category: "Jain Schism", snippet: "Shvetambaras (white-clad, led by Sthulabhadra) and Digambaras (sky-clad/naked, led by Bhadrabahu who migrated to Shravanabelagola).", link: "#jain-councils" }
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

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSearch();
    closeFullImageViewer();
  }
});

function renderSearchResults(query) {
  const q = query.trim().toLowerCase();
  if (!q) {
    searchResults.innerHTML = '<p class="text-slate-500 text-center py-6">Type a keyword to search Buddhist councils, Tripitakas, Tirthankaras, and sects...</p>';
    return;
  }

  const matches = religionSearchDB.filter(item => 
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
    category: "Buddhist Councils",
    question: "Where was the Third Buddhist Council held, who was the patron, and which text was finalized?",
    answer: "Held at Pataliputra (250 BC) under the patronage of Emperor Ashoka, presided over by Moggaliputta Tissa. The Abhidhamma Pitaka was completed."
  },
  {
    category: "Events in Buddha's Life",
    question: "What are the five principal symbols representing the key events in Gautama Buddha's life?",
    answer: "1. Birth: Lotus and Bull\n2. Renunciation (Mahabhinishkramana): Horse (Kanthaka)\n3. Enlightenment (Nirvana): Bodhi Tree\n4. First Sermon (Dharmachakrapravartana): Wheel (Chakra)\n5. Death (Mahaparinirvana): Stupa"
  },
  {
    category: "Jain Doctrines",
    question: "Which 5th Mahavrata (moral vow) was introduced specifically by Vardhamana Mahavira?",
    answer: "Brahmacharya (Celibacy / Chastity). The earlier four vows (Ahimsa, Satya, Asteya, Aparigraha) were taught by the 23rd Tirthankara Parshvanatha."
  },
  {
    category: "Buddhist Schism",
    question: "At which Buddhist Council did the final division into Hinayana and Mahayana take place?",
    answer: "The Fourth Buddhist Council (72 AD) held at Kundalvana in Kashmir under the patronage of Kushan King Kanishka (presided by Vasumitra and Ashvaghosha)."
  },
  {
    category: "Jain Epistemology",
    question: "What is Syadavada in Jain philosophy?",
    answer: "The 'Theory of May Be' or Sevenfold Predication (Saptabhangi Naya), stating that all human knowledge is contextual, conditional, and relative."
  },
  {
    category: "Buddhist Literature",
    question: "What is the subject matter of the Milindapanho?",
    answer: "A philosophical dialogue in Pali between Indo-Greek King Menander (Milinda) and Buddhist monk Nagasena, which led to Menander's conversion to Buddhism."
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
    q: "Under the shade of which tree and on the banks of which river did Gautama Buddha attain Supreme Enlightenment (Nirvana)?",
    options: [
      "Sal tree on the banks of Rijupalika",
      "Peepal (Bodhi) tree on the banks of Niranjana",
      "Banyan tree on the banks of Ganga",
      "Peepal tree on the banks of Yamuna"
    ],
    correct: 1,
    explanation: "Buddha attained Enlightenment at age 35 at Bodh Gaya under a Peepal tree (Ficus religiosa) on the banks of river Niranjana (modern Phalgu)."
  },
  {
    q: "Who among the following was the author of 'Buddhacharita' (the poetic biography of Buddha in Sanskrit) and Vice-President of the 4th Buddhist Council?",
    options: ["Nagarjuna", "Vasumitra", "Ashvaghosha", "Asanga"],
    correct: 2,
    explanation: "Ashvaghosha was the court poet of Kanishka, vice-president of the 4th Council, and wrote Buddhacharita, Saundarananda, and Sariputraprakarana."
  },
  {
    q: "The First Jain Council was held at Pataliputra in 300 BC under the leadership of which Jain scholar?",
    options: ["Bhadrabahu", "Sthulabhadra", "Devardhi Kshamasramana", "Hemachandra"],
    correct: 1,
    explanation: "The First Jain Council was convened by Sthulabhadra at Pataliputra, where the 12 Angas were compiled and the Shvetambara tradition took formal shape."
  },
  {
    q: "Which of the following is NOT part of the Three Jewels (Triratna) of Buddhism?",
    options: ["Buddha", "Dhamma", "Ahimsa", "Sangha"],
    correct: 2,
    explanation: "The Triratna of Buddhism comprises: Buddha (the enlightened one), Dhamma (the doctrine), and Sangha (the monastic order). Ahimsa is a fundamental vow in Jainism."
  },
  {
    q: "Who was the 23rd Tirthankara of Jainism who lived approximately 250 years before Mahavira?",
    options: ["Rishabhadeva", "Parshvanatha", "Arishtanemi", "Mallinatha"],
    correct: 1,
    explanation: "Parshvanatha was the historical 23rd Tirthankara, prince of Banaras, who propounded the 4 Chaturyama vows (Ahimsa, Satya, Asteya, Aparigraha)."
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
    document.getElementById('quizQuestionBox').innerHTML = `
      <div class="text-center py-8 space-y-4">
        <div class="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center">
          <i data-lucide="award" class="w-8 h-8"></i>
        </div>
        <h4 class="font-heading text-2xl font-bold text-white">Religions Quiz Completed!</h4>
        <p class="text-slate-300 text-sm">
          You scored <strong class="text-amber-400 font-bold">${userScore} out of ${quizQuestions.length}</strong> (${percentage}%).
        </p>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          ${percentage >= 80 ? 'Exceptional mastery of Lucent Buddhism & Jainism Chapter!' : 'Good attempt! Review the Buddhist councils and Jain vows above.'}
        </p>
        <button onclick="location.reload()" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all">
          Retake Quiz
        </button>
      </div>
    `;
    lucide.createIcons();
  }
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateFlashcardUI();
  renderQuizQuestion();
  lucide.createIcons();
});
