export type AgentRole = 'analysis' | 'design' | 'frontend' | 'backend' | 'testing' | 'deploy' | 'security' | 'content' | 'code'
export type AgentStatus = 'idle' | 'working' | 'complete'

export interface Agent {
  id: string
  name: string
  role: AgentRole
  status: AgentStatus
  task?: string
}

export class FlowForgeOrchestrator {
  private agents: Agent[] = [
    { id: 'agent-001', name: 'Requirements Analyst', role: 'analysis', status: 'idle' },
    { id: 'agent-002', name: 'UX Designer', role: 'design', status: 'idle' },
    { id: 'agent-003', name: 'UI Designer', role: 'design', status: 'idle' },
    { id: 'agent-004', name: 'Frontend Developer', role: 'frontend', status: 'idle' },
    { id: 'agent-005', name: 'Backend Developer', role: 'backend', status: 'idle' },
    { id: 'agent-006', name: 'Accessibility Auditor', role: 'security', status: 'idle' },
    { id: 'agent-007', name: 'SEO Optimizer', role: 'content', status: 'idle' },
    { id: 'agent-008', name: 'Performance Monitor', role: 'code', status: 'idle' },
    { id: 'agent-009', name: 'Semantic HTML Reviewer', role: 'code', status: 'idle' },
    { id: 'agent-010', name: 'CSS Architect', role: 'frontend', status: 'idle' },
    { id: 'agent-011', name: 'JavaScript Engineer', role: 'frontend', status: 'idle' },
    { id: 'agent-012', name: 'Hero Copywriter', role: 'content', status: 'idle' },
    { id: 'agent-013', name: 'CTA Strategist', role: 'content', status: 'idle' },
    { id: 'agent-014', name: 'Color Palette Designer', role: 'design', status: 'idle' },
    { id: 'agent-015', name: 'Color Contrast Checker', role: 'security', status: 'idle' },
    { id: 'agent-016', name: 'Form Validation Engineer', role: 'code', status: 'idle' },
    { id: 'agent-017', name: 'Schema.org Author', role: 'content', status: 'idle' },
    { id: 'agent-018', name: 'Microcopy Specialist', role: 'content', status: 'idle' },
    { id: 'agent-019', name: 'Mobile Responsiveness Tester', role: 'testing', status: 'idle' },
    { id: 'agent-020', name: 'Cross-browser Compatibility Expert', role: 'testing', status: 'idle' },
    { id: 'agent-021', name: 'Image Optimization Bot', role: 'code', status: 'idle' },
    { id: 'agent-022', name: 'Cache Strategy Planner', role: 'code', status: 'idle' },
    { id: 'agent-023', name: 'OpenGraph Curator', role: 'content', status: 'idle' },
    { id: 'agent-024', name: 'Lighthouse Coach', role: 'code', status: 'idle' },
    { id: 'agent-025', name: 'CSP Guardian', role: 'security', status: 'idle' },
    { id: 'agent-026', name: 'Privacy Policy Drafter', role: 'content', status: 'idle' },
    { id: 'agent-027', name: 'Terms Writer', role: 'content', status: 'idle' },
    { id: 'agent-028', name: 'Loading State Designer', role: 'design', status: 'idle' },
    { id: 'agent-029', name: 'Error Boundary Engineer', role: 'frontend', status: 'idle' },
    { id: 'agent-030', name: 'Edge SEO Technician', role: 'code', status: 'idle' },
    { id: 'agent-031', name: 'Analytics Integrator', role: 'code', status: 'idle' },
    { id: 'agent-032', name: 'A/B Testing Framework Builder', role: 'backend', status: 'idle' },
    { id: 'agent-033', name: 'Meta Tags Engineer', role: 'code', status: 'idle' },
    { id: 'agent-034', name: 'Copy Editor', role: 'content', status: 'idle' },
    { id: 'agent-035', name: 'Brand Tone Checker', role: 'content', status: 'idle' },
    { id: 'agent-036', name: 'Typography Specialist', role: 'design', status: 'idle' },
    { id: 'agent-037', name: 'Icon Set Curator', role: 'design', status: 'idle' },
    { id: 'agent-038', name: 'Animation Choreographer', role: 'frontend', status: 'idle' },
    { id: 'agent-039', name: 'Code Quality Reviewer', role: 'code', status: 'idle' },
    { id: 'agent-040', name: 'Security Headers Auditor', role: 'security', status: 'idle' },
    { id: 'agent-041', name: 'Sitemap Curator', role: 'content', status: 'idle' },
    { id: 'agent-042', name: 'Robots.txt Author', role: 'content', status: 'idle' },
    { id: 'agent-043', name: '404 Page Designer', role: 'design', status: 'idle' },
    { id: 'agent-044', name: 'Error States Writer', role: 'content', status: 'idle' },
    { id: 'agent-045', name: 'A11y Keyboard Nav', role: 'security', status: 'idle' },
    { id: 'agent-046', name: 'Screen Reader Optimizer', role: 'frontend', status: 'idle' },
    { id: 'agent-047', name: 'Focus Management Expert', role: 'frontend', status: 'idle' },
    { id: 'agent-048', name: 'Internationalization Planner', role: 'content', status: 'idle' },
    { id: 'agent-049', name: 'RTL Layout Specialist', role: 'design', status: 'idle' },
    { id: 'agent-050', name: 'Security Scanner', role: 'security', status: 'idle' },
    { id: 'agent-051', name: 'Dependency Auditor', role: 'security', status: 'idle' },
    { id: 'agent-052', name: 'Perf Budget Enforcer', role: 'code', status: 'idle' },
    { id: 'agent-053', name: 'Sprite Sheet Builder', role: 'code', status: 'idle' },
    { id: 'agent-054', name: 'Accessibility Narrator', role: 'security', status: 'idle' },
    { id: 'agent-055', name: 'Forms Validation Writer', role: 'code', status: 'idle' },
    { id: 'agent-056', name: 'Content Planner', role: 'content', status: 'idle' },
    { id: 'agent-057', name: 'Blog Outline Writer', role: 'content', status: 'idle' },
    { id: 'agent-058', name: 'Landing Page Strategist', role: 'content', status: 'idle' },
    { id: 'agent-059', name: 'Conversion Funnel Designer', role: 'design', status: 'idle' },
    { id: 'agent-060', name: 'Social Proof Curator', role: 'content', status: 'idle' },
    { id: 'agent-061', name: 'Video Embed Optimizer', role: 'code', status: 'idle' },
    { id: 'agent-062', name: 'Font Loading Optimizer', role: 'code', status: 'idle' },
    { id: 'agent-063', name: 'CDN Strategist', role: 'code', status: 'idle' },
    { id: 'agent-064', name: 'Edge Caching Planner', role: 'code', status: 'idle' },
    { id: 'agent-065', name: 'Security QA', role: 'security', status: 'idle' },
    { id: 'agent-066', name: 'Form Spam Defender', role: 'security', status: 'idle' },
    { id: 'agent-067', name: 'CORS Policy Advisor', role: 'security', status: 'idle' },
    { id: 'agent-068', name: 'SRI Hash Verifier', role: 'security', status: 'idle' },
    { id: 'agent-069', name: 'Cookie Policy Writer', role: 'content', status: 'idle' },
    { id: 'agent-070', name: 'AB Testing Planner', role: 'content', status: 'idle' },
    { id: 'agent-071', name: 'Conversion Copywriter', role: 'content', status: 'idle' },
    { id: 'agent-072', name: 'Social Media Integrator', role: 'backend', status: 'idle' },
    { id: 'agent-073', name: 'Testimonials Curator', role: 'content', status: 'idle' },
    { id: 'agent-074', name: 'Review Aggregator', role: 'backend', status: 'idle' },
    { id: 'agent-075', name: 'Email Integration Specialist', role: 'backend', status: 'idle' },
    { id: 'agent-076', name: 'Payment Gateway Integrator', role: 'backend', status: 'idle' },
    { id: 'agent-077', name: 'Database Schema Designer', role: 'backend', status: 'idle' },
    { id: 'agent-078', name: 'Routing Strategist', role: 'code', status: 'idle' },
    { id: 'agent-079', name: 'State Management Planner', role: 'code', status: 'idle' },
    { id: 'agent-080', name: 'API Documentation Writer', role: 'content', status: 'idle' },
    { id: 'agent-081', name: 'Webhook Designer', role: 'backend', status: 'idle' },
    { id: 'agent-082', name: 'Rate Limiting Engineer', role: 'backend', status: 'idle' },
    { id: 'agent-083', name: 'Load Balancer Configurator', role: 'deploy', status: 'idle' },
    { id: 'agent-084', name: 'Smoke Tester', role: 'security', status: 'idle' },
    { id: 'agent-085', name: 'Accessibility QA', role: 'security', status: 'idle' },
    { id: 'agent-086', name: 'Deployment Orchestrator', role: 'deploy', status: 'idle' },
    { id: 'agent-087', name: 'Final QA Tester', role: 'testing', status: 'idle' }
  ]

  getAgents(): Agent[] {
    return this.agents
  }

  updateAgentStatus(agentId: string, status: AgentStatus, task?: string): void {
    const agent = this.agents.find(a => a.id === agentId)
    if (agent) {
      agent.status = status
      agent.task = task
    }
  }

  activatePhase(phase: number): void {
    const phaseAgents = this.getAgentsForPhase(phase)
    phaseAgents.forEach(agent => {
      this.updateAgentStatus(agent.id, 'working', this.getTaskForPhase(phase, agent.role))
    })
  }

  private getAgentsForPhase(phase: number): Agent[] {
    const phaseRoles = this.getRolesForPhase(phase)
    return this.agents.filter(agent => phaseRoles.includes(agent.role))
  }

  private getRolesForPhase(phase: number): AgentRole[] {
    switch (phase) {
      case 1: return ['analysis']
      case 2: return ['design']
      case 3: return ['frontend', 'backend']
      case 4: return ['content']
      case 5: return ['testing', 'security']
      case 6: return ['deploy']
      default: return []
    }
  }

  private getTaskForPhase(phase: number, role: AgentRole): string {
    const tasks = {
      analysis: 'Analyzing requirements and user needs',
      design: 'Creating visual designs and user experience',
      frontend: 'Building responsive user interface',
      backend: 'Developing server-side functionality',
      content: 'Writing compelling copy and content',
      testing: 'Testing functionality and performance',
      security: 'Implementing security measures',
      deploy: 'Deploying to production environment',
      code: 'Writing and optimizing code',
    }
    return tasks[role] || 'Working on assigned tasks'
  }
}
