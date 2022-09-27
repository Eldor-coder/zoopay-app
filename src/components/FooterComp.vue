<template>
    <footer class="footer">
        <div class="container">
            <ul class="footer__socials">
                    <li>
                        <a href="#" target="_blank">
                            <img src="@/assets/facebook.svg" alt="facebook">
                        </a>
                    </li>
                    <li>
                        <a href="#" target="_blank">
                            <img src="@/assets/telegram.svg" alt="telegram">
                        </a>
                    </li>
                    <li>
                        <a href="#" target="_blank">
                            <img src="@/assets/youtube.svg" alt="youtube">
                        </a>
                    </li>
                    <li>
                        <a href="#" target="_blank">
                            <img src="@/assets/instagram.svg" alt="instagram">
                        </a>
                    </li>
            </ul>
            <div class="footer__copy">
                zoopay.uz © 2022. created by doin.uz
            </div>
        </div>
    </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    @import '../styles/var';
    .footer {
        background: $green;
        color: $white;
        padding: 20px;
        &__socials {
            display: flex;
            align-items: center;
            justify-content: center;
            a{
                margin: 0px 5px;
                img {
                    filter: invert(1);
                }
            }
        }
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }
</style>