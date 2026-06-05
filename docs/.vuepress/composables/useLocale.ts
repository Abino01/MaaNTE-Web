import { computed } from 'vue'
import { useData } from 'vuepress/client'

export type Locale = 'zh' | 'en' | 'ja'

export function useLocale() {
  const { routeLocale } = useData()

  const currentLocale = computed<Locale>(() => {
    const lp = routeLocale.value
    if (lp.startsWith('/en_us')) return 'en'
    if (lp.startsWith('/ja_jp')) return 'ja'
    return 'zh'
  })

  return { currentLocale }
}
