<script setup>
import { ref, nextTick } from 'vue'

const inputCommand = ref('')
const terminalOutput = ref(null)
const history = ref([])
const historyIndex = ref(-1)

const outputLines = ref([
  { type: 'input', text: 'raviraj --info' },
  { 
    type: 'html', 
    html: `
      <p><strong>Developer:</strong> Raviraj Chhasatiya</p>
      <p><strong>Title:</strong> Senior Full Stack Developer & Architect (4+ Years)</p>
      <p><strong>Stack:</strong> Laravel, Vue.js, React, TypeScript, MySQL, Redis, AWS, REST APIs</p>
      <p class="term-hint">💡 Type <span class="highlight">help</span> or click buttons above to run interactive commands.</p>
    `
  }
])

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
}

const runCommand = (cmd) => {
  const cleanCmd = cmd.trim()
  const cmdKey = cleanCmd.toLowerCase()

  if (cmdKey === 'clear') {
    outputLines.value = []
    inputCommand.value = ''
    return
  }

  if (cleanCmd !== '') {
    history.value.push(cleanCmd)
    historyIndex.value = history.value.length
  }

  outputLines.value.push({ type: 'input', text: cleanCmd })

  if (cmdKey === 'resume') {
    window.open('/resume.pdf', '_blank')
  }

  if (PREDEFINED_RESPONSES[cmdKey]) {
    outputLines.value.push({
      type: 'text',
      lines: PREDEFINED_RESPONSES[cmdKey]
    })
  } else if (cleanCmd !== '') {
    outputLines.value.push({
      type: 'error',
      text: `Command not recognized: "${cleanCmd}". Type 'help' for available commands.`
    })
  }

  inputCommand.value = ''
  
  nextTick(() => {
    if (terminalOutput.value) {
      terminalOutput.value.scrollTop = terminalOutput.value.scrollHeight
    }
  })
}

const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    runCommand(inputCommand.value)
  } else if (e.key === 'ArrowUp') {
    if (history.value.length > 0 && historyIndex.value > 0) {
      historyIndex.value--
      inputCommand.value = history.value[historyIndex.value]
    }
    e.preventDefault()
  } else if (e.key === 'ArrowDown') {
    if (history.value.length > 0 && historyIndex.value < history.value.length - 1) {
      historyIndex.value++
      inputCommand.value = history.value[historyIndex.value]
    } else {
      historyIndex.value = history.value.length
      inputCommand.value = ''
    }
    e.preventDefault()
  }
}
</script>

<template>
  <section class="terminal-section">
    <div class="container">
      <div class="terminal-window reveal glow-card">
        <div class="terminal-header">
          <div class="terminal-buttons">
            <span class="btn-dot close"></span>
            <span class="btn-dot minimize"></span>
            <span class="btn-dot expand"></span>
          </div>
          <div class="terminal-title">raviraj@architect:~ (interactive-cli)</div>
          <div class="terminal-actions">
            <button class="term-btn" @click="runCommand('help')">help</button>
            <button class="term-btn" @click="runCommand('stack')">stack</button>
            <button class="term-btn" @click="runCommand('projects')">projects</button>
            <button class="term-btn" @click="runCommand('contact')">contact</button>
            <button class="term-btn" @click="runCommand('clear')">clear</button>
          </div>
        </div>
        
        <div class="terminal-body" ref="terminalOutput">
          <template v-for="(line, index) in outputLines" :key="index">
            <div class="term-line" v-if="line.type === 'input'">
              <span class="term-prompt">raviraj@portfolio:~$</span> 
              <span class="term-command">{{ line.text }}</span>
            </div>
            
            <div class="term-response" v-else-if="line.type === 'html'" v-html="line.html"></div>
            
            <div class="term-response" v-else-if="line.type === 'text'">
              <p v-for="(textLine, idx) in line.lines" :key="idx">{{ textLine }}</p>
            </div>
            
            <div class="term-response" v-else-if="line.type === 'error'">
              <p style="color: #ff5f56">{{ line.text }}</p>
            </div>
          </template>
        </div>
        
        <div class="terminal-input-line">
          <span class="term-prompt">raviraj@portfolio:~$</span>
          <input 
            type="text" 
            v-model="inputCommand"
            @keydown="handleKeyDown"
            placeholder="type command (help, stack, projects, contact)..." 
            autocomplete="off" 
          />
        </div>
      </div>
    </div>
  </section>
</template>
