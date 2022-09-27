<template>
    <div class="ads__box">
        <router-link :to="`/ads/${ads._id}`" class="ads__img" :style="{
            backgroundImage : 'url('+ getNormalImg(ads.img[0]) +')'
        }">
            <span class="ads__time">
                <img src="../assets/date.svg" alt="">
                {{getNormalDate(ads.createdAt)}}
            </span>
        </router-link>
        <div class="ads__info">
            <router-link :to="`/ads/${ads._id}`" class="ads__title">
                {{ads.title}}
            </router-link>

            <div class="ads__bottom">
                <div class="ads__left">
                    <span class="ads__price">
                        <img src="" alt="">
                        {{ads.price.length > 1 ? getNormalPrice(ads.price) : 'договорная цена'}}
                        <span v-show="ads.price.length > 1">
                            {{ads.currency == 0 ? 'сум' : '$'}}
                        </span>
                    </span>
                    <div class="ads__place">
                        <img src="../assets/location.svg" alt="">
                        {{ads.place}}
                    </div>
                </div>

                <button 
                    :class="{'ads__fav':true, 'fav': ads.fav}" 
                    @click="adsFav(ads._id)">
                    <img src="../assets/heart.svg" alt="heart">
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['ads'],
        methods: {
            adsFav(id){
                if(this.$cookies.isKey('zoofavs')) {
                    let favs = JSON.parse(this.$cookies.get('zoofavs'))
                    let favsIndex = favs.findIndex(fav => fav == id)
                    if(favsIndex == -1) {
                        favs.push(id)
                        this.$store.dispatch('setFav', {id, fav : true})
                        this.$store.dispatch('setMsg', {
                            text : 'Добавлено в избранные!',
                            class : 'success'
                        })
                    } else {
                        favs.splice(favsIndex, 1)
                        this.$store.dispatch('setFav', {id, fav : false})
                        this.$store.dispatch('setMsg', {
                            text : 'Удалено из избранных!',
                            class : 'warning'
                        })
                    }
                    this.$cookies.set('zoofavs', JSON.stringify(favs))
                } else {
                    this.$cookies.set('zoofavs', JSON.stringify([id]))
                    this.$store.dispatch('setMsg', {
                        text : 'Добавлено в избранные!',
                        class : 'success'
                    })
                }

            },
            getNormalImg(img){
                if(img){
                    return `${this.uri}/${img}`
                } else {
                    return require('../assets/zoopay.png')
                }
            },
            getNormalDate(date) {
                let dd = new Date(date)
                return `${dd.getDay()}-${dd.getMonth()+1}-${dd.getFullYear()} ${dd.getHours()}:${dd.getSeconds()}`
            },
            getNormalPrice(val) {
                let val1 = new Number(val)
                return val1.toLocaleString('ru-RU')
            }
        },
        computed: {
            uri() {
                return this.$store.getters.getUri
            }
        },
        created(){
            // this.$store.dispatch('setCategoryBtn', true)
            // this.$store.dispatch('setMore')
        }
    }
</script>

<style lang="scss">
    @import '../styles/components/adsitem.scss';
</style>