import { NextResponse } from 'next/server'
import { DemoMode } from '@/lib/demo-mode'
import { WebsiteGenerator } from '@/lib/website-generator'

export async function POST(request: Request) {
  try {
    const { prompt, demoMode } = await request.json()
    const demo = demoMode || process.env.DEMO_MODE === 'true'

    if (demo) {
      const demoMode = new DemoMode()
      const match = demoMode.findMatch(prompt)
      
      if (match) {
        return NextResponse.json({ 
          demo: true, 
          appspec: match.appspec, 
          deployTime: match.deployTime 
        })
      }
      
      // Fallback demo response if no match found
      return NextResponse.json({
        demo: true,
        appspec: {
          title: 'Demo Website',
          description: 'A demo website generated for testing',
          features: ['Demo Feature 1', 'Demo Feature 2', 'Demo Feature 3'],
          html: '<div>Demo HTML</div>',
          css: '/* Demo CSS */',
          js: '// Demo JS'
        },
        deployTime: '15.2s'
      })
    }

    const generator = new WebsiteGenerator()
    const website = await generator.generateWebsite(prompt)
    const previewHTML = await generator.generatePreviewHTML(website)

    return NextResponse.json({
      success: true,
      demo: false,
      prompt,
      website,
      previewHTML,
      deployTime: '23.2s',
      message: 'Website generated successfully',
      title: website.title,
      description: website.description,
      features: website.features
    })
  } catch (error) {
    console.error('Error in generate API:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate website',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
