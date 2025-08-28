type GenType = 'structure' | 'content' | 'design'

interface Provider {
  name: 'huggingface' | 'groq' | 'together'
  endpoint: string
}

export class FreeAIProvider {
  private providers: Provider[] = [
    { name: 'huggingface', endpoint: 'https://api-inference.huggingface.co' },
    { name: 'groq', endpoint: 'https://api.groq.com/openai/v1' },
    { name: 'together', endpoint: 'https://api.together.xyz' },
  ]

  async callMultipleProviders(prompt: string, type: GenType) {
    for (const provider of this.providers) {
      try {
        const response = await this.makeRequest(provider, type, prompt)
        if (response) return response
      } catch (_err) {
      }
    }
    return this.getFallbackResponse(type, prompt)
  }

  private async makeRequest(_provider: Provider, type: GenType, prompt: string) {
    return { type, prompt }
  }

  private getFallbackResponse(type: GenType, prompt: string) {
    return { type, prompt, fallback: true }
  }
}


