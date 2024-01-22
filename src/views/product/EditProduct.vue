<template>
  <main class="d-flex flex-column">
    <div
      class="container d-flex flex-row flex-wrap align-items-center justify-content-between py-5"
    >
      <h1>Sửa sản phẩm</h1>

      <!-- Breadcrumb -->
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
        <ol class="breadcrumb m-0">
          <RouterLink :to="{ name: 'ListProduct' }" class="breadcrumb-item">Sản phẩm</RouterLink>
          <RouterLink
            :to="{ name: 'CreateProduct' }"
            class="breadcrumb-item active text-decoration-none"
          >
            Thêm sản phẩm
          </RouterLink>
        </ol>
      </nav>
    </div>

    <!-- Form -->
    <div class="container">
      <form @submit="onUpdateProduct" id="form-product" method="POST" enctype="multipart/form-data">
        <div class="row">
          <!-- Left Fields -->
          <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <div class="mb-3">
              <label for="productName" class="form-label">Tên sản phẩm</label>
              <input
                name="name"
                type="text"
                class="form-control"
                id="name"
                placeholder="Nhập tên sản phẩm"
                v-model="name"
                v-bind="nameAttrs"
              />
              <div class="text-danger" id="productNameError">{{ errors.name }}</div>
            </div>

            <div class="mb-3">
              <label for="productPrice" class="form-label">Giá bán</label>
              <input
                v-model="price"
                v-bind="priceAttrs"
                @keypress="onlyNumberOnKeypress"
                name="price"
                type="number"
                class="form-control"
                id="price"
                placeholder="Nhập tên giá bán"
              />
              <div class="text-danger" id="productPriceError">{{ errors.price }}</div>
            </div>

            <div class="mb-3">
              <label for="editor" class="form-label">Mô tả</label>
              <ckeditor
                v-model="description"
                v-bind="descriptionAttrs"
                :editor="editor"
                :config="editorConfig"
              ></ckeditor>
            </div>

            <div class="mb-3">
              <label for="productStatus" class="form-label">Trạng thái</label>
              <select
                v-model="isSales"
                v-bind="isSalesAttrs"
                class="form-select"
                id="productStatus"
                name="is_sales"
              >
                <option value="" selected>Mặc định</option>
                <option value="0">Ngừng bán</option>
                <option value="1">Đang bán</option>
                <option value="2">Hết hàng</option>
              </select>
              <div class="text-danger" id="productStatusError">{{ errors.isSales }}</div>
            </div>
          </div>

          <!-- Right Fields -->
          <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <!-- Show image -->
            <div class="border text-center">
              <img
                :src="imageShow ?? 'https://via.placeholder.com/400?text=Product%20Image'"
                class="img-fluid img-thumbnail"
                id="fileUploadPreview"
                style="max-height: 400px"
              />
            </div>

            <!-- Show error -->
            <div class="text-danger" id="productFileUploadError">{{ errors.fileUpload }}</div>

            <!-- Show custom input and button field -->
            <div class="d-flex flex-wrap gap-3 align-items-center justify-content-center mt-3">
              <label class="btn btn-primary" for="fileUpload">Upload</label>
              <!-- fileUpload: will be convert to 'image' field in controller -->
              <input
                @change="(event) => ([fileUpload] = event.target.files)"
                v-bind="fileUploadAttrs"
                name="fileUpload"
                type="file"
                class="form-control d-none"
                id="fileUpload"
                accept="image/*"
              />
              <button
                @click="deleteImage"
                id="clearFileUpload"
                type="button"
                class="btn btn-danger"
              >
                Xóa file
              </button>
              <input
                :value="imageName ?? 'Tên file upload'"
                v-bind="imageNameAttrs"
                name="imageName"
                id="imageName"
                class="input-group-text flex-grow-1"
                type="text"
                disabled
              />
            </div>
          </div>

          <!-- Action buttons -->
          <div class="col-12 text-end mt-5">
            <RouterLink :to="{ name: 'ListProduct' }" class="btn btn-secondary btn-lg">
              Hủy
            </RouterLink>
            <button type="submit" class="btn btn-danger btn-lg">Lưu</button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import router from '~/router'
import { onlyNumberOnKeypress } from '~/utils/number'
import { useUpdateProductHook, useGetSingleProductHook } from '~/hooks'

const editorConfig = ref({
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    'blockQuote',
    'undo',
    'redo'
  ]
})
const editor = ClassicEditor
const ckeditor = CKEditor.component

const { product } = useGetSingleProductHook(router.currentRoute.value.params.id)
const {
  name,
  nameAttrs,
  price,
  priceAttrs,
  description,
  descriptionAttrs,
  isSales,
  isSalesAttrs,
  fileUpload,
  fileUploadAttrs,
  imageName,
  imageNameAttrs,
  errors,
  imageShow,
  onUpdateProduct,
  deleteImage,
  setValues,
  setImageUrl
} = useUpdateProductHook(router.currentRoute.value.params.id)

watchEffect(() => {
  if (product.value) {
    setValues({
      ...product.value
    })
    setImageUrl(product.value.imageUrl)
  }
})
</script>

<style scoped></style>
