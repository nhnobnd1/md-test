export default {
  title: "ReactJs Core",
  themeConfig: {
    outline: [2, 6],
    sidebar: [
      {
        text: "Getting started",
        items: [
          { text: "Introduction", link: "/" },
          { text: "Tech stack", link: "/getting-started/tech-stack" },
          { text: "Command lines", link: "/getting-started/command-lines" },
          {
            text: "Conventions",
            link: "/getting-started/conventions",
          },
          {
            text: "Editor configurations",
            link: "/getting-started/editor-configurations",
          },
          {
            text: "Assets",
            link: "/getting-started/assets",
          },
        ],
      },
      {
        text: "Module",
        items: [
          { text: "Introduction", link: "/module/introduction" },
          { text: "Routing", link: "/module/routing" },
          {
            text: "Localization",
            link: "/module/localization",
          },
        ],
      },
      {
        text: "Api Calling",
        items: [
          { text: "Introduction", link: "/api-calling/introduction" },
          { text: "Model", link: "/api-calling/model" },
          {
            text: "Repository",
            link: "/api-calling/repository",
          },
          {
            text: "Call in component",
            link: "/api-calling/call-in-component",
          },
        ],
      },
    ],
  },
};
