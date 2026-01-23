import type { Freebie } from '../types';

// Sample freebies data - in production, this would come from a CMS or API
export const FREEBIES: Freebie[] = [
  {
    id: '1',
    slug: 'climate-crisis-free-variable-font',
    title: 'Climate Crisis: Free Variable Font in 8 Styles',
    description: 'A beautiful variable font inspired by climate awareness, featuring 8 distinct styles perfect for modern web design and print projects.',
    shortDescription: 'A beautiful variable font inspired by climate awareness, featuring 8 distinct styles perfect for modern web design.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=675&fit=crop',
    category: 'Typography',
    tags: ['font', 'variable-font', 'design', 'typography'],
    createdAt: '2024-01-15',
    downloadCount: 1234,
    content: `# Climate Crisis: Free Variable Font in 8 Styles

## Overview

Climate Crisis is a modern variable font designed with environmental awareness in mind. This versatile typeface offers 8 distinct styles that seamlessly blend together, giving you complete control over weight, width, and optical size.

## What's Included

This free font package includes:

- **8 Variable Styles**: From thin to black, condensed to expanded
- **Full Character Set**: Supports Latin, numbers, and special characters
- **OpenType Features**: Ligatures, alternates, and stylistic sets
- **Web Font Formats**: WOFF2, WOFF, and TTF formats included
- **Commercial License**: Free for personal and commercial use

## How to Use

### For Web Design

1. Download the font files
2. Upload to your web server or use a CDN
3. Add @font-face declarations in your CSS
4. Apply the font-family to your elements

### For Print Projects

1. Install the TTF files on your system
2. Use in design software like Adobe InDesign, Illustrator, or Photoshop
3. Adjust the variable font axes to achieve your desired look

## Benefits and Features

- **Versatile**: One font file replaces multiple static fonts
- **Performance**: Smaller file sizes compared to multiple font files
- **Flexibility**: Adjust weight and width with CSS or design software
- **Modern**: Built with contemporary design principles
- **Accessible**: Optimized for readability across all sizes

## Technical Specifications

- **Format**: Variable Font (OpenType Variable)
- **Styles**: 8 weights (Thin to Black)
- **Widths**: Normal and Condensed variants
- **Language Support**: Latin Extended
- **File Size**: ~150KB (WOFF2 format)

## Use Cases

- Website headers and hero sections
- Brand identity projects
- Editorial design
- Social media graphics
- Print advertisements
- Mobile app interfaces

## License

This font is released under the SIL Open Font License (OFL), allowing free use in both personal and commercial projects. Attribution is appreciated but not required.`,
    relatedFreebies: ['2', '3']
  },
  {
    id: '2',
    slug: 'modern-ui-component-library',
    title: 'Modern UI Component Library - React & Tailwind',
    description: 'A comprehensive collection of 50+ pre-built React components styled with Tailwind CSS, perfect for rapid prototyping and production use.',
    shortDescription: 'A comprehensive collection of 50+ pre-built React components styled with Tailwind CSS.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=675&fit=crop',
    category: 'Development',
    tags: ['react', 'tailwind', 'components', 'ui'],
    createdAt: '2024-02-01',
    downloadCount: 2156,
    content: `# Modern UI Component Library - React & Tailwind

## Overview

Build beautiful, responsive interfaces faster with our comprehensive React component library. Each component is built with Tailwind CSS and follows modern design principles.

## What's Included

- **50+ Components**: Buttons, cards, forms, modals, navigation, and more
- **Fully Responsive**: Mobile-first design approach
- **Dark Mode Support**: Built-in dark mode variants
- **TypeScript**: Full TypeScript definitions included
- **Accessible**: WCAG 2.1 AA compliant components
- **Customizable**: Easy to modify and extend

## Quick Start

\`\`\`bash
npm install @your-org/ui-components
\`\`\`

\`\`\`tsx
import { Button, Card, Modal } from '@your-org/ui-components';

function App() {
  return (
    <Card>
      <Button variant="primary">Click Me</Button>
    </Card>
  );
}
\`\`\`

## Component Categories

### Navigation
- Header components
- Sidebar navigation
- Breadcrumbs
- Tabs

### Forms
- Input fields
- Select dropdowns
- Checkboxes and radios
- Form validation

### Feedback
- Alerts and notifications
- Loading states
- Progress bars
- Toast messages

## Best Practices

1. **Consistency**: Use components consistently across your application
2. **Customization**: Override Tailwind classes when needed
3. **Accessibility**: Always include proper ARIA labels
4. **Performance**: Import only what you need

## License

MIT License - Free for personal and commercial use.`,
    relatedFreebies: ['1', '3']
  },
  {
    id: '3',
    slug: 'icon-set-500-vector-icons',
    title: 'Premium Icon Set - 500 Vector Icons',
    description: 'A curated collection of 500 hand-crafted vector icons in multiple formats, perfect for web, mobile, and print projects.',
    shortDescription: 'A curated collection of 500 hand-crafted vector icons in multiple formats.',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=600&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1200&h=675&fit=crop',
    category: 'Icons',
    tags: ['icons', 'vector', 'svg', 'design'],
    createdAt: '2024-02-15',
    downloadCount: 3421,
    content: `# Premium Icon Set - 500 Vector Icons

## Overview

A meticulously crafted collection of 500 vector icons designed for modern digital projects. Each icon is available in multiple formats and sizes.

## What's Included

- **500 Unique Icons**: Carefully designed and organized
- **Multiple Formats**: SVG, PNG (multiple sizes), and icon font
- **Consistent Style**: Unified design language throughout
- **Organized Categories**: Easy to find what you need
- **Scalable**: Vector format ensures crisp rendering at any size

## Icon Categories

- **Business**: Office, finance, charts, analytics
- **Technology**: Devices, software, cloud, security
- **Social**: Social media, communication, sharing
- **E-commerce**: Shopping, payments, products
- **Navigation**: Arrows, directions, location
- **And 20+ more categories**

## Usage Examples

### SVG (Recommended)
\`\`\`html
<img src="icon.svg" alt="Icon" />
\`\`\`

### Icon Font
\`\`\`html
<span class="icon-home"></span>
\`\`\`

### React Component
\`\`\`tsx
import { HomeIcon } from './icons';

<HomeIcon size={24} color="#000" />
\`\`\`

## Best Practices

1. **Size Appropriately**: Use appropriate sizes for your context
2. **Color**: Icons work best with solid colors
3. **Consistency**: Stick to one style throughout your project
4. **Accessibility**: Always include alt text or aria-labels

## License

Free for personal and commercial use. Attribution appreciated.`,
    relatedFreebies: ['1', '2']
  },
  {
    id: '4',
    slug: 'gradient-background-pack',
    title: 'Gradient Background Pack - 100 Premium Gradients',
    description: 'A collection of 100 hand-picked gradient backgrounds perfect for hero sections, cards, and modern web designs.',
    shortDescription: 'A collection of 100 hand-picked gradient backgrounds perfect for hero sections.',
    thumbnail: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&h=675&fit=crop',
    category: 'Design',
    tags: ['gradients', 'backgrounds', 'design', 'css'],
    createdAt: '2024-03-01',
    downloadCount: 1890,
    content: `# Gradient Background Pack - 100 Premium Gradients

## Overview

Elevate your designs with 100 carefully crafted gradient backgrounds. Each gradient is optimized for web use and available in multiple formats.

## What's Included

- **100 Unique Gradients**: From subtle to vibrant
- **Multiple Formats**: CSS, PNG, and SVG
- **Color Codes**: Hex, RGB, and HSL values provided
- **Organized by Mood**: Calm, energetic, professional, creative
- **Responsive Ready**: Optimized for all screen sizes

## How to Use

### CSS Gradient
\`\`\`css
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
\`\`\`

### Tailwind CSS
\`\`\`html
<div class="bg-gradient-to-r from-purple-500 to-pink-500">
  Content
</div>
\`\`\`

## Categories

- **Subtle**: Perfect for text backgrounds
- **Bold**: Eye-catching hero sections
- **Warm**: Sunset and fire-inspired
- **Cool**: Ocean and sky tones
- **Neutral**: Professional and minimal

## Best Practices

1. **Contrast**: Ensure text remains readable
2. **Performance**: Use CSS gradients when possible
3. **Accessibility**: Test with color blindness simulators
4. **Consistency**: Match gradients to your brand

## License

Free for personal and commercial use.`,
    relatedFreebies: ['1', '3']
  },
  {
    id: '5',
    slug: 'email-template-collection',
    title: 'Email Template Collection - 20 Responsive Templates',
    description: 'A professional collection of 20 responsive email templates compatible with all major email clients, perfect for newsletters and campaigns.',
    shortDescription: 'A professional collection of 20 responsive email templates compatible with all major email clients.',
    thumbnail: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=600&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=1200&h=675&fit=crop',
    category: 'Templates',
    tags: ['email', 'templates', 'responsive', 'html'],
    createdAt: '2024-03-15',
    downloadCount: 987,
    content: `# Email Template Collection - 20 Responsive Templates

## Overview

Professional email templates that work across all major email clients. Built with best practices and tested for compatibility.

## What's Included

- **20 Unique Templates**: Various styles and purposes
- **Fully Responsive**: Mobile-optimized layouts
- **Email Client Compatible**: Works in Gmail, Outlook, Apple Mail, and more
- **Editable**: Easy to customize with your content
- **Documentation**: Detailed setup instructions

## Template Styles

- Newsletter templates
- Product announcements
- Welcome emails
- Transactional emails
- Promotional campaigns
- Event invitations

## Features

- **Table-based Layout**: Ensures compatibility
- **Inline CSS**: Required for email clients
- **Mobile Responsive**: Adapts to small screens
- **Accessible**: Proper semantic HTML
- **Tested**: Verified across major clients

## How to Use

1. Download the template files
2. Open in your email service provider
3. Customize content and colors
4. Test before sending
5. Deploy to your email campaign

## Best Practices

1. **Test Thoroughly**: Check in multiple email clients
2. **Keep It Simple**: Avoid complex layouts
3. **Optimize Images**: Compress and use alt text
4. **Mobile First**: Design for mobile screens
5. **Clear CTAs**: Make call-to-actions prominent

## License

Free for personal and commercial use.`,
    relatedFreebies: ['2', '4']
  },
  {
    id: '6',
    slug: 'landing-page-templates',
    title: 'Landing Page Templates - 15 Modern Designs',
    description: 'A collection of 15 modern, conversion-optimized landing page templates built with HTML, CSS, and JavaScript.',
    shortDescription: 'A collection of 15 modern, conversion-optimized landing page templates.',
    thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=675&fit=crop',
    category: 'Templates',
    tags: ['landing-page', 'html', 'css', 'templates'],
    createdAt: '2024-04-01',
    downloadCount: 2456,
    content: `# Landing Page Templates - 15 Modern Designs

## Overview

High-converting landing page templates designed to help you launch faster. Each template is fully responsive and optimized for conversions.

## What's Included

- **15 Unique Templates**: Various industries and styles
- **Fully Responsive**: Mobile, tablet, and desktop optimized
- **No Dependencies**: Pure HTML, CSS, and vanilla JavaScript
- **Well Documented**: Easy to understand and customize
- **Conversion Optimized**: Built with best practices

## Template Types

- SaaS product pages
- E-commerce landing pages
- Portfolio showcases
- Service business pages
- Event landing pages
- App download pages

## Features

- **Fast Loading**: Optimized for performance
- **SEO Friendly**: Semantic HTML structure
- **Accessible**: WCAG compliant
- **Customizable**: Easy to modify colors, fonts, and content
- **Cross-browser**: Works in all modern browsers

## Quick Start

1. Download your chosen template
2. Extract the files
3. Open index.html in your browser
4. Customize content and styling
5. Deploy to your hosting

## Customization Guide

### Colors
Edit the CSS variables in the stylesheet:
\`\`\`css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
\`\`\`

### Content
Replace placeholder text and images with your own

### Fonts
Update font imports and font-family declarations

## License

Free for personal and commercial use.`,
    relatedFreebies: ['2', '5']
  }
];

export function getFreebieBySlug(slug: string): Freebie | undefined {
  return FREEBIES.find(freebie => freebie.slug === slug);
}

export function getRelatedFreebies(freebie: Freebie, limit: number = 3): Freebie[] {
  const relatedIds = freebie.relatedFreebies || [];
  const related = FREEBIES.filter(f => 
    relatedIds.includes(f.id) && f.id !== freebie.id
  );
  
  // If not enough related, add random ones
  if (related.length < limit) {
    const remaining = FREEBIES.filter(f => 
      f.id !== freebie.id && !relatedIds.includes(f.id)
    );
    related.push(...remaining.slice(0, limit - related.length));
  }
  
  return related.slice(0, limit);
}

export function getFreebiesByCategory(category: string): Freebie[] {
  return FREEBIES.filter(freebie => freebie.category === category);
}

export function searchFreebies(query: string): Freebie[] {
  const lowerQuery = query.toLowerCase();
  return FREEBIES.filter(freebie =>
    freebie.title.toLowerCase().includes(lowerQuery) ||
    freebie.description.toLowerCase().includes(lowerQuery) ||
    freebie.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

