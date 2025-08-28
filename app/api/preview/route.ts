import { NextResponse } from 'next/server'
import { DemoMode } from '@/lib/demo-mode'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const projectId = searchParams.get('id') || 'demo'
  
  const demoMode = new DemoMode()
  const match = demoMode.findMatch('SaaS platform')
  
  if (match) {
    const { html, css, js } = match.appspec
    const full = `<!doctype html><html><head><meta charset="utf-8"/><title>Preview</title><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`
    return new NextResponse(full, { headers: { 'Content-Type': 'text/html' } })
  }
  
  // Fallback
  const fallback = `<!doctype html><html><head><meta charset="utf-8"/><title>Preview</title></head><body><h1>Demo Website</h1><p>Website preview will be available here.</p></body></html>`
  return new NextResponse(fallback, { headers: { 'Content-Type': 'text/html' } })
}


