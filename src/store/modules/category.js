import axios from 'axios'

const category = {
    state: () => ({
        URI: 'https://zoopay.5f.uz',
        categories: [],
        categoryBtn: false,
        oneCategory: {
            category: {
                name: ''
            },
            subcategory: []
        },
        colors: ['#DCED09', '#FFAE03', '#06BEE1', '#B4E1FF', '#41337A',
            '#E8998D', '#A1683A', '#6C9A8B', '#6F73D2', '#D84727', '#3454D1',
            '#E39774', '#5C9EAD', '#E67F0D', '#A3C9A8', '#50808E'
        ]
    }),
    getters: {
        getColors(state) {
            return state.colors
        },
        getCategories(state) {
            return state.categories
        },
        getCategoryBtn(state) {
            return state.categoryBtn
        },
        getCat(state) {
            return state.oneCategory
        }
    },
    mutations: {
        allCategories(state, payload) {
            state.categories = payload
        },
        setCategoryBtn(state, payload) {
            state.categoryBtn = payload
        },
        setCat(state, payload) {
            state.oneCategory = payload
        }
    },
    actions: {
        setCategoryBtn(context, payload) {
            context.commit('setCategoryBtn', payload)
        },
        setCat(context, payload) {
            axios.get(`${context.state.URI}/category/get/${payload}`)
                .then(res => {
                    context.commit('setCat', res.data)
                })
        },
        allCategories(context) {
            axios.get(`${context.state.URI}/category/catall`)
                .then(res => {
                    context.commit('allCategories', res.data)
                })
        }
    },
    modules: {}
}

export default category