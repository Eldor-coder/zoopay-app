<template>
  <div class="msg">
        <h1 :class="`msg__text ${msg.class}`">
            <!-- Добавлено в избранные! -->
            {{msg.text}}
        </h1>
  </div>
  
</template>

<script>
export default {
    computed : {
        msg(){
            return this.$store.getters.getMsg
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/var';
    .msg {  
        position: fixed;
        bottom: 0px;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        &__text {
            background-color: #fff;
            font-size: 18px;
            padding: 10px 20px;
            transition: .3s;
            position: absolute;
            bottom: -100px;
            border-radius: 10px;
            &.success {
                background-color: $green;
                color: #fff;
                bottom: 50px;
            }
            &.warning {
                background-color: $yellow;
                // color: #fff;
                bottom: 50px;
            }
        }
    }
</style>