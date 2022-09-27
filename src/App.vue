<template>
    <header-component/>
    <router-view/>
    <msg-item></msg-item>
    <footer-comp></footer-comp>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import MsgItem from '@/components/MsgItem'
import FooterComp from '@/components/FooterComp'

export default {
  components : {
    HeaderComponent,
    MsgItem,
    FooterComp
  }
}
</script>

<style lang="scss">
  @import './styles/main.scss';
  @import './styles/grid.scss';
</style>
