export function PhaseProgress({ currentPhase }: { currentPhase: number }) {
  const phases = [
    { name: 'Initializing', color: 'bg-gray-500' },
    { name: 'Requirements Analysis', color: 'bg-blue-500' },
    { name: 'Design System', color: 'bg-purple-500' },
    { name: 'Frontend Development', color: 'bg-green-500' },
    { name: 'Backend Integration', color: 'bg-orange-500' },
    { name: 'Testing & QA', color: 'bg-red-500' },
    { name: 'Deployment Ready', color: 'bg-yellow-500' }
  ]

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">Generation Progress</div>
      <div className="flex gap-1">
        {phases.map((phase, index) => (
          <div
            key={phase.name}
            className={`flex-1 h-2 rounded-full transition-all duration-500 ${
              index < currentPhase 
                ? phase.color 
                : index === currentPhase 
                ? `${phase.color} animate-pulse` 
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <div className="text-xs text-gray-600">
        {currentPhase < phases.length ? phases[currentPhase].name : 'Complete'}
      </div>
    </div>
  )
}
