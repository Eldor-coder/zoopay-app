<template>
  <div :class="{ auth: true, open: toggle }">
    <div v-if="type == 1" class="auth__box">
      <h2 class="auth__title">Авторизация</h2>
      <button
        class="auth__close"
        @click="$store.dispatch('setAuthToggle', false), type == 1"
      ></button>
      <form name="auth" class="auth__form" @submit.prevent="login">
        <input
          v-maska="'+998(##) ###-##-##'"
          class="auth__input"
          v-model="userLogin.phone"
          placeholder="+998 (__) ___ __ __"
        />
        <input
          type="password"
          v-model="userLogin.pass"
          class="auth__input"
          placeholder="Пароль"
        />
        <button @click="type = 3" class="auth__link">Забыли пароль?</button>
        <button class="auth__btn">Отправить</button>
      </form>
      <button @click="type = 2" class="auth__link center">Нету аккаунта?</button>
    </div>
    <div v-if="type == 2" class="auth__box">
      <h2 class="auth__title">Регистрация</h2>
      <button
        class="auth__close"
        @click="$store.dispatch('setAuthToggle', false), type == 1"
      ></button>
      <form name="reg" class="auth__form" v-if="toggleCode">
        <input
          v-model="userReg.name"
          type="text"
          name="name"
          class="auth__input"
          placeholder="Ваша имя"
        />
        <input
          v-maska="'+998(##) ###-##-##'"
          @input="checkUser"
          v-model="userReg.phone"
          class="auth__input"
          name="phone"
          placeholder="+998 (__) ___ __ __"
        />
        <input
          v-model="userReg.pass"
          type="password"
          name="password"
          class="auth__input"
          placeholder="Пароль"
        />
        <button
          @click="registr"
          class="auth__btn"
          :disabled="checkPhone"
          :style="{
            cursor: checkPhone ? 'not-allowed' : 'pointer',
            opacity: checkPhone ? 0.4 : 1,
          }"
        >
          Отправить
        </button>
      </form>
      <form v-else class="auth__form">
        <h2 class="auth__stitle">Введите присланный код</h2>
        <input
          v-model="userCode"
          @input="checkCode"
          type="number"
          name="userCode"
          class="auth__input"
          placeholder="Код"
        />
        <button
          @click="startreg"
          class="auth__btn"
          :disabled="disable"
          :style="{
            cursor: disable ? 'not-allowed' : 'pointer',
            opacity: disable ? 0.4 : 1,
          }"
        >
          Отправить
        </button>
      </form>
      <button @click="type = 1" class="auth__link center">Есть аккаунта?</button>
    </div>
    <div v-if="type == 3" class="auth__box">
      <h2 class="auth__title">Восстановление пароля</h2>
      <button
        class="auth__close"
        @click="$store.dispatch('setAuthToggle', false), type == 1"
      ></button>
      <form name="reset" class="auth__form">
        <input
          v-maska="'+998(##) ###-##-##'"
          value="+998"
          class="auth__input"
          name="phone"
          placeholder="+998 (__) ___ __ __"
        />
        <button class="auth__btn">Отправить</button>
      </form>
      <p>
        <button @click="type = 1" class="auth__link center">Есть аккаунта?</button>
      </p>
      <p>
        <button @click="type = 2" class="auth__link center">Нету аккаунта?</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      disable: true,
      userCode: "",
      code: "",
      toggleCode: true,
      checkPhone: true,
      type: 1,
      userLogin: {
        phone: "+998",
      },
      userReg: {
        name: "",
        pass: "",
        phone: "+998",
      },
    };
  },
  computed: {
    toggle() {
      return this.$store.getters.getAuthToggle;
    },
  },
  methods: {
    checkUser() {
      let phone = this.cleanPhone(this.userReg.phone);
      this.$store.dispatch("checkUser", { phone })
      .then((res) => {
        if (res.data == "no") {
          this.$store.dispatch("setMsg", {
            text: "пользователь с таким номером уже существует",
            class: "warning",
          });
          this.checkPhone = true;
        } else {
          this.checkPhone = false;
        }
      });
    },
    startreg(e) {
      e.preventDefault();
      this.$store.dispatch("reg", {
        name: this.userReg.name,
        pass: this.userReg.pass,
        phone: this.cleanPhone(this.userReg.phone),
      });
      this.type = 1;
    },
    checkCode() {
      if (this.code == this.userCode) {
        this.disable = false;
      } else {
        this.disable = true;
      }
    },
    registr(e) {
      e.preventDefault();
      this.code = Math.floor(1000 + Math.random() * 9000);
      this.code = this.code.toString();
      this.$store.dispatch("sms", {
        nums: this.code,
        phone: this.cleanPhone(this.userReg.phone),
      });
      this.toggleCode = false;
    },

    cleanPhone(val) {
      return val
        .split("+")
        .join("")
        .split(" ")
        .join("")
        .split(")")
        .join("")
        .split("(")
        .join("")
        .split("-")
        .join("");
    },
    login() {
      // let userData = new FormData(e.target);
      let phone = this.cleanPhone(this.userLogin.phone);

      this.$store.dispatch("login", {
        phone: phone,
        pass: this.userLogin.pass,
      })
      .then(res => {
            if(res.data.msg == 'ok') {
                this.$store.dispatch('setMsg', {
                    text : 'Успешно',
                    class : 'success'
                })
                this.$cookies.set('zoouser', res.data.data)
                this.$store.commit('setAuthToggle', false)
                this.$store.dispatch('setCheck', false) 
                this.$router.push('/user/allads')
            } else {
                this.$store.dispatch('setMsg', {
                    text : res.data.msg,
                    class : 'warning'
                })
            }
        })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/components/authItem";
</style>
