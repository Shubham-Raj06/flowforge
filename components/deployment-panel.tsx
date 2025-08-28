import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface DeploymentPanelProps {
  ready: boolean
  website?: {
    html: string
    css: string
    js: string
    title: string
  }
  onShowCode?: () => void
}

export function DeploymentPanel({ ready, website, onShowCode }: DeploymentPanelProps) {
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentResult, setDeploymentResult] = useState<{
    success: boolean
    url?: string
    error?: string
  } | null>(null)

  const deployToGitHub = async () => {
    if (!website) return
    
    setIsDeploying(true)
    setDeploymentResult(null)
    
    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          website,
          platform: 'github'
        })
      })
      
      const result = await response.json()
      setDeploymentResult(result)
      
      if (result.success && result.url) {
        // Open the deployed website in a new tab
        window.open(result.url, '_blank')
      }
    } catch (error) {
      setDeploymentResult({
        success: false,
        error: 'Deployment failed'
      })
    } finally {
      setIsDeploying(false)
    }
  }

  const downloadWebsite = () => {
    if (!website) return
    
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${website.title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>${website.css}</style>
</head>
<body>
    ${website.html}
    <script>${website.js}</script>
</body>
</html>`
    
    const blob = new Blob([fullHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${website.title.toLowerCase().replace(/\s+/g, '-')}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!ready) {
    return (
      <div className="text-center text-gray-500 text-sm">
        Complete generation to deploy
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Deployment Ready</div>
        <div className="flex items-center gap-2 text-xs text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          All checks passed
        </div>
      </div>
      
      {deploymentResult && (
        <div className={`p-2 rounded text-xs ${
          deploymentResult.success 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {deploymentResult.success ? (
            <div>
              ✅ Deployed successfully! 
              {deploymentResult.url && (
                <a href={deploymentResult.url} target="_blank" rel="noopener noreferrer" className="underline ml-1">
                  View site
                </a>
              )}
            </div>
          ) : (
            <div>❌ {deploymentResult.error}</div>
          )}
        </div>
      )}
      
      <div className="flex gap-2">
        <Button 
          className="flex-1" 
          onClick={deployToGitHub}
          disabled={isDeploying || !website}
        >
          {isDeploying ? 'Deploying...' : 'Deploy to GitHub'}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onShowCode}
        >
          View Code
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={downloadWebsite}
          disabled={!website}
        >
          Download
        </Button>
      </div>
      
      <div className="text-xs text-gray-500">
        Your site will be deployed to GitHub Pages automatically
      </div>
    </div>
  )
}
