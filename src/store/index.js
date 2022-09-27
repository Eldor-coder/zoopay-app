import { createStore } from 'vuex'
import category from './modules/category'
import search from './modules/search'
import adshome from './modules/adsHome'
import ads from './modules/ads'
import message from './modules/msg'
import userStore from './modules/user'

export default createStore({
  state: {
    URI : 'https://zoopay.5f.uz'
  },
  getters: {
    getUri(state){
      return state.URI
    }
  },
  mutations: {

  },
  actions: {
    
  },
  modules: {
    category,
    search,
    adshome,
    ads,
    message,
    userStore
  }
})
