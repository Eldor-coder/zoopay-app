import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSplide from '@splidejs/vue-splide';
import VueCookies from 'vue3-cookies'
import Maska from 'maska'


createApp(App)
.use(store)
.use(router)
.use(VueCookies, {
    expireTimes: "10d",
    path: "/",
    secure: true,
    sameSite: "None"
})
.use(Maska)
.use( VueSplide )
.mount('#app')
