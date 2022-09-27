import axios from "axios";
import { useCookies } from "vue3-cookies";
const {cookies} = useCookies();

const ads = {
    state : () => ({
        URI : 'https://zoopay.5f.uz',
        ads : {
            photo : [],
            title :'',
            name : '',
            views : 0,
            price : 0,
            userId : {
                name : '',
                phone : ''
            }
        },
        others : [],
        userothers : []
    }),
    getters : {
        getAds(state) {
            return state.ads
        },
        getOthers(state) {
            return state.others
        },
        getUserOthers(state) {
            return state.userothers
        },
    },
    mutations : {
        setAds(state,payload) {
            if(cookies.isKey('zoofavs')){
                let favs = JSON.parse(cookies.get('zoofavs'))
                payload.fav = favs.includes(payload._id)
            }   
            state.ads = payload
        },
        setOthers(state,payload) {
            state.others = payload
        },
        setUserOthers(state,payload) {
            state.userothers = payload
        }
    },
    
    actions : {
        getAds(context,payload){
            axios.get(`${context.state.URI}/ads/get/${payload}`)
            .then(res => {
                context.commit('setAds', res.data.ads)
                context.commit('setOthers', res.data.others)
                context.commit('setUserOthers', res.data.userothers)
            })
        }
    }
}

export default ads