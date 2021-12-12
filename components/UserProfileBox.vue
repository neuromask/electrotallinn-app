<template>
    <div>
        <div v-if="$user.isLogged">
            <b-alert show variant="primary">
                <div class="d-flex justify-content-left align-items-center">
                    <b-img class="float-left" rounded="circle" width="80" height="80" :src="$user.photoUrl" />
                    <div class="ml-3">
                    <h5 class="m-0">{{ $user.firstName }}</h5>
                    <nuxt-link :to="`/users/${$user.uin}`"><b-icon icon="person-bounding-box" /> Profile</nuxt-link>
                    </div>
                </div>
            </b-alert>
          </div>
    </div>
</template>
