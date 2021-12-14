<i18n lang="yaml">
  en:
    hello: "Hey"
    your-profile: "Your profile"
  ru:
    hello: "Привет"
    your-profile: "Ваш профиль"
</i18n>
<template>
    <div v-if="$user.isLogged">
        <b-alert show variant="primary">
            <div class="d-flex justify-content-between align-items-center">
                <b-avatar :to="localePath(`/users/${$user.uin}`)" :src="$user.photoUrl" class="profile shadow-sm" size="5.5rem"></b-avatar>
                <div class="ml-3 w-100">
                    <h5 class="mb-0">{{ $t('hello') }},</h5>
                    <h5 class="mb-1"><strong class="text-dark">{{ $user.firstName }}</strong></h5>
                    <nuxt-link :to="localePath(`/users/${$user.uin}`)"><b-button size="sm" variant="primary"><b-icon icon="person-bounding-box" /> {{ $t('your-profile') }}</b-button></nuxt-link>
                </div>
            </div>
        </b-alert>
        </div>
</template>
<style scoped>
.profile {
    padding: 0.25rem;
    background-color: #ffffff;
    border: 1px solid #dee2e6;
}
.profile:hover {
    background-color: #ffffff;
}
</style>
