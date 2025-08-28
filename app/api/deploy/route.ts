import { NextRequest, NextResponse } from 'next/server'
import { DeploymentService } from '@/lib/deployment-service'

export async function POST(request: NextRequest) {
  try {
    const { website, platform } = await request.json()
    
    if (!website || !platform) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing website data or platform' 
      }, { status: 400 })
    }

    const deploymentService = new DeploymentService()
    let result

    if (platform === 'github') {
      result = await deploymentService.deployToGitHub(website)
    } else if (platform === 'vercel') {
      result = await deploymentService.deployToVercel(website)
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Unsupported platform' 
      }, { status: 400 })
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error('Deployment error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Deployment failed' 
    }, { status: 500 })
  }
}


