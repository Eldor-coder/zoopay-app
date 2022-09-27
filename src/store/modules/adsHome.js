import axios from 'axios'
import { useCookies } from "vue3-cookies";
const {cookies} = useCookies();

const adshome = {
    state : () => ({
        adslist : [],
        uri : 'https://zoopay.5f.uz',
        more : true
    }),
    getters : {
        getAdsList(state) {
            return state.adslist
        },
        getMore(state){
            return state.more
        }
    },
    mutations : {
        setMore(state, payload){
            state.more = payload
        },
        setAdsList(state,payload) {
            if(cookies.isKey('zoofavs')){
                let favs = JSON.parse(cookies.get('zoofavs'))
                payload = payload.map(ads => {
                ads.fav = favs.includes(ads._id)
                return ads
                })
            }   
            state.adslist = payload
        },
        pushAdsList(state,payload){
            state.adslist.push(payload)
        },
        setFav(state, payload) {
            let index = state.adslist.findIndex(ads => ads._id == payload.id)
            state.adslist[index].fav = payload.fav
        }
    },
    actions : {
        getFavAds(context, payload){
            axios.post(`${context.state.uri}/api/ids`, {favs: payload})
            .then(res => {
                if(res.data !== 'error'){
                    context.commit('setAdsList',res.data)
                }
            })
        },
        setFav(context, payload) {
            context.commit('setFav', payload)
        },
        getAdsBySub(context,payload){
            axios.get(`${context.state.uri}/subcategory/get/${payload}`)
            .then(res => {
                context.commit('setAdsList',res.data)
            })
        },
        getAdsByCat(context,payload){
            axios.get(`${context.state.uri}/ads/getbycat/${payload}`)
            .then(res => {
                context.commit('setAdsList',res.data)
            })
        },
        setMore(context) {
            context.commit('setMore', false)
        },
        setAdsList(context, payload) {
            context.commit('setMore', false)
            axios.get(`${context.state.uri}/ads/getnext/${payload}`)
            .then(res => {
                if(payload == 0) {
                    context.commit('setAdsList', [])
                }
                if(res.data.length > 0) {
                    context.commit('setAdsList', [...context.state.adslist,...res.data])
                    context.commit('setMore', true)
                } else {
                    context.commit('setMore', false)
                }
            })
        }
    }
    
}

export default adshome