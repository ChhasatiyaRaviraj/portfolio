<template>
  <section id="projects">
    <div class="container">
      <div class="section-head reveal">
        <div>
          <div class="kicker">PRODUCTION PORTFOLIO</div>
          <h2>Selected production work.</h2>
        </div>
        <p>Enterprise systems, financial platforms, HRMS, SaaS products and business-critical integrations shipped to production.</p>
      </div>

      <!-- Featured Top Projects -->
      <div class="featured-projects">
        <article class="project featured-card reveal glow-card">
          <div class="project-header">
            <div class="project-number">FINTECH · BANKING</div>
            <span class="enterprise-badge">Private Enterprise Project</span>
          </div>
          <h3>Digital Banking & Financial Systems</h3>
          <p class="project-problem"><strong>Business Scope:</strong> Bank management, real-time dashboards, integration monitoring, audit trails, escrow workflows and transaction lifecycle management for production financial applications.</p>
          <p class="project-challenge"><strong>Engineering Focus:</strong> Secure payment gateway integrations, Laravel queue workers for async transaction processing, Redis caching for dashboard metrics, and MySQL query optimization.</p>
          <div class="project-tags">
            <span>Laravel 12</span><span>Filament 4</span><span>Vue.js</span><span>React</span><span>Redis</span><span>MySQL</span>
          </div>
        </article>

        <article class="project featured-card reveal glow-card">
          <div class="project-header">
            <div class="project-number">HUMAN RESOURCES</div>
            <span class="enterprise-badge">Private Enterprise Project</span>
          </div>
          <h3>HRMS & Workforce Platform</h3>
          <p class="project-problem"><strong>Business Scope:</strong> Timesheet automation, attendance tracking, appraisal workflows, performance reporting, automated approvals, AWS S3 storage and SQS async background queue processing.</p>
          <p class="project-challenge"><strong>Engineering Focus:</strong> Architectural decoupling using domain-driven service classes, AWS SQS job queues for automated reports, and high-performance database indexing.</p>
          <div class="project-tags">
            <span>Laravel 8</span><span>Vue.js 2</span><span>AWS S3</span><span>AWS SQS</span><span>MySQL</span>
          </div>
        </article>

        <article class="project featured-card reveal glow-card">
          <div class="project-header">
            <div class="project-number">COMMUNITY SaaS</div>
            <span class="enterprise-badge">Private Enterprise Project</span>
          </div>
          <h3>Multi-Region Member Management</h3>
          <p class="project-problem"><strong>Business Scope:</strong> Multi-region member management, REST APIs, granular permissions, multi-role access hierarchy, and reactive UI architecture for a community SaaS platform.</p>
          <p class="project-challenge"><strong>Engineering Focus:</strong> Implementation of scalable REST APIs using Sanctum, advanced Role-Based Access Control (RBAC), and Vue 3 Composition API for reactive frontend architecture.</p>
          <div class="project-tags">
            <span>Laravel 12</span><span>Vue 3</span><span>React</span><span>TypeScript</span><span>REST APIs</span>
          </div>
        </article>
      </div>

      <!-- Secondary Projects Grid -->
      <div class="secondary-projects-head">
        <h3>Additional Enterprise Systems</h3>
      </div>
      <div class="projects secondary-grid">
        <article class="project reveal glow-card">
          <div>
            <div class="project-number">ENERGY & UTILITIES</div>
            <h3>Solar Service Management</h3>
            <p>Mobile-first service management with REST APIs, inventory, dispatch workflows, Firebase OTP authentication and real-time notifications.</p>
          </div>
          <div class="project-tags"><span>Laravel 11</span><span>Flutter</span><span>Firebase</span><span>MySQL</span></div>
        </article>

        <article class="project reveal glow-card">
          <div>
            <div class="project-number">CRM & SALES</div>
            <h3>Customer & Lead Operations</h3>
            <p>Lead management, role hierarchy, account ownership, tele-calling and permission-driven business workflows for CRM operations.</p>
          </div>
          <div class="project-tags"><span>Laravel</span><span>Vue.js</span><span>RBAC</span><span>MySQL</span></div>
        </article>

        <article class="project reveal glow-card">
          <div>
            <div class="project-number">ANALYTICS & REPORTING</div>
            <h3>Business Intelligence & Data Exports</h3>
            <p>Data-driven dashboards, reporting workflows and structured exports designed for business analysis and operational decision-making.</p>
          </div>
          <div class="project-tags"><span>Laravel</span><span>MySQL</span><span>Excel</span><span>Analytics</span></div>
        </article>

        <article class="project reveal glow-card">
          <div>
            <div class="project-number">AUTHENTICATION & SECURITY</div>
            <h3>Identity & Access Systems</h3>
            <p>Secure authentication and authorization flows using Sanctum, JWT and RBAC across multiple production applications and user roles.</p>
          </div>
          <div class="project-tags"><span>Sanctum</span><span>JWT</span><span>RBAC</span><span>REST APIs</span></div>
        </article>

        <article class="project reveal glow-card">
          <div>
            <div class="project-number">API & CLOUD INTEGRATIONS</div>
            <h3>Connected Enterprise Services</h3>
            <p>Third-party banking, payment, Firebase and AWS integrations with asynchronous processing, secure APIs and production infrastructure.</p>
          </div>
          <div class="project-tags"><span>REST APIs</span><span>AWS</span><span>SQS</span><span>Firebase</span></div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-challenge {
  color: var(--muted);
  font-size: 0.95rem;
  margin-top: 12px;
  margin-bottom: 24px;
}
.project-challenge strong {
  color: var(--accent-2);
}
</style>
