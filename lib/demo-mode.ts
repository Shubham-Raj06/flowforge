export interface DemoAppSpec {
  title: string
  description: string
  features: string[]
  html: string
  css: string
  js: string
}

export interface DemoMatch {
  appspec: DemoAppSpec
  deployTime: string
}

export class DemoMode {
  private demoTemplates: { [key: string]: DemoMatch } = {
    'saas': {
      appspec: {
        title: 'Modern SaaS Platform',
        description: 'A comprehensive SaaS solution for modern businesses',
        features: ['User Authentication', 'Dashboard', 'Analytics', 'API Integration'],
        html: '<div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8"><h1 class="text-4xl font-bold">Modern SaaS Platform</h1><p class="text-xl mt-4">Transform your business with our powerful SaaS solution</p></div>',
        css: '.bg-gradient-to-r { background: linear-gradient(to right, #2563eb, #7c3aed); }',
        js: 'console.log("SaaS Platform loaded");'
      },
      deployTime: '12.3s'
    },
    'restaurant': {
      appspec: {
        title: 'Delicious Restaurant',
        description: 'A beautiful restaurant website with online ordering',
        features: ['Menu Display', 'Online Ordering', 'Reservations', 'Gallery'],
        html: '<div class="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8"><h1 class="text-4xl font-bold">Delicious Restaurant</h1><p class="text-xl mt-4">Experience the finest cuisine in town</p></div>',
        css: '.bg-gradient-to-r { background: linear-gradient(to right, #f97316, #ef4444); }',
        js: 'console.log("Restaurant website loaded");'
      },
      deployTime: '15.7s'
    },
    'ecommerce': {
      appspec: {
        title: 'Online Store',
        description: 'A modern e-commerce platform for your business',
        features: ['Product Catalog', 'Shopping Cart', 'Payment Processing', 'Order Tracking'],
        html: '<div class="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8"><h1 class="text-4xl font-bold">Online Store</h1><p class="text-xl mt-4">Shop the latest products with ease</p></div>',
        css: '.bg-gradient-to-r { background: linear-gradient(to right, #22c55e, #3b82f6); }',
        js: 'console.log("E-commerce store loaded");'
      },
      deployTime: '18.2s'
    },
    'portfolio': {
      appspec: {
        title: 'Professional Portfolio',
        description: 'Showcase your work with a stunning portfolio',
        features: ['Project Showcase', 'Contact Form', 'Social Links', 'Blog'],
        html: '<div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8"><h1 class="text-4xl font-bold">Professional Portfolio</h1><p class="text-xl mt-4">Showcasing creative excellence</p></div>',
        css: '.bg-gradient-to-r { background: linear-gradient(to right, #a855f7, #ec4899); }',
        js: 'console.log("Portfolio loaded");'
      },
      deployTime: '14.1s'
    }
  }

  findMatch(prompt: string): DemoMatch | null {
    const lowerPrompt = prompt.toLowerCase()
    
    if (lowerPrompt.includes('saas')) return this.demoTemplates.saas
    if (lowerPrompt.includes('restaurant')) return this.demoTemplates.restaurant
    if (lowerPrompt.includes('ecommerce') || lowerPrompt.includes('store')) return this.demoTemplates.ecommerce
    if (lowerPrompt.includes('portfolio')) return this.demoTemplates.portfolio
    
    // Default fallback
    return {
      appspec: {
        title: 'Professional Website',
        description: 'A modern, responsive website for your business',
        features: ['Responsive Design', 'Modern UI', 'Fast Loading', 'SEO Optimized'],
        html: '<div class="bg-gradient-to-r from-gray-600 to-gray-800 text-white p-8"><h1 class="text-4xl font-bold">Professional Website</h1><p class="text-xl mt-4">Your business, beautifully presented</p></div>',
        css: '.bg-gradient-to-r { background: linear-gradient(to right, #4b5563, #1f2937); }',
        js: 'console.log("Professional website loaded");'
      },
      deployTime: '16.5s'
    }
  }
}
