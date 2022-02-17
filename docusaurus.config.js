// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const constants = require("./constants");
const { GITHUB_URL, TWITTER_URL } = constants;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Palette Docs",
  tagline: "Palette Docs",
  url: "https://docs.palette.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/icons/icon.png",
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          // Please change this to your repo.
          editUrl: `${GITHUB_URL}/tree/main/`,
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
          ],
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
        // TODO: Enable color scheme matching
        // respectPrefersColorScheme: true,
      },
      navbar: {
        title: "Palette",
        logo: {
          alt: "Palette Logo",
          src: "img/icons/icon.svg",
        },
        items: [
          // {
          //   type: "doc",
          //   docId: "intro",
          //   position: "left",
          //   label: "Tutorial",
          // },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            href: TWITTER_URL,
            label: "Twitter",
            position: "right",
          },
          {
            href: GITHUB_URL,
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} Redraw, Inc.`,
      },
      algolia: {
        appId: "K0BAX3OU2H",
        // "Search only api key". Safe to keep this public
        apiKey: "c5c72605653994e7f6dc544be90a9f5c",
        indexName: "palette",
        contextualSearch: true,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
