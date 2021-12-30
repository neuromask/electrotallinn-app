<template>
    <div v-if="$user.isLogged">
        <Game />
    </div>
    <div class="alertBox mx-auto mt-5" v-else>
        <b-alert variant="warning" show>
            <h3 class="alert-heading">{{ $t('game.warnTitle') }}</h3>
            <h5>{{ $t('game.available') }}</h5>

            <div class="d-flex w-100 justify-content-start align-items-center">
                <b-button class="mr-3" size="lg" v-b-toggle.sidebar-variant variant="primary"><b-icon icon="list" /></b-button>
                <h5 class="font-weight-bold mb-0">{{ $t('game.warning') }}</h5>
            </div>
        </b-alert>
      </div>
</template>
<script>
export default {

}
</script>
<style>
.alertBox {
    max-width: 512px;
}
</style>