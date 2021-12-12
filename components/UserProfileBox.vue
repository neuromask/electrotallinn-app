<template>
    <div v-if="$user.isLogged">
        <b-alert show variant="primary">
            <div class="d-flex justify-content-between align-items-center">
                <b-avatar :to="`/users/${$user.uin}`" :src="$user.photoUrl" class="profile shadow-sm" size="5rem"></b-avatar>
                <div class="ml-3 w-100">
                    <h5 class="mb-1">{{ $user.firstName }}</h5>
                    <nuxt-link :to="`/users/${$user.uin}`"><h5 class="mb-0"><b-icon icon="person-bounding-box" /> Profile</h5></nuxt-link>
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
