<template>
  <div class="content">
      <div class="row-1">
        <div>
          <h6>User ID</h6>
          <p>{{users._id}}</p>
        </div>
        <div>
          <h6>Name</h6>
          <p>{{users.name}}</p>
        </div>
        <div>
          <h6>Age</h6>
          <p>{{users.age}}</p>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: {}
    }
  },
  created () {
    this.getUsersById()
  },
  methods: {
    async getUsersById () {
      const userIdPromise = await fetch(`https://sample.api.com/users/id/${this.$route.params.users}`)
      const userIdJson = userIdPromise.json()
      userIdJson.then((res) => {
        this.users = res.data
      })
    }
  }
}
</script>