import axios from "axios";
import { useCookies } from "vue3-cookies";
const {cookies} = useCookies();

const userStore = {
    state : {
        URI : 'https://zoopay.5f.uz',
       user : {},
       authToggle : false,
       check : true,
       
    },
    getters : {
       getUser(state) {
        return state.user
       },
       getAuthToggle(state) {
        return state.authToggle
       },
       getCheck(state){
        return state.check
       }
    },
    mutations : {
       setUser(state,payload) {
        state.user = payload
       },
       setAuthToggle(state,payload){
            state.authToggle = payload
       },
       setCheck(state, payload){
        state.check = payload
       }
    },
    actions : {
        setCheck(context,payload){
            context.commit('setCheck',payload)
        },
        tokenCheck(context,payload) {
            return axios.post(`${context.state.URI}/api/usercheck`, payload)
        },
        reg(context,payload) {
            axios.post(`${context.state.URI}/api/userreg/`, payload)
            .then(res => { 
                if(res.data.msg == 'ok') {
                    context.dispatch('setMsg', {
                        text : 'Успешно',
                        class : 'success'
                    })
                    cookies.set('zoouser', res.data.data)
                    context.commit('setAuthToggle', false)
                }
             }) 
        },
        sms(context,payload) {
            axios.post(`${context.state.URI}/api/sms/`, payload)
            .then(res => { 
                console.log(res.data);
             })
        },
        checkUser(context,payload){
          return  axios.post(`${context.state.URI}/api/checkuser/`, payload)
        },
        login(context,payload) {
          return  axios.post(`${context.state.URI}/api/userlogin/`, payload)
            
        },
        setAuthToggle(context,payload) {
            context.commit('setAuthToggle', payload)
        }
    }
}

export default userStore