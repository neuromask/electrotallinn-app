import Vue from 'vue'

export default ({ app }, inject) => {
  inject('user', Vue.observable({
    firstName: null,
    uin: null,
    photoUrl: null,
    username: null
  }))
}
