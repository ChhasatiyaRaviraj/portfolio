<template>
  <section id="experience">
    <div class="container">
      <div class="section-head reveal">
        <div>
          <div class="kicker">EXPERIENCE TIMELINE</div>
          <h2>What I work on.</h2>
        </div>
        <p>From feature development to integrations, optimization and production support.</p>
      </div>
      <div class="timeline">
        <article class="job reveal glow-card">
          <div class="job-header">
            <h3>Full Stack Developer</h3>
            <time>Jan 2022 — Present</time>
          </div>
          <div class="company">Zignuts Technolab Pvt. Ltd.</div>
          <ul class="job-bullets">
            <li><strong>Built</strong> enterprise-scale applications using Laravel, Vue.js, and React.js to deliver secure REST APIs.</li>
            <li><strong>Architected</strong> authentication and authorization flows using Sanctum and JWT across 3+ production applications.</li>
            <li><strong>Optimized</strong> database queries and caching strategies using MySQL and Redis for high-performance APIs.</li>
            <li><strong>Integrated</strong> banking and cloud services to streamline business processes in Agile cycles.</li>
          </ul>
          <div class="job-tags">
            <span>Laravel</span><span>Vue.js</span><span>React</span><span>Sanctum</span><span>JWT</span><span>Redis</span><span>REST APIs</span>
          </div>
        </article>

        <article class="job reveal glow-card">
          <div class="job-header">
            <h3>FinTech & Banking Engineering</h3>
            <time>Production focus</time>
          </div>
          <div class="company">Banking integrations · Transaction systems</div>
          <ul class="job-bullets">
            <li><strong>Architected</strong> bank management capabilities with real-time analytics and transaction lifecycle workflows.</li>
            <li><strong>Built</strong> secure payment integrations and API monitoring for enterprise financial operations.</li>
            <li><strong>Implemented</strong> workflow automation and audit logs to maintain traceability across financial transactions.</li>
          </ul>
          <div class="job-tags">
            <span>FinTech</span><span>Banking APIs</span><span>Audit Logs</span><span>Analytics</span><span>Workflow Automation</span>
          </div>
        </article>

        <article class="job reveal glow-card">
          <div class="job-header">
            <h3>Enterprise Product Engineering</h3>
            <time>Cross-domain</time>
          </div>
          <div class="company">HRMS · SaaS · Energy · Business Platforms</div>
          <ul class="job-bullets">
            <li><strong>Delivered</strong> HRMS, community management, and solar platforms using role-based access and workflow automation.</li>
            <li><strong>Integrated</strong> mobile APIs, asynchronous jobs, and cloud services for robust business operations.</li>
            <li><strong>Mentored</strong> junior developers on Laravel architecture and modern frontend practices to improve team velocity.</li>
          </ul>
          <div class="job-tags">
            <span>HRMS</span><span>SaaS</span><span>RBAC</span><span>Cloud Integrations</span><span>Agile Mentoring</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.job-bullets {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 20px;
  color: var(--muted);
}
.job-bullets li {
  margin-bottom: 8px;
}
.job-bullets strong {
  color: var(--text);
}
</style>
