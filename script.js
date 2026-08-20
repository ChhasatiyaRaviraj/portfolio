document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Mobile Menu
    const menu = document.querySelector('.menu');
    const links = document.querySelector('.nav-links');
    if (menu && links) {
        menu.addEventListener('click', () => links.classList.toggle('open'));
    }

    // 2. Intersection Observer for Reveal Elements & Stat Counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter if present
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => animateCounter(counter));

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Animated Counter Function
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
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

    // 3. Mouse Spotlight & 3D Tilt for Glow Cards
    document.querySelectorAll('.glow-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Subtle 3D tilt calculation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // 4. Skill Matrix Category Filter
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

    // 5. Interactive Terminal Engine
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');
    const termButtons = document.querySelectorAll('.term-btn');

    const COMMANDS = {
        help: `
            <p><strong>Available Commands:</strong></p>
            <p><span class="highlight">skills</span> - View technical stack & architecture capabilities</p>
            <p><span class="highlight">projects</span> - List enterprise & production projects</p>
            <p><span class="highlight">experience</span> - View career background & achievements</p>
            <p><span class="highlight">contact</span> - Get direct email & contact details</p>
            <p><span class="highlight">clear</span> - Clear the terminal output</p>
        `,
        skills: `
            <p><strong>⚡ Technical Stack:</strong></p>
            <p>• Backend: Laravel (8-12), PHP 8+, REST APIs, Sanctum, JWT, RBAC</p>
            <p>• Frontend: Vue.js 2/3, React.js, TypeScript, Tailwind, CSS3</p>
            <p>• Database & Cloud: MySQL, Redis, AWS S3/SQS, Docker, Firebase</p>
        `,
        projects: `
            <p><strong>🚀 Selected Production Projects:</strong></p>
            <p>1. FinTech & Banking Engine (Laravel 12, Filament 4, Vue.js, Redis)</p>
            <p>2. HRMS Workforce Platform (Laravel 8, Vue.js 2, AWS S3/SQS)</p>
            <p>3. Community SaaS Platform (Laravel 12, Vue 3, TypeScript)</p>
            <p>4. Solar Service & Dispatch App (Laravel 11, Flutter, Firebase)</p>
        `,
        experience: `
            <p><strong>💼 Background:</strong> Senior Full Stack Developer & Architect with 4+ years building production-grade enterprise applications at Zignuts Technolab.</p>
        `,
        contact: `
            <p><strong>📫 Contact Details:</strong></p>
            <p>Email: <a href="mailto:chhasatiyaravi1904@gmail.com" style="color: #49e7ff;">chhasatiyaravi1904@gmail.com</a></p>
            <p>Status: <span style="color: #19d3ae;">Open for Senior Engineering & Architectural roles</span></p>
        `
    };

    function runCommand(cmd) {
        const cleanCmd = cmd.trim().toLowerCase();
        
        if (cleanCmd === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        }

        const lineDiv = document.createElement('div');
        lineDiv.className = 'term-line';
        lineDiv.innerHTML = `<span class="term-prompt">raviraj@portfolio:~$</span> <span class="term-command">${cleanCmd}</span>`;
        terminalOutput.appendChild(lineDiv);

        const responseDiv = document.createElement('div');
        responseDiv.className = 'term-response';

        if (COMMANDS[cleanCmd]) {
            responseDiv.innerHTML = COMMANDS[cleanCmd];
        } else if (cleanCmd !== '') {
            responseDiv.innerHTML = `<p style="color: #ff5f56;">Command not recognized: "${cleanCmd}". Type <span class="highlight">help</span> for commands.</p>`;
        }

        terminalOutput.appendChild(responseDiv);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                runCommand(terminalInput.value);
                terminalInput.value = '';
            }
        });
    }

    termButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            runCommand(cmd);
        });
    });

    // 6. Copy Email Button Handler
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copyBtnText = document.getElementById('copyBtnText');
    if (copyEmailBtn && copyBtnText) {
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
                console.error('Failed to copy email:', err);
            });
        });
    }
});
