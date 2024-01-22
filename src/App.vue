<script setup>
import { RouterView } from 'vue-router'
import { useIsFetching, useIsMutating } from '@tanstack/vue-query'

import HeaderLayout from './components/layout/HeaderLayout.vue'
import OverlayComponent from './components/common/OverlayComponent.vue'

const isFetching = useIsFetching()
const isMutating = useIsMutating()
</script>

<template>
  <HeaderLayout />
  <RouterView />
  <notifications />
  <OverlayComponent :is-loading="isFetching || isMutating" />
</template>
