<template>
  <div id="list-product">
    <main class="d-flex flex-column">
      <div
        class="container d-flex flex-row flex-wrap align-items-center justify-content-between py-5"
      >
        <h1>Danh sách sản phẩm</h1>

        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb m-0">
            <RouterLink class="breadcrumb-item" :to="{ name: 'ListProduct' }">Sản phẩm</RouterLink>
          </ol>
        </nav>
      </div>

      <!-- Modal Modal Delete product -->
      <div
        class="modal fade"
        id="staticBackdropDeleteProduct"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropDeleteProductLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <form id="delete-product-form" class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropDeleteProductLabel">Nhắc nhở</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <input type="hidden" class="form-control" id="productIdDelete" name="productId" />

              <p class="fs-3 text-center content-delete"></p>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
              <button type="submit" class="btn btn-primary">OK</button>
            </div>
          </form>
        </div>
      </div>
      <!-- End Modal Delete product -->

      <!-- Filter -->
      <div class="container filter">
        <form id="search-form" class="pb-4" @submit="onSearch" @reset="onResetSearch">
          <div class="row justify-content-center my-3 fields">
            <div class="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-3">
              <div>
                <label for="name" class="form-label">Tên sản phẩm</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  v-model="name"
                  v-bind="nameAttrs"
                  placeholder="Nhập tên sản phẩm"
                />
              </div>
            </div>

            <div class="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-3">
              <div>
                <label for="status" class="form-label">Trạng thái</label>
                <select
                  class="form-select"
                  id="status"
                  name="status"
                  v-model="status"
                  v-bind="statusAttrs"
                >
                  <option value="" selected>Mặc định</option>
                  <option value="0">Ngừng bán</option>
                  <option value="1">Đang bán</option>
                  <option value="2">Hết hàng</option>
                </select>
              </div>
            </div>

            <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-3">
              <div class="row">
                <div class="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                  <label for="price_from" class="form-label">Giá bán từ</label>
                  <input
                    type="number"
                    class="form-control"
                    id="priceFrom"
                    name="priceFrom"
                    min="0"
                    v-model="priceFrom"
                    v-bind="priceFromAttrs"
                    @keypress="onlyNumberOnKeypress"
                  />
                  <div class="text-danger" id="price_from_error">{{ errors.priceFrom }}</div>
                </div>
                <div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 px-0">
                  <label class="form-label">&ThinSpace;</label>
                  <input type="text" class="form-control text-center px-0 border-0" value="~" />
                </div>
                <div class="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                  <label for="price_to" class="form-label">Giá bán đến</label>
                  <input
                    type="number"
                    class="form-control"
                    id="priceTo"
                    name="priceTo"
                    min="0"
                    v-model="priceTo"
                    v-bind="priceToAttrs"
                    @keypress="onlyNumberOnKeypress"
                  />
                  <div class="text-danger" id="price_to_error">{{ errors.priceTo }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="d-flex flex-row flex-wrap justify-content-center gap-3 my-3 actions">
            <div class="d-flex flex-row flex-wrap justify-content-center gap-3">
              <button type="submit" class="btn btn-primary">
                <i class="fa-solid fa-magnifying-glass"></i>
                <span>Tìm kiếm</span>
              </button>

              <button type="reset" id="clear-search" class="btn btn-success">
                <i class="fa-solid fa-delete-left"></i>
                <span>Xóa tìm</span>
              </button>
            </div>

            <RouterLink
              class="btn btn-warning mw-100"
              type="button"
              :to="{ name: 'CreateProduct' }"
            >
              <i class="fa-solid fa-plus"></i>
              <span>Thêm mới</span>
            </RouterLink>
          </div>
        </form>
      </div>

      <div class="container">
        <p class="text-center">
          Hiển thị từ <span id="from">{{ data.from }}</span> ~
          <span id="to">{{ data.to }}</span> trong tổng số
          <span id="total">{{ data.total }}</span> sản phẩm
        </p>

        <!-- main datatable -->
        <div class="table-responsive">
          <table class="table table-striped" id="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên sản phẩm</th>
                <th
                  scope="col"
                  class="d-xxl-block d-xl-block d-lg-block d-md-none d-sm-none d-none"
                >
                  Mô tả
                </th>
                <th scope="col">Giá</th>
                <th style="min-width: 100px" scope="col">Trạng Thái</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody id="table-body">
              <tr v-for="product in data.products" :key="product.id">
                <th scope="row">{{ product.id }}</th>
                <td class="product-name">
                  {{ product.name }}
                </td>
                <td
                  class="d-xxl-inline-block d-xl-inline-block d-lg-inline-block d-md-none d-sm-none d-none"
                  style="height: 130px; min-height: fit-content; overflow: hidden; width: 100%"
                  v-html="product.description"
                ></td>
                <td class="text-success">${{ product.price }}</td>
                <td :class="product.isSales ? 'text-success' : 'text-danger'">
                  {{ product.statusSaleText }}
                </td>
                <td>
                  <div class="d-flex flex-row flex-wrap gap-3">
                    <RouterLink
                      :to="{ name: 'EditProduct', params: { id: product.id } }"
                      class="btn btn-warning"
                    >
                      <i class="fa-solid fa-pen text-white"></i>
                    </RouterLink>

                    <button
                      class="btn btn-danger btnDeleteProduct"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdropDeleteProduct"
                    >
                      <i class="fa-solid fa-trash-can btnDeleteProduct"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="row my-3">
          <div
            class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 order-xxl-1 order-xl-1 order-lg-1 order-md-2 order-sm-2 order-2 mb-3"
          >
            <div
              class="d-flex align-items-center justify-content-xxl-start justify-content-xl-start justify-content-lg-start justify-content-md-center justify-content-sm-center justify-content-center gap-2"
            >
              <label for="perPage">Hiển thị</label>
              <select
                @change="onChangePerPage"
                class="form-select form-select-sm w-auto"
                id="perPage"
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
              <label for="perPage">đơn vị</label>
            </div>
          </div>

          <div
            class="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 order-xxl-2 order-xl-2 order-lg-2 order-md-1 order-sm-1 order-1 mb-3"
          >
            <nav aria-label="Page product management navigation">
              <ul
                v-if="data.isShowPaginate"
                class="pagination justify-content-xxl-end justify-content-xl-end justify-content-lg-end justify-content-md-center justify-content-sm-center justify-content-center flex-wrap"
                id="paginate"
              >
                <li
                  :class="{
                    'page-item': true,
                    active: link.active
                  }"
                  v-for="(link, index) in data.links"
                  :key="`paginate-link-${index}`"
                >
                  <button
                    v-if="index === 0"
                    @click="() => onChangePage(getPageNumberFromUrl(link.url))"
                    class="page-link"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&lt;</span>
                  </button>
                  <button
                    v-else-if="index === data.links.length - 1"
                    @click="() => onChangePage(getPageNumberFromUrl(link.url))"
                    class="page-link"
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&gt;</span>
                  </button>
                  <button
                    v-else
                    @click="() => onChangePage(getPageNumberFromUrl(link.url))"
                    class="page-link"
                  >
                    {{ link.label }}
                  </button>
                </li>
                <li class="page-item">
                  <button
                    @click="() => onChangePage(data.lastPage)"
                    class="page-link"
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&gt;&gt;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import { useGetProductsHook } from '~/hooks'
import { onlyNumberOnKeypress } from '~/utils/number'
const {
  name,
  nameAttrs,
  status,
  statusAttrs,
  priceFrom,
  priceFromAttrs,
  priceTo,
  priceToAttrs,
  errors,
  data,
  onSearch,
  onResetSearch,
  onChangePage,
  onChangePerPage
} = useGetProductsHook()
const getPageNumberFromUrl = (link = '') => link?.split('?page=').at(1)

//! data.total
//! data.from
//! data.to
// data.lastPage
// data.links
// data.products
</script>
