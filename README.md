# Docusaurus Documentation Template

A documentation site template based on Docusaurus, including custom theme components and configurations.

## Features

- 📝 Markdown/MDX based documentation writing
- 🎨 Custom theme components (ProductSwitcher)
- 🔍 Built-in search functionality (Lunr)
- 📱 Responsive design
- 🌙 Dark mode support
- 🚀 Quick deployment support (Vercel/Netlify)

## Quick Start

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Start Development Server

```bash
npm start
# or
yarn start
# or
pnpm start
```

This will start the development server at `http://localhost:3000`.

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

After building, the `build` directory contains static files that can be deployed.

## Project Structure

```
.
├── blog/                 # Blog posts directory
├── docs/                 # Documentation directory
├── src/
│   ├── components/       # Custom components
│   ├── css/             # Custom styles
│   └── theme/           # Theme components
│       └── ProductSwitcher/  # Product switcher component
├── static/              # Static assets directory
├── docusaurus.config.js # Docusaurus configuration file
└── sidebars.js          # Sidebar configuration
```

## Configuration

### 1. Basic Configuration

Edit `docusaurus.config.js` to configure your site information:

- `title`: Site title
- `tagline`: Site tagline
- `url`: Production environment URL
- `baseUrl`: Base path

### 2. Navbar Configuration

Configure the navbar in the `navbar` section of `docusaurus.config.js`:

```javascript
navbar: {
  title: 'My Site',
  logo: {
    alt: 'My Site Logo',
    src: 'img/logo.svg',
  },
  items: [
    // Add your navigation items
  ],
},
```

### 3. Sidebar Configuration

Edit `sidebars.js` to configure the documentation sidebar structure.

### 4. ProductSwitcher Component

`ProductSwitcher` is a custom component for switching between different products/documentation sections.

To use it, you need to:

1. Configure the product list in `src/theme/ProductSwitcher/index.js`
2. Import and use the component where needed

## Adding Content

### Adding Documentation

Create `.mdx` or `.md` files in the `docs/` directory, then add references in `sidebars.js`.

### Adding Blog Posts

Create `.md` files in the `blog/` directory with the filename format: `YYYY-MM-DD-title.md`.

### Adding Static Assets

Place images, files, etc. in the `static/` directory, accessible via `/img/your-image.png`.

## Deployment

### Vercel

1. Push the project to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect and deploy

### Netlify

1. Push the project to GitHub
2. Import the project in Netlify
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

## Documentation Topics

This template includes documentation for:

- **AI & Machine Learning**: Introduction, ML basics, LLM integration
- **Frontend Development**: React, Next.js, modern frontend practices
- **DevOps**: Docker, Kubernetes, CI/CD pipelines
- **Software Engineering**: Design patterns, testing strategies, best practices

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

## More Resources

- [Docusaurus Official Documentation](https://docusaurus.io)
- [Docusaurus GitHub](https://github.com/facebook/docusaurus)

## License

MIT

## Contributing

Issues and Pull Requests are welcome!
# henryhoang-blog
