<template>
<div class="home_ppal">
    <div class="baner"> 
        <img class="img-fluid" src="@/assets/banner_home.jpg"/> 
      <!--   <div v-lazy:background-image="imgBanner.loading"></div> -->
    </div><br>
    <main>
        <div class="content-card-2 ">
            <div class="row container-box">
                <div  class="col-md-6 img_home">
                    <h3 class="text-center _title"  @click="getViewPreChecking()">
                        <img  style="width: 14%;" src="@/assets/precheckin_Icon.svg" >
                        {{ $t("pre_checking") }}
                    </h3><br>
                        <img @click="getViewPreChecking()" class="img_services" src="@/assets/checkin.jpg"/>
                </div>
                <div  class="col-md-6 img_home">  
                        <h3 class="text-center _title" @click="getViewServices()">
                        <img  style="width: 14%;" src="@/assets/servicios_icon.svg" >
                        {{ $t("service_home") }}
                        </h3><br>
                        <img @click="getViewServices()" class="img_services" src="@/assets/room_service.jpg"/>
                </div>             
            </div>
            
        </div>
        <div class="container-box">
            <div class="row ">
                <div  class="col-md-12">
                    <h3  class="servicio_title">
                        Servicios
                    </h3>
                </div>
            </div>
     
        </div>
        

        <div class="container-box">
       
     
<!-- 

            <div class="box box1">
                <img @click="getViewEntradas(1)" src="@/assets/img_fondo/restaurant_gris.jpg" alt="">
                <div>
                    <h2 class="home_1">Restaurant</h2>
                </div>
                <div class="btn-comentario">
                    <a href="#" @click="showModal()">
                        <img class="icon_comentario" src="@/assets/comentario_2.svg" style="width:45%" >
                    </a>
                </div>
            </div> -->
            <div class="box box2">
                <img @click="getViewEntradas(2)" src="@/assets/img_fondo/room_service_galeria_gris.jpg" alt="">
                <div>
                    <h2 class="home_2">Room Service</h2>
                </div>
            
            </div>
            <!-- <div class="box box3">
                <img @click="getViewEntradas(3)" src="@/assets/img_fondo/gimnasio_gris.jpg" alt="">
                <div>
                    <h2 class="home_3">Gimnasio</h2>
                </div>
          
            </div> -->
            <div class="box box4">
                <img @click="getViewEntradas(4)" src="@/assets/img_fondo/salones_gris.jpg" alt="">
                <div>
                    <h2 class="home_4">Salones y Terrazas</h2>
                </div>
              
            </div>
            <div class="box box5">
                <img @click="getViewEntradas(5)" src="@/assets/img_fondo/bussines-center_gris.jpg" alt="">
                <div>
                    <h2 class="home_5">Business Center</h2>
                </div>
            
            </div>
            <div class="box box6">
                <img @click="getViewEntradas(6)" src="@/assets/img_fondo/valet_parking_gris.jpg" alt="">
                <div>
                    <h2 class="home_6">Valet Parking</h2>
                </div>
              
            </div>
            <div class="box box7">
                <img @click="getViewEntradas(7)" src="@/assets/img_fondo/lavanderia_gris.jpg" alt="">
                <div>
                    <h2 class="home_7">Lavandería</h2>
                </div>
                
            </div>
 <!--            <div class="box box8">
                <img @click="getViewEntradas(8)" src="@/assets/img_fondo/wifi_gris.jpg" alt="">
                <div>
                    <h2 class="home_8">Wi Fi</h2>
                </div>
               
            </div>
            <div class="box box9">
                <img @click="getViewEntradas(9)" src="@/assets/img_fondo/acceso-directo-lido_gris.jpg" alt="">
                <div>
                    <h2 class="home_9">Acceso al Centro Lido</h2>
                </div>
                
            </div> -->
                        <div class="carta-box">
                <div class="carta">    
                  <div class="cara box box1 ">
                   <img src="@/assets/img_fondo/wifi_gris.jpg" alt="">
                        <div>
                            <h2 class="home_1">Wi Fi</h2>
                        </div>
                  </div>
                   <div id="cara_atras" class="cara detras box box1 ">
                        <div>
                            <h3 class="title_atras">Wi Fi</h3>
                            <hr class="hr_">
                        </div>
                        <div>
                            <h6 class="p_text">Manténgase conectado durante su estadía, a través de nuestro servicio WiFi gratuito en todas nuestras instalaciones.</h6>
                        </div>
                  </div>     
                </div>
            </div>
            <div class="carta-box">
                <div class="carta">    
                  <div class="cara box box1 ">
                    <img  src="@/assets/img_fondo/acceso-directo-lido_gris.jpg" alt="">
                        <div>
                            <h2 class="home_1">Acceso Directo</h2>
                        </div>
                  </div>
                  <div id="cara_atras" class="cara detras box box1 ">
                        <div>
                            <h3 class="title_atras">Acceso Directo</h3>
                            <hr class="hr_">
                        </div>
                        <div>
                            <h6 class="p_text">Le ofrecemos un cómodo y rápido acceso al Centro Lido a través de la llave de su habitación. Disfrute de variedad de tiendas, farmacias, entidades bancarias, feria de comida, cine, entre otros, a solo pasos de nuestras instalaciones. <a style="color:rgb(191 131 3)"  @click="getViewEntradas(9)" >Leer Mas...</a></h6>
                        </div>
                      <!--   <button @click="getViewEntradas(9)"  style="background-color: rgb(191 131 3);border:1px solid rgb(191 131 3);margin-top:42px; " class="btn btn-info btn-xs">Leer Mas...</button> -->
                    
                  </div>    
                </div>
            </div>

        </div>

        <b-modal class="notfood" ref="comentario"    hide-footer hide-header >
            <h5 style="text-align: center;color:#94700a;text-transform: uppercase;">Notificación</h5><br>
            <div class="mt-3">
                <p  style="text-align: center;color:#94700a;text-transform: uppercase;">No contamos con disponibilidad </p>
            </div>
            <div class=" mt-5 buttonsFooter">
              <b-button  class="btn-modal" @click="hideModal()">{{
                $t("acept")
              }}</b-button>
         
            </div>
        </b-modal>

    </main>
</div>
</template>
<script>
import axios from "axios";
import UploadImage from "../components/UploadImage";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import { mapState } from "vuex";
export default {
  components: {
    UploadImage,
    Loading,
  },
  /*
      Defines the data used by the component
    */
  data() {
    return {
      showLoading: true,
        imgObj: {
        src: './img/checkin.jpg',
        error: 'https://picsum.photos/200/300.webp',
        loading: './img/loading.gif'
      },
        imgObj2: {
        src: './img/room_service.jpg',
        error: 'https://picsum.photos/200/300.webp',
        loading: './img/loading.gif'
      },
        imgBanner: {
        src: this.banner,
        error: 'https://picsum.photos/200/300.webp',
        loading: './img/loading.gif'
      },
  
    
  

    };
  },

  computed: {
    ...mapState(["isLoading", "fullPage","reservation","user","hotel","checking","banner"]),
  },
     methods: {
        getViewPreChecking() {
            this.$router.push({name: "pre_checking"});
        },

        getViewServices() {
        
            this.$router.push({name: "food"});
          
        },
        getViewEntradas(id_entrada) {
            this.$router.push({ name: 'vistas', params: { id: id_entrada } })   
        },
        handler (component) {
            console.log('this component is showing')
        },
        showModal(value) {
          this.valor = value;
          this.$refs["comentario"].show();
        },
        hideModal() {
          this.$refs["comentario"].hide();
        },
       

     },
      mounted () {

       // this.banner = this.hotel[0].banner_home;
   


  },
};
</script>

<style scoped>
h6{
    font-size: 14px;
}
.p_text{
    text-align: justify;  
    margin: 22px; 
    font-size: 16px;
}

#cara_atras{
    background-color: white;
/*    background-image: url("~@/assets/Background.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;*/
  /*  border:1px solid #b1b8bfa8;*/
   box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
}
.title_atras{
    color: rgb(191 131 3);
}
.hr_{
    color: rgb(191 131 3);
    width: 90%;
    height: 2px;
    margin: auto;
    background: rgb(191 131 3);
    
}
.carta-box {
    width: 385px;
    height: 250px;
    position: relative;
    perspective: 1000px;
  }
  
  .carta-box:hover .carta {
      transform: rotateY(180deg);
  }
  
  .carta {
    transform-style: preserve-3d;
    transition: all 1s linear;
  }
  
  .cara {
    position: absolute;
    backface-visibility: hidden;
  }
  
  .cara.detras {
    transform: rotateY(180deg);
  }

    .btn-comentario {
        display: block;
        width: 109px;
        height: 70px;
        color: #fff;
        position: absolute;
        right: -11px;
        bottom: 1px;
        border-radius: 50%;
        line-height: 80px;
        text-align: center;
        z-index: 999;
        color: white;
    }
.home_ppal{
    background-image: url("~@/assets/Background.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}

main{
    width: 100%;
    max-width: 100%;
    margin: auto;
}

.content-card-2 {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.img_services{
    
    width: 100%;
    height: auto;
    border-radius: 30px;
    -webkit-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
    cursor:pointer;
    }

._title{
    margin-top:3%;
    font-family: "HelveticaBold";
    text-transform: uppercase;
}
.img_home{
    padding-left: 8%;
    padding-right: 8%;
    padding-bottom: 5%;
}

.title_home{
    margin-left: -76.5%;
    font-family: "HelveticaBold";
    text-transform: uppercase;
}



.container-box{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.box{
    width: 372px;
    height: 250px;
    margin: 3px;
    padding: 1px;
    border:none;
    text-align: center;
    margin-top: 14px;
  /*  position: relative;*/
    cursor:pointer;
}

.box img{
    width: 100%;
    border-radius: 10px;
}



.box h2{
    font-size: 20px;
    margin-top: -11%;
    color: white;
    font-family: "Futura_Std_Bold";
    text-transform: uppercase;
}

.box .container-p{
    width: 100%;
    height: 150px;
    position: absolute;
    left: 0;
    bottom: 0;
    overflow: hidden;
    padding: 0px 10px;
    border-radius: 0px 0px 14px 14px;
}

.box p{
    font-size: 14px;
    color: #7a7a7a;
    opacity: 0;

}
.home_1{
    margin-right: 40%;
}

.home_2{
    margin-right: 40%;
}

.home_3{
    margin-right: 48%;
}

.home_4{
    margin-right: 18%;
}

.home_5{
    margin-right: 29%;
}

.home_6{
    margin-right: 43%;
}

.home_7{
     margin-right: 43%;
}

.home_8{
    margin-right: 62%;
}

.home_9{

}

.servicio_title{
    margin-left: 07%;
    font-size: 28px;
    margin-top: 1%;
    font-family: "HelveticaBold";
    text-transform: uppercase;
}



@media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
    .carta-box[data-v-20002840] {
        width: 96%; 
        height: 250px;
        position: relative;
        -webkit-perspective: 1000px;
        perspective: 1000px;
    }

    .btn-comentario[data-v-20002840] {
        display: block;
        width: 109px;
        height: 70px;
        color: #fff;
        position: absolute;
        right: -11px;
        bottom: 11px;
        border-radius: 50%;
        line-height: 80px;
        text-align: center;
        z-index: 999;
        color: white;
    }

    .box[data-v-20002840] {
         width: 341px;
        height: 250px;
        margin: 3px;
        padding: 1px;
        border:none;
        text-align: center;
        margin-top: 14px;
       /* position: relative;*/
        cursor: pointer;
    }

    .baner{
        margin-top:16%;
    }
    .img_home{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 0;
    }
    .img_services{
        
        width: 90%;
        height: 230px;
        border-radius: 10px;
        -webkit-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
        -moz-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
        box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
        cursor:pointer;
        padding: 4px;
    }
    .title_home{
        margin-left: 1%;
        margin-top: 8%;
        font-size: 29px;
    }


}



/*NEW CSS TARJETAS SERVICIOS*/
.ih-item.square.effect13 {
  overflow: hidden;
}
.ih-item.square {
    position: relative;
    width: 386px;
    height: 258px;
    /* border: 8px solid #fff; */
    -webkit-box-shadow: 1px 1px 3px rgb(0 0 0 / 30%);
    box-shadow: 1px 1px 3px rgb(0 0 0 / 30%);
    border-radius: 10px;
}
.ih-item.square.effect13 .img {
    -webkit-transition: all 0.35s ease-in-out;
    -moz-transition: all 0.35s ease-in-out;
    transition: all 0.35s ease-in-out;
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
}
.ih-item img {
    width: 100%;
    height: 100%;
}
.ih-item.square.effect13 a:hover .img {
  -webkit-transform: scale(1.2);
  -moz-transform: scale(1.2);
  -ms-transform: scale(1.2);
  -o-transform: scale(1.2);
  transform: scale(1.2);
}
.ih-item.square.effect13 a:hover .info {
  visibility: visible;
  opacity: 1;
}

.ih-item.square.effect13.left_to_right .info {
  -webkit-transform: translateX(-100%);
  -moz-transform: translateX(-100%);
  -ms-transform: translateX(-100%);
  -o-transform: translateX(-100%);
  transform: translateX(-100%);
}
.ih-item.square.effect13.left_to_right a:hover .info {
  -webkit-transform: translateX(0);
  -moz-transform: translateX(0);
  -ms-transform: translateX(0);
  -o-transform: translateX(0);
  transform: translateX(0);
}
.ih-item.square .info {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
.ih-item.square.effect13 .info {
    background: #333333;
    background: rgba(0, 0, 0, 0.6);
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    -webkit-transition: all 0.35s ease-in-out;
    -moz-transition: all 0.35s ease-in-out;
    transition: all 0.35s ease-in-out;
}
.room_service{
    color: white;
}

@media only screen and (max-width: 600px){
       .ih-item.square{
        width: 100%;
        height: auto;
    }
}
@media only screen and (max-width: 425px){
     .ih-item.square{
        width: 100%;
        height: auto;
    }
}
/*END CSS TARJETAS SERVICIOS*/

</style>

