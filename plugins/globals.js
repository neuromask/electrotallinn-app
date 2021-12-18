import Vue from 'vue'

export default ({ app }, inject) => {
    inject('user', Vue.observable({
        isLogged: false,
        firstName: null,
        uin: null,
        photoUrl: null,
        username: null,
        id: null,
        role: null
    }))
    inject('map', Vue.observable({
        loaded: false,
    }))
    inject('locationTypes', Vue.observable([
        {value: 'CHARGE', text: 'Charge'},
        {value: 'REPAIR', text: 'Repair'},
        {value: 'AIR', text: 'Air'},
        {value: 'WATER', text: 'Water'}
    ]))
    inject('locationIcons', Vue.observable({
        CHARGE: require("@/assets/img/icon/icon-charge.svg"),
        REPAIR: require('@/assets/img/icon/icon-repair.svg'),
        AIR: require('@/assets/img/icon/icon-air.svg'),
        WATER: require('@/assets/img/icon/icon-water.svg')
    }))
    inject('productCategories', Vue.observable(['EQUIPMENT','TRANSPORT','SPARE_PARTS','ACCESSORIES','OTHER']))
}
