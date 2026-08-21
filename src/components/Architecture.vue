<template>
  <section id="architecture">
    <div class="container">
      <div class="section-head reveal">
        <div>
          <div class="kicker">PRODUCTION SYSTEM DESIGN</div>
          <h2>How I build production systems.</h2>
        </div>
        <p>End-to-end data pipeline & integration architecture built for security, scalability, and 99.9% uptime.</p>
      </div>

      <div class="arch-pipeline reveal glow-card">
        <div class="arch-step">
          <div class="arch-step-num">01</div>
          <h4>Frontend Layer</h4>
          <p>Vue.js 2/3 · React.js · TypeScript · Flutter</p>
        </div>
        <div class="arch-arrow">➔</div>

        <div class="arch-step">
          <div class="arch-step-num">02</div>
          <h4>API & Auth Layer</h4>
          <p>Laravel REST APIs · Sanctum · JWT · RBAC</p>
        </div>
        <div class="arch-arrow">➔</div>

        <div class="arch-step">
          <div class="arch-step-num">03</div>
          <h4>Application Layer</h4>
          <p>Service Classes · Async Jobs · Supervisor</p>
        </div>
        <div class="arch-arrow">➔</div>

        <div class="arch-step">
          <div class="arch-step-num">04</div>
          <h4>Data & Cache</h4>
          <p>MySQL Optimization · Redis Caching</p>
        </div>
        <div class="arch-arrow">➔</div>

        <div class="arch-step">
          <div class="arch-step-num">05</div>
          <h4>Cloud & APIs</h4>
          <p>AWS S3 / SQS · Docker · Banking APIs</p>
        </div>
      </div>
    </div>
  </section>
</template>
