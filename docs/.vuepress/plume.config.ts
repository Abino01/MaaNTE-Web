import { defineThemeConfig } from 'vuepress-theme-plume'
import { genNavigationComponents } from './navigation/genNavigationComponents.ts'

const navigationComponents = genNavigationComponents()

export default defineThemeConfig({
  home: '/',
  logo: 'images/logo_32x32.png',

  appearance: true,

  social: [
    { icon: 'bilibili', link: 'https://space.bilibili.com/3546893080594665' },
    { icon: 'discord', link: 'https://discord.gg/EjwrrGzy' },
    { icon: 'github', link: 'https://github.com/1bananachicken/MaaNTE' },
  ],
  navbarSocialInclude: ['bilibili', 'discord', 'github'],

  footer: false,

  navbar: navigationComponents.navbar,
})
