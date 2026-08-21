<script setup>
import { ref, onMounted } from 'vue'

const skills = ref([
  { name: 'Laravel', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
  { name: 'Vue.js', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
  { name: 'PHP', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
  { name: 'MySQL', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { name: 'Redis', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
  { name: 'Docker', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'AWS', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Tailwind CSS', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'JavaScript', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'Git', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
])

// Duplicate for smooth infinite marquee
const marqueeSkills = ref([...skills.value, ...skills.value])
</script>

<template>
  <section id="skills" class="skills-section reveal">
    <div class="container">

      
      <div class="slider-container">
        <div class="slider-track">
          <div 
            class="skill-card glow-card"
            v-for="(skill, index) in marqueeSkills" 
            :key="index"
          >
            <div class="skill-icon-wrapper">
              <img :src="skill.image" :alt="skill.name" class="skill-icon" loading="lazy" />
            </div>
            <span class="skill-name">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  padding: 0 0 80px 0;
  overflow: hidden;
  border-top: none;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.slider-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  /* fade edges for a nice effect */
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.slider-track {
  display: flex;
  gap: 24px;
  width: max-content;
  animation: scroll 30s linear infinite;
  padding: 20px 0;
}

.slider-track:hover {
  animation-play-state: paused;
}

.skill-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-width: 160px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  transition: transform 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
}

.skill-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.2);
}

.skill-icon-wrapper {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 12px;
}

.skill-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.skill-name {
  font-size: 15px;
  font-weight: 500;
  color: var(--text);
  letter-spacing: 0.5px;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    /* Translate left by 50% (since we duplicated the array) minus half the gap */
    transform: translateX(calc(-50% - 12px));
  }
}

/* Light theme overrides if applicable */
[data-theme="light"] .skill-card {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.05);
}

[data-theme="light"] .skill-card:hover {
  border-color: rgba(0, 0, 0, 0.15);
}

[data-theme="light"] .skill-icon-wrapper {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
