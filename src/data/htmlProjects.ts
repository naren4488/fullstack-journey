export type PracticeProject = {
  slug: string
  title: string
  tagline: string
  level: 'Beginner' | 'Beginner+' | 'Intermediate'
  duration: string
  summary: string
  brief: string
  setup: string[]
  requirements: string[]
  learnings: string[]
  deliverables: string[]
  visualReferences: {
    image: string
    title: string
    sourceLabel: string
    sourceUrl: string
  }[]
}

export const htmlProjects: PracticeProject[] = [
  {
    slug: 'portfolio-link-hub',
    title: 'Portfolio Link Hub',
    tagline: 'A personal one-page profile with strong semantic structure.',
    level: 'Beginner',
    duration: '45-75 min',
    summary:
      'Create a simple personal page with a profile section, short bio, links, skills list, and contact block using clean semantic HTML.',
    brief:
      'This project is great when you want to practice structure without getting distracted by complicated layout work. Focus on writing meaningful HTML, organizing content clearly, and choosing the right tags for each section.',
    setup: [
      'Create a folder named `portfolio-link-hub`.',
      'Inside it create `index.html` and an `assets` folder.',
      'Use only HTML first. Add CSS later only if you want visual polish.',
    ],
    requirements: [
      'Use `header`, `main`, `section`, and `footer` correctly.',
      'Add your name, role, a short intro, and 3-5 useful links.',
      'Include one profile image with meaningful `alt` text.',
      'Use headings in the right order from `h1` onward.',
      'Add contact information using links for email or social profiles.',
      'Add favicon support and test relative file paths.',
    ],
    learnings: [
      'Basic Structure',
      'Text & Formatting Tags',
      'Links & Navigation',
      'Images & Media',
      'Semantic HTML',
      'Attributes',
      'Inline vs Block Elements',
      'Relative vs Absolute Paths',
      'Favicon and App Icons',
    ],
    deliverables: [
      'One completed `index.html` file',
      'A local folder with image and favicon assets',
      'A page that works without JavaScript',
    ],
    visualReferences: [
      {
        image:
          'https://images.pexels.com/photos/10375902/pexels-photo-10375902.jpeg?cs=srgb&dl=pexels-rdne-10375902.jpg&fm=jpg',
        title: 'Warm cafe workspace portrait',
        sourceLabel: 'Pexels',
        sourceUrl: 'https://www.pexels.com/photo/woman-using-laptop-at-cafe-10375902/',
      },
      {
        image:
          'https://images.pexels.com/photos/17564426/pexels-photo-17564426.jpeg?cs=srgb&dl=pexels-mutecevvil-17564426.jpg&fm=jpg',
        title: 'Laptop editing desk setup',
        sourceLabel: 'Pexels',
        sourceUrl: 'https://www.pexels.com/photo/man-using-laptop-at-cafe-17564426/',
      },
    ],
  },
  {
    slug: 'artisan-cafe-menu',
    title: 'Artisan Cafe Menu',
    tagline: 'A small cafe website page focused on lists, tables, and content grouping.',
    level: 'Beginner+',
    duration: '60-90 min',
    summary:
      'Build a cafe page that includes a hero section, menu categories, pricing, opening hours, and a reservation form.',
    brief:
      'This project helps you combine multiple HTML concepts into one realistic page. Instead of just listing topics, you will structure information the way a simple business website needs it.',
    setup: [
      'Create a folder named `artisan-cafe-menu`.',
      'Add `index.html` and an `assets` folder for logo, images, and favicon.',
      'Collect one hero image and one small icon set if you want extra polish.',
    ],
    requirements: [
      'Use semantic sections for hero, menu, timings, and contact information.',
      'Create menu categories using lists.',
      'Show prices with a table or grouped list structure.',
      'Add an embedded image section with proper `alt` text.',
      'Add a booking or contact form with labels and helpful placeholders.',
      'Use form attributes like `required`, `type`, `name`, and `placeholder` correctly.',
    ],
    learnings: [
      'Lists',
      'Tables',
      'Forms',
      'Semantic HTML',
      'Attributes',
      'Images & Media',
      'Form Attributes in Depth',
      'Meta Tags & SEO Basics',
    ],
    deliverables: [
      'A complete cafe landing page in HTML',
      'A menu section that is easy to scan',
      'A usable reservation or inquiry form',
    ],
    visualReferences: [
      {
        image:
          'https://images.pexels.com/photos/14686141/pexels-photo-14686141.jpeg?cs=srgb&dl=pexels-luchik-14686141.jpg&fm=jpg',
        title: 'Calm cafe interior with laptop',
        sourceLabel: 'Pexels',
        sourceUrl: 'https://www.pexels.com/photo/laptop-in-cafe-14686141/',
      },
      {
        image:
          'https://images.pexels.com/photos/10375902/pexels-photo-10375902.jpeg?cs=srgb&dl=pexels-rdne-10375902.jpg&fm=jpg',
        title: 'Cafe working ambience',
        sourceLabel: 'Pexels',
        sourceUrl: 'https://www.pexels.com/photo/woman-using-laptop-at-cafe-10375902/',
      },
    ],
  },
  {
    slug: 'city-guide-landing',
    title: 'City Guide Landing Page',
    tagline: 'A multi-section travel-style page for practicing rich content structure.',
    level: 'Intermediate',
    duration: '90-120 min',
    summary:
      'Create a city guide page with navigation, featured places, a gallery, useful travel tips, and a signup form for updates.',
    brief:
      'This project is ideal once you are comfortable with the basics and want to practice organizing a long-form page. It pushes you to think about hierarchy, semantics, navigation, and meaningful content blocks.',
    setup: [
      'Create a folder named `city-guide-landing`.',
      'Prepare `index.html`, `assets`, and a text file for content notes.',
      'Collect 3 local images for landmarks, food, or city views.',
    ],
    requirements: [
      'Create in-page navigation using anchor links.',
      'Add sections for highlights, gallery, tips, and newsletter signup.',
      'Use images, captions, and descriptive text that feel editorial.',
      'Use semantic HTML for each major content block.',
      'Add a form for email signup using accessible labels.',
      'Use clear meta tags for SEO and social sharing basics.',
    ],
    learnings: [
      'Links & Navigation',
      'Images & Media',
      'Semantic HTML',
      'Accessibility Basics',
      'Meta Tags & SEO Basics',
      'Forms',
      'Attributes',
    ],
    deliverables: [
      'A long-form landing page with multiple sections',
      'A top navigation that jumps to sections',
      'A gallery with captions and descriptive content',
    ],
    visualReferences: [
      {
        image:
          'https://images.pexels.com/photos/17564426/pexels-photo-17564426.jpeg?cs=srgb&dl=pexels-mutecevvil-17564426.jpg&fm=jpg',
        title: 'Creative laptop planning setup',
        sourceLabel: 'Pexels',
        sourceUrl: 'https://www.pexels.com/photo/man-using-laptop-at-cafe-17564426/',
      },
      {
        image:
          'https://images.pexels.com/photos/14686141/pexels-photo-14686141.jpeg?cs=srgb&dl=pexels-luchik-14686141.jpg&fm=jpg',
        title: 'Editorial cafe mood board',
        sourceLabel: 'Pexels',
        sourceUrl: 'https://www.pexels.com/photo/laptop-in-cafe-14686141/',
      },
    ],
  },
]

export function getHtmlProjectBySlug(slug: string) {
  return htmlProjects.find((project) => project.slug === slug)
}
