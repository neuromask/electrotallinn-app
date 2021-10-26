import Vue from 'vue'

export default ({ app }, inject) => {
  inject('user', Vue.observable({ 
    isLogged: false,
    firstName: null,
    uin: null,
    photoUrl: null,
    username: null,
    id: null,
  }))
  inject('map', Vue.observable({ 
    loaded: false,
  }))
}