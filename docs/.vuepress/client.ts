import { defineClientConfig } from 'vuepress/client'
import QQGroupJoin from './components/QQGroupJoin.vue'
import Redirect from './components/Redirect.vue'
import './styles/custom.css'

export default defineClientConfig({
  enhance({ app }) {
    app.component('Redirect', Redirect)
    app.component('QQGroupJoin', QQGroupJoin)
  },
})
