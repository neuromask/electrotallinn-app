<template>
    <b-toast id="loginToast" variant="warning">
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline" v-b-toggle.sidebar-variant>
          <strong class="mr-auto">Notice!</strong>
        </div>
      </template>
      <template #default>
        <div class="d-flex flex-grow-1 align-items-baseline" v-b-toggle.sidebar-variant>
          <p class="mb-0">Login with Telegram to manage your profile and market products.</p>
        </div>
      </template>
    </b-toast>
</template>
<script>
export default {
  watch: {
    $route () {
     if (!this.$user.isLogged) this.$bvToast.show('loginToast')
    }
  }
}
</script>