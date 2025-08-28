import { AIGenerator } from './ai-generator'

export interface GeneratedWebsite {
  html: string
  css: string
  js: string
  title: string
  description: string
  features: string[]
}

export class WebsiteGenerator {
  private aiGenerator: AIGenerator

  constructor() {
    this.aiGenerator = new AIGenerator()
  }

  async generateWebsite(prompt: string): Promise<GeneratedWebsite> {
    console.log('Generating website for prompt:', prompt)
    
    try {
      // Try AI generation first
      const aiWebsite = await this.aiGenerator.generateWebsite(prompt)
      console.log('AI generation successful')
      return aiWebsite
    } catch (error) {
      console.log('AI generation failed, using fallback:', error)
      // Fallback to template-based generation
      return this.generateFallbackWebsite(prompt)
    }
  }

  async generatePreviewHTML(website: GeneratedWebsite): Promise<string> {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${website.title}</title>
    <meta name="description" content="${website.description}">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>${website.css}</style>
</head>
<body>
    ${website.html}
    <script>${website.js}</script>
</body>
</html>`
  }

  private generateFallbackWebsite(prompt: string): GeneratedWebsite {
    const title = this.extractTitle(prompt)
    const features = this.extractFeatures(prompt)

    return {
      title,
      description: `A modern, responsive website for ${prompt}`,
      features,
      html: this.generateFallbackHTML(title, prompt),
      css: this.generateFallbackCSS(),
      js: this.generateFallbackJS()
    }
  }

  private extractTitle(prompt: string): string {
    if (prompt.includes('SaaS')) return 'Modern SaaS Platform'
    if (prompt.includes('restaurant')) return 'Delicious Restaurant'
    if (prompt.includes('ecommerce')) return 'Online Store'
    if (prompt.includes('portfolio')) return 'Professional Portfolio'
    if (prompt.includes('blog')) return 'Personal Blog'
    return 'Professional Website'
  }

  private extractFeatures(prompt: string): string[] {
    const features = ['Responsive Design', 'Modern UI', 'Fast Loading']
    
    if (prompt.includes('SaaS')) features.push('User Authentication', 'Dashboard', 'Analytics')
    if (prompt.includes('restaurant')) features.push('Menu Display', 'Online Ordering', 'Reservations')
    if (prompt.includes('ecommerce')) features.push('Product Catalog', 'Shopping Cart', 'Payment Processing')
    if (prompt.includes('portfolio')) features.push('Project Showcase', 'Contact Form', 'Social Links')
    if (prompt.includes('blog')) features.push('Article Management', 'Comments', 'Search')
    
    return features
  }

  private generateFallbackHTML(title: string, prompt: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      .gradient-bg {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      .fade-in {
        animation: fadeIn 0.8s ease-in;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <h1 class="text-xl font-bold text-gray-900">${title}</h1>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="#features" class="text-gray-700 hover:text-gray-900">Features</a>
                    <a href="#about" class="text-gray-700 hover:text-gray-900">About</a>
                    <a href="#contact" class="text-gray-700 hover:text-gray-900">Contact</a>
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="gradient-bg text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 class="text-5xl font-bold mb-6 fade-in">Welcome to ${title}</h1>
            <p class="text-xl mb-8 fade-in">${prompt}</p>
            <button class="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors fade-in">
                Learn More
            </button>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <span class="text-2xl">🚀</span>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Fast & Reliable</h3>
                    <p class="text-gray-600">Lightning-fast performance with 99.9% uptime guarantee.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <span class="text-2xl">📱</span>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Mobile First</h3>
                    <p class="text-gray-600">Responsive design that works perfectly on all devices.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <span class="text-2xl">🔒</span>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Secure</h3>
                    <p class="text-gray-600">Enterprise-grade security to protect your data.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="bg-gray-100 py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h2 class="text-3xl font-bold mb-6">About Us</h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    We're passionate about creating amazing digital experiences that help businesses grow and succeed in the modern world.
                </p>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-center mb-12">Get In Touch</h2>
            <div class="max-w-md mx-auto">
                <form class="space-y-4">
                    <input type="text" placeholder="Your Name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <input type="email" placeholder="Your Email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <textarea placeholder="Your Message" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                    <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2024 ${title}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`
  }

  private generateFallbackCSS(): string {
    return `/* Additional custom styles */
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.fade-in {
  animation: fadeIn 0.8s ease-in;
}

@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.hover-lift {
  transition: transform 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
}`
  }

  private generateFallbackJS(): string {
    return `// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Form submission handling
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for your message! We\\'ll get back to you soon.');
  this.reset();
});

// Add hover effects to feature cards
document.querySelectorAll('.hover-lift').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-4px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});`
  }
}
