import { defineClientConfig } from 'vuepress/client'

export default defineClientConfig({
  enhance({ app }) {
    import('./components/Redirect.vue').then((module) => {
      app.component('Redirect', module.default)
    })
    import('./components/QQGroupJoin.vue').then((module) => {
      app.component('QQGroupJoin', module.default)
    })
  },
})
