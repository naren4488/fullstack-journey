import type { PracticeProject } from './practiceProject'

export const cssProjects: PracticeProject[] = [
  {
    order: 1,
    slug: 'profile-card-sprint',
    recommendedAfterTopics: ['CSS Basics', 'Box Model', 'Flexbox'],
    title: 'Profile Card Sprint',
    tagline: 'Center a card, control spacing, and polish typography with pure CSS.',
    level: 'Beginner',
    duration: '45-60 min',
    summary:
      'Build a single profile card: avatar, name, role, short bio, and a row of pill-shaped tags using the box model and flexbox.',
    brief:
      'This project isolates layout fundamentals—padding vs margin, border-radius, max-width, and flex alignment—without fighting a whole page grid yet.',
    whyMatters:
      'The profile card is the “hello world” of product UI: if you can center, constrain width, and rhythm type with CSS alone, component libraries become choices instead of crutches.',
    setup: [
      'Create `profile-card-sprint/index.html` and `styles.css`.',
      'Link the stylesheet from the HTML `<head>`.',
      'Use a tiny reset or `box-sizing: border-box` on all elements.',
    ],
    requirements: [
      'Use flexbox to center the card vertically and horizontally in the viewport.',
      'Constrain card width with `max-width` and comfortable horizontal padding.',
      'Style a circular avatar with `border-radius` and `object-fit`.',
      'Add a subtle shadow and border so the card lifts off the background.',
      'Use a clear type scale between name, role, and body text.',
    ],
    learnings: [
      'CSS Basics',
      'Box Model',
      'Flexbox',
      'Display Types',
      'Pseudo Classes',
    ],
    deliverables: [
      'One HTML file and one CSS file',
      'A centered card that still looks good around 360px width',
    ],
    visualReferences: [
      {
        image:
          'https://images.pexels.com/photos/10375902/pexels-photo-10375902.jpeg?cs=srgb&dl=pexels-rdne-10375902.jpg&fm=jpg',
        title: 'Focused workspace',
        sourceLabel: 'Pexels',
        sourceUrl: 'https://www.pexels.com/photo/woman-using-laptop-at-cafe-10375902/',
      },
    ],
    codeWalkthrough: {
      overview:
        'The card is a column flex container: image on top, text block, then a row of tags. The page body becomes a flex container too, with `min-height: 100vh` so vertical centering works. Spacing uses consistent custom properties so you can tweak the rhythm in one place.',
      snippets: [
        {
          fileLabel: 'index.html (minimal shell)',
          language: 'html',
          code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Profile card</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <article class="card">
      <img class="avatar" src="assets/avatar.jpg" width="96" height="96" alt="" />
      <h1 class="name">Riley Chen</h1>
      <p class="role">UI engineer</p>
      <p class="bio">Building accessible interfaces, one component at a time.</p>
      <ul class="tags">
        <li>HTML</li>
        <li>CSS</li>
        <li>A11y</li>
      </ul>
    </article>
  </body>
</html>`,
          explanation:
            'Semantic outer shell: `article` marks self-contained content. The image keeps explicit dimensions; in CSS you will round it and use `object-fit: cover`. Tags are a list because they are a group of related items, not navigation.',
        },
        {
          fileLabel: 'styles.css',
          language: 'css',
          code: `*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  --radius: 1.25rem;
  --shadow: 0 20px 50px rgba(41, 37, 36, 0.12);
}

body {
  min-height: 100vh;
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #f5f5f4;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.card {
  width: 100%;
  max-width: 22rem;
  padding: 1.75rem;
  border-radius: var(--radius);
  background: #fff;
  border: 1px solid #e7e5e4;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
}

.avatar {
  border-radius: 999px;
  object-fit: cover;
  border: 3px solid #fde68a;
}

.name {
  margin: 0.5rem 0 0;
  font-size: 1.35rem;
}

.role {
  margin: 0;
  color: #78716c;
  font-size: 0.9rem;
}

.bio {
  margin: 0.25rem 0 0;
  line-height: 1.5;
  color: #44403c;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.tags li {
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  font-size: 0.75rem;
  font-weight: 600;
  color: #9a3412;
}`,
          explanation:
            '`body` is a flex container to center the card. The card itself is a column flex with `gap` for vertical rhythm. `max-width` prevents the card from stretching too wide on large screens. The avatar uses a pill `border-radius` and `object-fit: cover` so any image crops cleanly. Tags reset the default list styles and become a horizontal flex row with pill styling.',
        },
      ],
    },
  },
  {
    order: 2,
    slug: 'responsive-pricing-grid',
    recommendedAfterTopics: ['Grid', 'Box Model', 'Responsive Design'],
    title: 'Responsive Pricing Grid',
    tagline: 'Use CSS Grid to build a pricing section that reflows across breakpoints.',
    level: 'Beginner+',
    duration: '60-90 min',
    summary:
      'Create three pricing tiers in a responsive grid: featured plan slightly emphasized, equal-height columns on desktop, single column on small screens.',
    brief:
      'Grid excels at two-dimensional layouts. Here you practice `grid-template-columns`, `gap`, and a media query (or `auto-fit` with `minmax`) to collapse columns on narrow viewports.',
    whyMatters:
      'Pricing tables are where flex-only layouts start to creak. Grid teaches responsive columns and equal-height cards—patterns you will reuse in dashboards and marketing sites.',
    setup: [
      'Create `responsive-pricing-grid/index.html` and `styles.css`.',
      'Add three plan cards with a list of features each.',
    ],
    requirements: [
      'Use CSS Grid for the layout of the three cards.',
      'On small screens, cards should stack in one column.',
      'On wider screens, show three columns with even spacing.',
      'Visually highlight one “Popular” plan with border and/or background.',
      'Use consistent internal padding and typographic hierarchy.',
    ],
    learnings: ['Grid', 'Responsive Design', 'Box Model', 'Flexbox', 'Pseudo Classes'],
    deliverables: ['Pricing section markup', 'Responsive CSS using Grid'],
    visualReferences: [
      {
        image:
          'https://images.pexels.com/photos/14686141/pexels-photo-14686141.jpeg?cs=srgb&dl=pexels-luchik-14686141.jpg&fm=jpg',
        title: 'Calm planning space',
        sourceLabel: 'Pexels',
        sourceUrl: 'https://www.pexels.com/photo/laptop-in-cafe-14686141/',
      },
    ],
    codeWalkthrough: {
      overview:
        '`repeat(auto-fit, minmax(...))` lets the browser decide how many columns fit: one narrow column on phones, three when space allows. The featured card uses a modifier class for stronger border and shadow.',
      snippets: [
        {
          fileLabel: 'styles.css (grid + cards)',
          language: 'css',
          code: `.plans {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  padding: 2rem 1.25rem;
  max-width: 72rem;
  margin: 0 auto;
}

.plan {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #e7e5e4;
  background: #fff;
}

.plan--popular {
  border-color: #f59e0b;
  box-shadow: 0 12px 40px rgba(245, 158, 11, 0.2);
  transform: translateY(-4px);
}

.plan h2 {
  margin: 0 0 0.25rem;
  font-size: 1.15rem;
}

.plan .price {
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 1rem;
}

.plan ul {
  margin: 0;
  padding: 0;
  list-style: none;
  flex: 1;
}

.plan li {
  padding: 0.35rem 0;
  border-bottom: 1px solid #f5f5f4;
}

.plan button {
  margin-top: 1.25rem;
  padding: 0.65rem 1rem;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  background: #1c1917;
  color: #fff;
}

.plan--popular button {
  background: #d97706;
}`,
          explanation:
            '`auto-fit` collapses empty tracks, so you do not get a phantom fourth column. Each `.plan` is a column flex so the feature list can grow (`flex: 1`) and the button stays at the bottom. The popular modifier nudhes the card up slightly for emphasis—keep motion subtle for accessibility.',
        },
      ],
    },
  },
  {
    order: 3,
    slug: 'sticky-nav-hero',
    recommendedAfterTopics: ['Position', 'Flexbox', 'Responsive Design'],
    title: 'Sticky Nav + Hero',
    tagline: 'Combine a full-width hero with a navigation bar that sticks on scroll.',
    level: 'Intermediate',
    duration: '75-100 min',
    summary:
      'Build a landing hero with background image overlay, then keep the site header visible using `position: sticky` and sensible `z-index`.',
    brief:
      'You will layer backgrounds, manage overflow, and ensure the sticky header does not cover in-page anchors awkwardly—great practice for real marketing pages.',
    whyMatters:
      'Sticky headers and hero sections combine positioning, stacking, and scroll behavior—where juniors often ship clipped content or invisible focus rings. This project mirrors common landing-page bugs.',
    setup: [
      'Create `sticky-nav-hero/index.html` with a header, hero, and several content sections.',
      'Add `styles.css` with layered hero background and sticky header rules.',
    ],
    requirements: [
      'Use `position: sticky` (or fixed, if you document trade-offs) on the header.',
      'Hero should use min-height, readable contrast, and a clear call-to-action.',
      'Ensure main content scrolls under the header without layout jump.',
      'Use `scroll-margin-top` on sections if anchor links hide under the sticky bar.',
    ],
    learnings: [
      'Position',
      'Responsive Design',
      'Flexbox',
      'Overflow',
      'Pseudo Elements',
    ],
    deliverables: ['Landing page with sticky navigation', 'Documented scroll offset for anchors'],
    visualReferences: [
      {
        image:
          'https://images.pexels.com/photos/17564426/pexels-photo-17564426.jpeg?cs=srgb&dl=pexels-mutecevvil-17564426.jpg&fm=jpg',
        title: 'Desk hero mood',
        sourceLabel: 'Pexels',
        sourceUrl: 'https://www.pexels.com/photo/man-using-laptop-at-cafe-17564426/',
      },
    ],
    codeWalkthrough: {
      overview:
        'The header is sticky within the document flow, so you avoid compensating with `padding-top` on the body unless you switch to `fixed`. `scroll-margin-top` on section targets fixes anchor jumps under the bar.',
      snippets: [
        {
          fileLabel: 'styles.css (header + hero)',
          language: 'css',
          code: `header.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  background: rgba(28, 25, 23, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.site-header a {
  color: #fafaf9;
  text-decoration: none;
  font-weight: 600;
}

.hero {
  min-height: 70vh;
  display: flex;
  align-items: flex-end;
  padding: 3rem 1.5rem;
  color: #fff;
  background-image: linear-gradient(
      to top,
      rgba(28, 25, 23, 0.92),
      rgba(28, 25, 23, 0.2)
    ),
    url('assets/hero.jpg');
  background-size: cover;
  background-position: center;
}

section[id] {
  scroll-margin-top: 4.5rem;
}`,
          explanation:
            '`sticky` keeps the header in flow until you scroll past the hero, then it pins to `top: 0`. `z-index` ensures it paints above the hero. The hero stacks a gradient overlay on top of a photo for text contrast. `scroll-margin-top` reserves space when users follow `#features`-style links so titles are not hidden beneath the sticky bar.',
        },
      ],
    },
  },
]

export function getCssProjectBySlug(slug: string) {
  return cssProjects.find((project) => project.slug === slug)
}
