<script setup>
import { ref, onMounted } from 'vue'

const isMenuOpen = ref(false)
const isDarkTheme = ref(true)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
  if (isDarkTheme.value) {
    document.documentElement.removeAttribute('data-theme')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light') {
    isDarkTheme.value = false
    document.documentElement.setAttribute('data-theme', 'light')
  }
  
  // Close menu on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen.value) {
      isMenuOpen.value = false
    }
  })
})
</script>

<template>
  <nav class="nav">
    <div class="container nav-inner">
      <a class="logo" href="#" aria-label="Raviraj Chhasatiya Home">
        <span class="logo-full">Raviraj<span class="text-accent">Chhasatiya</span></span>
        <span class="logo-mark text-accent">R.</span>
      </a>
      <button class="menu" @click="toggleMenu" aria-label="Toggle navigation" :aria-expanded="isMenuOpen">☰</button>
      <div class="nav-links" :class="{ open: isMenuOpen }">
        <a href="#projects" @click="isMenuOpen = false">Work</a>
        <a href="#experience" @click="isMenuOpen = false">Experience</a>
        <a href="#capabilities" @click="isMenuOpen = false">Capabilities</a>
        <a href="#skills" @click="isMenuOpen = false">Stack</a>
        <a href="#about" @click="isMenuOpen = false">About</a>
        <a href="#contact" @click="isMenuOpen = false">Contact</a>
        <a href="/Raviraj_Chhasatiya_Senior_Full_Stack_Engineer_Resume.pdf" class="nav-resume-btn" target="_blank" rel="noopener">Resume ↗</a>
      </div>
      <div class="nav-actions">
        <button class="theme-toggle-btn" @click="toggleTheme" aria-label="Toggle Light or Dark Theme" title="Toggle Theme">
          <span class="theme-icon sun-icon" v-show="isDarkTheme">☀️</span>
          <span class="theme-icon moon-icon" v-show="!isDarkTheme">🌙</span>
        </button>
        <div class="status-badge" title="Open to Senior Engineering Opportunities">
          <span class="pulse-dot"></span>
          <span>Open to Opportunities</span>
        </div>
      </div>
    </div>
  </nav>
</template>
