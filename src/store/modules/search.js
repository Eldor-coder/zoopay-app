import axios from "axios";

const search = {
    state : {
        URI : 'https://zoopay.5f.uz',
        results : []
    },
    getters : {
        getResults(state){
            return state.results 
        }
    },
    mutations : {
        getResults(state,payload){
            state.results = payload
        }
    },
    actions : {
        getResults(context,payload){
            axios.get(`${context.state.URI}/ads/search/${payload}`)
            .then(res => {
                if(res.data !== 'error') {
                    context.commit('getResults', res.data)
                } else {
                    context.commit('getResults', [])
                }
            })
        },
        clear(context){
            context.commit('getResults', [])
        }
    }
}

export default search