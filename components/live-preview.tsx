import { useEffect, useState } from 'react'

interface LivePreviewProps {
  currentPhase: number
  isGenerating: boolean
  generatedWebsite?: {
    previewHTML?: string
    title?: string
    description?: string
  }
}

export function LivePreview({ currentPhase, isGenerating, generatedWebsite }: LivePreviewProps) {
  const [previewContent, setPreviewContent] = useState('')

  useEffect(() => {
    if (!isGenerating) {
      if (generatedWebsite?.previewHTML) {
        setPreviewContent(generatedWebsite.previewHTML)
      } else {
        setPreviewContent('')
      }
      return
    }

    const phaseContent = {
      0: '<div class="animate-pulse text-center py-20">Initializing website generation...</div>',
      1: `
        <div class="space-y-4 p-6">
          <div class="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          <div class="grid grid-cols-3 gap-4">
            <div class="h-20 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-20 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div class="text-center text-sm text-gray-500 mt-4">Analyzing requirements...</div>
        </div>
      `,
      2: `
        <div class="space-y-4 p-6">
          <div class="h-8 bg-blue-200 rounded"></div>
          <div class="h-4 bg-blue-200 rounded w-3/4"></div>
          <div class="h-4 bg-blue-200 rounded w-1/2"></div>
          <div class="grid grid-cols-3 gap-4">
            <div class="h-20 bg-blue-200 rounded"></div>
            <div class="h-20 bg-blue-200 rounded"></div>
            <div class="h-20 bg-blue-200 rounded"></div>
          </div>
          <div class="text-center text-sm text-blue-600 mt-4">Designing components...</div>
        </div>
      `,
      3: `
        <div class="space-y-4 p-6">
          <h1 class="text-2xl font-bold text-gray-900">${generatedWebsite?.title || 'Your Website'}</h1>
          <p class="text-gray-600">Building amazing features...</p>
          <div class="grid grid-cols-3 gap-4">
            <div class="p-4 border rounded bg-white">Feature 1</div>
            <div class="p-4 border rounded bg-white">Feature 2</div>
            <div class="p-4 border rounded bg-white">Feature 3</div>
          </div>
          <div class="text-center text-sm text-green-600 mt-4">Creating frontend components...</div>
        </div>
      `,
      4: `
        <div class="space-y-4 p-6">
          <h1 class="text-2xl font-bold text-gray-900">${generatedWebsite?.title || 'Your Website'}</h1>
          <p class="text-gray-600">Connecting APIs and databases...</p>
          <div class="grid grid-cols-3 gap-4">
            <div class="p-4 border rounded bg-white shadow">Feature 1</div>
            <div class="p-4 border rounded bg-white shadow">Feature 2</div>
            <div class="p-4 border rounded bg-white shadow">Feature 3</div>
          </div>
          <button class="px-4 py-2 bg-blue-600 text-white rounded">Get Started</button>
          <div class="text-center text-sm text-orange-600 mt-4">Setting up backend...</div>
        </div>
      `,
      5: `
        <div class="space-y-4 p-6">
          <h1 class="text-2xl font-bold text-gray-900">${generatedWebsite?.title || 'Your Website'}</h1>
          <p class="text-gray-600">Running security and performance tests...</p>
          <div class="grid grid-cols-3 gap-4">
            <div class="p-4 border rounded bg-white shadow hover:shadow-lg transition-shadow">Feature 1</div>
            <div class="p-4 border rounded bg-white shadow hover:shadow-lg transition-shadow">Feature 2</div>
            <div class="p-4 border rounded bg-white shadow hover:shadow-lg transition-shadow">Feature 3</div>
          </div>
          <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">Get Started</button>
          <div class="text-center text-sm text-red-600 mt-4">Running tests...</div>
        </div>
      `,
      6: `
        <div class="space-y-4 p-6">
          <h1 class="text-2xl font-bold text-gray-900">${generatedWebsite?.title || 'Your Website'}</h1>
          <p class="text-gray-600">Ready for deployment!</p>
          <div class="grid grid-cols-3 gap-4">
            <div class="p-4 border rounded bg-white shadow hover:shadow-lg transition-shadow cursor-pointer">Feature 1</div>
            <div class="p-4 border rounded bg-white shadow hover:shadow-lg transition-shadow cursor-pointer">Feature 2</div>
            <div class="p-4 border rounded bg-white shadow hover:shadow-lg transition-shadow cursor-pointer">Feature 3</div>
          </div>
          <button class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Launch Now</button>
          <div class="text-center text-sm text-green-600 mt-4">Website ready!</div>
        </div>
      `
    }

    setPreviewContent(phaseContent[currentPhase as keyof typeof phaseContent] || '')
  }, [currentPhase, isGenerating, generatedWebsite])

  return (
    <div className="h-full border rounded bg-white overflow-hidden">
      {!isGenerating && currentPhase === 0 && !generatedWebsite?.previewHTML ? (
        <div className="h-full flex items-center justify-center text-gray-500">
          <div className="text-center">
            <div className="text-6xl mb-4">🌐</div>
            <div className="text-xl font-medium">No Preview Yet</div>
            <div className="text-sm">Start describing your website to see the live preview</div>
          </div>
        </div>
      ) : (
        <iframe
          srcDoc={previewContent}
          className="w-full h-full border-0"
          title="Website Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      )}
    </div>
  )
}
