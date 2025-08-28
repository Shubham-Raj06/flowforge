import { NextResponse } from 'next/server'

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const enc = new TextEncoder()
      controller.enqueue(enc.encode(`data: ${JSON.stringify({ type: 'heartbeat' })}\n\n`))
      const iv = setInterval(() => {
        controller.enqueue(enc.encode(`data: ${JSON.stringify({ type: 'reload' })}\n\n`))
      }, 5000)
      return () => clearInterval(iv)
    }
  })
  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  })
}


