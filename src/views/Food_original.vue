<template>
<div class="row dataContainer">
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage">
    </loading>
    <div class="col-md-7 col-sm-12 imgSelection">
        <div class="img_food">
            <img class="imgContainer" src="@/assets/newmenus/Desayunos.png" alt="" @click="typeFood(1)">
             <h1 @click="typeFood(1)">Desayunos</h1>
        </div>
        <div class="img_food">
            <img class="imgContainer" src="@/assets/newmenus/Almuerzos.png" alt="" @click="typeFood(2)">
             <h1 @click="typeFood(2)">Almuerzos</h1>
        </div>
        <div class="img_food">
            <img class="imgContainer" src="@/assets/newmenus/Cenas.png" alt="" @click="typeFood(3)">
             <h1 class="cena" @click="typeFood(3)">Cenas</h1>
        </div>
       <!--  <div  v-bind:disabled="isDisabled" class="img_food">
            <img style="opacity: 0.1;" class="imgContainer" src="@/assets/newmenus/Bebidas.png" alt="" >
            <h1 >Mini Bar</h1>
        </div> -->  
    </div>
    <div class="col-md-5 d-none d-sm-block imgChef">
        <div class="content-img">
            <img class="chef_img" src="@/assets/chef_woman.svg" alt="">
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

export default {
    data() {
        return {
            type_food_id: '',
            submitted: false,
            isLoading: false,
            fullPage: true,
           
        }
    },
    components: {
        Loading
    },

    computed: {
    isDisabled() {
      return true;
    },
    },
    mounted() {

    },
    methods: {
        typeFood(type_food_id) {
            this.$router.push({ name: 'comidas', params: { id: type_food_id } })            
        }
    },

    mounted() {

    },

    mounted() {},
};
</script>

<style scoped>
h1{
    width: 10%;
    height: 30px;
    text-align: center;
    /* background: #A17E13 none; */
    /* border-radius: 50%; */
    position: absolute;
    left: 5%;
    top: 67px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: white;
    font-family: "HelveticaBold";
    font-size: 50px;
    cursor:pointer;
}
.dataContainer div {
/*    background-image: url("~@/assets/Background.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;*/
    padding-left: 0px !important;
    padding-right: 0px !important;
}

.imgChef,
.imgSelection {
  margin-top: 3%;
}

.imgChef .content-img {
    height: 100%;
    background-color: white;
    position: relative;
    display: block;
    text-align: center;
    /* border: 4px solid blue; */
      border-top-left-radius: 62% 80%;
    border-bottom-left-radius: 126% 117%;
    overflow: hidden;
    width: 126%;
    margin-left: -26%;
}

.imgContainer {
    /* max-width: 100%; */
    max-height: 100%;
    cursor: pointer;
}

.img_food {
    position: relative;
    display: block;
    max-height: 25%;
    min-height: 25%;
    overflow: hidden;
}

.chef_img {
    height: 100%;
    width: auto;
}

/*css content3*/
.type_food {
    float: left;
}

.content3 {
    width: 100%;

}

.content3 h1 {
    font-weight: 100;
    margin-top: 20px;
}

.content3 p {
    margin-top: 40px;
    letter-spacing: 1px;
    color: #877d7d;
}

.content-estadisticas {
    width: 100%;
    margin-top: 40px;
}

.item-estadisticas {
    width: 100%;
    max-width: 794px;
    margin: auto;
    padding: 40px;
    color: white;
    height: 214px;
}

.item-estadisticas span {
    font-size: 80px;
}

.item-estadisticas p {
    color: white;
    margin-top: 2px;
}

.item1 {
    overflow: hidden;
    padding: 0px;
    border-radius: 10px 0px 0px 0px;
    cursor: pointer;
}

.item2 {
    overflow: hidden;
    padding: 0px;
    cursor: pointer;
}

.item3 {
    overflow: hidden;
    padding: 0px;
    cursor: pointer;
}

.item4 {
    overflow: hidden;
    padding: 0px;
    cursor: pointer;
    border-radius: 0px 0px 0px 10px;
}

.li_img {
    list-style: none;
    margin-top: 20px;
}

.ul_img {
    margin: 0;
    padding: 0;
}

.img-fluid {
    cursor: pointer;
}

/* .content:hover .img_food {-webkit-transform:scale(1.3);transform:scale(1.3);}
.content {overflow:hidden;}
 */

.parrafo_content3 {
    text-align: justify;
}

@media screen and (min-width: 800px) {
    .content-estadisticas {
        display: flex;
        flex-direction: column;
    }

    /* .img_food{
  
    width: 135%;
} */
}

/* Smartphones (portrait & landscape) */
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {

    .img-fluid {
        border-radius: 6px;
        margin: 3px;

        max-width: 118%;
        height: auto;

    }

    .imgContainer {
        height: 235px;
        margin: 2px;
        margin-left: 3.8%;
        width: 92%;
        height: 150px;
        border-radius: 7px;
        cursor: pointer;
     /*   height: 260px; // codigo actual se comenta para hacer una prueba
        /* max-width: 100%; 
        max-height: 175px;
        cursor: pointer;*/
    }

    .imgSelection {
        margin-top: 17%;
    }

    .container {

        margin-top: 11%;
    }

    .content {
        width: 329px;
        margin: auto;
    }
    h1{
    width: 1%;
    height: 30px;
    text-align: center;
    /* background: #A17E13 none; */
    /* border-radius: 50%; */
    position: absolute;
    left: 30%;
    top: 15px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: row;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color:white;
    font-size: 25px;
    text-transform:uppercase;
    }

    .cena{
        margin-left: -8%;
    }
 
}

@media only screen and (min-device-width: 1200px) {}

@media only screen and (min-device-width : 490px) and (max-device-width : 768px) {
    .img-fluid {
        border-radius: 10px;
        margin: 3px;

        max-width: 100%;
        height: auto;

    }

    .container {
        max-width: 1000px;
        margin: auto;
        margin-top: 11%;
    }

    .content {

        margin: auto;
    }

}

@media only screen and (min-device-width : 1200px) {}
</style>
