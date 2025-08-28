import { Button } from '@/components/ui/button'

export function ActionBar({ onGenerate }: { onGenerate: () => void }) {
  return (
    <div className="flex gap-2 p-2 border rounded">
      <Button onClick={onGenerate}>Generate</Button>
      <Button variant="outline">Save</Button>
      <Button variant="outline">Deploy</Button>
      <Button variant="outline">Download</Button>
      <Button variant="outline">Share</Button>
      <Button variant="outline">View Code</Button>
    </div>
  )
}


