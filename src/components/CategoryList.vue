<template>
  <div class="category">
      <div class="container">
          <ul class="category__list">
          <li v-for="(cat,index) of category" :key="cat._id">
              <router-link :to="`/category/${cat._id}`" class="category__link">
                <span 
                    :style="{backgroundColor : colors[index]}" 
                class="category__box">
                    <img  class="category__img" :src="`${uri}/${cat.img}`" alt="">
                </span>
                <span class="category__title">
                    {{cat.name}}
                </span>
              </router-link>

          </li>
      </ul>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    computed : {
        uri(){
            return this.$store.getters.getUri
        },
        category(){
            return this.$store.getters.getCategories
        },
        colors(){
            return this.$store.getters.getColors
        }
    },
    
}
</script>

<style lang="scss">
    @import '../styles/components/categorylist.scss';
</style>