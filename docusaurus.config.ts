import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Dev Docs',
  tagline: 'public dev docs & notes',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://justpilz.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/dev-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'justpilz', // Usually your GitHub org/user name.
  projectName: 'dev-docs', // Usually your repo name.

  trailingSlash: false,

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  plugins: [require.resolve('docusaurus-lunr-search')],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          path: 'articles',
          showReadingTime: true,
          blogTitle: 'Articles',
          routeBasePath: 'articles',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social-card.jpg',
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Dev Docs',
      logo: {
        alt: 'DD',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Pages',
        },
        { to: '/articles', label: 'Articles', position: 'left' },
        // {
        //   href: 'https://github.com/justpilz/dev-docs',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      // links: [
      //   {
      //     title: 'Pages',
      //     items: [
      //       {
      //         label: 'Intro',
      //         to: '/pages/intro',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Community',
      //     items: [
      //       {
      //         label: 'Discord',
      //         href: 'https://discord.gg/AycVC2kd9P',
      //       },
      //     ],
      //   },
      //{
      //  title: 'More',
      //  items: [
      //    // {
      //    //   label: 'Articles',
      //    //   to: '/articles',
      //    // },
      //    // {
      //    //   label: 'GitHub',
      //    //   href: 'https://github.com/justpilz/m2o-wiki',
      //    // },
      //  ],
      //},
      // ],
      copyright: `Copyright © ${new Date().getFullYear()} JustPilz`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['squirrel', 'lua'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
