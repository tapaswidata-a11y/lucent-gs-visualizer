/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 19: The Gandhian Era (1919–1947)
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

// --- FLASHCARDS DATA (GANDHIAN ERA 1919–1947) ---
const cardsData = [
  {
    q: "What were Mahatma Gandhi's first three regional satyagrahas in India?",
    a: "1. <strong>Champaran Satyagraha (1917, Bihar):</strong> Against European planters' <em>Tinkathia system</em> (forcing indigo on 3/20th of land). Gandhi's first Civil Disobedience in India.<br>2. <strong>Ahmedabad Mill Strike (1918, Gujarat):</strong> Supported textile workers demanding 35% wage hike (Plague Bonus). Gandhi's first Hunger Strike in India.<br>3. <strong>Kheda Satyagraha (1918, Gujarat):</strong> Demanded revenue remission after crop failure. Gandhi's first Non-Cooperation in India."
  },
  {
    q: "Why was the Non-Cooperation Movement (1920–1922) launched and why was it withdrawn?",
    a: "<strong>Launched:</strong> 1 August 1920 (day B.G. Tilak died) to address the Rowlatt Act, Jallianwala Bagh massacre, and Khilafat grievances.<br><strong>Withdrawn:</strong> On 12 February 1922 (Bardoli Resolution) after the <em>Chauri Chaura incident</em> (4 Feb 1922, Gorakhpur, UP), where an agitated mob burnt a police station killing 22 policemen."
  },
  {
    q: "Who founded the Swaraj Party in 1923 and what was its objective?",
    a: "Founded on 1 January 1923 by <strong>Chitta Ranjan Das (President)</strong> and <strong>Motilal Nehru (Secretary)</strong> as the 'Congress-Khilafat Swarajya Party'.<br><strong>Objective:</strong> To enter legislative councils, wreck the 1919 Government of India Act from within ('end or mend the councils'). Vithalbhai Patel was elected Speaker of the Central Legislative Assembly in 1925."
  },
  {
    q: "What were the major revolutionary activities of the HRA and HSRA?",
    a: "• <strong>HRA (1924, Kanpur):</strong> Ram Prasad Bismil, Sachindra Sanyal. Executed <em>Kakori Train Dacoity</em> (9 Aug 1925; Bismil, Ashfaqullah Khan, Roshan Singh, Rajendra Lahiri hanged).<br>• <strong>HSRA (1928, Delhi):</strong> Formed at Feroz Shah Kotla by Bhagat Singh, Chandrashekhar Azad, Sukhdev. Assassinated Saunders (1928) to avenge Lala Lajpat Rai; bombed Central Legislative Assembly (8 April 1929; Bhagat Singh & B.K. Dutt)."
  },
  {
    q: "What was the significance of the 1929 Lahore Session of the INC?",
    a: "Presided by <strong>Jawaharlal Nehru</strong> on the banks of river Ravi.<br>• Adopted the historic goal of <strong>Purna Swaraj</strong> (Complete Independence).<br>• The newly adopted Tricolor flag was unfurled on midnight of 31 December 1929.<br>• <strong>26 January 1930</strong> was fixed to be celebrated as the First Independence Day across India."
  },
  {
    q: "Describe the Dandi March (Salt Satyagraha) of 1930.",
    a: "Began from <strong>Sabarmati Ashram</strong> on <strong>12 March 1930</strong> with 78 chosen followers. Reached <strong>Dandi</strong> (coastal Gujarat, 240 miles / 390 km away) on <strong>5 April 1930</strong>.<br>On the morning of <strong>6 April 1930</strong>, Gandhi picked up a lump of natural salt, formally breaking the Salt Law and launching the nation-wide <em>Civil Disobedience Movement</em>."
  },
  {
    q: "What were the Round Table Conferences and the Gandhi-Irwin Pact?",
    a: "• <strong>1st RTC (1930):</strong> Boycotted by Congress.<br>• <strong>Gandhi-Irwin Pact (5 March 1931):</strong> Congress agreed to suspend Civil Disobedience and participate in the 2nd RTC; British agreed to release non-violent political prisoners.<br>• <strong>2nd RTC (1931, London):</strong> Gandhi attended as sole Congress representative; talks broke down over separate communal electorates.<br>• <strong>3rd RTC (1932):</strong> Boycotted by Congress."
  },
  {
    q: "What was the Poona Pact of 1932?",
    a: "Signed on <strong>24 September 1932</strong> between <strong>Dr. B.R. Ambedkar</strong> and <strong>Madan Mohan Malaviya</strong> (representing Gandhi who was on fast unto death in Yerwada Jail against British PM Ramsay MacDonald's Communal Award).<br>Abandoned separate electorates for Depressed Classes, but increased reserved seats in provincial legislatures from 71 to <strong>147</strong>."
  },
  {
    q: "What was the Cripps Mission (1942) and how was it received?",
    a: "Sent in March 1942 under Sir Stafford Cripps to secure Indian cooperation in World War II in exchange for post-war Dominion Status and a Constituent Assembly, with a provision allowing provinces to secede.<br>Rejected by all parties. Gandhi famously characterized it as a <em>'Post-dated cheque on a crashing bank'</em>."
  },
  {
    q: "Explain the launch and features of the Quit India Movement (1942).",
    a: "Ratified by AICC at <strong>Gowalia Tank Maidan, Bombay</strong> on <strong>8 August 1942</strong>. Gandhi delivered his clarion call: <strong>'Do or Die' (Karo ya Maro)</strong>.<br>On 9 August, British launched <em>Operation Zero Hour</em>, arresting all senior leaders. The movement became leaderless and spontaneous, with parallel governments established in Ballia (Chittu Pandey), Tamluk (Jatiya Sarkar), and Satara (Nana Patil)."
  },
  {
    q: "What was the role of Netaji Subhash Chandra Bose and the INA?",
    a: "Bose resigned INC Presidency in 1939 to form the <strong>Forward Bloc</strong>. Escaped to Germany (1941) and arrived in Singapore (1943). Revived the <strong>Indian National Army (Azad Hind Fauj)</strong>, founded earlier by Captain Mohan Singh.<br>Proclaimed Provisional Government of Free India; gave slogans <em>'Delhi Chalo'</em> and <em>'Tum Mujhe Khoon Do, Main Tumhe Azadi Doonga'</em>. Set up Rani of Jhansi women's regiment under Lakshmi Sahgal."
  },
  {
    q: "What were the Cabinet Mission Plan (1946) and Mountbatten Plan (1947)?",
    a: "• <strong>Cabinet Mission (March 1946):</strong> Pethick-Lawrence, Stafford Cripps, A.V. Alexander. Rejected Pakistan; proposed three-tier grouping (A, B, C) and a Constituent Assembly.<br>• <strong>Mountbatten Plan (3 June 1947):</strong> Accepted partition of British India into India and Pakistan. Enacted as <em>Indian Independence Act 1947</em> on 18 July 1947; sovereignty transferred on 15 August 1947 with Sir Cyril Radcliffe demarcating the borders."
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
    question: "During the 1930 Civil Disobedience Movement, who led the historic Salt March from Trichinopoly to Vedaranyam on the Coromandel coast?",
    options: [
      "K. Kelappan",
      "C. Rajagopalachari",
      "T. Prakasam",
      "K. Kamaraj"
    ],
    correct: 1,
    explanation: "C. Rajagopalachari (Rajaji) organized and led the famous Vedaranyam Salt Satyagraha from Tiruchirappalli to the coastal town of Vedaranyam in Tamil Nadu in April 1930."
  },
  {
    question: "The historic Poona Pact of September 1932 resulted in which of the following agreements?",
    options: [
      "Introduction of separate electorates for the depressed classes",
      "Reservation of 147 seats for depressed classes in provincial legislatures within joint electorates",
      "Immediate grant of Dominion Status to India",
      "Establishment of an All-India Federation with princely states"
    ],
    correct: 1,
    explanation: "Under the Poona Pact between Dr. B.R. Ambedkar and Madan Mohan Malaviya (on behalf of Gandhi), separate electorates for Depressed Classes were replaced by joint electorates with reserved seats increased from 71 to 147 in provincial legislatures."
  },
  {
    question: "Who was chosen by Mahatma Gandhi as the first Individual Satyagrahi when the movement was launched in October 1940?",
    options: [
      "Jawaharlal Nehru",
      "Sardar Vallabhbhai Patel",
      "Acharya Vinoba Bhave",
      "Brahma Datt"
    ],
    correct: 2,
    explanation: "Acharya Vinoba Bhave was chosen as the 1st Individual Satyagrahi (17 October 1940 at Pavnar, Maharashtra), followed by Jawaharlal Nehru as 2nd and Brahma Datt as 3rd."
  },
  {
    question: "During the 1942 Quit India Movement, which revolutionary woman operated the clandestine 'Congress Radio' broadcasting from secret locations in Bombay?",
    options: [
      "Aruna Asaf Ali",
      "Usha Mehta",
      "Matangini Hazra",
      "Sucheta Kripalani"
    ],
    correct: 1,
    explanation: "Dr. Usha Mehta and her associates set up and operated the underground 'Secret Congress Radio' that broadcast patriotic news and Gandhi's messages across India during the Quit India Movement."
  },
  {
    question: "Who among the following prominent Indian lawyers led the legal defense of the INA officers (Prem Sahgal, Gurbaksh Dhillon, Shah Nawaz Khan) during the 1945 Red Fort trials?",
    options: [
      "Bhulabhai Desai",
      "Dr. B.R. Ambedkar",
      "K.M. Munshi",
      "C. Rajagopalachari"
    ],
    correct: 0,
    explanation: "Bhulabhai Desai was the chief defense counsel for the INA prisoners at the historic Red Fort court-martial, assisted by a panel including Jawaharlal Nehru, Tej Bahadur Sapru, and Kailash Nath Katju."
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
        <p class="text-sm text-slate-300 mt-2">${score >= 4 ? 'Superb! You have mastered the Gandhian Era and Indian Freedom Struggle.' : 'Good attempt! Review the timeline and key tables above to solidify your memory.'}</p>
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
  { title: "Early Gandhian Satyagrahas (1917–1918)", anchor: "#early-gandhi", text: "Champaran indigo Tinkathia, Ahmedabad Mill strike plague bonus, Kheda revenue remission." },
  { title: "Non-Cooperation Movement (1920–1922)", anchor: "#non-cooperation", text: "1 August 1920, boycott of foreign cloth and titles, Chauri Chaura incident 4 Feb 1922, Bardoli withdrawal." },
  { title: "Swaraj Party & Revolutionary Upsurge", anchor: "#swaraj-revolutionaries", text: "C.R. Das, Motilal Nehru, HRA Kakori robbery 1925, HSRA Bhagat Singh, Saunders murder, Assembly bomb 1929." },
  { title: "Simon Commission & Nehru Report (1927–1928)", anchor: "#simon-nehru", text: "All-white commission, Simon Go Back, Lala Lajpat Rai martyr, Motilal Nehru Report, Jinnah 14 points." },
  { title: "Lahore Session & Purna Swaraj (1929)", anchor: "#lahore-purna-swaraj", text: "Jawaharlal Nehru President, Complete Independence, tricolor on Ravi river, 26 January 1930 Independence Day." },
  { title: "Civil Disobedience & Dandi March (1930)", anchor: "#dandi-march", text: "12 March to 6 April 1930, Sabarmati to Dandi, breaking salt law, Dharasana, Frontier Gandhi, Rani Gaidinliu." },
  { title: "Round Table Conferences & Poona Pact", anchor: "#rtc-poona-pact", text: "Gandhi-Irwin Pact 1931, 2nd RTC London, Communal Award, Ambedkar-Gandhi Poona Pact 147 seats." },
  { title: "Quit India Movement (1942)", anchor: "#quit-india", text: "8 August 1942 Gowalia Tank Bombay, Do or Die, Operation Zero Hour, Aruna Asaf Ali, Usha Mehta radio, Ballia parallel govt." },
  { title: "Netaji Subhash Chandra Bose & INA", anchor: "#subhash-ina", text: "Forward Bloc, escape to Germany, Azad Hind Fauj, Singapore, Delhi Chalo, Rani Jhansi regiment, Red Fort trials 1945." },
  { title: "Independence & Partition (1946–1947)", anchor: "#independence-partition", text: "Cabinet Mission 1946, RIN Mutiny, Mountbatten Plan 3 June 1947, Indian Independence Act, Radcliffe Line." }
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
