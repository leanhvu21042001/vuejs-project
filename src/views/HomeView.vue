<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { useCounterStore } from '@/stores/counter'
const counterStore = useCounterStore()
</script>

<template>
  <main>
    <TheWelcome />
    <button @click="counterStore.increment">
      count: {{ counterStore.count }} | double count: {{ counterStore.doubleCount }}
    </button>
  </main>
</template>

<style scoped>
button {
  all: reset;
  padding: 3rem;
}
</style>
