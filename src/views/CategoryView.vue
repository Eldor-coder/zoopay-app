<template>
  <search-box />
  <div class="container">
    <div class="category__btitle">
      {{cat.category.name}} {{subcategory}}
    </div>
    <ul class="category__subs">
      <li v-for="subcategory of cat.subcategory" :key="subcategory._id">
        <router-link :to="`/category/${id}?subcategory=${subcategory._id}`"
          :class="{'active' : sub == subcategory._id}">
          {{subcategory.name}}
        </router-link>
      </li>
    </ul>
  </div>
  <ads-list />

</template>

<script>
  import SearchBox from '../components/SearchBox.vue'
  import AdsList from '../components/AdsList.vue'

  export default {
    components: {
      SearchBox,
      AdsList
    },
    data() {
      return {
        id: this.$route.params.id,
        sub: this.$route.query.subcategory
      }
    },
    watch: {
      $route(to, from) {
        if (to.params.id !== from.params.id) {
          this.id = to.params.id
          this.$store.dispatch('getAdsByCat', this.id)
          this.$store.dispatch('setCat', this.id)
        }
        if (to.query.subcategory !== from.query.subcategory) {
          this.sub = to.query.subcategory
          this.$store.dispatch('getAdsBySub', this.sub)
        }
        this.$store.dispatch('setCategoryBtn', true)

      }
    },
    computed: {
      cat() {
        return this.$store.getters.getCat
      },
      subcategory() {
        let index = this.cat.subcategory.findIndex(subcat => subcat._id == this.sub)
        if (index !== -1) {
          return '|' + this.cat.subcategory[index].name
        } else {
          return ''
        }
      }

    },
    created() {
      this.$store.dispatch('setCategoryBtn', true)
      this.$store.dispatch('getAdsByCat', this.id)
      this.$store.dispatch('setCat', this.id)
    },
  }
</script>

<style lang="scss">
  @import '../styles/components/categorylist.scss'
</style>