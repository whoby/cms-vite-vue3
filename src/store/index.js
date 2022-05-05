import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state: {
        userName: '',
        menuList: [],
        breadNames: [],
        provinces: []
    },
    getters: {},
    mutations: {
        setUserName(state, data) {
            state.userName = data
        },
        setMenuList(state, data) {
            state.menuList = data
        },
        setBreadNames(state, data) {
            state.breadNames = data
        },
        setProvinces(state, data) {
            state.provinces = data
        }
    },
    actions: {},
    modules: {},
    plugins: [createPersistedState()]
})
