<script setup>
import { RouterView } from 'vue-router'
import HeaderLayout from './components/layout/HeaderLayout.vue'
</script>

<template>
  <HeaderLayout />
  <RouterView />
  <notifications />
</template>
