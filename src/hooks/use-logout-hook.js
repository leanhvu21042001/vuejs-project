import { useMutation } from '@tanstack/vue-query'

import authService from '~/services/auth-service'
import { useAuthStore } from '~/stores'
import router from '~/router'

const useLogoutHook = () => {
  const authStore = useAuthStore()

  const { mutate: mutateLogout } = useMutation({
    mutationKey: 'logout',
    mutationFn: authService.logout,
    onSuccess: () => {
      authStore.setAuthUser(null)

      if (!authStore.user) {
        router.push({ name: 'LoginView' })
      }
    }
  })

  return {
    mutateLogout
  }
}

export default useLogoutHook
