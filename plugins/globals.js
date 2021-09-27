import Vue from 'vue'

export default ({ app }, inject) => {
  inject('user', Vue.observable({ 
        isLogged: false,
        first_name: null,
        uin: null,
        photo_url: null,
        username: null,
        id: null,
   }))
}