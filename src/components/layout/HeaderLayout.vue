<template>
  <div id="layout-header" v-if="isShowHeader">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="background: #2a2a2e !important">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#headerLayoutNavbarNavAltMarkup"
          aria-controls="headerLayoutNavbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <RouterLink class="navbar-brand" to="/">
          <img :src="logoText" class="img-fluid" alt="RIVERCRANE VIETNAM" />
        </RouterLink>
        <div class="collapse navbar-collapse" id="headerLayoutNavbarNavAltMarkup">
          <div class="navbar-nav">
            <RouterLink class="nav-link" :to="{ name: 'ListUser' }">Users</RouterLink>
            <RouterLink class="nav-link" :to="{ name: 'ListProduct' }">Sản phẩm</RouterLink>
          </div>

          <form @submit.prevent="mutateLogout" id="form-logout" class="ms-auto">
            <span class="text-white me-3">{{ authStore.user?.name }}</span>
            <button class="btn btn-danger">Logout</button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import router from '~/router'
import { useAuthStore } from '~/stores/auth-store'
import { useLogoutHook } from '~/hooks'
import logoText from '~/assets/img/logo_text.png'

const authStore = useAuthStore()
const { mutateLogout } = useLogoutHook()

const isShowHeader = computed(() => {
  return router.currentRoute.value.name !== 'LoginView'
})
</script>
