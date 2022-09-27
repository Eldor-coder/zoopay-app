<template>
    <div class="container">
        <div class="row">
            <div class="col-3 col-sm-6 ads__item" v-for="ads of adslist" :key="ads._id">
                <ads-item :ads="ads"/>
            </div>
        </div>
    </div>
</template>

<script>
    import AdsItem from './AdsItem.vue'

    export default {
        components: {
            AdsItem
        },
        computed: {
            adslist() {
                return this.$store.getters.getAdsList
            }
        },
        created(){
            
        }
    }
</script>

<style>

</style>