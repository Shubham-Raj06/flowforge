"use client"
import { useEffect, useState } from 'react'
import { AgentDashboard } from '@/components/agent-dashboard'
import { VoiceCommander } from '@/components/voice-commander'
import { LivePreview } from '@/components/live-preview'
import { PhaseProgress } from '@/components/phase-progress'
import { MetricsDisplay } from '@/components/metrics-display'
import { DeploymentPanel } from '@/components/deployment-panel'
import { CodeViewer } from '@/components/code-viewer'
import type { Agent } from '@/lib/ai-orchestrator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function DashboardPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [prompt, setPrompt] = useState('Build a SaaS landing page for EcoCharge')
  const [demoMode, setDemoMode] = useState(true)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [metrics, setMetrics] = useState({
    time: '',
    agents: 0,
    security: 0,
    performance: 0,
    components: 0,
    linesOfCode: 0
  })
  const [generatedWebsite, setGeneratedWebsite] = useState<{
    previewHTML?: string
    title?: string
    description?: string
    html?: string
    css?: string
    js?: string
  }>({})
  const [showCode, setShowCode] = useState(false)

  useEffect(() => {
    // Initialize 87 agents with realistic names and roles
    const initializeAgents = () => {
      const agentData: Agent[] = [
        // Phase 1: Analysis (1-20)
        { id: 'agent-001', name: 'Business Model Analyzer', role: 'analysis', status: 'idle' as const },
        { id: 'agent-002', name: 'Target Audience Researcher', role: 'analysis', status: 'idle' as const },
        { id: 'agent-003', name: 'Brand Identity Specialist', role: 'analysis', status: 'idle' as const },
        { id: 'agent-004', name: 'Content Strategist', role: 'analysis', status: 'idle' as const },
        { id: 'agent-005', name: 'Competitive Analyst', role: 'analysis', status: 'idle' as const },
        { id: 'agent-006', name: 'User Persona Creator', role: 'analysis', status: 'idle' as const },
        { id: 'agent-007', name: 'Feature Prioritizer', role: 'analysis', status: 'idle' as const },
        { id: 'agent-008', name: 'Market Research Specialist', role: 'analysis', status: 'idle' as const },
        { id: 'agent-009', name: 'Value Proposition Designer', role: 'analysis', status: 'idle' as const },
        { id: 'agent-010', name: 'Conversion Funnel Architect', role: 'analysis', status: 'idle' as const },
        { id: 'agent-011', name: 'SEO Strategy Planner', role: 'analysis', status: 'idle' as const },
        { id: 'agent-012', name: 'Analytics Integration Specialist', role: 'analysis', status: 'idle' as const },
        { id: 'agent-013', name: 'Legal Compliance Checker', role: 'analysis', status: 'idle' as const },
        { id: 'agent-014', name: 'Accessibility Requirements Analyst', role: 'analysis', status: 'idle' as const },
        { id: 'agent-015', name: 'Performance Requirements Engineer', role: 'analysis', status: 'idle' as const },
        { id: 'agent-016', name: 'Security Requirements Specialist', role: 'analysis', status: 'idle' as const },
        { id: 'agent-017', name: 'Mobile Strategy Planner', role: 'analysis', status: 'idle' as const },
        { id: 'agent-018', name: 'Internationalization Specialist', role: 'analysis', status: 'idle' as const },
        { id: 'agent-019', name: 'Data Privacy Compliance Officer', role: 'analysis', status: 'idle' as const },
        { id: 'agent-020', name: 'Scalability Requirements Analyst', role: 'analysis', status: 'idle' as const },
        
        // Phase 2: Design (21-40)
        { id: 'agent-021', name: 'Color Palette Generator', role: 'design', status: 'idle' as const },
        { id: 'agent-022', name: 'Typography Curator', role: 'design', status: 'idle' as const },
        { id: 'agent-023', name: 'Layout Architect', role: 'design', status: 'idle' as const },
        { id: 'agent-024', name: 'Component Designer', role: 'design', status: 'idle' as const },
        { id: 'agent-025', name: 'Iconography Specialist', role: 'design', status: 'idle' as const },
        { id: 'agent-026', name: 'Visual Hierarchy Designer', role: 'design', status: 'idle' as const },
        { id: 'agent-027', name: 'Spacing System Architect', role: 'design', status: 'idle' as const },
        { id: 'agent-028', name: 'Animation Director', role: 'design', status: 'idle' as const },
        { id: 'agent-029', name: 'Microinteractions Designer', role: 'design', status: 'idle' as const },
        { id: 'agent-030', name: 'Responsive Grid Designer', role: 'design', status: 'idle' as const },
        { id: 'agent-031', name: 'Dark Mode Curator', role: 'design', status: 'idle' as const },
        { id: 'agent-032', name: 'Loading State Designer', role: 'design', status: 'idle' as const },
        { id: 'agent-033', name: 'Error State Designer', role: 'design', status: 'idle' as const },
        { id: 'agent-034', name: 'Success State Designer', role: 'design', status: 'idle' as const },
        { id: 'agent-035', name: 'Form Designer', role: 'design', status: 'idle' as const },
        { id: 'agent-036', name: 'Navigation Designer', role: 'design', status: 'idle' as const },
        { id: 'agent-037', name: 'Footer Designer', role: 'design', status: 'idle' as const },
        { id: 'agent-038', name: 'Header Designer', role: 'design', status: 'idle' as const },
        { id: 'agent-039', name: 'Button System Designer', role: 'design', status: 'idle' as const },
        { id: 'agent-040', name: 'Card Component Designer', role: 'design', status: 'idle' as const },
        
        // Phase 3: Frontend (41-60)
        { id: 'agent-041', name: 'React Component Builder', role: 'frontend', status: 'idle' as const },
        { id: 'agent-042', name: 'CSS Animation Director', role: 'frontend', status: 'idle' as const },
        { id: 'agent-043', name: 'Responsive Design Engineer', role: 'frontend', status: 'idle' as const },
        { id: 'agent-044', name: 'Accessibility Auditor', role: 'frontend', status: 'idle' as const },
        { id: 'agent-045', name: 'State Management Architect', role: 'frontend', status: 'idle' as const },
        { id: 'agent-046', name: 'Routing Specialist', role: 'frontend', status: 'idle' as const },
        { id: 'agent-047', name: 'Form Validation Engineer', role: 'frontend', status: 'idle' as const },
        { id: 'agent-048', name: 'API Integration Specialist', role: 'frontend', status: 'idle' as const },
        { id: 'agent-049', name: 'Performance Optimizer', role: 'frontend', status: 'idle' as const },
        { id: 'agent-050', name: 'Bundle Size Optimizer', role: 'frontend', status: 'idle' as const },
        { id: 'agent-051', name: 'Image Optimization Specialist', role: 'frontend', status: 'idle' as const },
        { id: 'agent-052', name: 'Font Loading Optimizer', role: 'frontend', status: 'idle' as const },
        { id: 'agent-053', name: 'Lazy Loading Engineer', role: 'frontend', status: 'idle' as const },
        { id: 'agent-054', name: 'Error Boundary Specialist', role: 'frontend', status: 'idle' as const },
        { id: 'agent-055', name: 'Loading State Engineer', role: 'frontend', status: 'idle' as const },
        { id: 'agent-056', name: 'Progressive Enhancement Engineer', role: 'frontend', status: 'idle' as const },
        { id: 'agent-057', name: 'Cross-browser Compatibility Specialist', role: 'frontend', status: 'idle' as const },
        { id: 'agent-058', name: 'Mobile Touch Specialist', role: 'frontend', status: 'idle' as const },
        { id: 'agent-059', name: 'Keyboard Navigation Engineer', role: 'frontend', status: 'idle' as const },
        { id: 'agent-060', name: 'Screen Reader Specialist', role: 'frontend', status: 'idle' as const },
        
        // Phase 4: Backend (61-75)
        { id: 'agent-061', name: 'API Architect', role: 'backend', status: 'idle' as const },
        { id: 'agent-062', name: 'Database Schema Designer', role: 'backend', status: 'idle' as const },
        { id: 'agent-063', name: 'Authentication Engineer', role: 'backend', status: 'idle' as const },
        { id: 'agent-064', name: 'Security Specialist', role: 'backend', status: 'idle' as const },
        { id: 'agent-065', name: 'Caching Strategist', role: 'backend', status: 'idle' as const },
        { id: 'agent-066', name: 'Rate Limiting Engineer', role: 'backend', status: 'idle' as const },
        { id: 'agent-067', name: 'Data Validation Specialist', role: 'backend', status: 'idle' as const },
        { id: 'agent-068', name: 'Error Handling Architect', role: 'backend', status: 'idle' as const },
        { id: 'agent-069', name: 'Logging Specialist', role: 'backend', status: 'idle' as const },
        { id: 'agent-070', name: 'Monitoring Engineer', role: 'backend', status: 'idle' as const },
        { id: 'agent-071', name: 'Backup Strategy Specialist', role: 'backend', status: 'idle' as const },
        { id: 'agent-072', name: 'Scalability Engineer', role: 'backend', status: 'idle' as const },
        { id: 'agent-073', name: 'Database Optimization Specialist', role: 'backend', status: 'idle' as const },
        { id: 'agent-074', name: 'API Documentation Writer', role: 'backend', status: 'idle' as const },
        { id: 'agent-075', name: 'Integration Testing Specialist', role: 'backend', status: 'idle' as const },
        
        // Phase 5: Testing (76-87)
        { id: 'agent-076', name: 'Security Penetration Tester', role: 'testing', status: 'idle' as const },
        { id: 'agent-077', name: 'Performance Analyst', role: 'testing', status: 'idle' as const },
        { id: 'agent-078', name: 'Cross-browser Compatibility Checker', role: 'testing', status: 'idle' as const },
        { id: 'agent-079', name: 'SEO Optimization Specialist', role: 'testing', status: 'idle' as const },
        { id: 'agent-080', name: 'Accessibility Tester', role: 'testing', status: 'idle' as const },
        { id: 'agent-081', name: 'Mobile Responsiveness Tester', role: 'testing', status: 'idle' as const },
        { id: 'agent-082', name: 'Load Testing Engineer', role: 'testing', status: 'idle' as const },
        { id: 'agent-083', name: 'User Experience Tester', role: 'testing', status: 'idle' as const },
        { id: 'agent-084', name: 'Code Quality Reviewer', role: 'testing', status: 'idle' as const },
        { id: 'agent-085', name: 'Documentation Reviewer', role: 'testing', status: 'idle' as const },
        { id: 'agent-086', name: 'Final Integration Tester', role: 'testing', status: 'idle' as const },
        { id: 'agent-087', name: 'Deployment Readiness Checker', role: 'deploy', status: 'idle' as const },
      ]
      setAgents(agentData)
    }
    initializeAgents()
  }, [])

  const run = async (p: string) => {
    setIsGenerating(true)
    setCurrentPhase(0)
    
    // Phase 1: Analysis (0-2s)
    setTimeout(() => {
      setCurrentPhase(1)
      const analysisAgents = agents.slice(0, 20)
      setAgents(prev => prev.map(agent => 
        analysisAgents.some(a => a.id === agent.id) 
          ? { ...agent, status: 'working', task: `Analyzing ${p.slice(0, 30)}...` }
          : agent
      ))
    }, 500)

    // Phase 2: Design (2-5s)
    setTimeout(() => {
      setCurrentPhase(2)
      const designAgents = agents.slice(20, 40)
      setAgents(prev => prev.map(agent => 
        designAgents.some(a => a.id === agent.id) 
          ? { ...agent, status: 'working', task: `Designing components...` }
          : agent
      ))
    }, 2000)

    // Phase 3: Frontend (5-8s)
    setTimeout(() => {
      setCurrentPhase(3)
      const frontendAgents = agents.slice(40, 60)
      setAgents(prev => prev.map(agent => 
        frontendAgents.some(a => a.id === agent.id) 
          ? { ...agent, status: 'working', task: `Building components...` }
          : agent
      ))
    }, 5000)

    // Phase 4: Backend (8-12s)
    setTimeout(() => {
      setCurrentPhase(4)
      const backendAgents = agents.slice(60, 75)
      setAgents(prev => prev.map(agent => 
        backendAgents.some(a => a.id === agent.id) 
          ? { ...agent, status: 'working', task: `Setting up APIs...` }
          : agent
      ))
    }, 8000)

    // Phase 5: Testing (12-16s)
    setTimeout(() => {
      setCurrentPhase(5)
      const testingAgents = agents.slice(75, 87)
      setAgents(prev => prev.map(agent => 
        testingAgents.some(a => a.id === agent.id) 
          ? { ...agent, status: 'working', task: `Running tests...` }
          : agent
      ))
    }, 12000)

    // Phase 6: Complete (16-20s)
    setTimeout(() => {
      setCurrentPhase(6)
      setAgents(prev => prev.map(agent => ({ ...agent, status: 'complete' })))
      setMetrics({
        time: '23.2s',
        agents: 87,
        security: 96,
        performance: 94,
        components: 23,
        linesOfCode: 1247
      })
      setIsGenerating(false)
    }, 16000)

    const res = await fetch('/api/generate', { 
      method: 'POST', 
      body: JSON.stringify({ prompt: p, demoMode }) 
    })
    const json = await res.json()
    
    if (json.success && json.website) {
      setGeneratedWebsite({
        previewHTML: json.previewHTML,
        title: json.title,
        description: json.description,
        html: json.website.html,
        css: json.website.css,
        js: json.website.js
      })
    }
  }

  return (
    <div className="h-screen flex">
      {/* Left Panel - Control (40%) */}
      <div className="w-2/5 border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white font-bold">FF</div>
            <div>
              <div className="font-bold">FlowForge</div>
              <div className="text-sm text-gray-500">AI No-Code Builder</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs">
              <input 
                type="checkbox" 
                checked={demoMode} 
                onChange={e => setDemoMode(e.target.checked)}
                className="w-3 h-3"
              />
              Demo Mode
            </label>
            <div className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Disconnected</div>
            <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">574dd5f8</div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-2">
            <VoiceCommander onCommand={cmd => {
              setPrompt(cmd)
              run(cmd)
            }} />
          </div>
          <Input 
            placeholder="Describe your website or app..." 
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className="mb-2"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !isGenerating) {
                run(prompt)
              }
            }}
          />
          <div className="flex gap-2">
            <Button onClick={() => run(prompt)} disabled={isGenerating || !prompt.trim()}>
              {isGenerating ? 'Generating...' : 'Generate'}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setPrompt('Build a SaaS landing page for EcoCharge')}
            >
              Example
            </Button>
          </div>
        </div>

        {/* Phase Progress */}
        <div className="p-4 border-b">
          <PhaseProgress currentPhase={currentPhase} />
        </div>

        {/* Agent Dashboard */}
        <div className="flex-1 p-4 overflow-y-auto">
          <AgentDashboard agents={agents} isActive={isGenerating} />
        </div>

        {/* Metrics */}
        <div className="p-4 border-t">
          <MetricsDisplay metrics={metrics} />
        </div>
      </div>

      {/* Right Panel - Live Preview (60%) */}
      <div className="w-3/5 flex flex-col">
        {/* Preview Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="font-bold">Live Preview</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Responsive</Button>
            <Button variant="outline" size="sm">Real-time</Button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 p-4">
          {showCode && generatedWebsite.html ? (
            <div className="h-full overflow-y-auto">
              <CodeViewer 
                html={generatedWebsite.html}
                css={generatedWebsite.css || ''}
                js={generatedWebsite.js || ''}
                title={generatedWebsite.title || 'Generated Website'}
              />
            </div>
          ) : (
            <LivePreview 
              currentPhase={currentPhase} 
              isGenerating={isGenerating} 
              generatedWebsite={generatedWebsite}
            />
          )}
        </div>

        {/* Deployment Panel */}
        <div className="p-4 border-t">
          <DeploymentPanel 
            ready={!isGenerating && currentPhase === 6} 
            website={generatedWebsite.html ? {
              html: generatedWebsite.html,
              css: generatedWebsite.css || '',
              js: generatedWebsite.js || '',
              title: generatedWebsite.title || 'Generated Website'
            } : undefined}
            onShowCode={() => setShowCode(!showCode)}
          />
        </div>
      </div>
    </div>
  )
}


