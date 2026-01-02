# Template Usage Guide

This is a Docusaurus documentation site template. You can quickly create your own documentation site based on this template.

## Quick Start

### 1. Clone or Download This Template

```bash
git clone <repository-url>
cd docusaurus-docs-template
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Project

#### Modify Basic Information

Edit `docusaurus.config.js`:

- `title`: Your site title
- `tagline`: Site tagline
- `url`: Production environment URL
- `baseUrl`: Base path (for GitHub Pages, usually `/<repo-name>/`)
- `organizationName`: GitHub organization/username
- `projectName`: GitHub repository name

#### Configure Navbar

In the `navbar` section of `docusaurus.config.js`:

```javascript
navbar: {
  title: 'Your Site Name',
  logo: {
    alt: 'Logo',
    src: 'img/logo.svg',  // Place your logo in static/img/ directory
  },
  items: [
    // Add navigation items
  ],
},
```

#### Configure Sidebar

Edit `sidebars.js` to configure the documentation sidebar structure.

### 4. Add Content

#### Add Documentation

Create `.mdx` or `.md` files in the `docs/` directory:

```markdown
---
sidebar_position: 1
---

# Document Title

Your documentation content...
```

Then add references in `sidebars.js`.

#### Add Blog Posts

Create files in the `blog/` directory with the filename format: `YYYY-MM-DD-title.md`

```markdown
---
slug: my-blog-post
title: Blog Title
authors:
  - name: Author Name
tags: [tag1, tag2]
---

Blog content...
```

### 5. Customize ProductSwitcher Component

`ProductSwitcher` is a custom component for switching between different products/documentation sections.

Edit `src/theme/ProductSwitcher/index.js` to configure your product list:

```javascript
const products = [
  {
    id: 'main',
    name: 'Main Docs',
    path: '/',
    description: 'Main Documentation',
    icon: '📚',  // Can use emoji or React components
    baseUrl: '/',
  },
  // Add more products...
];
```

### 6. Customize Styles

Edit `src/css/custom.css` to add custom styles.

### 7. Add Static Assets

Place images, files, etc. in the `static/` directory, accessible via `/img/your-image.png`.

## Deployment

### Vercel

1. Push the project to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Vercel will automatically detect and deploy

### Netlify

1. Push the project to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `build`

### GitHub Pages

1. Install dependencies: `npm install --save-dev gh-pages`
2. Add script to `package.json`:
   ```json
   "scripts": {
     "deploy": "docusaurus build && gh-pages -d build"
   }
   ```
3. Run: `npm run deploy`

## Features

### Search Functionality

The project is configured with the `docusaurus-lunr-search` plugin, providing full-text search functionality.

### Multi-language Support

For multi-language support, configure in `docusaurus.config.js`:

```javascript
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'zh-Hans'],
},
```

### Client-side Redirects

Configure redirect rules in the `plugins` section of `docusaurus.config.js`.

## Common Questions

### How to disable blog?

In the preset configuration of `docusaurus.config.js`:

```javascript
blog: false,
```

### How to modify code highlighting theme?

Modify the theme in `themeConfig.prism` in `docusaurus.config.js`.

### How to add custom components?

Create components in the `src/components/` directory, then use them in documentation.

## Documentation Topics Included

This template includes comprehensive documentation for:

- **AI & Machine Learning**: Introduction to AI, machine learning basics, LLM integration
- **Frontend Development**: React, Next.js, modern frontend practices
- **DevOps**: Docker, Kubernetes, CI/CD pipelines
- **Software Engineering**: Design patterns, testing strategies, best practices

## More Resources

- [Docusaurus Official Documentation](https://docusaurus.io)
- [Docusaurus GitHub](https://github.com/facebook/docusaurus)
