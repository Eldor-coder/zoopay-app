<template>
  <div class="home">
    <search-box/>
    <category-list/>
    <ads-list/>
  </div>
</template>

<script>
import CategoryList from '../components/CategoryList.vue'
import SearchBox from '../components/SearchBox.vue'
import AdsList from '../components/AdsList.vue'

export default {
  name: 'HomeView',
  components: {
    CategoryList,
    SearchBox,
    AdsList
  },
  data() {
    return {
      count : -12
    }
  },
  computed : {
    more(){
      return this.$store.getters.getMore
    }
  },
  watch : {
    $route(){
      this.count = -12
    }
  },
  methods: {
    bottomVisible(){
       const scrollY = window.scrollY;
       const visible = document.documentElement.clientHeight;
       const pageHeight = document.documentElement.scrollHeight - 50;
       const bottomOfPage = visible + scrollY >= pageHeight
       return bottomOfPage || pageHeight < visible;
    },
    getNext(){
      this.count +=12
      if(this.count > 36) {
          this.$store.dispatch('setMore')
      } else {
          this.$store.dispatch('setAdsList', this.count)
      }
    }
  },
  created(){
    this.count = -12
    this.getNext()
    this.$store.dispatch('setCategoryBtn',false)
    window.addEventListener('scroll', () => {
      if(this.bottomVisible() && this.more) {
        this.getNext()
      }
    })
  }
}
</script>
