<template>
  <div class="user">
    <div class="container">
        <h1 class="user__title">Профиль</h1>
        <div class="row">
            <div class="user__left">
                <ul class="user__menu">
                    <li class="user__item">
                        <router-link to="/user/allads">
                            Список объявления
                        </router-link>
                    </li>
                    <li class="user__item">
                        <router-link to="/user/settings">
                            Настройки
                        </router-link>
                    </li>
                    
                </ul>
            </div>
            <div class="user__right">
                <router-view></router-view>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    beforeCreate(){
    if(this.$cookies.isKey('zoouser')) {
      let user = this.$cookies('zoouser')
      this.$store.dispatch('tokenCheck', user) 
      .then(res => {
        if(res.data == 'yes') {
            this.$store.dispatch('setCheck', false) 
        } else {
          this.$store.dispatch('setCheck', true)
          this.$store.dispatch("setMsg", {
            text: "Ваша сессия закончена ! Авторизуйтесь заново",
            class: "warning",
          });
          this.$router.push('/')
        }
      })
    } else {
        this.$store.dispatch('setCheck', true)
          this.$store.dispatch("setMsg", {
            text: "Ваша сессия закончена ! Авторизуйтесь заново",
            class: "warning",
          });
          this.$router.push('/')
    }
  },
}
</script>

<style lang="scss" scoped>
    @import '../styles/components/user';
</style>