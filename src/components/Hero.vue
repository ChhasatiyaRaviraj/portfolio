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

    <!-- Floating Skill Icons -->
    <div class="floating-skills" aria-hidden="true">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" class="float-icon icon-1" alt="Laravel">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" class="float-icon icon-2" alt="Vue">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" class="float-icon icon-3" alt="PHP">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" class="float-icon icon-4" alt="MySQL">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" class="float-icon icon-5" alt="Docker">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" class="float-icon icon-6" alt="Redis">
    </div>

    <div class="container hero-content reveal">
      <div class="hero-text">
        <span class="eyebrow">Senior Full-Stack Engineer · Laravel · Vue · APIs</span>
        <h1>I build <span class="gradient">production-grade</span> software for complex businesses.</h1>
        <p class="hero-copy">
          I design and ship scalable web applications, APIs, admin platforms, and enterprise integrations — from system architecture and database optimization to cloud production deployment.
        </p>

        <div class="actions">
          <a class="btn btn-primary" href="#projects">View My Work →</a>
          <a class="btn btn-secondary" href="/Raviraj_Chhasatiya_Senior_Full_Stack_Engineer_Resume.pdf" target="_blank" rel="noopener">Download Resume ↓</a>
        </div>
      </div>
      
    </div>

    <!-- Compact Proof Metrics Row -->
    <div class="container hero-proof-container">
      <div class="hero-proof-bar reveal glow-card">
        <div class="proof-item">
          <strong class="counter" data-target="4" data-suffix="+">4+</strong>
          <span>Years Experience</span>
        </div>
        <div class="proof-divider"></div>
        <div class="proof-item">
          <strong class="counter" data-target="10" data-suffix="+">10+</strong>
          <span>Production Projects</span>
        </div>
        <div class="proof-divider"></div>
        <div class="proof-item">
          <strong class="counter" data-target="5" data-suffix="+">5+</strong>
          <span>Business Domains</span>
        </div>
        <div class="proof-divider"></div>
        <div class="proof-item">
          <strong class="counter" data-target="20" data-suffix="+">20+</strong>
          <span>Integrations Delivered</span>
        </div>
      </div>
    </div>
  </section>
</template>
