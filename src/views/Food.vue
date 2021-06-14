<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    >
    </loading>
     <div class="horario">
      <p>Nuestro horario actual de atención al cliente por restaurante y room service es de 7:00 am hasta las 10:00 pm</p>
    </div>
    <div class="contentfood">
      <div class="row container-box">
        <div class="col-md-4 col-xs-12 box">
          <img
            @click="typeFood(1)"
            class="img_services"
            src="@/assets/desayunos_rende.jpg"
          />
          <h1 @click="typeFood(1)" class="desayuno">Desayunos</h1>
        </div>
        <div class="col-md-4 col-xs-12 box">
          <img
            @click="typeFood(2)"
            class="img_services"
            src="@/assets/almuerzos_rende.jpg"
          />
          <h1 @click="typeFood(2)" class="almuerzo">Almuerzos y Cenas</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

export default {
  data() {
    return {
      type_food_id: "",
      submitted: false,
      isLoading: false,
      fullPage: true,
    };
  },
  components: {
    Loading,
  },

  computed: {
    isDisabled() {
      return true;
    },
  },
  mounted() {},
  methods: {
    typeFood(type_food_id) {
      this.$router.push({ name: "comidas", params: { id: type_food_id } });
    },
  },

  mounted() {},

  mounted() {},
};
</script>

<style scoped>
/*{
    background-image: url("~@/assets/Background.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}*/
.horario{
    margin-top: 8%;
    margin-left: 4%;
    display: flex;
    justify-content: left;
    font-family: "HelveticaBold";
}

.img_services {
  width: 95%;
  height: auto;
  border-radius: 10px;
  -webkit-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  padding: 2px;
}

._title {
  margin-top: 3%;
  font-family: "HelveticaBold";
  text-transform: uppercase;
}
.desayuno,
.almuerzo {
  margin-left: 5%;
  font-size: 190%;
}

.img_home {
  padding-left: 8%;
  padding-right: 8%;
  padding-bottom: 5%;
}

.title_home {
  margin-left: -76.5%;
  font-family: "HelveticaBold";
  text-transform: uppercase;
}

.container-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  margin: 1%;
}

.box {
  /* height: 255px; */
  border: none;
  text-align: center;
  margin-top: 0%;
  /* left: 0%; */
  position: relative;
  cursor: pointer;
}
h1 {
  width: 27%;
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
  font-size: 32px;
  cursor: pointer;
  text-transform: uppercase;
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
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  .img_services {
    width: 100%;
    height: auto;
    margin-left: -3%;
    margin-top: 12%;
    border-radius: 10px;
    -webkit-box-shadow: 5px 5px 10px 0px rgb(0 0 0 / 50%);
    box-shadow: 5px 5px 10px 0px rgb(0 0 0 / 50%);
    cursor: pointer;
    padding: 1px;
  }

  .container-box{
    margin-top: -11%;
    margin-bottom: 20%;
  }

  .box[data-v-20002840] {
    width: 372px;
    height: 250px;
    margin: 3px;
    padding: 1px;
    border: none;
    text-align: center;
    margin-top: 14px;
    position: relative;
    cursor: pointer;
  }

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
  h1 {
    width: 1%;
    height: 30px;
    text-align: center;
    position: absolute;
    left: 25%;
    top: 71px;
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
    color: white;
    font-size: 20px;
    text-transform: uppercase;
  }

  .cena {
    margin-left: -8%;
  }
  .desayuno,
  .almuerzo {
      margin-left: 7%;
    font-size: 174%;
}
.horario{
    margin-top: 15%;
    padding: 19px;
    text-align: justify;
}
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
  .contentfood{
    margin-top: 7%;
  }

}

@media only screen and (min-device-width: 1200px) {
}

@media only screen and (min-device-width: 490px) and (max-device-width: 768px) {
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

@media only screen and (min-device-width: 1200px) {
}
</style>
