import { defineClientConfig } from 'vuepress/client'
import './styles/custom.css'

export default defineClientConfig({
  enhance({ app }) {
    import('./components/Redirect.vue').then((module) => {
      app.component('Redirect', module.default)
    })
  },
})
