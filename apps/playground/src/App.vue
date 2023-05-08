<template>
  <ModalProvider :min-width="500">
    <Page1 />
  </ModalProvider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script setup lang="ts">
import { ModalProvider } from '@gopowerteam/vue-modal'
import Page1 from './pages/page1.vue'
</script>
