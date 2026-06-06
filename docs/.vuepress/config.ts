import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import { genSiteLocales } from './navigation/genLocales.ts'
import breadcrumbFix from './plugins/breadcrumb-fix.ts'

const upstreamDocsBranch = process.env.MAANTE_UPSTREAM_DOCS_BRANCH ?? 'dev'

export default defineUserConfig({
  plugins: [breadcrumbFix],
  base: '/',
  lang: 'zh-CN',
  title: 'MaaNTE 文档站',
  description: 'MaaNTE | MAA 异环小助手 — 由 MaaFramework 强力驱动的《异环》自动化辅助工具',

  locales: genSiteLocales(),

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/images/logo_32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '256x256', href: '/images/logo_256x256.png' }],
  ],

  bundler: viteBundler(),
  shouldPrefetch: false,

  theme: plumeTheme({
    hostname: 'https://maante.org',

    docsRepo: '1bananachicken/MaaNTE',
    docsDir: '/docs',
    docsBranch: upstreamDocsBranch,

    editLink: true,

    cache: 'filesystem',

    autoFrontmatter: {
      permalink: false,
      createTime: false,
      title: false,
    },


    watermark: false,

    markdown: { 
      icon: { provider: 'iconify'},
      plot: true
    }
  }),
})
