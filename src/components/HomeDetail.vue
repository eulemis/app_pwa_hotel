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
        <div class="row ">
            <div  class="col-md-12">
                <h3  class="servicio_title">
                    <img class="icon-services"  src="@/assets/img_service.png" >
                    Servicios
                </h3>
            </div>
        </div>
        <div class="container-box">
       <!--      <div class="services">
                <div class="ih-item square effect13 left_to_right">
                    <div class="img"><img src="@/assets/img_fondo/room_service_galeria_gris.jpg" alt="img"></div>
                    <div>
                        <h2 class="home_1">Room Service</h2>
                    </div>
                    <div class="info">
                      <h3 class="room_service title_atras">Room Service</h3>
                      <hr class="hr_">
                      <p class="room_service">Disfrute de nuestro menú desde la comodidad de su habitación.</p>
                    </div>
                </div>
            </div> -->
            <div class="services">
                <div class="ih-item square effect13 left_to_right">
                    <div class="img"><img src="@/assets/img_fondo/salones_gris.jpg" alt="img"></div>
                    <div>
                        <h2 class="home_1">Salones y Terraza</h2>
                    </div>
                    <div class="info">
                      <h3 class="room_service title_atras">Salones y Terraza</h3>
                      <hr class="hr_">
                      <p class="room_service">Lidotel Centro Lido Caracas ofrece una terraza y cinco salas versátiles, cómodas y elegantes para cualquier tipo de eventos: Bodas, lanzamientos, showrooms, conferencias, reuniones de trabajo, congresos, entre otros. <a  style="color:rgb(191 131 3); cursor:pointer;"  @click="getViewSalones" >Leer Más...</a></p>
                    </div>
                </div>
            </div>
     <!--        <div class="services">
                <div class="ih-item square effect13 left_to_right">
                    <div class="img"><img src="@/assets/img_fondo/bussines-center_gris.jpg" alt="img"></div>
                    <div>
                        <h2 class="home_1">Business Center</h2>
                    </div>
                    <div class="info">
                      <h3 class="room_service title_atras">Business Center</h3>
                      <hr class="hr_">
                      <p class="room_service">Espacio privado para desarrollar sus actividades de negocios desde la comodidad de nuestras instalaciones.</p>
                    </div>
                </div>
            </div> -->
            <div class="services">
                <div class="ih-item square effect13 left_to_right">
                    <div class="img"><img src="@/assets/img_fondo/gimnasio_gris.jpg" alt="img"></div>
                    <div>
                        <h2 class="home_1">Gimnasio</h2>
                    </div>
                    <div class="info">
                      <h3 class="room_service title_atras">Gimnasio</h3>
                      <hr class="hr_">
                      <p class="room_service">Amplias instalaciones y modernos equipos para que pueda disfrutar de un momento de esparcimiento y relajación en uno de los gimnasios más exclusivos de la capital. Se encuentra ubicado en el PISO 8. <a  style="color:rgb(191 131 3); cursor:pointer;"  @click="getViewGimnasio" >Leer Más...</a></p>
                    </div>
                </div>
            </div>
            <div class="services">
                <div class="ih-item square effect13 left_to_right">
                    <div class="img"><img src="@/assets/img_fondo/valet_parking_gris.jpg" alt="img"></div>
                    <div>
                        <h2 class="home_1">Valet Parking</h2>
                    </div>
                    <div class="info">
                      <h3 class="room_service title_atras">Valet Parking</h3>
                      <hr class="hr_">
                      <p class="room_service">Para su mayor comodidad, ofrecemos el servicio de valet parking completamente gratuito para nuestros huéspedes.</p>
                      <p><strong>Horario:</strong> 7:00 am a 7:00 pm</p>
                      <p class="room_service costo_valet_parking">Para visitantes tiene un costo de $10 diarios.</p>
                    </div>
                </div>
            </div>
            <div class="services">
                <div class="ih-item square effect13 left_to_right">
                    <div class="img"><img src="@/assets/img_fondo/lavanderia_gris.jpg" alt="img"></div>
                    <div>
                        <h2 class="home_1">Lavandería</h2>
                    </div>
                    <div class="info">
                      <h3 class="room_service title_atras">Lavandería</h3>
                      <hr class="hr_">
                      <p class="p_text">Puede contar con nuestro servicio de lavandería y despreocuparse por el aseo de sus prendas.
                        <a style="color:rgb(191 131 3);cursor:pointer;"  @click="getViewLavanderia()" >Leer Más...</a></p>
                    </div>
                </div>
            </div>
            <div class="services">
                <div class="ih-item square effect13 left_to_right">
                    <div class="img"><img src="@/assets/img_fondo/wifi_gris.jpg" alt="img"></div>
                    <div>
                        <h2 class="home_1">Wi Fi</h2>
                    </div>
                    <div class="info">
                      <h3 class="room_service title_atras">Wi Fi</h3>
                      <hr class="hr_">
                      <p class="room_service">Manténgase conectado durante su estadía, a través de nuestro servicio WiFi gratuito en todas nuestras instalaciones.</p>
                    </div>
                </div>
            </div>
            <div class="services">
                <div class="ih-item square effect13 left_to_right">
                    <div class="img"><img src="@/assets/img_fondo/acceso-directo-lido_gris.jpg" alt="img"></div>
                    <div>
                        <h2 class="home_1">Acceso Directo</h2>
                    </div>
                    <div class="info">
                        <h3 class="room_service title_atras">Acceso Directo</h3>
                        <hr class="hr_">
                        <p style="font-size: 13px;" class="room_service">Le ofrecemos un cómodo y rápido acceso al Centro Lido a través de nuestro lobby con la llave de su habitación. Disfrute de variedad de tiendas, farmacias, entidades bancarias, feria de comida, cine, entre otros, a solo pasos de nuestras instalaciones. Para mayor información visite:</p>
                        <!--<p style="font-size: 13px;" class="room_service">
                            <ReadMore  more-str="Leer Más..." :text="text" link="#" less-str="Leer Menos..." :max-chars="50"></ReadMore>
                        </p>-->
                        <a class="read-more" target="_blank"  href="https://instagram.com/centrolido?utm_medium=copy_link">@centrolido</a>
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
import ReadMore from "@/components/ReadMore.vue";
import { mapState } from "vuex";
export default {
  components: {
    UploadImage,
    Loading,
    ReadMore
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
      text:' Le ofrecemos un cómodo y rápido acceso al Centro Lido a través de nuestro lobby con la llave de su habitación. Disfrute de variedad de tiendas, farmacias, entidades bancarias, feria de comida, cine, entre otros, a solo pasos de nuestras instalaciones. Para mayor información visite:     '
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
        /* getViewEntradas(id_entrada) {
            this.$router.push({ name: 'vistas', params: { id: id_entrada } })   
        }, */
        getViewLavanderia() {
            this.$router.push({name: "lavanderia"});  
        },
        getViewSalones() {
             this.$router.push({name: "salones"});  
        },
        getViewGimnasio() {
             this.$router.push({name: "gimnasio"});  
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
.services{
    margin: 5px;
}
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
    margin-bottom: 5%;
   
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
    position: absolute;
    top: 81%;
    left: 7%;
    color: white;
    width: 100%;
    font-size: 24px;
    font-family: "HelveticaBold";
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


.servicio_title{
    margin-left: 16%;
    font-size: 28px;
    margin-top: -7%;
    font-family: "HelveticaBold";
    text-transform: uppercase;
}
.icon-services{
    width: 92px;
}
.read-more{
    color: #936d02;
    font-weight: bold;
    font-size: 20px;
}
.read-more:hover{
    color: #936d02;
}


@media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
    .container-box{
        margin-bottom: 20%;
    }
    .icon-services{
        width: 38px;
    }

    .servicio_title{
        margin-left: 16%;
        font-size: 30px;
        margin-top: -12%;
        font-family: "HelveticaBold";
        text-transform: uppercase;
    }

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
.ih-item.square.effect13:hover .img {
  -webkit-transform: scale(1.2);
  -moz-transform: scale(1.2);
  -ms-transform: scale(1.2);
  -o-transform: scale(1.2);
  transform: scale(1.2);
}
.ih-item.square.effect13:hover .info {
  visibility: visible;
  opacity: 8;
  background-color: white;
}

.ih-item.square.effect13.left_to_right .info {
  -webkit-transform: translateX(-100%);
  -moz-transform: translateX(-100%);
  -ms-transform: translateX(-100%);
  -o-transform: translateX(-100%);
  transform: translateX(-100%);
}
.ih-item.square.effect13.left_to_right:hover .info {
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
 /*   pointer-events: none;*/
    -webkit-transition: all 0.35s ease-in-out;
    -moz-transition: all 0.35s ease-in-out;
    transition: all 0.35s ease-in-out;
}
.room_service{
    color:black;
    margin: 13px;
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
.costo_valet_parking{
    font-size: 16px;
    font-weight: bold;
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

