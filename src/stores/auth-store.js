import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref(null)

  const setAuthUser = (authUser) => {
    user.value = authUser
  }

  return { user, setAuthUser }
})
