<template>
  <section>
    <h2 class="m-0">Bot <strong>help</strong></h2>
    <h5 class="mb-4">Find out how to use bot, add points to map and products to market.</h5>
    <b-row>
      <b-col cols="12" lg="4" class="p-3 mb-3">
        <b-card>
          <h3 class="font-weight-bold">
            <b-badge variant="warning" class="text-white">Bot</b-badge> Chat
          </h3>
          <hr />
          <BotButton />
          <h5 class="my-3">Start chat with bot using <strong>Telegram</strong> app on your phone.</h5>
          <b-img rounded="circle" :src="require('@/assets/img/bot-avatar.svg')"></b-img>
        </b-card>
      </b-col>
      <b-col cols="12" lg="8" class="p-3 mb-3">
        <b-card>
          <h3 class="font-weight-bold">
            <b-badge variant="warning" class="text-white">Bot</b-badge> Commands
          </h3>
          <hr />
          <h5 class="my-3">Start chat with bot using <strong>Telegram</strong> app on your phone.</h5>
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
