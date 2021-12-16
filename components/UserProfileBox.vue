<template>
    <div v-if="$user.isLogged">
        <b-alert show variant="primary" class="bg-pat">
            <div class="d-flex justify-content-between align-items-center">
                <b-avatar :to="localePath(`/users/${$user.uin}`)" :src="$user.photoUrl" class="profile shadow-sm" size="5.5rem"></b-avatar>
                <div class="ml-3 w-100">
                    <h5 class="mb-1"><strong class="text-dark">{{ $user.firstName }}</strong></h5>
                    <nuxt-link :to="localePath(`/users/${$user.uin}`)"><b-button size="sm" variant="primary" class="profile-btn"><b-icon icon="person-bounding-box" /> {{ $t('nav.myProfile') }}</b-button></nuxt-link>
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
.bg-pat {
    background-image: url('~/assets/img/pattern-icons.png');
}
.profile-btn {
    white-space: nowrap;
}
</style>
