<template>
  <header class="header">
    <div class="header__top">
      <div class="container">
        <ul class="header__menu">
          <li>
            <router-link to="/">О нас</router-link>
          </li>
          <li>
            <router-link to="/">Содруничество</router-link>
          </li>
          <li>
            <router-link to="/">Контакты</router-link>
          </li>
        </ul>
        <ul class="header__socials">
          <li>
            <a href="#" target="_blank">
              <img src="@/assets/facebook.svg" alt="facebook" />
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              <img src="@/assets/telegram.svg" alt="telegram" />
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              <img src="@/assets/youtube.svg" alt="youtube" />
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              <img src="@/assets/instagram.svg" alt="instagram" />
            </a>
          </li>
        </ul>
        <a href="tel:9989712004446" class="header__phone">+998971 200 44 46</a>
      </div>
    </div>
  </header>
  <div class="header__bottom">
    <div class="container">
      <router-link to="/" class="header__logo">
        <img src="@/assets/logo.png" alt="logo" /> zoopay.uz
      </router-link>
      <button v-show="categoryBtn" class="header__catbtn" @click="toggle = !toggle">
        <span></span>
        Категории
      </button>

      <div class="header__links">
        <router-link to="/" class="header__link">
          <img src="@/assets/chat.svg" alt="chat" />
        </router-link>
        <router-link to="/favs" class="header__link">
          <img src="@/assets/heart.svg" alt="heart" />
        </router-link>
        <button v-if="check" class="header__link" @click="$store.dispatch('setAuthToggle', true)">
          <img src="@/assets/account.svg" alt="account" />
        </button>
        <router-link v-else to="/favs" class="header__link">
          <img src="@/assets/account.svg" alt="account" />
        </router-link>
      </div>
      <router-link to="/" class="header__add"> Добавить объявление </router-link>
    </div>
  </div>
  <div :class="{ header__cat: true, active: toggle }">
    <router-link
      v-for="(cat, index) of categories"
      :key="cat._id"
      :to="`/category/${cat._id}`"
      class="category__link"
      @click="toggle = !toggle"
    >
      <span :style="{ backgroundColor: colors[index] }" class="category__box">
        <img class="category__img" :src="`${uri}/${cat.img}`" alt="" />
      </span>
      <span class="category__title">
        {{ cat.name }}
      </span>
    </router-link>
  </div>
  <auth-item></auth-item>
</template>

<script>
import authItem from "@/components/auth/authItem";

export default {
  components: {
    authItem,
  },
  data() {
    return {
      
      toggle: false,
      authToggle: false,
    };
  },
  computed: {
    check(){
      return this.$store.getters.getCheck;
    },
    colors() {
      return this.$store.getters.getColors;
    },
    uri() {
      return this.$store.getters.getUri;
    },
    categoryBtn() {
      return this.$store.getters.getCategoryBtn;
    },
    categories() {
      return this.$store.getters.getCategories;
    },
  },
  created() {
    this.$store.dispatch("allCategories");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 173) {
        document.querySelector(".header__bottom").classList.add("mini");
      } else {
        document.querySelector(".header__bottom").classList.remove("mini");
      }
    });
  },
  beforeCreate(){
    if(this.$cookies.isKey('zoouser')) {
      let user = this.$cookies('zoouser')
      this.$store.dispatch('tokenCheck', user) 
      .then(res => {
        if(res.data == 'yes') {
            this.$store.dispatch('setCheck', false) 
        } else {
          this.$store.dispatch('setCheck', true)
        }
      })
    }
  },
};
</script>

<style lang="scss">
@import "../styles/components/header.scss";
</style>
