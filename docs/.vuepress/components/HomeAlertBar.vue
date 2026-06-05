<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useData } from 'vuepress/client'
import { useLocale } from '../composables/useLocale.js'

interface TopAlertConfig {
  enabled?: boolean
  label?: string
  text?: string
  link?: string
  speed?: number
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  badgeBackgroundColor?: string
  badgeTextColor?: string
}

const { frontmatter } = useData()
const { currentLocale } = useLocale()

const i18n = computed(() => {
  if (currentLocale.value === 'en') return { label: 'Warning', ariaLabel: 'Site Notice' }
  if (currentLocale.value === 'ja') return { label: '注意', ariaLabel: 'サイト通知' }
  return { label: '警告', ariaLabel: '站点通知' }
})

const homePage = computed(() => frontmatter.value.pageLayout === 'home')

const rawTopAlert = computed(() => frontmatter.value.topAlert as string | TopAlertConfig | undefined)

const topAlert = computed(() => {
  const raw = rawTopAlert.value
  if (!raw) return null
  if (typeof raw === 'string') return { enabled: true, text: raw } satisfies TopAlertConfig
  return raw
})

const enabled = computed(() => {
  if (!homePage.value || !topAlert.value) return false
  if (topAlert.value.enabled === false) return false
  return Boolean(topAlert.value.text?.trim())
})

const text = computed(() => topAlert.value?.text?.trim() ?? '')
const link = computed(() => topAlert.value?.link?.trim() ?? '')
const label = computed(() => topAlert.value?.label?.trim() || i18n.value.label)
const duration = computed(() => {
  const speed = Number(topAlert.value?.speed)
  return Number.isFinite(speed) && speed > 0 ? `${speed}s` : '26s'
})
const barStyle = computed(() => {
  const cfg = topAlert.value
  return {
    '--home-alert-bg': cfg?.backgroundColor?.trim() || '#7f1d1d',
    '--home-alert-text': cfg?.textColor?.trim() || '#fff7ed',
    '--home-alert-border': cfg?.borderColor?.trim() || 'rgba(255, 255, 255, 0.22)',
    '--home-alert-badge-bg': cfg?.badgeBackgroundColor?.trim() || '#fef08a',
    '--home-alert-badge-text': cfg?.badgeTextColor?.trim() || '#7f1d1d',
  }
})

const linkTarget = computed(() => (link.value.startsWith('/') ? '_self' : '_blank'))

watchEffect(() => {
  if (typeof document === 'undefined') return
  document.documentElement.style.setProperty('--vp-layout-top-height', enabled.value ? '36px' : '0px')
})
</script>

<template>
  <section
    v-if="enabled"
    class="home-alert-bar"
    :style="barStyle"
    role="status"
    aria-live="polite"
    :aria-label="i18n.ariaLabel"
  >
    <div class="home-alert-bar__inner">
      <div class="home-alert-bar__track" :style="{ '--home-alert-duration': duration }">
        <template v-for="item in 2" :key="item">
          <a
            v-if="link"
            class="home-alert-bar__content"
            :href="link"
            :target="linkTarget"
            :rel="linkTarget === '_blank' ? 'noopener noreferrer' : undefined"
          >
            <span class="home-alert-bar__label">{{ label }}</span>
            <span class="home-alert-bar__text">{{ text }}</span>
          </a>
          <span v-else class="home-alert-bar__content">
            <span class="home-alert-bar__label">{{ label }}</span>
            <span class="home-alert-bar__text">{{ text }}</span>
          </span>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-alert-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: calc(var(--vp-z-index-nav) + 1);
  box-sizing: border-box;
  width: 100%;
  height: 36px;
  overflow: hidden;
  background: var(--home-alert-bg);
  border-bottom: 1px solid var(--home-alert-border);
}

.home-alert-bar__inner {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.home-alert-bar__track {
  display: flex;
  flex: 0 0 auto;
  min-width: 100%;
  will-change: transform;
  animation: home-alert-scroll var(--home-alert-duration) linear infinite;
}

.home-alert-bar__content {
  display: inline-flex;
  flex: 0 0 auto;
  gap: 10px;
  align-items: center;
  min-width: 100%;
  padding: 0 24px;
  color: var(--home-alert-text);
  font-size: 14px;
  line-height: 1;
  text-decoration: none;
}

.home-alert-bar__label {
  padding: 3px 8px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: var(--home-alert-badge-text);
  letter-spacing: 0.4px;
  background: var(--home-alert-badge-bg);
  border-radius: 999px;
}

.home-alert-bar__text {
  font-weight: 600;
  letter-spacing: 0.2px;
  white-space: nowrap;
}

@keyframes home-alert-scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-alert-bar__track {
    animation-duration: 0s;
    animation-iteration-count: 1;
  }
}

@media (max-width: 767px) {
  .home-alert-bar__content {
    padding: 0 14px;
    font-size: 13px;
  }

  .home-alert-bar__label {
    font-size: 11px;
  }
}
</style>
