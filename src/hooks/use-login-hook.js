import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { useMutation } from '@tanstack/vue-query'

import authService from '~/services/auth-service'
import { useAuthStore } from '~/stores'
import { scrollIntoErrorView } from '~/helpers'
import router from '~/router'

const useLoginHook = () => {
  const authStore = useAuthStore()
  const { mutate: mutateLogin } = useMutation({
    mutationFn: authService.login
  })

  const { errors, handleSubmit, defineField, setFieldError } = useForm({
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(3).required()
    })
  })

  const [email, emailAttrs] = defineField('email')
  const [password, passwordAttrs] = defineField('password')

  const onLogin = handleSubmit(
    (values) => {
      mutateLogin(values, {
        onSuccess: (data) => {
          authStore.setAuthUser(data.user)

          if (authStore.user) {
            router.push({ name: 'ProductView' })
          }
        },
        onError: (error) => {
          Object.entries(error.details).forEach(([key, errorList]) => {
            setFieldError(key, errorList[0])
          })
        }
      })
    },
    ({ errors }) => {
      const firstError = Object.keys(errors)[0]
      scrollIntoErrorView(firstError)
    }
  )

  return {
    email,
    password,
    emailAttrs,
    passwordAttrs,
    errors,
    onLogin
  }
}

export default useLoginHook
