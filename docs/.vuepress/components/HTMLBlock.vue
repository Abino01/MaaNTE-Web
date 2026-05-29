<script setup lang="ts">
import { VPHomeBox } from 'vuepress-theme-plume/client'
defineProps<{
  html?: string
}>()
</script>

<template>
  <VPHomeBox class="home-html" v-bind="$props">
    <div v-if="html" v-html="html" class="vp-doc" />
    <slot v-else />
  </VPHomeBox>
</template>
