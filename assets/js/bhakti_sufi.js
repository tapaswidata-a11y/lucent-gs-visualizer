/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 13: Religious Movements - Bhakti & Sufi (15th–16th Century AD)
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
  document.body.style.overflow = '';
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

document.getElementById('closeLightboxBtn')?.addEventListener('click', closeFullImageViewer);

lightimageViewModalEvents: {
  lightboxViewport?.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      if (currentZoom < 4) currentZoom += 0.15;
    } else {
      if (currentZoom > 0.6) currentZoom -= 0.15;
    }
    updateImageTransform();
  });

  lightboxViewport?.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isPanning = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    lightboxViewport.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateImageTransform();
  });

  window.addEventListener('mouseup', () => {
    isPanning = false;
    if (lightboxViewport) lightboxViewport.style.cursor = 'grab';
  });

  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal || e.target.classList.contains('lightbox-backdrop')) {
      closeFullImageViewer();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeFullImageViewer();
      closeSearchModal();
    }
  });
}

// Hook all zoomable images
document.querySelectorAll('[data-zoomable="true"]').forEach(el => {
  el.addEventListener('click', () => {
    const src = el.getAttribute('data-img-src') || el.querySelector('img')?.src;
    const title = el.getAttribute('data-img-title') || "Historical Artifact";
    const desc = el.getAttribute('data-img-desc') || "High-resolution historical capture from archival collections.";
    if (src) openFullImageViewer(src, title, desc);
  });
});

// --- SEARCH SYSTEM ---
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearchBtn = document.getElementById('closeSearchBtn');
const factSearchInput = document.getElementById('factSearchInput');
const searchResultsContainer = document.getElementById('searchResultsContainer');

const factsDatabase = [
  { topic: "Bhakti Origins", text: "Originated in South India led by 12 Alvars (Vaishnavite) and 63 Nayanars (Shaivite), who sang devotional hymns called Prabandhas in vernacular Tamil." },
  { topic: "Advaita Philosophy", text: "Shankaracharya (8th c.) propounded Advaita (Monism / Non-Dualism) - Brahma alone is ultimate reality, world is Maya. Established 4 Mathas at Sringeri, Badrinath, Dwarka, Puri." },
  { topic: "Vishishtadvaita", text: "Ramanuja (11th c.) propounded Vishishtadvaita (Qualified Monism) - personal God (Narayana/Vishnu) possessed of all auspicious attributes. Disciple Ramananda brought Bhakti to North India." },
  { topic: "Dvaita Philosophy", text: "Madhvacharya (13th c.) propounded Dvaita (Dualism) - absolute difference between God (Paramatman) and individual souls (Jivatman)." },
  { topic: "Shuddhadvaita", text: "Vallabhacharya (1479–1531) propounded Shuddhadvaita (Pure Non-Dualism) and Pushti Marg (Path of Divine Grace), centering on child Krishna (Shri Nathji)." },
  { topic: "Dvaitadvaita", text: "Nimbarkacharya propounded Dvaitadvaita (Dualistic Non-Dualism) or Bhedabheda philosophy, preaching devotion to Radha-Krishna." },
  { topic: "Kabir", text: "Sant Kabir (1440–1510), weaver of Varanasi, Nirguna Bhakti saint, disciple of Ramananda. Preached Hindu-Muslim unity, rejected caste, rituals, and idol worship. Verses preserved in Bijak, Sakhi, Sabad, and Guru Granth Sahib." },
  { topic: "Guru Nanak", text: "Guru Nanak Dev (1469–1539), born at Talwandi (Nankana Sahib). Founder of Sikhism, Nirguna saint, introduced community kitchen (Langar) and congregation (Sangat)." },
  { topic: "Mirabai", text: "Mirabai (1498–1546), Rathor princess of Merta and daughter-in-law of Rana Sanga (married to Bhojraj). Celebrated Krishna devotee, composed ecstatic devotional bhajans." },
  { topic: "Chaitanya Mahaprabhu", text: "Chaitanya (1486–1533), Nadia in Bengal. Propounded Gaudiya Vaishnavism and popularized congregational chanting and dancing (Sankirtan)." },
  { topic: "Tulsidas", text: "Goswami Tulsidas (1532–1623), celebrated Rama Bhakti saint, authored Ramcharitmanas (in Awadhi), Kavitawali, Gitawali, and Vinaya Patrika." },
  { topic: "Surdas", text: "Surdas (1483–1563), blind saint-poet of Agra, disciple of Vallabhacharya. Sang devotion to Krishna in Braj Bhasha, authored Sursagar and Sur Saravali." },
  { topic: "Purandar Dasa", text: "Purandar Dasa (1484–1564), foremost Haridasa saint of Karnataka, revered as the Pitamaha (Father) of Carnatic Music." },
  { topic: "Thyagaraja", text: "Thyagaraja (1767–1847), composer saint of Tamil Nadu, part of Carnatic music Trinity, composed devotional Kritis to Rama in Telugu." },
  { topic: "Jnaneshwar", text: "Jnaneshwar / Jnanadeva (1271–1296), pioneer of Bhakti in Maharashtra, authored Bhavartha Dipika (Jnaneshwari), a pioneering Marathi commentary on the Gita." },
  { topic: "Namadeva", text: "Namadeva (1270–1350), tailor by caste, disciple of Visoba Khechar. Worshipped Vithoba of Pandharpur, founded the Varkari sect. 61 of his hymns are in Guru Granth Sahib." },
  { topic: "Eknath & Tukaram", text: "Eknath (1533–1599) wrote Bhavartha Ramayana. Sant Tukaram (1598–1650) composed devotional poems called Abhangas, contemporary of Chhatrapati Shivaji." },
  { topic: "Samarth Ramdas", text: "Ramdas (1608–1681), author of Dasbodha, founded the Dharkari sect, spiritual preceptor of Shivaji." },
  { topic: "Sufism Definition", text: "Mystical movement in Islam focusing on inner spiritual realization, direct love of God (Ishq-e-Haqiqi), music (Sama), and service to humanity." },
  { topic: "Chishti Silsila", text: "Founded in India by Khwaja Muinuddin Chishti (settled in Ajmer 1206). Main saints: Bakhtiyar Kaki, Baba Farid, Nizamuddin Auliya (Mehboob-i-Ilahi), Chirag-i-Delhi, Gesu Daraz." },
  { topic: "Suhrawardi Silsila", text: "Founded by Shaikh Bahauddin Zakariya at Multan. Unlike Chishtis, they accepted state honors and accumulated wealth for public service." },
  { topic: "Qadiri Silsila", text: "Founded in India by Shah Niamatullah and Nasiruddin Muhammad Jilani. Saint Mian Mir of Lahore was closely revered by Prince Dara Shikoh." },
  { topic: "Naqshbandi Silsila", text: "Founded in India by Khwaja Baqi Billah; its most orthodox leader was Sheikh Ahmad Sirhindi (Mujaddid Alif Sani) who opposed Akbar's syncretic Din-i-Ilahi." },
  { topic: "Sufi Terminology", text: "Pir/Murshid (spiritual guide), Murid (disciple), Khanqah (hospice/monastery), Sama (musical gathering), Fana (self-annihilation in God), Ziyarat (pilgrimage to tombs)." }
];

function openSearchModal() {
  if (!searchModal) return;
  searchModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  factSearchInput?.focus();
  renderSearchResults('');
}

function closeSearchModal() {
  if (!searchModal) return;
  searchModal.classList.add('hidden');
  document.body.style.overflow = '';
}

function renderSearchResults(query) {
  if (!searchResultsContainer) return;
  const q = query.toLowerCase().trim();
  const filtered = factsDatabase.filter(f => f.topic.toLowerCase().includes(q) || f.text.toLowerCase().includes(q));
  
  if (filtered.length === 0) {
    searchResultsContainer.innerHTML = `
      <div class="p-8 text-center text-slate-400 text-sm">
        <i data-lucide="help-circle" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
        No matching concepts found for "<span class="text-amber-400">${query}</span>".
      </div>`;
  } else {
    searchResultsContainer.innerHTML = filtered.map(item => `
      <div class="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all">
        <div class="text-xs font-bold text-amber-400 mb-1 flex items-center justify-between">
          <span>${item.topic}</span>
          <span class="text-[10px] text-slate-400 font-mono">Lucent GK Core</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">${item.text}</p>
      </div>
    `).join('');
  }
  lucide.createIcons();
}

searchBtn?.addEventListener('click', openSearchModal);
closeSearchBtn?.addEventListener('click', closeSearchModal);
factSearchInput?.addEventListener('input', (e) => renderSearchResults(e.target.value));

// --- CHAPTER DROPDOWN ---
const chapterSelectorBtn = document.getElementById('chapterSelectorBtn');
const chapterDropdown = document.getElementById('chapterDropdown');

chapterSelectorBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  chapterDropdown?.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (!chapterDropdown?.contains(e.target) && e.target !== chapterSelectorBtn) {
    chapterDropdown?.classList.add('hidden');
  }
});

// --- FLASHCARDS LOGIC ---
const flashcardsData = [
  {
    q: "Who propounded the Dvaita philosophy and what was its core tenet?",
    a: "Madhvacharya (13th Century). It posits absolute Dualism (Dvaita), asserting that the individual soul (Jivatman) and God (Paramatman) are eternally distinct entities."
  },
  {
    q: "What is the primary difference between Nirguna and Saguna Bhakti?",
    a: "Nirguna Bhakti (Kabir, Nanak, Dadu) worships God without form/attributes, rejects idol worship & caste rituals. Saguna Bhakti (Mirabai, Chaitanya, Surdas, Tulsidas) worships personal deities with manifestations and avatars (Krishna, Rama)."
  },
  {
    q: "Who composed the Abhangas and which deity was the center of his devotion?",
    a: "Sant Tukaram (1598–1650), the greatest Bhakti poet from Maharashtra. He composed devotional Abhangas in praise of Lord Vithoba (Vitthala) of Pandharpur."
  },
  {
    q: "Which Sufi saint is known as 'Chirag-i-Delhi' (Lamp of Delhi)?",
    a: "Shaikh Nasiruddin Mahmud (d. 1365 AD), the prominent and charismatic saint of the Chishti order in Delhi."
  },
  {
    q: "What does the Sufi term 'Fana' signify in mystical philosophy?",
    a: "Fana signifies the annihilation or dissolution of the ego/human self in the infinite love and contemplation of the Divine (God)."
  },
  {
    q: "Who was Purandar Dasa and what is his unique title in Indian culture?",
    a: "Purandar Dasa (1484–1564) was the foremost Haridasa saint of Karnataka and is revered as the 'Karnataka Sangeeta Pitamaha' (Father of Carnatic Music)."
  }
];

let currentCardIndex = 0;
const cardInner = document.getElementById('flashcardInner');
const cardQuestion = document.getElementById('flashcardQuestion');
const cardAnswer = document.getElementById('flashcardAnswer');
const cardCounter = document.getElementById('flashcardCounter');

function updateFlashcard() {
  if (!cardInner) return;
  cardInner.classList.remove('flipped');
  setTimeout(() => {
    cardQuestion.textContent = flashcardsData[currentCardIndex].q;
    cardAnswer.textContent = flashcardsData[currentCardIndex].a;
    if (cardCounter) {
      cardCounter.textContent = `${currentCardIndex + 1} / ${flashcardsData.length}`;
    }
  }, 150);
}

document.getElementById('flashcard')?.addEventListener('click', () => {
  cardInner?.classList.toggle('flipped');
});

document.getElementById('prevCardBtn')?.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex - 1 + flashcardsData.length) % flashcardsData.length;
  updateFlashcard();
});

document.getElementById('nextCardBtn')?.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex + 1) % flashcardsData.length;
  updateFlashcard();
});

// --- QUIZ SYSTEM ---
const quizQuestions = [
  {
    q: "Which Bhakti philosopher propounded the 'Shuddhadvaita' (Pure Non-Dualism) doctrine and founded the 'Pushti Marg'?",
    options: [
      "Ramanuja",
      "Madhvacharya",
      "Vallabhacharya",
      "Nimbarkacharya"
    ],
    correct: 2,
    explanation: "Vallabhacharya (1479–1531) propounded Shuddhadvaita (Pure Non-Dualism) and founded the Pushti Marg (Path of Divine Grace) centered on Krishna."
  },
  {
    q: "The celebrated Punjabi Sufi poet whose verses are included in the Guru Granth Sahib is:",
    options: [
      "Baba Farid (Fariduddin Ganj-i-Shakar)",
      "Khwaja Qutubuddin Bakhtiyar Kaki",
      "Sheikh Ahmad Sirhindi",
      "Shaikh Bahauddin Zakariya"
    ],
    correct: 0,
    explanation: "Baba Fariduddin Ganj-i-Shakar (1175–1265) established his Khanqah at Ajodan (Punjab) and was the first great Punjabi poet of Sufism; his hymns are preserved in the Guru Granth Sahib."
  },
  {
    q: "Who was the founder of the Varkari sect centered on Lord Vithoba of Pandharpur?",
    options: [
      "Sant Jnaneshwar",
      "Sant Namadeva",
      "Sant Eknath",
      "Samarth Ramdas"
    ],
    correct: 1,
    explanation: "Sant Namadeva (1270–1350), a tailor by profession, founded the Varkari sect dedicated to the worship of Lord Vithoba (Vitthala) of Pandharpur."
  },
  {
    q: "The 'Kashf-ul-Mahjub', the earliest celebrated treatise on Sufism in India, was written by:",
    options: [
      "Khwaja Muinuddin Chishti",
      "Khwaja Ali Hujwiri (Data Ganj Baksh)",
      "Nizamuddin Auliya",
      "Amir Khusrau"
    ],
    correct: 1,
    explanation: "Khwaja Ali Hujwiri (11th Century), also known as Data Ganj Baksh, settled in Lahore and authored 'Kashf-ul-Mahjub' (Unveiling of the Veiled), the earliest systematic manual of Sufism in India."
  },
  {
    q: "Which Bhakti saint authored the 'Ramcharitmanas' in the Awadhi dialect?",
    options: [
      "Surdas",
      "Goswami Tulsidas",
      "Sant Kabir",
      "Ramananda"
    ],
    correct: 1,
    explanation: "Goswami Tulsidas (1532–1623) authored the celebrated Ramcharitmanas, Kavitawali, and Gitawali during the reign of Akbar."
  }
];

let quizAnswers = new Array(quizQuestions.length).fill(null);

function renderQuiz() {
  const quizContainer = document.getElementById('quizContainer');
  if (!quizContainer) return;
  
  quizContainer.innerHTML = quizQuestions.map((q, qIdx) => `
    <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-left transition-all">
      <div class="flex items-start justify-between gap-4 mb-4">
        <h4 class="text-sm sm:text-base font-semibold text-slate-100 flex items-center gap-2.5">
          <span class="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center shrink-0 border border-amber-500/30">${qIdx + 1}</span>
          <span>${q.q}</span>
        </h4>
        <span id="quizBadge_${qIdx}" class="text-[11px] font-bold px-2 py-0.5 rounded-full hidden"></span>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
        ${q.options.map((opt, oIdx) => `
          <button 
            type="button" 
            onclick="selectQuizOption(${qIdx}, ${oIdx})" 
            id="optBtn_${qIdx}_${oIdx}" 
            class="quiz-option-btn text-xs sm:text-sm p-3 rounded-xl border border-slate-700/80 bg-slate-800/60 hover:bg-slate-800 hover:border-amber-400/50 text-slate-300 font-medium text-left transition-all flex items-center justify-between">
            <span>${opt}</span>
            <span class="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center shrink-0 indicator"></span>
          </button>
        `).join('')}
      </div>

      <div id="quizExplain_${qIdx}" class="hidden mt-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
        <span class="font-bold text-amber-400">Explanation:</span> ${q.explanation}
      </div>
    </div>
  `).join('');
}

window.selectQuizOption = function(qIdx, oIdx) {
  quizAnswers[qIdx] = oIdx;
  const q = quizQuestions[qIdx];
  const isCorrect = (oIdx === q.correct);
  
  // Update button styles
  q.options.forEach((_, idx) => {
    const btn = document.getElementById(`optBtn_${qIdx}_${idx}`);
    if (!btn) return;
    btn.disabled = true;
    btn.classList.remove('hover:bg-slate-800', 'hover:border-amber-400/50');
    
    if (idx === q.correct) {
      btn.classList.add('bg-emerald-950/60', 'border-emerald-500', 'text-emerald-200');
      btn.querySelector('.indicator').innerHTML = '<i data-lucide="check" class="w-3 h-3 text-emerald-400"></i>';
    } else if (idx === oIdx && !isCorrect) {
      btn.classList.add('bg-rose-950/60', 'border-rose-500', 'text-rose-200');
      btn.querySelector('.indicator').innerHTML = '<i data-lucide="x" class="w-3 h-3 text-rose-400"></i>';
    } else {
      btn.classList.add('opacity-50');
    }
  });

  // Badge
  const badge = document.getElementById(`quizBadge_${qIdx}`);
  if (badge) {
    badge.classList.remove('hidden');
    if (isCorrect) {
      badge.className = "text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      badge.textContent = "Correct";
    } else {
      badge.className = "text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30";
      badge.textContent = "Incorrect";
    }
  }

  // Explanation
  const explain = document.getElementById(`quizExplain_${qIdx}`);
  if (explain) explain.classList.remove('hidden');

  updateQuizScore();
  lucide.createIcons();
};

function updateQuizScore() {
  const answeredCount = quizAnswers.filter(a => a !== null).length;
  let correctCount = 0;
  quizAnswers.forEach((ans, idx) => {
    if (ans === quizQuestions[idx].correct) correctCount++;
  });

  const scoreDisplay = document.getElementById('quizScoreDisplay');
  if (scoreDisplay) {
    scoreDisplay.textContent = `Score: ${correctCount} / ${quizQuestions.length}`;
  }
}

// Reset Quiz
document.getElementById('resetQuizBtn')?.addEventListener('click', () => {
  quizAnswers = new Array(quizQuestions.length).fill(null);
  renderQuiz();
  const scoreDisplay = document.getElementById('quizScoreDisplay');
  if (scoreDisplay) scoreDisplay.textContent = `Score: 0 / ${quizQuestions.length}`;
  lucide.createIcons();
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateFlashcard();
  renderQuiz();
  lucide.createIcons();
});
