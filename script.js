/**
 * Senior Full-Stack Engineer Portfolio Engine
 * Author: Raviraj Chhasatiya
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTheme();
    initRevealObserver();
    initCardInteractions();
    initSkillFilters();
    initTerminal();
    initClipboard();
});

/**
 * 1. Navigation & Accessibility Handler
 */
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!menuToggle || !navLinks) return;

    function toggleMenu(open) {
        const isOpen = open !== undefined ? open : !navLinks.classList.contains('open');
        navLinks.classList.toggle('open', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen.toString());
    }

    menuToggle.addEventListener('click', () => toggleMenu());

    // Close menu when clicking navigation links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Keyboard Navigation: Escape key closes menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
            toggleMenu(false);
            menuToggle.focus();
        }
    });
}

/**
 * 2. Light / Dark Theme Handler with localStorage
 */
function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const isLight = currentTheme === 'light';
            
            if (!isLight) {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
}

/**
 * 3. Intersection Observer for Scroll Reveals & Counters
 */
function initRevealObserver() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate counters if present inside entry
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => animateCounter(counter, prefersReducedMotion));

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function animateCounter(el, prefersReducedMotion) {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';

    if (prefersReducedMotion) {
        el.textContent = target + suffix;
        return;
    }

    let current = 0;
    const step = Math.max(1, Math.ceil(target / 30));
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = current + suffix;
    }, 40);
}

/**
 * 4. Mouse Spotlight & Subtle 3D Card Tilt (Capped at ±2deg)
 */
function initCardInteractions() {
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouchDevice) return;

    document.querySelectorAll('.glow-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Subtle 3D tilt (Capped at ±2deg to prevent excessive motion)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -2;
            const rotateY = ((x - centerX) / centerX) * 2;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

/**
 * 5. Tech Stack Category Filtering
 */
function initSkillFilters() {
    const filterBtns = document.querySelectorAll('.skill-filter-btn');
    const skillChips = document.querySelectorAll('.chip');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            skillChips.forEach(chip => {
                const category = chip.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    chip.classList.remove('hidden');
                } else {
                    chip.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * 6. Interactive Engineering Terminal CLI (Safe textContent & Command History)
 */
function initTerminal() {
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');
    const termButtons = document.querySelectorAll('.term-btn');

    if (!terminalOutput || !terminalInput) return;

    const commandHistory = [];
    let historyIndex = -1;

    const PREDEFINED_RESPONSES = {
        help: [
            "Available Commands:",
            "  whoami     - Developer profile & seniority summary",
            "  stack      - Core technical architecture & language specs",
            "  capabilities - Core engineering competencies",
            "  projects   - Selected production applications",
            "  experience - Career history & leadership background",
            "  resume     - Download official resume PDF",
            "  contact    - Direct communication channels",
            "  clear      - Clear terminal console output"
        ],
        whoami: [
            "Raviraj Chhasatiya — Senior Full-Stack Engineer & System Architect",
            "Specializing in production Laravel applications, Vue.js/React frontends, REST API architecture, and AWS cloud deployments."
        ],
        stack: [
            "⚡ Production Technical Profile:",
            "• Backend: Laravel 8-12, PHP 8+, RESTful APIs, Sanctum, JWT, RBAC, Queue Architecture",
            "• Frontend: Vue.js 2/3, React.js, TypeScript, Tailwind, CSS3",
            "• Data & Cloud: MySQL, Redis, AWS S3/SQS, Docker, Linux, Supervisor, Firebase"
        ],
        capabilities: [
            "🏗️ Engineering Capabilities:",
            "1. System Architecture: Decoupled domain services & maintainable backend infrastructure",
            "2. APIs & Integrations: Banking APIs, payment gateways, Sanctum/JWT authentication",
            "3. Performance Scaling: MySQL query optimization, Redis cache layers, async queues",
            "4. Cloud Production: AWS S3, SQS background jobs, Docker, live maintenance"
        ],
        projects: [
            "🚀 Selected Production Work:",
            "1. FinTech & Banking Systems (Laravel 12, Filament 4, Vue.js, Redis)",
            "2. HRMS & Workforce Platform (Laravel 8, Vue.js 2, AWS S3/SQS)",
            "3. Community SaaS Platform (Laravel 12, Vue 3, TypeScript)",
            "4. Solar Service & Dispatch App (Laravel 11, Flutter, Firebase)"
        ],
        experience: [
            "💼 Professional Experience:",
            "Full Stack Developer / Senior Software Engineer at Zignuts Technolab (Jan 2022 — Present)",
            "Architected enterprise banking software, HRMS platforms, and multi-tenant SaaS systems."
        ],
        resume: [
            "📄 Official Resume: Opening resume.pdf link..."
        ],
        contact: [
            "📫 Communication:",
            "Email: chhasatiyaravi1904@gmail.com",
            "Status: Open to Senior Full-Stack & System Architecture opportunities."
        ]
    };

    function runCommand(rawCmd) {
        const cleanCmd = rawCmd.trim();
        const cmdKey = cleanCmd.toLowerCase();

        if (cmdKey === 'clear') {
            terminalOutput.replaceChildren();
            return;
        }

        if (cleanCmd !== '') {
            commandHistory.push(cleanCmd);
            historyIndex = commandHistory.length;
        }

        // Render command prompt safely
        const lineDiv = document.createElement('div');
        lineDiv.className = 'term-line';

        const promptSpan = document.createElement('span');
        promptSpan.className = 'term-prompt';
        promptSpan.textContent = 'raviraj@portfolio:~$ ';

        const commandSpan = document.createElement('span');
        commandSpan.className = 'term-command';
        commandSpan.textContent = cleanCmd;

        lineDiv.appendChild(promptSpan);
        lineDiv.appendChild(commandSpan);
        terminalOutput.appendChild(lineDiv);

        // Render response safely using textContent / DOM nodes
        const responseDiv = document.createElement('div');
        responseDiv.className = 'term-response';

        if (cmdKey === 'resume') {
            window.open('resume.pdf', '_blank');
        }

        if (PREDEFINED_RESPONSES[cmdKey]) {
            PREDEFINED_RESPONSES[cmdKey].forEach(line => {
                const p = document.createElement('p');
                p.textContent = line;
                responseDiv.appendChild(p);
            });
        } else if (cleanCmd !== '') {
            const errP = document.createElement('p');
            errP.style.color = '#ff5f56';
            errP.textContent = `Command not recognized: "${cleanCmd}". Type 'help' for available commands.`;
            responseDiv.appendChild(errP);
        }

        terminalOutput.appendChild(responseDiv);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Input Keydown Handler for Enter and Arrow Up/Down Command History
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            runCommand(terminalInput.value);
            terminalInput.value = '';
        } else if (e.key === 'ArrowUp') {
            if (commandHistory.length > 0 && historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
            e.preventDefault();
        }
    });

    // Terminal Quick Action Buttons
    termButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd) runCommand(cmd);
        });
    });
}

/**
 * 7. Copy Email Clipboard Tooltip
 */
function initClipboard() {
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copyBtnText = document.getElementById('copyBtnText');
    
    if (!copyEmailBtn || !copyBtnText) return;

    copyEmailBtn.addEventListener('click', () => {
        const email = 'chhasatiyaravi1904@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            copyBtnText.textContent = 'Copied! ✓';
            copyEmailBtn.style.background = 'rgba(25, 211, 174, 0.25)';
            copyEmailBtn.style.borderColor = '#19d3ae';
            copyEmailBtn.style.color = '#fff';
            
            setTimeout(() => {
                copyBtnText.textContent = 'Copy Email';
                copyEmailBtn.style.background = '';
                copyEmailBtn.style.borderColor = '';
                copyEmailBtn.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Clipboard copy failed:', err);
        });
    });
}
