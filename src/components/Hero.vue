<script setup>
import { onMounted, ref } from 'vue'

const isTouchDevice = ref(false)
const card = ref(null)

const handleMouseMove = (e) => {
  if (isTouchDevice.value || !card.value) return

  const rect = card.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  card.value.style.setProperty('--mouse-x', `${x}px`)
  card.value.style.setProperty('--mouse-y', `${y}px`)

  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = ((y - centerY) / centerY) * -2
  const rotateY = ((x - centerX) / centerX) * 2

  card.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`
}

const handleMouseLeave = () => {
  if (card.value) {
    card.value.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  }
}

// Animate Counters
const animateCounters = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const counters = document.querySelectorAll('.hero-proof-bar .counter')
  
  counters.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0
    const suffix = el.getAttribute('data-suffix') || ''

    if (prefersReducedMotion) {
      el.textContent = target + suffix
      return
    }

    let current = 0
    const step = Math.max(1, Math.ceil(target / 30))
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      el.textContent = current + suffix
    }, 40)
  })
}

onMounted(() => {
  isTouchDevice.value = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)

  // Quick intersection observer just for the counters in hero
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters()
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })

  const proofBar = document.querySelector('.hero-proof-bar')
  if (proofBar) observer.observe(proofBar)
})
</script>

<template>
  <section class="hero">
    <div class="orb"></div>
    <div class="orb2"></div>
    <div class="container hero-content reveal">
      <div class="hero-text">
        <span class="eyebrow">Senior Full-Stack Engineer · Laravel · Vue · APIs</span>
        <h1>I build <span class="gradient">production-grade</span> software for complex businesses.</h1>
        <p class="hero-copy">
          I design and ship scalable web applications, APIs, admin platforms, and enterprise integrations — from system architecture and database optimization to cloud production deployment.
        </p>
        <div class="hero-tech-line">
          <span>Laravel</span> · <span>PHP</span> · <span>Vue</span> · <span>React</span> · <span>MySQL</span> · <span>Redis</span> · <span>AWS</span> · <span>Docker</span>
        </div>
        <div class="actions">
          <a class="btn btn-primary" href="#projects">View My Work →</a>
          <a class="btn btn-secondary" href="/resume.pdf" target="_blank" rel="noopener">Download Resume ↓</a>
        </div>
      </div>
      
      <div class="hero-visual">
        <div 
          class="system-visualizer glow-card" 
          aria-hidden="true" 
          ref="card"
          @mousemove="handleMouseMove" 
          @mouseleave="handleMouseLeave"
        >
          <div class="sys-header">
            <div class="sys-status">
              <span class="pulse-dot"></span>
              <span>PRODUCTION SYSTEM ONLINE</span>
            </div>
            <div class="sys-meta">HEALTH 99.9%</div>
          </div>
          
          <div class="sys-grid">
            <div class="sys-stat-node">
              <span class="sys-node-label">API Status</span>
              <strong class="sys-node-val green">Active 200 OK</strong>
            </div>
            <div class="sys-stat-node">
              <span class="sys-node-label">Transactions</span>
              <strong class="sys-node-val blue">12,842 / day</strong>
            </div>
            <div class="sys-stat-node">
              <span class="sys-node-label">Queue Jobs</span>
              <strong class="sys-node-val purple">1,284 Async</strong>
            </div>
            <div class="sys-stat-node">
              <span class="sys-node-label">Integrations</span>
              <strong class="sys-node-val cyan">24 Connected</strong>
            </div>
          </div>

          <div class="sys-architecture-flow">
            <div class="sys-layer">
              <span class="sys-tag">Laravel 12</span>
              <span class="sys-arrow">➔</span>
              <span class="sys-tag">Redis Cache</span>
              <span class="sys-arrow">➔</span>
              <span class="sys-tag">MySQL DB</span>
            </div>
            <div class="sys-layer sub">
              <span class="sys-tag alt">AWS SQS</span>
              <span class="sys-arrow">➔</span>
              <span class="sys-tag alt">Sanctum Auth</span>
              <span class="sys-arrow">➔</span>
              <span class="sys-tag alt">Cloud S3</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Compact Proof Metrics Row -->
    <div class="container hero-proof-container">
      <div class="hero-proof-bar reveal glow-card">
        <div class="proof-item">
          <strong class="counter" data-target="4" data-suffix="+">0+</strong>
          <span>Years Experience</span>
        </div>
        <div class="proof-divider"></div>
        <div class="proof-item">
          <strong class="counter" data-target="10" data-suffix="+">0+</strong>
          <span>Production Projects</span>
        </div>
        <div class="proof-divider"></div>
        <div class="proof-item">
          <strong class="counter" data-target="5" data-suffix="+">0+</strong>
          <span>Business Domains</span>
        </div>
        <div class="proof-divider"></div>
        <div class="proof-item">
          <strong class="counter" data-target="20" data-suffix="+">0+</strong>
          <span>Integrations Delivered</span>
        </div>
      </div>
    </div>
  </section>
</template>
