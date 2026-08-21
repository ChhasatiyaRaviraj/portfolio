<script setup>
import { onMounted, ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import TerminalSection from './components/TerminalSection.vue'
import About from './components/About.vue'
import Capabilities from './components/Capabilities.vue'
import Architecture from './components/Architecture.vue'
import Experience from './components/Experience.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'

// Intersection Observer for Scroll Reveals
const initRevealObserver = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
}

onMounted(() => {
  initRevealObserver()
})
</script>

<template>
  <Navbar />
  <main>
    <Hero />
    <TerminalSection />
    <About />
    <Capabilities />
    <Architecture />
    <Experience />
    <Projects />
    <Contact />
  </main>
</template>
