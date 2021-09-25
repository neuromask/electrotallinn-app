<template>
  <section>
    <h2 class="m-0">How to <strong>add locations</strong> to the map.</h2>
    <h5 class="mb-5">Follow easy three steps to start</h5>
    <b-card-group deck>
      <b-card>
          <h3 class="font-weight-bold"><b-badge variant="warning" class="text-white">1</b-badge> Telegram App</h3>
          <hr/>
          <h5 class="mb-4">Install <strong>Telegram</strong> app on your phone.</h5> 
          <b-card-img :src="require('@/assets/img/step-1.jpg')"></b-card-img>
          <template #footer>
            <div class="text-center">
              <b-button href="https://telegram.org/" variant="primary">Get Telegram</b-button>
            </div>
          </template>
      </b-card>

      <b-card>
          <h3 class="font-weight-bold"><b-badge variant="warning" class="text-white">2</b-badge> Chat with Bot</h3>
          <hr/>
          <h5 class="mb-4">Start <strong>private chat</strong> with ElectroBot in Telegram.</h5>
          <b-card-img :src="require('@/assets/img/step-2.jpg')"></b-card-img>
          <template #footer>
            <div class="text-center">
              <b-button href="https://t.me/electrotallinnbot" variant="primary">Start chat</b-button>
            </div>
          </template>
      </b-card>

      <b-card>
          <h3 class="font-weight-bold"><b-badge variant="warning" class="text-white">3</b-badge> Type command</h3>
          <hr/>
          <h5 class="mb-4">Type <strong>/add</strong> command to bot and follow instructions.</h5>
          <b-card-img :src="require('@/assets/img/step-3.jpg')" bottom></b-card-img>
          <template #footer>
            <div class="text-center">
              <b-button href="https://t.me/electrotallinnbot" right variant="primary">Start chat</b-button>
            </div>
          </template>
      </b-card>
    </b-card-group>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Map',
  props: {},
  data() {
    return {
      BACKEND_BASE: 'https://etmap.nuforms.com',
      bgImages: [
        require("@/assets/img/pattern-icons.png"),
        require("@/assets/img/top.jpg"),
        require("@/assets/img/tallinn.svg"),
        require("@/assets/img/mol.svg")
      ],
    }
  },
  mounted () {
  },
  methods: {

  }
}
// d-flex justify-content-center align-items-center
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
