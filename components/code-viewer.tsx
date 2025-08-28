'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Download, Copy, Check } from 'lucide-react'

interface CodeViewerProps {
  html: string
  css: string
  js: string
  title: string
}

export function CodeViewer({ html, css, js, title }: CodeViewerProps) {
  const [copied, setCopied] = useState<'html' | 'css' | 'js' | null>(null)

  const copyToClipboard = async (text: string, type: 'html' | 'css' | 'js') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadAll = () => {
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>${css}</style>
</head>
<body>
    ${html}
    <script>${js}</script>
</body>
</html>`
    
    downloadFile(fullHTML, `${title.toLowerCase().replace(/\s+/g, '-')}.html`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Generated Code</h3>
        <div className="flex gap-2">
          <Button onClick={downloadAll} size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="html" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="js">JavaScript</TabsTrigger>
        </TabsList>
        
        <TabsContent value="html" className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">HTML Structure</span>
            <Button
              onClick={() => copyToClipboard(html, 'html')}
              size="sm"
              variant="ghost"
            >
              {copied === 'html' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <Card className="p-4">
            <pre className="text-xs overflow-x-auto bg-gray-50 p-4 rounded">
              <code>{html}</code>
            </pre>
          </Card>
        </TabsContent>
        
        <TabsContent value="css" className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">CSS Styles</span>
            <Button
              onClick={() => copyToClipboard(css, 'css')}
              size="sm"
              variant="ghost"
            >
              {copied === 'css' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <Card className="p-4">
            <pre className="text-xs overflow-x-auto bg-gray-50 p-4 rounded">
              <code>{css}</code>
            </pre>
          </Card>
        </TabsContent>
        
        <TabsContent value="js" className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">JavaScript</span>
            <Button
              onClick={() => copyToClipboard(js, 'js')}
              size="sm"
              variant="ghost"
            >
              {copied === 'js' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <Card className="p-4">
            <pre className="text-xs overflow-x-auto bg-gray-50 p-4 rounded">
              <code>{js}</code>
            </pre>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
