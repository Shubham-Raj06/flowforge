export interface AppSpec {
  version: '1.0'
  projectId: string
  metadata: {
    businessType: string
    targetAudience: string
    brandPersonality: string[]
  }
  theme: {
    primaryColor: string
    secondaryColor: string
    mode: 'light' | 'dark'
    fontFamily: string
  }
  pages: Page[]
}

export interface Page {
  id: string
  path: string
  sections: Section[]
  seo: { title: string; description: string }
}

export interface Section {
  id: string
  type: 'Hero' | 'Features' | 'Pricing' | 'Testimonials' | 'CTA' | 'Contact' | 'About'
  props: Record<string, any>
  agentsInvolved: string[]
}

export class AppSpecRenderer {
  renderToCode(appspec: AppSpec): { html: string; css: string; js: string } {
    return {
      html: this.generateHTML(appspec),
      css: this.generateTailwindCSS(appspec),
      js: this.generateInteractivity(appspec)
    }
  }

  generateStaticSite(appspec: AppSpec): Record<string, string> {
    const files: Record<string, string> = {}
    files['index.html'] = this.createFullHTML(appspec)
    appspec.pages.forEach(page => {
      if (page.path !== '/') {
        files[`${page.path.slice(1)}.html`] = this.createPageHTML(page, appspec)
      }
    })
    files['style.css'] = this.generateCSS(appspec)
    files['script.js'] = this.generateJS(appspec)
    files['robots.txt'] = 'User-agent: *\nAllow: /'
    files['sitemap.xml'] = this.generateSitemap(appspec)
    return files
  }

  private renderSection(section: Section) {
    switch (section.type) {
      case 'Hero':
        return `<section class="py-24 text-center"><h1 class="text-4xl font-bold">${
          section.props.headline || 'Your Headline'
        }</h1><p class="mt-3 text-gray-600">${section.props.sub || ''}</p><a class="inline-block mt-6 px-5 py-3 bg-black text-white rounded">${
          section.props.cta || 'Get Started'
        }</a></section>`
      case 'Features':
        return `<section class="py-16"><div class="grid grid-cols-1 md:grid-cols-3 gap-6">${
          (section.props.items || ['Fast','Secure','Reliable']).map((i: string) => `<div class="p-6 border rounded">${i}</div>`).join('')
        }</div></section>`
      case 'Pricing':
        return `<section class="py-16"><div class="grid grid-cols-1 md:grid-cols-3 gap-6">${
          (section.props.plans || ['Free','Pro','Enterprise']).map((p: string) => `<div class="p-6 border rounded text-center"><div class="text-xl font-semibold">${p}</div><button class="mt-4 px-4 py-2 bg-black text-white rounded">Choose</button></div>`).join('')
        }</div></section>`
      case 'Testimonials':
        return `<section class="py-16 bg-gray-50"><div class="max-w-3xl mx-auto space-y-4">${
          (section.props.quotes || ['Amazing!', 'Love it!']).map((q: string) => `<blockquote class="p-6 border rounded italic">${q}</blockquote>`).join('')
        }</div></section>`
      case 'CTA':
        return `<section class="py-16 text-center"><a class="px-6 py-3 bg-blue-600 text-white rounded">${
          section.props.text || 'Get Started'
        }</a></section>`
      case 'Contact':
        return `<section class="py-16"><div class="max-w-xl mx-auto"><div class="p-4 border rounded">${
          section.props.address || ''
        }<br/>${section.props.phone || ''}</div></div></section>`
      default:
        return `<section class="py-8">${section.type}</section>`
    }
  }

  private generateHTML(appspec: AppSpec) {
    return appspec.pages
      .map(page => page.sections.map(s => this.renderSection(s)).join('\n'))
      .join('\n')
  }

  private generateTailwindCSS(appspec: AppSpec) {
    return `/* theme: ${appspec.theme.primaryColor} */`
  }

  private generateInteractivity(_appspec: AppSpec) {
    return ''
  }

  private createFullHTML(appspec: AppSpec) {
    const { html, css, js } = this.renderToCode(appspec)
    return `<!doctype html>\n<html>\n<head>\n<meta charset="utf-8"/>\n<title>${
      appspec.pages[0]?.seo?.title || 'FlowForge'
    }</title>\n<style>${css}</style>\n</head>\n<body>\n${html}\n<script>${js}</script>\n</body>\n</html>`
  }

  private createPageHTML(page: Page, appspec: AppSpec) {
    return `<!doctype html>\n<html>\n<head>\n<meta charset="utf-8"/>\n<title>${
      page.seo.title
    }</title>\n</head>\n<body>\n${page.sections.map(s => `<section>${s.type}</section>`).join('\n')}\n</body>\n</html>`
  }

  private generateCSS(_appspec: AppSpec) { return '' }
  private generateJS(_appspec: AppSpec) { return '' }
  private generateSitemap(appspec: AppSpec) {
    const urls = appspec.pages.map(p => `<url><loc>${p.path}</loc></url>`).join('')
    return `<?xml version="1.0" encoding="UTF-8"?><urlset>${urls}</urlset>`
  }
}


