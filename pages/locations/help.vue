<template>
  <section>
    <h2 class="m-0">How to <strong>add locations</strong> to the map.</h2>
    <h5>Follow easy three steps to start</h5>
    <hr/>
    <b-card-group deck>

    <b-card img-alt="Image" img-top>
        <h3 class="font-weight-bold"><b-badge variant="warning" class="text-white">1</b-badge> Telegram App</h3>
        <hr/>
        <b-card-img :src="require('@/assets/img/step-1.jpg')"></b-card-img>
        <b-card-text class="mt-4">
        <h5>Install <strong>Telegram</strong> app on your phone.</h5> 
        </b-card-text>
        <template #footer>
        <b-button href="https://telegram.org/" variant="primary">Get Telegram</b-button>
        </template>
    </b-card>

    <b-card img-alt="Image" img-top>
        <h3 class="font-weight-bold"><b-badge variant="warning" class="text-white">2</b-badge> Chat with Bot</h3>
        <hr/>
        <b-card-img :src="require('@/assets/img/step-2.jpg')"></b-card-img>
        <b-card-text class="mt-4">
        <h5>Start <strong>private chat</strong> with ElectroBot in Telegram.</h5>
        </b-card-text>
        <template #footer>
        <b-button href="https://t.me/electrotallinnbot" variant="primary">Start chat</b-button>
        </template>
    </b-card>

    <b-card img-alt="Image" img-top>
        <h3 class="font-weight-bold"><b-badge variant="warning" class="text-white">3</b-badge> Type command</h3>
        <hr/>
        <b-card-img :src="require('@/assets/img/step-3.jpg')"></b-card-img>
        <b-card-text class="mt-4">
        <h5>Type <strong>/add</strong> command in chat with bot and follow instructions.</h5>
        </b-card-text>
        <template #footer>
        <b-button href="https://t.me/electrotallinnbot" variant="primary">Start chat</b-button>
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
