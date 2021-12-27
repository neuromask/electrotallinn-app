<template>
  <section>
    <h2 class="m-0">Bot <strong>help</strong></h2>
    <h5 class="mb-4">Find out how to use bot, add points to map and products to market.</h5>
    <b-row>
      <b-col cols="12" lg="4" class="p-3">
        <b-card>
          <h3 class="font-weight-bold mb-0">
            <b-badge variant="warning" class="text-white">Bot</b-badge> Chat
          </h3>
          <hr>
          <BotButton />
          <h5 class="my-3">Start chat with bot using <strong>Telegram</strong> app on your phone.</h5>
          <b-img rounded="circle" :src="require('@/assets/img/bot-avatar.svg')"></b-img>
        </b-card>
      </b-col>
      <b-col cols="12" lg="8" class="p-3">
        <b-card>
          <h3 class="font-weight-bold mb-0">
            <b-badge variant="warning" class="text-white">Bot</b-badge> Commands
          </h3>
          <hr>
          <b-list-group>
            <b-list-group-item class="text-dark" variant="light"><kbd><strong>/sell</strong></kbd> - Sell product on market</b-list-group-item>
            <b-list-group-item class="text-dark" variant="light"><kbd><strong>/add</strong></kbd> - Add point to map</b-list-group-item>
            <b-list-group-item class="text-dark" variant="light"><kbd><strong>/map</strong></kbd> - Charging sockets map</b-list-group-item>
            <b-list-group-item class="text-dark" variant="light"><kbd><strong>/market</strong></kbd> - Market page</b-list-group-item>
            <b-list-group-item class="text-dark" variant="light"><kbd><strong>/weather</strong></kbd> - Weather forecast</b-list-group-item>
            <b-list-group-item class="text-dark" variant="light"><kbd><strong>/ali</strong></kbd> - Aliexpress links</b-list-group-item>
            <b-list-group-item class="text-dark" variant="light"><kbd><strong>/help</strong></kbd> - List of commands</b-list-group-item>
            <b-list-group-item class="text-dark" variant="light"><kbd><strong>/social</strong></kbd> - Social media links</b-list-group-item>
            <b-list-group-item class="text-dark" variant="light"><kbd><strong>/pic</strong></kbd> - Search for image</b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: "Map Help",
    };
  },
  name: "Map",
  props: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
// d-flex justify-content-center align-items-center
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
