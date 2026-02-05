// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "AE-AI-HIT16",
  tagline: "AE AI HIT16's Blog",
  url: "https://AE-AI-HIT16.github.io", // Update this to your actual domain
  baseUrl: "/HIT-AI-Documentation/",

  // GitHub Pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'AE-AI-HIT16', // Usually your GitHub org/user name.
  projectName: 'HIT-AI-Documentation', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",

  // Internationalization
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  themeConfig: {
    image: 'img/socialbanner.png',
    navbar: {
      title: "AE-AI-HIT16",
      logo: {
        alt: "HIT Logo",
        src: "img/socialbanner.png",
        srcDark: "img/socialbanner.png",
        href: "/",
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'aiEngineerSidebar',
          position: 'left',
          label: 'AI Engineer',
        },
        {
          type: 'docSidebar',
          sidebarId: 'dataEngineerSidebar',
          docsPluginId: 'data-engineer',
          position: 'left',
          label: 'Data Engineer',
        },

      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} AE-HIT-16 team.`,
    },
    prism: {
      additionalLanguages: ["ruby", "php", "java", "groovy", "csharp", "rust", "kotlin"],
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: 'resources/01: AI Engineer',
          routeBasePath: "ai-engineer",
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsible: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        // gtag: {
        //   trackingID: "G-XXXXXXXXXX",
        //   anonymizeIP: true,
        // },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: 'data-engineer',
        path: 'resources/02: Data Engineer',
        routeBasePath: 'data-engineer',
        sidebarPath: require.resolve('./sidebars.js'),
        sidebarCollapsible: true,
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [],
      },
    ],
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        indexDocs: true,
        indexBlog: true,
      },
    ],
    () => ({
      name: 'docusaurus-yaml-loader',
      configureWebpack() {
        return {
          module: {
            rules: [
              {
                test: /\.ya?ml$/,
                use: 'yaml-loader',
              },
            ],
          },
        };
      },
    }),
  ],
  scripts: [],
  markdown: {
    mdx1Compat: {
      comments: false,
      admonitions: false,
      headingIds: false,
    },
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  }
};

module.exports = config;
