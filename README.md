# Site Cadastro GCI — Grupo Ceres Investimentos

Landing page em React + Vite + Tailwind CSS.

## Desenvolvimento

**Pré-requisito:** Node.js (LTS recomendado)

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

A saída fica em `dist/`, pronta para hospedagem estática.

## GitHub Pages

Faça o deploy da pasta `dist/` (por exemplo com GitHub Actions ou `gh-pages`). Não é necessário backend nem variáveis de ambiente para o site em si.

Configure `base` no Vite se o site for servido em um subcaminho (`https://usuario.github.io/repositorio/`): em `vite.config.ts`, use `base: '/nome-do-repo/'`.

## Lint

```bash
npm run lint
```
