<script setup>
import { ref } from 'vue'

const copyStatus = ref('Copy Email')
const isCopied = ref(false)

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('chhasatiyaravi1904@gmail.com')
    copyStatus.value = 'Copied! ✓'
    isCopied.value = true
    
    setTimeout(() => {
      copyStatus.value = 'Copy Email'
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Clipboard copy failed:', err)
  }
}
</script>

<template>
  <section id="contact">
    <div class="container">
      <div class="contact reveal glow-card">
        <div class="contact-main">
          <div class="contact-badge-row">
            <span class="kicker">LET'S BUILD TOGETHER</span>
            <span class="response-badge">⚡ Usually responds within 24h</span>
          </div>
          <h2>Let’s build something production-ready.</h2>
          <p>Let’s discuss architecture, APIs, enterprise applications or a challenging feature that needs
            a clean, reliable implementation.</p>
          
          <div class="contact-methods">
            <a class="contact-email-chip" href="mailto:chhasatiyaravi1904@gmail.com">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>chhasatiyaravi1904@gmail.com</span>
            </a>
            <button 
              class="copy-email-btn" 
              @click="copyEmail"
              :class="{ copied: isCopied }"
              title="Copy Email to Clipboard"
              :style="isCopied ? 'background: rgba(25, 211, 174, 0.25); border-color: #19d3ae; color: #fff;' : ''"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>{{ copyStatus }}</span>
            </button>
          </div>
        </div>
        
        <div class="contact-cta">
          <a class="btn btn-primary btn-large" href="mailto:chhasatiyaravi1904@gmail.com">
            Get In Touch
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      </div>
      <footer>
        <span>© 2026 Raviraj Chhasatiya. Senior Software Developer & Architect.</span>
        <span>Available for engineering opportunities.</span>
      </footer>
    </div>
  </section>
</template>
