export function MetricsDisplay({ metrics }: { 
  metrics: {
    time: string
    agents: number
    security: number
    performance: number
    components: number
    linesOfCode: number
  }
}) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">Generation Metrics</div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 border rounded">
          <div className="text-gray-500">Time</div>
          <div className="font-semibold">{metrics.time || '-'}</div>
        </div>
        <div className="p-2 border rounded">
          <div className="text-gray-500">Agents</div>
          <div className="font-semibold">{metrics.agents || '-'}</div>
        </div>
        <div className="p-2 border rounded">
          <div className="text-gray-500">Security</div>
          <div className="font-semibold">{metrics.security || '-'}/100</div>
        </div>
        <div className="p-2 border rounded">
          <div className="text-gray-500">Performance</div>
          <div className="font-semibold">{metrics.performance || '-'}/100</div>
        </div>
        <div className="p-2 border rounded">
          <div className="text-gray-500">Components</div>
          <div className="font-semibold">{metrics.components || '-'}</div>
        </div>
        <div className="p-2 border rounded">
          <div className="text-gray-500">Lines of Code</div>
          <div className="font-semibold">{metrics.linesOfCode || '-'}</div>
        </div>
      </div>
    </div>
  )
}
