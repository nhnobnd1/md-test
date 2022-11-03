---
title: Introduction
---

# {{$frontmatter.title}}

Hi there, this is a documentation for you, who is using **ReactJs Core**.

This is project's folders structure:

```
project
│ .editorconfig
│ .env.development // Project's development environment variables
│ .env.production // Project's production environment variables
│ .env.staging // Project's staging environment variables
│ .eslintrc.json
│ .gitattributes
│ .gitignore
│ .prettierrc
│ babel.config.js
│ index.html
│ package.json
│ postcss.config.js
│ tailwind.config.js
│ tsconfig.json
│ vite.config.ts
│
└─__test__
└─.vscode
└─coverage
└─docs
└─generator
│
└─src // All source code
│ │ App.tsx
│ │ AppRoot.tsx
│ │ ErrorBoundary.tsx
│ │ index.tsx
│ │ reportWebVitals.ts
│ │ vite-env.d.ts
│ │
│ └─@types // Project's global typescript declaration files.
│ │
│ └─assets // Project's assets/resources
│ │ │ index.ts
│ │ │
│ │ └─images
│ │ │ │ image_1.png
│ │ │ │ image_2.png
│ │ │ │ ...
│ │
│ └─components // Project's global components.
│ │ │ Button.tsx
│ │ │ Table.tsx
│ │ │ ...
│ │
│ └─core // Project's core features.
│ │ └─api // Api calling logic
│ │ └─authentication // Authentication provider and hooks
│ │ └─components // Some base components
│ │ └─env // Format environment variables name
│ │ └─hooks // Custom hooks that project provided.
│ │ └─loading // Global loading provider.
│ │ └─models // Core models typing.
│ │ └─permissions // Permission provider and hooks.
│ │ └─providers // Some other providers.
│ │ └─repository // Base repository logic to call api resource.
│ │ └─routes // Base routes logic.
│ │ └─theme // Theme provider and hooks.
│ │ └─utilities // Utilities functions
│ │
│ └─hooks // Hooks that are for global business logic will be defined here.
│ └─layouts // Project's layouts will be defined in this folder.
│ │
│ └─localization // Project's localization configuration.
│ │ │ index.ts
│ │ │
│ │ └─locales // Global translation files.
│ │ │ └─en // Global English translation files.
│ │ │ └─vi // Global Vietnamese translation files.
│ │
│ └─models // Project's global business resources typing.
│ └─pages // Project's global pages.
│ └─routes // Project's routes configurations.
│ └─styles // Project's global styles.
│ └─utilities // Project's global business logic functions.
│ │
│ └─modules // Project's feature modules.
│ │ └─module_1 // Module 1.
│ │ │ └─components // Module's business/local components.
│ │ │ └─models // Module's business resources typing.
│ │ │ └─repositories // Module's definition resources api calling.
│ │ │ └─styles // Module's local styles.
│ │ │ └─utilities // Module's local business logic functions.
│ │ │ │
│ │ │ └─locales // Module's translation files.
│ │ │ │ │ en.json // Module's English translation file.
│ │ │ │ │ vi.json // Module's Vietnamese translation file.
│ │ │ │ │ index.ts // Module's merged translation file.
│ │ │ │
│ │ │ └─pages // Module's page components.
│ │ │ │ └─Index // Module's index page.
│ │ │ │ │ │ index.ts // Module's index page component.
│ │ │ │ └─FirstChild // Module's first child page.
│ │ │ │ │ │ index.ts // Module's first child page component.
│ │ │ │
│ │ │ └─routes // Module's routes.
│ │ │ │ │ paths.ts // Module's route paths.
│ │ │ │ │ routes.tsx // Module's routes.
│ │ │ │
│ │ │ │ module.ts // Module's definition file.
│ │ │ │ index.ts // Module's export features.
│ │ │ │ types.d.ts // Module's typescript declaration file.
│ │ │ │
│ │ └─module_2 // Module 2.
│ │ └─module_3 // Module 3.
│ │ └─module_4 // Module 4.
│ │ ... // Other modules
│ └─templates // Templates for generator.
```
