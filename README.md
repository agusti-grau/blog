# Agusti Grau - Microsoft Questions

Blog tecnic en catala sobre tecnologies Microsoft: Azure, Intune, SCCM i Windows.

## Tecnologies

- [Astro](https://astro.build) - Framework web estatic
- Markdown / MDX - Format de contingut
- GitHub Pages - Allotjament
- GitHub Actions - Desplegament automatic

## Com afegir un article nou

1. Crea un fitxer `.md` dins de `src/content/blog/` (per exemple, `el-meu-article.md`)

2. Afegeix el frontmatter amb les metadades:

```yaml
---
title: "Titol de l'article"
description: "Descripcio curta de l'article"
pubDate: 2025-03-01
tags: ["Azure", "Windows"]
author: "Agusti Grau"
lang: "ca"
---
```

3. Escriu el contingut de l'article en Markdown

4. Fes commit i push a la branca `main`:

```bash
git add .
git commit -m "feat: nou article sobre..."
git push origin main
```

El desplegament es fara automaticament amb GitHub Actions.

## Estructura de fitxers

```
src/
  components/     # Components reutilitzables (Header, Footer, PostCard...)
  content/
    blog/         # Articles del blog en Markdown/MDX
  layouts/        # Plantilles de pagina (BaseLayout, PostLayout, ListLayout)
  pages/          # Rutes de la web (index, blog/[slug], tags...)
  styles/
    global.css    # Estils globals i variables CSS
  consts.ts       # Constants del lloc
  content.config.ts # Configuracio de la col·leccio de contingut
```

## Desenvolupament local

```bash
npm install
npm run dev
```

Obre [http://localhost:4321/blog/](http://localhost:4321/blog/) al navegador.

## Build i produccio

```bash
npm run build
```

Els fitxers generats estan a `dist/`.

## Llicencia

Contingut sota [Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.ca).
