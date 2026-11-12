/**
 * Lucent GK Interactive Visualizer
 * Application Logic for Section 42: Miscellaneous - Computer Science & Information Technology
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
    front: "Who is recognized as the 'Father of the Computer' and what was his landmark mechanical design?",
    back: "Charles Babbage, who designed the Difference Engine (1822) and the general-purpose programmable Analytical Engine (1834) incorporating input, store, mill (ALU), and output."
  },
  {
    front: "What primary electronic component characterized each of the first four generations of computers?",
    back: "1st Gen: Vacuum Tubes; 2nd Gen: Transistors (Shockley, Bardeen, Brattain 1947); 3rd Gen: Integrated Circuits (ICs - Jack Kilby 1958); 4th Gen: Microprocessors (VLSI - Intel 4004 in 1971)."
  },
  {
    front: "What is the key difference between RAM and ROM?",
    back: "RAM (Random Access Memory) is read/write and volatile (loses data on power down). ROM (Read Only Memory) is non-volatile and permanently stores startup firmware such as the BIOS."
  },
  {
    front: "How many bits are in a Nibble, a Byte, and an IPv4 address?",
    back: "1 Nibble = 4 Bits; 1 Byte = 8 Bits; 1 IPv4 Address = 32 Bits (4 octets, e.g. 192.168.1.1). In contrast, IPv6 is 128 Bits."
  },
  {
    front: "Which two logic gates are classified as 'Universal Gates' and why?",
    back: "NAND and NOR gates. They are called universal because any other Boolean logic gate (AND, OR, NOT, XOR, XNOR) can be constructed exclusively using combinations of either NAND or NOR gates alone."
  },
  {
    front: "What are the seven layers of the OSI Reference Model from Layer 1 to Layer 7?",
    back: "Layer 1: Physical; Layer 2: Data Link; Layer 3: Network; Layer 4: Transport; Layer 5: Session; Layer 6: Presentation; Layer 7: Application (Mnemonic: 'Please Do Not Throw Sausage Pizza Away')."
  },
  {
    front: "What is the function of the Domain Name System (DNS) on the Internet?",
    back: "DNS translates human-readable domain names (like www.google.com) into numerical machine-routable IP addresses (like 142.250.190.46) on UDP/TCP Port 53."
  },
  {
    front: "What is Cache Memory and where is it situated in the memory hierarchy?",
    back: "Extremely high-speed Static RAM (SRAM) placed directly on or adjacent to the CPU chip between the registers and main dynamic RAM (DRAM), buffering frequently accessed instructions."
  },
  {
    front: "Differentiate between a Computer Virus and a Computer Worm.",
    back: "A Computer Virus requires a host file or program to attach itself to and needs user execution to spread. A Computer Worm is standalone malware that self-replicates across networks autonomously without needing a host program."
  },
  {
    front: "What is Phishing in cybersecurity?",
    back: "A social engineering attack where malicious actors deceive victims into revealing sensitive personal credentials (passwords, credit cards, OTPs) by masquerading as legitimate trusted institutions."
  },
  {
    front: "Who invented the World Wide Web (WWW) and when?",
    back: "Sir Tim Berners-Lee in 1989 while working at CERN (European Organization for Nuclear Research) in Switzerland, writing the first web browser and HTTP protocol."
  },
  {
    front: "What is the difference between a Compiler and an Interpreter?",
    back: "A Compiler scans and translates the entire high-level source code into machine code in one single batch pass before execution (e.g. C, C++). An Interpreter translates and executes the source code line-by-line sequentially (e.g. Python, JavaScript)."
  }
];

function renderFlashcards() {
  const container = document.getElementById('flashcardsContainer');
  if (!container) return;

  container.innerHTML = flashcardsData.map((card, idx) => `
    <div class="flashcard h-52 group [perspective:1000px] cursor-pointer" onclick="this.classList.toggle('flipped')">
      <div class="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg group-hover:border-cyan-500/40">
        
        <!-- Front -->
        <div class="absolute inset-0 p-4 flex flex-col justify-between [backface-visibility:hidden]">
          <div class="flex items-center justify-between text-[11px] font-mono text-cyan-400">
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
        <div class="absolute inset-0 p-4 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 rounded-2xl border border-cyan-500/30">
          <div class="flex items-center justify-between text-[11px] font-mono text-cyan-400">
            <span>ANSWER #${String(idx + 1).padStart(2, '0')}</span>
            <span class="text-slate-400 flex items-center gap-1"><i data-lucide="check" class="w-3 h-3 text-cyan-400"></i> Memorized</span>
          </div>
          <div class="text-xs text-slate-200 text-center px-1 leading-relaxed my-auto font-light">
            ${card.back}
          </div>
          <div class="text-[10px] text-cyan-400 text-center font-mono">
            Lucent GK Computer High-Yield
          </div>
        </div>

      </div>
    </div>
  `).join('');
}

// --- HIGH-YIELD PRELIMS QUIZ (5 Multiple-Choice Questions) ---
const quizData = [
  {
    question: "Which electronic component served as the fundamental switching and calculating unit in First-Generation computers (e.g., ENIAC, UNIVAC)?",
    options: [
      "Transistors",
      "Vacuum Tubes (Thermionic Valves)",
      "Integrated Circuits (ICs)",
      "Microprocessors"
    ],
    correct: 1,
    explanation: "First-generation computers (1940s–1950s) relied on thousands of large, fragile vacuum tubes (thermionic valves) that consumed enormous electrical power and produced substantial heat, requiring continuous air conditioning."
  },
  {
    question: "In computer memory hierarchy, which type of memory operates with the fastest access time and smallest latency between the CPU core and dynamic RAM?",
    options: [
      "Virtual Memory",
      "Flash ROM",
      "Cache Memory (SRAM)",
      "Hard Disk Drive"
    ],
    correct: 2,
    explanation: "Cache memory, implemented using high-speed Static RAM (SRAM) on the processor die, bridges the speed disparity between the fast CPU registers and the relatively slower main DRAM memory."
  },
  {
    question: "How many bits are used to represent an IPv4 address and an IPv6 address, respectively?",
    options: [
      "16 bits and 32 bits",
      "32 bits and 64 bits",
      "32 bits and 128 bits",
      "64 bits and 128 bits"
    ],
    correct: 2,
    explanation: "An IPv4 address consists of 32 bits divided into 4 octets (written in dotted-decimal format, e.g., 172.16.254.1), allowing ~4.29 billion addresses. IPv6 was introduced with 128 bits written in hexadecimal notation, providing 2¹²⁸ unique addresses."
  },
  {
    question: "Which of the following logic gates are regarded as 'Universal Logic Gates' in digital electronics?",
    options: [
      "AND and OR",
      "NAND and NOR",
      "XOR and XNOR",
      "NOT and AND"
    ],
    correct: 1,
    explanation: "NAND and NOR gates are termed Universal Gates because any basic logic function (AND, OR, NOT, XOR) and complex arithmetic circuit can be realized solely using interconnected networks of either NAND or NOR gates."
  },
  {
    question: "What is the primary operational distinction between a Computer Virus and a Computer Worm?",
    options: [
      "Viruses only target Linux, whereas worms target Windows",
      "A virus requires a host program or file to propagate, while a worm self-replicates across networks autonomously",
      "Worms are hardware-based while viruses are software-based",
      "A virus can be removed by firewalls, but worms cannot"
    ],
    correct: 1,
    explanation: "A computer virus cannot spread on its own; it inserts itself into an existing executable host file and executes when the infected host runs. A computer worm is an autonomous standalone malware program that exploits network vulnerabilities to duplicate and spread itself across connected devices without human intervention."
  }
];

let userAnswers = {};

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = quizData.map((q, qIdx) => `
    <div class="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5" id="question-${qIdx}">
      <div class="flex items-start gap-3">
        <span class="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
          ${qIdx + 1}
        </span>
        <h4 class="text-sm font-semibold text-slate-100 leading-snug">
          ${q.question}
        </h4>
      </div>

      <div class="space-y-2 pl-9">
        ${q.options.map((opt, optIdx) => `
          <label class="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all text-xs text-slate-300 option-label-${qIdx}" id="label-${qIdx}-${optIdx}">
            <input type="radio" name="question-${qIdx}" value="${optIdx}" class="text-cyan-500 focus:ring-cyan-400 bg-slate-900 border-slate-700" onchange="selectOption(${qIdx}, ${optIdx})">
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>

      <div id="explanation-${qIdx}" class="hidden pl-9 pt-2">
        <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
          <div class="font-bold text-cyan-400 flex items-center gap-1.5">
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

        label.classList.remove('border-cyan-500', 'bg-cyan-500/10', 'border-rose-500', 'bg-rose-500/10');

        if (optIdx === q.correct) {
          label.classList.add('border-cyan-500', 'bg-cyan-500/10', 'text-cyan-300');
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
        <div class="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-slate-900 border border-cyan-500/30 text-center space-y-1">
          <h3 class="text-base font-bold text-cyan-300">You Scored ${score} / ${quizData.length}</h3>
          <p class="text-xs text-slate-300">${score >= 4 ? 'Mastery of computer architecture, networking, and IT security demonstrated!' : 'Review the detailed explanations above and revisit OSI layers and memory types.'}</p>
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
      searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">Search over 40+ computer & networking concepts in Chapter 42...</p>';
      return;
    }

    const items = [
      { title: "Generations of Computers", desc: "1st: Vacuum Tubes, 2nd: Transistors, 3rd: ICs, 4th: Microprocessors, 5th: AI." },
      { title: "RAM vs ROM", desc: "RAM is volatile read/write; ROM is non-volatile holding firmware BIOS." },
      { title: "Cache Memory (SRAM)", desc: "High-speed buffer on CPU between registers and dynamic RAM." },
      { title: "Units of Memory", desc: "1 Bit, 1 Nibble = 4 bits, 1 Byte = 8 bits, 1 KB = 1024 Bytes, 1 MB = 1024 KB." },
      { title: "Universal Logic Gates", desc: "NAND and NOR gates can implement any boolean logic circuit." },
      { title: "OSI 7-Layer Model", desc: "Physical, Data Link, Network, Transport, Session, Presentation, Application." },
      { title: "IPv4 vs IPv6", desc: "IPv4 is 32 bits (4 octets); IPv6 is 128 bits in hexadecimal format." },
      { title: "DNS, HTTP, FTP, SMTP", desc: "DNS (53), HTTP (80), HTTPS (443), FTP (20/21), SMTP (25 email sending)." },
      { title: "Virus vs Worm vs Trojan", desc: "Virus requires host program; Worm self-replicates independently; Trojan is disguised." },
      { title: "Phishing & DDoS", desc: "Phishing steals credentials via fraudulent emails; DDoS overwhelms server bandwidth." },
      { title: "World Wide Web (WWW)", desc: "Invented by Sir Tim Berners-Lee in 1989 at CERN, Switzerland." },
      { title: "Compiler vs Interpreter", desc: "Compiler converts entire program at once; Interpreter translates line-by-line." }
    ];

    const matched = items.filter(it => it.title.toLowerCase().includes(query) || it.desc.toLowerCase().includes(query));

    if (matched.length === 0) {
      searchResults.innerHTML = '<p class="text-slate-400 text-xs text-center py-4">No matching topics found.</p>';
    } else {
      searchResults.innerHTML = matched.map(m => `
        <div class="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
          <h5 class="text-xs font-bold text-cyan-300">${m.title}</h5>
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
