import { defineThemeConfig } from 'vuepress-theme-plume'
import { genThemeLocales } from './navigation/genLocales.ts'

export default defineThemeConfig({
  home: '/',
  logo: 'images/logo_32x32.png',

  appearance: true,

  social: [
    { icon: 'bilibili', link: 'https://space.bilibili.com/3546893080594665' },
    { icon: 'discord', link: 'https://discord.com/invite/e6mPMRYQpR' },
    { icon: 'github', link: 'https://github.com/1bananachicken/MaaNTE' },
  ],
  navbarSocialInclude: ['bilibili', 'discord', 'github'],

  footer: false,

  locales: genThemeLocales(),
})
