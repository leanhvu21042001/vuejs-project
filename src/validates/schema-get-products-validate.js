import * as yup from 'yup'

export const schemaGetProductsValidate = yup.object({
  priceFrom: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable(true)
    .test('lessThanPriceTo', 'Giá bắt đầu phải nhỏ hơn giá kết thúc', function (value) {
      const priceTo = this.parent.priceTo
      return !value || !priceTo || value < priceTo
    }),
  priceTo: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable(true)
    .test('greaterThanPriceFrom', 'Giá kết thúc phải lớn hơn giá bắt đầu', function (value) {
      const priceFrom = this.parent.priceFrom
      return !value || !priceFrom || value > priceFrom
    })
})
