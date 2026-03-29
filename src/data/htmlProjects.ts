import type { PracticeProject } from './practiceProject'

export type { PracticeProject } from './practiceProject'

export const htmlProjects: PracticeProject[] = [
  {
    order: 1,
    slug: 'portfolio-link-hub',
    recommendedAfterTopics: ['Basic Structure', 'Text & Formatting Tags', 'Links & Navigation'],
    title: 'Portfolio Link Hub',
    tagline: 'A personal one-page profile with strong semantic structure.',
    level: 'Beginner',
    duration: '45-75 min',
    summary:
      'Create a simple personal page with a profile section, short bio, links, skills list, and contact block using clean semantic HTML.',
    brief:
      'This project is great when you want to practice structure without getting distracted by complicated layout work. Focus on writing meaningful HTML, organizing content clearly, and choosing the right tags for each section.',
    whyMatters:
      'A link hub is the smallest “real” site: it forces you to care about headings, landmarks, and links before CSS tricks hide bad structure. Recruiters and collaborators often skim source—clean semantics signal craft.',
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
    codeWalkthrough: {
      overview:
        'This reference shows how a single-page profile can be split into landmark regions (`header`, `main`, `footer`) and nested `section` elements. Headings follow a logical order so screen readers and SEO both benefit. Links use real `href` values and the image references a file under `assets/`.',
      snippets: [
        {
          fileLabel: 'index.html',
          language: 'html',
          code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Alex Doe — Frontend learner</title>
    <link rel="icon" href="assets/favicon.ico" />
  </head>
  <body>
    <header>
      <h1>Alex Doe</h1>
      <p>Frontend learner · HTML &amp; accessibility first</p>
    </header>

    <main>
      <section aria-labelledby="about-heading">
        <h2 id="about-heading">About</h2>
        <p>I am building real projects to practice semantic structure.</p>
      </section>

      <section aria-labelledby="links-heading">
        <h2 id="links-heading">Links</h2>
        <ul>
          <li><a href="https://github.com/example">GitHub</a></li>
          <li><a href="mailto:alex@example.com">Email</a></li>
        </ul>
      </section>

      <section aria-labelledby="photo-heading">
        <h2 id="photo-heading" class="visually-hidden">Profile photo</h2>
        <img src="assets/profile.jpg" width="160" height="160" alt="Alex smiling at a desk" />
      </section>
    </main>

    <footer>
      <p>Thanks for visiting · <a href="#top">Back to top</a></p>
    </footer>
  </body>
</html>`,
          explanation:
            '`header` introduces you and the main title. `main` wraps the primary content only. Each `section` has a visible `h2` (or an `aria-labelledby` pair when the heading is visually hidden). Lists are the right tool for a group of links. The image uses a descriptive `alt` and a path under `assets/`. The favicon link uses a relative URL so it works when you open the file locally.',
        },
      ],
    },
  },
  {
    order: 2,
    slug: 'artisan-cafe-menu',
    recommendedAfterTopics: ['Lists', 'Tables', 'Forms', 'Semantic HTML'],
    title: 'Artisan Cafe Menu',
    tagline: 'A small cafe website page focused on lists, tables, and content grouping.',
    level: 'Beginner+',
    duration: '60-90 min',
    summary:
      'Build a cafe page that includes a hero section, menu categories, pricing, opening hours, and a reservation form.',
    brief:
      'This project helps you combine multiple HTML concepts into one realistic page. Instead of just listing topics, you will structure information the way a simple business website needs it.',
    whyMatters:
      'Café-style pages blend narrative content, structured data (menus), and forms—exactly where beginners confuse divs for tables or skip labels. Nailing this pattern prepares you for any small-business brief.',
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
    codeWalkthrough: {
      overview:
        'Cafe pages mix narrative sections, structured data (tables), and user input (forms). This sample uses `figure` for the hero image, a `table` with `thead`/`tbody` for prices, and a form where every control has an explicit `label` linked by `for`/`id`.',
      snippets: [
        {
          fileLabel: 'index.html (menu table + form)',
          language: 'html',
          code: `<section aria-labelledby="menu-heading">
  <h2 id="menu-heading">Menu</h2>

  <h3>Drinks</h3>
  <ul>
    <li>Oat latte — <strong>$4.50</strong></li>
    <li>Filter coffee — <strong>$3.00</strong></li>
  </ul>

  <table>
    <caption class="visually-hidden">Pastry prices</caption>
    <thead>
      <tr>
        <th scope="col">Item</th>
        <th scope="col">Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Croissant</td>
        <td>$3.25</td>
      </tr>
      <tr>
        <td>Muffin</td>
        <td>$2.75</td>
      </tr>
    </tbody>
  </table>
</section>

<section aria-labelledby="book-heading">
  <h2 id="book-heading">Reserve a table</h2>
  <form action="#" method="post">
    <p>
      <label for="guest-name">Name</label>
      <input id="guest-name" name="guest_name" type="text" required placeholder="Your name" />
    </p>
    <p>
      <label for="guest-email">Email</label>
      <input id="guest-email" name="guest_email" type="email" required />
    </p>
    <p>
      <label for="party-size">Party size</label>
      <input id="party-size" name="party_size" type="number" min="1" max="12" value="2" />
    </p>
    <button type="submit">Request booking</button>
  </form>
</section>`,
          explanation:
            'Lists are great for simple name–price lines; a `table` shines when guests compare many rows. `scope="col"` helps assistive tech relate headers to cells. The form uses `label`+`for` pairing (never rely on placeholder alone), `type="email"` for basic validation, and `required` where a field is mandatory.',
        },
      ],
    },
  },
  {
    order: 3,
    slug: 'city-guide-landing',
    recommendedAfterTopics: ['Links & Navigation', 'Semantic HTML', 'Accessibility Basics'],
    title: 'City Guide Landing Page',
    tagline: 'A multi-section travel-style page for practicing rich content structure.',
    level: 'Intermediate',
    duration: '90-120 min',
    summary:
      'Create a city guide page with navigation, featured places, a gallery, useful travel tips, and a signup form for updates.',
    brief:
      'This project is ideal once you are comfortable with the basics and want to practice organizing a long-form page. It pushes you to think about hierarchy, semantics, navigation, and meaningful content blocks.',
    whyMatters:
      'Long landing pages expose weak heading order and “div soup” fast. You learn how real content sites chunk information, link sections, and keep galleries and forms understandable without layout frameworks.',
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
    codeWalkthrough: {
      overview:
        'Long pages need a table-of-contents style nav that links to `id` anchors, plus sections that can stand alone when read in order. The gallery pairs each image with a `figure`/`figcaption` so the caption is programmatically associated.',
      snippets: [
        {
          fileLabel: 'index.html (nav + sections + gallery)',
          language: 'html',
          code: `<header>
  <h1>Weekend in Porto</h1>
  <nav aria-label="Page sections">
    <ul>
      <li><a href="#highlights">Highlights</a></li>
      <li><a href="#gallery">Gallery</a></li>
      <li><a href="#tips">Tips</a></li>
      <li><a href="#newsletter">Newsletter</a></li>
    </ul>
  </nav>
</header>

<main>
  <section id="highlights" aria-labelledby="highlights-heading">
    <h2 id="highlights-heading">Highlights</h2>
    <p>Ribeira riverfront walks, azulejo tiles, and port wine cellars.</p>
  </section>

  <section id="gallery" aria-labelledby="gallery-heading">
    <h2 id="gallery-heading">Gallery</h2>
    <div class="gallery">
      <figure>
        <img src="assets/bridge.jpg" alt="Dom Luís I bridge at sunset" />
        <figcaption>Golden hour on the Douro.</figcaption>
      </figure>
    </div>
  </section>

  <section id="newsletter" aria-labelledby="newsletter-heading">
    <h2 id="newsletter-heading">Trip updates</h2>
    <form action="#" method="post">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" autocomplete="email" required />
      <button type="submit">Subscribe</button>
    </form>
  </section>
</main>`,
          explanation:
            'Each in-page link targets an `id` on a section (`#highlights`, etc.). `nav` gets an `aria-label` because there may be other links on the page. `figure` wraps each image with its caption so assistive tech reads them together. The newsletter form keeps a single labeled email field with `autocomplete` hinting browsers to fill it correctly.',
        },
      ],
    },
  },
]

export function getHtmlProjectBySlug(slug: string) {
  return htmlProjects.find((project) => project.slug === slug)
}
