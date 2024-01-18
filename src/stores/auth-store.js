import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', () => {
  const userName = ref(null)

  const setAuthUser = (authUser) => {
    userName.value = authUser
  }

  return { userName, setAuthUser }
})
