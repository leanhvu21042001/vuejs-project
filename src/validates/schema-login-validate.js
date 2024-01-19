import * as yup from 'yup'

export const schemaLoginValidate = yup.object({
  email: yup
    .string('Email phải là kiểu chuổi')
    .email('Email không đúng định dạng')
    .required('Email không được trống'),
  password: yup
    .string('Password phải là kiểu chuổi')
    .min(3, 'Độ dài ít nhất là 3 ký tự')
    .required('Password không được trống')
})
