<template>
<div class="login-wrapper">
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage">
    </loading>
    <form @submit.prevent="handleSubmit" class="form">
        <div class="text-center">
            <img  src="@/assets/main_logo.jpg" alt="" />
        </div>
        <div class="input-group">
            <input type="text" v-model="email" name="email" :class="{ 'is-invalid': submitted && !email }" required />
            <label for="loginUser">EMAIL</label>
        </div>
        <div class="input-group">
            <input type="password" v-model="password" name="password" :class="{ 'is-invalid': submitted && !password }" required />
            <label for="loginPassword">PASSWORD</label>
        </div>
        <input type="submit" value="Iniciar Sesión" class="submit-btn" /><br />
        <!--  <a href="#forgot-pw" class="forgot-pw">Forgot Password?</a> -->
    </form>

    <div id="forgot-pw">
        <form action="" class="form">
            <a href="#" class="close">&times;</a>
            <h2>Reset Password</h2>
            <div class="input-group">
                <input type="email" name="email" id="email" required />
                <label for="email">EMAIL</label>
            </div>
            <input type="submit" value="Submit" class="submit-btn" />
        </form>
    </div>
    <div class="exp" >
        <img  style="width: 10%;" src="@/assets/new_logo_l.png">
        <p >#EXPERIENCIALIDOTEL</p>
    </div>
</div>

</template>

<script>
import {
    mapState,
    mapMutations,
    mapActions
} from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import BASE_URL from "../config";

export default {
    data() {
        return {
            email: "",
            password: "",
            submitted: false,
            isLoading: false,
            fullPage: true,
        };
    },
    components: {
        Loading,
    },

    computed: {
        ...mapState(["status", "login"]),
    },
    methods: {
        ...mapActions(["Login"]),

        handleSubmit() {
            this.isLoading = true;
            this.$store
                .dispatch("login", {
                    email: this.email,
                    password: this.password,
                })
                .then((response) => {
                  
                    if (response.status == 200) {
                        this.$router.push({
                            name: "Home"
                        });
                    }
                })

        .catch((error) => {
         
             if (error.status == 401) {
            this.$route.push({ name: "Login" });
          }

                    this.$toast.error("Email or Password Invalid .", {
                        position: "top",
                    });
                    this.error = this.isLoading = false;
                });
        },
    },
};
</script>

<style scoped>
.login-wrapper {
    background-image: url("~@/assets/Background.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.exp{
    color: #ad8000;
    position: absolute;
    margin-top: 27%;
    font-weight: bold;
    text-align: center;
}

.form {
    position: fixed;
    width: 400px;
    padding: 80px 40px 102px;
    margin-top: 5%;
    border-radius: 10px;
    color: #fff;
}
.form div img{
    width: 70%;
    margin-top: -75%
}

.form::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;

    transform: skewX(-26deg);
    transform-origin: bottom left;
    border-radius: 10px;
    pointer-events: none;
}

@media only screen and (min-width: 320px) and (max-width: 550px) {
    .form {
        position: fixed;
        width: 300px;
        padding: 80px 40px 102px;
        margin-top: 5%;
        border-radius: 10px;
        color: #fff;
        }
        .form div img{
            width: 57%;
        /*    margin-top: 5px;*/
        }
    .exp{
        color: #ad8000;
        position: fixed;
      /*  margin-top: 90%;*/
      bottom: 0;
    }


}

@media only screen and (min-width: 560px) and (max-width: 1024px) {
    .form {
        position: fixed;
        width: 300px;
        padding: 80px 40px 102px;
  /*      margin-top: 5%;*/
        border-radius: 10px;
        color: #fff;
    }
    .form div img{
        width: 48%;
        margin-top: 0px;
    }
    .exp{
        color: #ad8000;
        position: fixed;
        margin-top: 135%;
        overflow: auto;
    }

}

.form h2 {
    text-align: center;
    letter-spacing: 1px;
    margin-bottom: 2rem;
    color: #c4a650;
}

.form .input-group {
    position: relative;
}

.form .input-group input {
    width: 100%;
    padding: 10px 0;
    font-size: 1rem;
    letter-spacing: 1px;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #c4a650;
    outline: none;
    background-color: transparent;
    color: black;
}

.form .input-group label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 1rem;
    pointer-events: none;
    transition: 0.3s ease-out;
    color: #c4a650;
}

.form .input-group input:focus+label,
.form .input-group input:valid+label {
    transform: translateY(-18px);
    color: #c4a650;
    font-size: 0.8rem;
    font-family: "Futura_Std_Book";
}

.submit-btn {
    display: block;
    margin: auto;
    border: none;
    outline: none;
    background: #ad8000;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 10px 20px;
    border-radius: 30px;
    cursor: pointer;
    width: 100%;
    color: #fff;
    font-family: "Futura_Std_Book";
}

.forgot-pw {
    color: #c4a650;
}

#forgot-pw {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    z-index: 1;
    background: #fff;
    opacity: 0;
    transition: 0.6s;
}

#forgot-pw:target {
    height: 100%;
    opacity: 1;
}

.close {
    position: absolute;
    right: 1.5rem;
    top: 0.5rem;
    font-size: 2rem;
    font-weight: 900;
    text-decoration: none;
    color: inherit;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    .main {
        max-width: 1540px;
        background: rgb(124, 124, 124);
        padding: 40px;
        border-radius: 10px;
        margin: 15px;
        margin-top: 40px;
    }
}
</style>
