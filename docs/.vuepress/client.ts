import { defineClientConfig } from 'vuepress/client'
import Layout from './layouts/Layout.vue'
import QQGroupJoin from './components/QQGroupJoin.vue'
import Redirect from './components/Redirect.vue'
import './styles/custom.css'
import HomeIntro from './components/HomeIntro.vue'
import HHero from './components/HHero.vue'

export default defineClientConfig({
  layouts: {
    Layout,
  },

  enhance({ app }) {
    app.component('HomeIntro', HomeIntro)
    app.component('HHero', HHero)
    app.component('Redirect', Redirect)
    app.component('QQGroupJoin', QQGroupJoin)
  },
})
