<script setup lang="ts">
import { Layout } from 'vuepress-theme-plume/client'
import HomeAlertBar from '../components/HomeAlertBar.vue'
</script>

<template>
  <Layout>
    <template #layout-top>
      <HomeAlertBar />
    </template>
  </Layout>
</template>
