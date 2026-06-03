<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vuepress/client'
import HbrButton from './HbrButton.vue'

interface HeroAction {
  text: string
  link?: string
  theme?: 'brand' | 'alt' | 'sponsor'
  type?: 'primary' | 'secondary'
  icon?: string
  suffixIcon?: string
  target?: string
  rel?: string
  children?: HeroAction[]
}

interface HeroData {
  name?: string
  tagline?: string
  text?: string
  actions?: HeroAction[]
}

interface Props {
  hero?: HeroData
  full?: boolean
  onlyOnce?: boolean
  index?: number
  backgroundImage?: unknown
  backgroundAttachment?: string
}

const props = defineProps<Props>()
const { frontmatter } = useData()
const heroData = computed<HeroData>(() => props.hero ?? (frontmatter.value as Record<string, any>).hero ?? {})
const actions = computed<HeroAction[]>(() => heroData.value.actions ?? [])
</script>

<template>
  <div
    class="hhero"
    :class="{
      full,
      first: index === 0,
      once: onlyOnce,
    }"
  >
    <div class="hero-container">
      <div class="hero-content">
        <h1 v-if="heroData.name" class="hero-name" v-html="heroData.name" />
        <p v-if="heroData.tagline" class="hero-tagline" v-html="heroData.tagline" />
        <p v-if="heroData.text" class="hero-text" v-html="heroData.text" />

        <div v-if="actions.length" class="actions">
          <HbrButton
            v-for="action in actions"
            :key="action.text"
            v-bind="action"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hhero {
  position: relative;
  width: 100%;
}

.hhero.first {
  margin-top: calc(0px - var(--vp-nav-height));
}

.hhero.full {
  height: 100vh;
}

.hhero.full.once {
  height: calc(100vh - var(--vp-footer-height, 0px));
}

.hero-container {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.hhero.full .hero-container {
  align-items: center;
  justify-content: center;
}

.hhero:not(.full) .hero-container {
  padding-top: 80px;
  padding-bottom: 80px;
}

.hero-content {
  width: max-content;
  max-width: 960px;
  padding: 0 20px;
  margin: 0 auto;
  text-align: center;
  pointer-events: none;
}

.hhero.full .hero-container .hero-content {
  margin-top: -40px;
}

.hero-name,
.hero-tagline {
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  font-size: 48px;
  font-weight: 900;
  line-height: 1.25;
  letter-spacing: -0.5px;
  pointer-events: auto;
}

.hero-name {
  background: var(--vp-bg-home-hero-name, linear-gradient(315deg, var(--vp-c-purple-1) 15%, var(--vp-c-brand-2) 65%, var(--vp-c-brand-2) 100%));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-tagline {
  color: var(--vp-c-home-hero-tagline, var(--vp-c-text-2));
  transition: color var(--vp-t-color);
}

.hero-text {
  margin: 18px 0 30px;
  font-size: 18px;
  font-weight: 500;
  color: var(--vp-c-home-hero-text, var(--vp-c-text-3));
  white-space: pre-wrap;
  pointer-events: auto;
  transition: color var(--vp-t-color);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
  align-items: center;
  justify-content: center;
  margin: 30px 0 0;
  pointer-events: auto;
}

@media (min-width: 768px) {
  .hero-name,
  .hero-tagline {
    font-size: 64px;
  }

  .hero-text {
    font-size: 20px;
  }
}

@media (min-width: 960px) {
  .hero-name,
  .hero-tagline {
    font-size: 72px;
  }

  .hero-text {
    font-size: 24px;
  }
}
</style>
