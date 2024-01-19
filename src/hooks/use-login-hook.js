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
      email: yup
        .string('Email phải là kiểu chuổi')
        .email('Email không đúng định dạng')
        .required('Email không được trống'),
      password: yup
        .string('Password phải là kiểu chuổi')
        .min(3, 'Độ dài ít nhất là 3 ký tự')
        .required('Password không được trống')
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
            router.push({ name: 'ListProduct' })
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
