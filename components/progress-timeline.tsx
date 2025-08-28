export function ProgressTimeline({ phase }: { phase: number }) {
  const phases = ['Analyzing Requirements','Agent Coordination','Content Generation','Quality Assurance']
  return (
    <div className="grid grid-cols-4 gap-2 my-2">
      {phases.map((p, i) => (
        <div key={p} className={`p-2 text-center border rounded ${i < phase ? 'bg-green-100 border-green-400' : i === phase ? 'bg-blue-100 border-blue-400' : 'bg-gray-50'}`}>{p}</div>
      ))}
    </div>
  )
}


