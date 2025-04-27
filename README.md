# Portifolio - Blog

Welcome!
This is a personal portfolio and blog built using Astro.
It showcases projects, shares blog posts, and serves as a hub for personal branding.

## 🚀 Features

- Astro for ultra-fast performance
- Markdown for easy blog post writing
- Responsive design for all devices
- SEO-friendly setup
- Dark/Light mode [Under construction]

## 🛠️ Setup Instructions

1. Clone the Repository

   ```sh
   git clone https://github.com/guilhermegules/ggm-dev.git
   cd your-portfolio-blog
   ```

2. Install Dependencies Make sure you have Node.js installed.

   ```sh
   npm install
   # or
   pnpm install
   ```

3. Run the Development Server

   ```sh
   pnpm run dev
   ```

   Open http://localhost:4321 to see your site in action.

4. Help with CLI

   ```sh
   pnpm astro
   ```

   Will display all CLI commands

## 📦 Project Structure

```txt
/
├── public/           # Static assets (images, favicon, files, fonts etc.)
├── src/
│   ├── components/   # Reusable UI components
│   ├── layouts/      # Page layouts (e.g., BlogLayout, BaseLayout)
│   ├── pages/        # Pages and routes (e.g., index.astro, blog.astro)
│   ├── content/      # Markdown files for blog posts and projects
│   ├── styles/       # Global and component styles
│   └── utils/        # Utilities
├── astro.config.mjs  # Astro configuration
├── package.json      # Project metadata and scripts
└── README.md         # This file

```

## 📑 Build for Production

```sh
pnpm build
```

This will output a fully static, ready-to-deploy site in the `dist/` folder.

To preview the production build:

```sh
pnpm preview
```
