# Custom addon BuildMaker for Vite

This is an optional addon for Vite builder that allows you to customize the build process.

## How to use

1. Add the following files to your root folder in your project:

- `buildMaker.js`
- `vite.config.ts`

2. Add version.json to your public folder in your project:
3. Add the command `npm run build` to your package.json scripts module:

```json
{
  "scripts": {
    "prebuild": "node buildMaker.js",
    "build": "vite build && node printVersion.js",
  }
}
```

4. Customize the buildMaker.js file to your needs.