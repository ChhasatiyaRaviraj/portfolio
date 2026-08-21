<script setup>
import { ref, onMounted } from 'vue'

const activeFilter = ref('all')

const setFilter = (filter) => {
  activeFilter.value = filter
}

const animateCounters = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const counters = document.querySelectorAll('.about-metrics .counter')
  
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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters()
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })

  const aboutMetrics = document.querySelector('.about-metrics')
  if (aboutMetrics) observer.observe(aboutMetrics)
})
</script>

<template>
  <section id="about">
    <div class="container">
      <div class="about-premium reveal">
        <div class="about-main">
          <div class="kicker">ABOUT ME</div>
          <h2>Engineering products from <span class="gradient">architecture to production.</span></h2>
          <p class="about-lead">
            Full Stack Developer & Architect focused on scalable backend systems,
            modern frontend experiences, secure APIs and cloud infrastructure.
          </p>
          <p class="about-detail">
            I work across the stack — designing databases, building REST APIs,
            developing admin platforms and frontend experiences, integrating external
            services, and taking features through production.
          </p>


        </div>

        <div class="about-metrics">
          <article class="metric metric-large glow-card">
            <span class="metric-index">01</span>
            <div>
              <strong class="counter" data-target="4" data-suffix="+">4+</strong>
              <span>Years of production software engineering</span>
            </div>
            <i>Experience</i>
          </article>

          <article class="metric glow-card">
            <span class="metric-index">02</span>
            <div>
              <strong class="counter" data-target="10" data-suffix="+">10+</strong>
              <span>Products shipped to production</span>
            </div>
          </article>

          <article class="metric glow-card">
            <span class="metric-index">03</span>
            <div>
              <strong>Full-stack</strong>
              <span>Backend · Frontend · APIs · Cloud</span>
            </div>
          </article>

          <article class="metric metric-wide glow-card">
            <span class="metric-index">04</span>
            <div>
              <strong>Production mindset</strong>
              <span>Security · Performance · Integrations · Reliability</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
