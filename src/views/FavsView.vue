<template>
    <search-box />
    <div class="container">
        <div class="category__btitle">
            Избранное
        </div>
    </div>
  <ads-list />
</template>

<script>
import AdsList from '@/components/AdsList'
import SearchBox from '@/components/SearchBox'

export default {
    components: {
        AdsList,
        SearchBox
    },
    created(){
        if(this.$cookies.isKey('zoofavs')) {
            let favs = JSON.parse(this.$cookies.get('zoofavs'))
            this.$store.dispatch('getFavAds', favs)
        }
        this.$store.dispatch('setMore')
    }
}
</script>

<style lang="scss" scoped>

</style>