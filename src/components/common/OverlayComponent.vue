<template>
  <Transition name="modal">
    <div v-if="props.isLoading" class="modal-mask">
      <div class="text-center text-light">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onUpdated } from 'vue'

const props = defineProps(['isLoading'])

onUpdated(() => {
  if (props.isLoading) {
    document.querySelector('body').style.overflow = 'hidden'
  } else {
    document.querySelector('body').style.overflow = 'auto'
  }
})
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}
</style>
