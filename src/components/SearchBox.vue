<template>
  <div class="search">
    <div class="container">
        <div class="search__form">
            <input 
                type="text" 
                class="search__input" 
                placeholder="Поиск..."
                v-model="title"
                @input="searcher()"
            >
            <button class="search__btn">
                <img src="@/assets/search.svg" alt="search">
            </button>
            <div class="search__result" v-show="results.length > 0">
                <router-link :to="`/ads/${res._id}`" v-for="res of results" :key="res._id">
                    <span class="search__image" :style="{
                        backgroundImage : 'url('+`${uri}/${res.photo}`+')'
                    }">
                    </span>
                    <span class="search__title">
                        {{res.title}}
                    </span>
                    <span class="search__price">
                        {{res.price == 0 ? 'договорная цена' : res.price}} 
                        <span v-show="res.price != 0">
                            {{res.currency == 1 ? '$' : 'сум'}}
                        </span>
                    </span>
                </router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            title : ''
        }
    },
    computed :{
       results (){
           return this.$store.getters.getResults
       },
       uri(){
           return this.$store.getters.getUri
       }
    },
    methods: {
        searcher(){
            if(this.title.length > 0) {
                this.$store.dispatch('getResults',this.title)
            } else {
                this.$store.dispatch('clear')
            }
        }
    },
}
</script>

<style lang="scss">
    @import '../styles/components/searchbox.scss';
</style>