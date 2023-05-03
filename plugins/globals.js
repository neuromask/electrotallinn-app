import Vue from 'vue'

export default ({ app }, inject) => {
    inject('user', Vue.observable({
        isLogged: false,
        firstName: null,
        uin: null,
        photoUrl: null,
        username: null,
        id: null,
        balance: null,
        role: null
    }))
    inject('map', Vue.observable({
        loaded: false,
    }))
    inject('locationTypes', Vue.observable([
        {value: 'CHARGE', text: 'Charge'},
        {value: 'REPAIR', text: 'Repair'},
        {value: 'AIR', text: 'Air'},
        {value: 'WATER', text: 'Water'},
        {value: 'PINGPONG', text: 'PingPong'}
    ]))
    inject('locationTypesIcons', Vue.observable([
        {value: 'CHARGE', text: '⚡'},
        {value: 'REPAIR', text: '🛠️'},
        {value: 'AIR', text: '💨'},
        {value: 'WATER', text: '💦'},
        {value: 'PINGPONG', text: '🏓'}
    ]))
    inject('locationIcons', Vue.observable({
        CHARGE: require("@/assets/icons/locations/icon-charge.svg"),
        REPAIR: require('@/assets/icons/locations/icon-repair.svg'),
        AIR: require('@/assets/icons/locations/icon-air.svg'),
        WATER: require('@/assets/icons/locations/icon-water.svg'),
        PINGPONG: require('@/assets/icons/locations/icon-pingpong.svg')
    }))
    inject('productCategories', Vue.observable(['EQUIPMENT','TRANSPORT','SPARE_PARTS','ACCESSORIES','OTHER']))
}
