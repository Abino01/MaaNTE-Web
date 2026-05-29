import { defineClientConfig } from 'vuepress/client'
import './styles/custom.css'
import HTMLBlock from './components/HTMLBlock.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('HTMLBlock', HTMLBlock)
    import('./components/Redirect.vue').then((module) => {
      app.component('Redirect', module.default)
    })
    import('./components/QQGroupJoin.vue').then((module) => {
      app.component('QQGroupJoin', module.default)
    })
  },
})
