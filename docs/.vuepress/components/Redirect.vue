<template />

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vuepress/client'

interface Props {
  to?: string
}
const props = defineProps<Props>()

const route = useRoute()
const router = useRouter()

function resolvePath(to: string) {
  const target = new URL(to, 'http://example.com' + route.path)
  return target.pathname
}

onMounted(() => {
  if (!props.to) return
  const targetPath = resolvePath(props.to)
  router.replace(targetPath)
})
</script>
