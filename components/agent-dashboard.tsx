import type { Agent } from '@/lib/ai-orchestrator'

export function AgentDashboard({ agents, isActive }: { agents: Agent[]; isActive: boolean }) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'analysis': return 'border-blue-500 bg-blue-50'
      case 'design': return 'border-purple-500 bg-purple-50'
      case 'frontend': return 'border-green-500 bg-green-50'
      case 'backend': return 'border-orange-500 bg-orange-50'
      case 'testing': return 'border-red-500 bg-red-50'
      case 'deploy': return 'border-yellow-500 bg-yellow-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working': return 'bg-blue-600 text-white animate-pulse'
      case 'complete': return 'bg-green-600 text-white'
      default: return 'bg-gray-200 text-gray-700'
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold">FlowForge Hive Mind</h3>
        <p className="text-sm text-gray-500">87 AI Agents Working in Harmony</p>
      </div>

      <div className="grid grid-cols-4 gap-2 max-h-96 overflow-y-auto">
        {agents.map(agent => (
          <div
            key={agent.id}
            className={`p-2 rounded border text-xs transition-all ${getRoleColor(agent.role)}`}
          >
            <div className={`font-semibold ${getStatusColor(agent.status)}`}>
              {agent.name}
            </div>
            <div className="text-xs mt-1 text-gray-600">
              {agent.task || 'Idle'}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-sm border-t pt-2">
        <span>Active: {agents.filter(a => a.status === 'working').length}</span>
        <span>Complete: {agents.filter(a => a.status === 'complete').length}</span>
        <span>Success Rate: 98.7%</span>
      </div>
    </div>
  )
}


