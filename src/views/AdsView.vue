<template>
  <div class="ads">
    <div class="container">
        <div class="row">
            <div class="col-8 col-sm-12">
                <Splide :options="{ 
                    type : 'loop',
                    rewind : true,
                    wheel : true,
                    live : true,
                    perPage : 1,
                    perMove : 1,
                    autoPlay : true,
                    interval : 4000
                }" class="ads__slider">
                    <SplideSlide 
                        v-for="img of ads.photo" 
                        :key="img"
                        :style = "{
                            backgroundImage : `url(${uri}/${img})`
                        }"
                        class="ads__slide"
                    >
                    </SplideSlide>
                </Splide>
                <div class="ads__desc">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="ads__created">
                            Опубликовано {{getNormalDate(ads.createdAt)}}
                        </div>
                        <button 
                            :class="{'ads__fav':true, 'fav': ads.fav}" 
                            @click="adsFav(ads._id)">
                            <img src="../assets/heart.svg" alt="heart">
                        </button>
                    </div>
                    <div class="ads__stitle">
                        {{ads.title}}
                    </div>
                    <div class="ads__place">
                        <img src="../assets/location.svg" alt="">
                        {{ads.place}}
                    </div>
                    <div class="ads__bprice">
                        {{ads.price.length > 1 ? getNormalPrice(ads.price) : 'договорная цена'}}
                        <span v-show="ads.price.length > 1">
                            {{ads.currency == 0 ? 'сум' : '$'}}
                        </span>
                    </div>
                    <div class="ads__btitle">ОПИСАНИЕ</div>
                    <div class="ads__text d-flex justify-content-between align-items-center">
                        {{ads.text}}
                    </div>
                    <div class="ads__bbottom">
                        <span>ID: {{ads._id}}</span>
                        <span>Просмотров: {{ads.views}}</span>
                    </div>
                </div>
            </div>
            <div class="col-4 col-sm-12">
                <div class="ads__sticky">
                    <div class="ads__binfo">
                        <div class="ads__btitle">
                            ПОЛЬЗОВАТЕЛЬ
                        </div>
                        <div class="ads__name">
                            {{ads.userId.name}}
                        </div>
                        <div class="ads__btns">
                            <a href="#" class="ads__phone">
                                <img src="../assets/call.svg" alt="">
                                Позвонить
                            </a>
                            <a href="#msg" class="ads__msg">
                                <img src="../assets/message.svg" alt="">
                                Hаписать
                            </a>
                        </div>
                    </div>
                    <div class="ads__more">
                        <div class="ads__btitle mb-2">
                            Все объявления автора
                        </div>
                        <Splide :options="{ 
                            perPage : 1,
                            type : 'loop',
                            perMove : 1,
                            pagination :false,
                            autoPlay : true,
                            rewind : true,
                            wheel : true,
                            live : true,
                            interval : 4000
                        }">
                            <SplideSlide 
                                v-for="item of userothers" 
                                :key="item._id"
                            >
                                <ads-item :ads="item"></ads-item>
                            </SplideSlide>
                        </Splide>
                    </div>
                </div>
                
            </div>
        </div>
        
    </div>
        <div class="ads__others">
            <div class="container">

                <div class="ads__btitle">
                    Похожие объявления
                </div>
                <Splide :options="{ 
                    perPage : 4,
                    gap : 15,
                    type : 'loop',
                    perMove : 1,
                    pagination :false,
                    autoPlay : true,
                    rewind : true,
                    wheel : true,
                    live : true,
                    interval : 4000,
                    breakpoints : {
                        600 : {
                            perPage : 2
                        }
                    }
                }"
                >
                    <SplideSlide 
                        v-for="item of others" 
                        :key="item._id"
                        
                    >
                        <ads-item :ads="item"></ads-item>
                    </SplideSlide>
                </Splide>
            </div>
        </div>
  </div>
</template>

<script>
import AdsItem from '@/components/AdsItem'
import { Splide, SplideSlide } from '@splidejs/vue-splide';

export default {
    components: {
        Splide,
        SplideSlide,
        AdsItem
    },
    data() {
        return {
            id : this.$route.params.id
        }
    },
    watch : {
        $route(to){
            this.$store.dispatch('setCategoryBtn', true)
           this.$store.dispatch('getAds', to.params.id)
           window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    },
    methods: {
        adsFav(id){
            if(this.$cookies.isKey('zoofavs')) {
                let favs = JSON.parse(this.$cookies.get('zoofavs'))
                let favsIndex = favs.findIndex(fav => fav == id)
                if(favsIndex == -1) {
                    favs.push(id)
                    this.ads.fav = true
                    this.$store.dispatch('setMsg', {
                        text : 'Добавлено в избранные!',
                        class : 'success'
                    })
                } else {
                    favs.splice(favsIndex, 1)
                    this.ads.fav = false
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
    computed : {
        ads(){
            return this.$store.getters.getAds
        },
        others(){
            return this.$store.getters.getOthers
        },
        userothers(){
            return this.$store.getters.getUserOthers
        },
        uri(){
            return this.$store.getters.getUri
        }
    },
    created(){
        this.$store.dispatch('getAds', this.id)
        this.$store.dispatch('clear')
        this.$store.dispatch('setMore')
    }
}
</script>

<style lang="scss">
    @import '@splidejs/vue-splide/css';
    @import '../styles/components/ads.scss';
</style>