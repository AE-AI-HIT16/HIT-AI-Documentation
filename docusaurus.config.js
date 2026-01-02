// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Henry Hoang Blog",
  tagline: "Tech, Code, and Everything In Between",
  url: "https://henryhoang.blog", // Update this to your actual domain
  baseUrl: "/",
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
      title: "Henry Hoang",
      logo: {
        alt: "Henry Hoang Logo",
        src: "img/logo.svg",
        srcDark: "img/logo.svg",
        href: "/",
      },
      items: [
        {
          to: '/blog/ai/introduction',
          position: 'left',
          label: 'Blog',
        },
        {
          to: '/tutorial',
          position: 'left',
          label: 'Tutorial',
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Henry Hoang. Built with Docusaurus.`,
    },
    prism: {
      additionalLanguages: ["ruby", "php", "java", "groovy", "csharp", "rust", "kotlin"],
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: 'blogs',
          routeBasePath: "/blog",
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsible: false,
        },
        blog: {
          path: 'tutorials',
          routeBasePath: '/tutorial',
          blogTitle: 'Tutorials',
          blogDescription: 'Tutorials and guides',
          postsPerPage: 10,
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-XXXXXXXXXX",
          anonymizeIP: true,
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [],
      },
    ],
    [
      require.resolve('docusaurus-lunr-search'),
      {
      },
    ],
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
