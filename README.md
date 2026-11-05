# Conestoga Apartments

A responsive, single-page Next.js website recreated from the original property screenshots and photos. Built with TypeScript, custom responsive CSS, and pnpm. No external fonts, API keys, or form service required.

## Local development

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Production

```sh
pnpm build
pnpm start
```

Deploy to Vercel by importing this repository and selecting the Next.js preset. Vercel detects the pnpm lockfile. Other hosts supporting Next.js can use the commands above. No environment variables are required. This project has not been published or connected to a remote repository.

## Updating property information

Edit `src/app/page.tsx` to update rent, utilities, contacts, layout descriptions and neighborhood text. Contact buttons use `tel:` links; update both the visible number and link, including the mobile call bar. No contact form is included.

The original starting rent ($900/month), utility estimate ($170/month), and contacts have been retained at the owner's request. Confirm them before launch. The screenshot did not provide a complete verified street address, so the map link searches for the property in Rupert and visitors are directed to call for exact directions.

Update search and social metadata in `src/app/layout.tsx`. Styles and mobile breakpoints are in `src/app/globals.css`. Original reference files remain in `reference/`; optimized WebP copies used by the site are in `public/images/`.

The gallery includes all 12 interior photographs, with an accessible native dialog for enlarged viewing. Exterior images are from the original website. Photography may not reflect current finishes.
