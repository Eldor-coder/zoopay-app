const message = {
    state : {
     msg: {
        text : '',
        class : ''
     }
    },
    getters : {
       getMsg(state) {
        return state.msg
       }
    },
    mutations : {
        setMsg(state, payload) {
            state.msg = payload
            setTimeout(() => {
                state.msg = {}
            }, 3000)
        }
    },
    actions : {
        setMsg(context, payload) {
            context.commit('setMsg', payload)
        }
    }
}

export default message