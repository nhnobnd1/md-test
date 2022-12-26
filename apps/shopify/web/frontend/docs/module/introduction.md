---
title: Module - Introduction
---

# {{$frontmatter.title}}

We will separate app to several modules. Each modules have their own responsibility, providing one feature.

## I. Command line

This command line will be used to generate new module, in folder `src/modules/<module-name>`. Example:

```sh
yarn gen-module <module-name>
```

Replace `<module-name>` with your module name.

## II. Structure

A module has two folders you need to know first before do anything else:

- [Module's routing](/module/routing)
- [Module's localization](/module/localization)

Module's routes and localization will be imported automatically.

A module is structured like this:

```
module_1 // Module 1.
└─components // Module's business/local components.
└─models // Module's business resources typing.
└─repositories // Module's definition resources api calling.
└─styles // Module's local styles.
└─utilities // Module's local business logic functions.
│
└─locales // Module's translation files.
│ │ en.json // Module's English translation file.
│ │ vi.json // Module's Vietnamese translation file.
│ │ index.ts // Module's merged translation file.
│ │
└─pages // Module's page components.
│ └─Index // Module's index page.
│ │ │ index.ts // Module's index page component.
│ └─FirstChild // Module's first child page.
│ │ │ index.ts // Module's first child page component.
│ │
└─routes // Module's routes.
│ │ paths.ts // Module's route paths.
│ │ routes.tsx // Module's routes.
│ │
│ module.ts // Module's definition file.
│ index.ts // Module's export features.
│ types.d.ts // Module's typescript declaration file.
```
