import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

export function PreviewPane() {
  const [url, setUrl] = useState('/api/preview?id=demo')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const es = new EventSource('/api/preview/updates')
    es.onmessage = (e) => {
      const data = JSON.parse(e.data)
      if (data.type === 'reload') {
        // refresh iframe by resetting src
        setUrl(prev => prev.split('#')[0] + '#' + Date.now())
      }
    }
    return () => es.close()
  }, [])

  return (
    <div className="h-full border rounded overflow-hidden flex flex-col">
      <div className="p-2 border-b flex gap-2 justify-end">
        <Button variant="outline" size="sm" onClick={()=>iframeRef.current?.contentWindow?.location.reload()}>Reload</Button>
      </div>
      <iframe ref={iframeRef} className="w-full flex-1 bg-white" src={url} />
    </div>
  )
}


