<template>
<div>
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage">
    </loading>
    <b-navbar class="navbarApp" toggleable="lg" type="light" fixed="top">
        <b-row v-if="this.$route.name != 'Home'" class="go" >
          <b-col lg="2" class=" ml-4"><b-icon @click="back()" icon="arrow-left-circle" font-scale="2" style="cursor:pointer;color:#ae8000"></b-icon></b-col>
        </b-row>
        <b-navbar-brand  class="imgshow" :to="{ name: 'Home' }">
            <img  src="@/assets/new_logo.png"  width="140" class="d-inline-block align-top"  />
        </b-navbar-brand>
        
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav class="navBar">
            <b-navbar-brand v-show="showimage" class="imgprincipal" :to="{ name: 'Home' }" >
                <img v-if="this.$route.name == 'Home'" :src="src"  width="180" class="d-inline-block align-top"  :class="[display ? displayStyle : '']" />
                <img v-else src="@/assets/new_logo.png"  width="180" class="d-inline-block align-top"/>
            </b-navbar-brand>
            <b-navbar-nav>
       <!--          <b-nav-item :active="currentRouteName == 'Home'" :to="{ name: 'Home' }" exact>{{ $t("home") }}</b-nav-item> -->
                <!--  <b-nav-item :active="currentRouteName == 'reservation'" :to="{name:'reservation'}">{{$t('registration_form')}}</b-nav-item> -->
                <!--b-nav-item :to="{name:'detailFood'}">{{$t('food_and_drink')}}</b-nav-item-->
         <!--        <b-nav-item v-if="this.checking != null " :active="currentRouteName == 'food'" :to="{ name: 'food' }">{{ $t("food_and_drink") }}</b-nav-item>
                <b-nav-item v-if="this.checking != null " :active="currentRouteName == 'detailreservation'" :to="{name:'detailreservation'}">{{$t('reservation_detail')}}</b-nav-item> -->
                <!--     <b-nav-item :active="currentRouteName == 'history_services'" :to="{name:'history_services'}">{{$t('history_services')}}</b-nav-item>  -->
     <!--            <b-nav-item v-if="this.checking != null " :active="currentRouteName == 'pre_checking'" :to="{ name: 'pre_checking' }">{{ $t("pre_checking") }}</b-nav-item> -->
               <!-- <b-nav-item-dropdown right class="dropdownLang">
                    <template v-slot:button-content>
                        <span v-text="title_lang"></span>
                    </template>
                    <b-dropdown-item v-for="item of languages" :key="item.id" @click="switchLocale">
                        {{ item.text }}
                    </b-dropdown-item>
                </b-nav-item-dropdown>-->
                <b-nav-item-dropdown v-if="subscription === null" right class="dropdownUser">
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                        <b-icon icon="bell" font-scale="1" style="cursor:pointer;color:#ae8000"></b-icon>
                    </template>
                     <b-dropdown-item @click="abrirModal()" class="huesped">Activar Notificaciones</b-dropdown-item>                   
                </b-nav-item-dropdown>
                <b-nav-item-dropdown right class="dropdownUser">
                    <!-- Using 'button-content' slot  src="@/assets/ws.png" width="170%" -->
                    <template v-slot:button-content>
                        <span class="text-upercase fullname" v-text="full_name" ></span>
                    </template>
                     <b-dropdown-item class="huesped" :to="{name:'detailreservation'}">HISTÓRICO DE PEDIDOS</b-dropdown-item>
                    <b-dropdown-item class="huesped" @click="logout()">{{$t("sign")}}</b-dropdown-item>
                   
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
        <b-modal ref="my-modal" hide-footer title="Lidotel Venezuela">
      <div class="d-block text-center">
        <h5>¿Desea que le Notifiquemos sobre sus pedidos? </h5>
      </div>
      <div class="buttonsFooter">
        <b-button class="btn-notify"  size="sm"   v-if="!getSuscripcion"   @click="habilitarNotificaciones">
         Permitir
        </b-button>
        <b-button class="btn-notify_2"  size="sm" @click="cerrarModal">
          Cancelar
        </b-button>
      </div> 
    </b-modal> 

    <b-modal class="notfood" ref="comentario"  hide-footer>
        <h5 style="text-align: center;color:#94700a;text-transform: uppercase;margin-bottom: -42px;">Comentarios</h5><br>
          <div class="mt-3 mb-3">
            <label for="">Servicios</label>
              <b-form-select
                  v-model="value"
                  :options="services"
                  class="mb-3"
                  value-field="id"
                  text-field="area"
               
                ></b-form-select>
          </div>
       <div>
    <b-form-textarea
      id="textarea"
      v-model="textComment"
      placeholder="Ingrese un Comentario"
      rows="3"
      max-rows="6"
    ></b-form-textarea>
  </div>  
        <div class=" mt-5 buttonsFooter">
          <b-button  class="btn-modal acept_comentario" @click="saveComment()">{{
            $t("acept")
          }}</b-button>
     
        </div>
    </b-modal>
    <div class="footer">
  <a style="float: left;padding:12px;" >   <b-icon @click="showModal()" icon="chat-square-dots" font-scale="2" style="cursor:pointer;color: #af8103;font-size: 180%;margin-bottom: 5px;"></b-icon></a>
  <a href="https://api.whatsapp.com/send?phone=584242515529" target="_blank" style="float:right;padding:12px;" >  <img class="icon_watsapp" src="@/assets/Whatsapp.png" style="width: 38px;" ></a>
</div>
<!--     <div class="btn-whatsapp">
        <a href="https://api.whatsapp.com/send?phone=584242515529" target="_blank">
            <img class="icon_watsapp" src="@/assets/Whatsapp.png" style="width: 70px;" >
        </a>
    </div> -->
  <!--   <div class="btn-comentario" @click="showModal()">
        <a href="#" >
             <b-icon @click="showModal()" icon="chat-square-dots" font-scale="2" style="cursor:pointer;color: white;font-size: 200%;margin-bottom: 5px;"></b-icon> -->
          <!--   <img @click="showModal()" class="icon_comentario" src="@/assets/revision_.svg" style="width:68%;margin-bottom: 47%;" > -->
   <!--      </a>
    </div> -->
</div>
</template>

<script>
import {
    mapState,
    mapMutations
} from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import cameraComponent from './CameraComponent';

export default {
    data() {
        return {
            isLoading: false,
            fullPage: true,
            pre_checking: 0,
            full_name: '',
            title_lang:'',
            showimage:true,
            scrollPosition: null,
            src: './img/main_logo.jpg',
            display: true,
            displayStyle: 'img_new',
            subscription :'',
            textComment:'',
            value:'',
            services: []
         
        
        };
    },

    components: {
        Loading,
        cameraComponent
    },
    created() {
        const {
            fullPath
        } = this.$route;

    },

    computed: {
        ...mapState(["languages","checking","fullname","user"]),
      
        currentRouteName() {
            return this.$route.name;
        },
    },
    methods: {
        back: function(){ 
            this.$router.go(-1);
        },
        imgFile(file) {
           
        },
        baseSeisCuatro(evento) {
            this.savePictureBaseSeisCuatro(evento).then((res) => {
               
            })
        },
        turnCameraOn() {
            this.$children[2].executeCamera()
        },
        switchLocale() {
            this.title_lang =   (this.$i18n.locale == 'en') ? 'English' : 'Español';
            this.$i18n.locale = this.locale === "English" ? "en" : "es";
            this.locale = this.$i18n.locale === "en" ? "English" : "Español";

        },

        logout() {
            this.isLoading = true;
            this.$store
                .dispatch("logout")
                .then((response) => {
                   
                    this.$router.push({
                        name: "Login"
                    });
                })
                .catch((error) => {
                    // if (error.status === 401) {
                        this.$route.push({
                            name: "Login"
                        });
                    // }
                    this.errored = true;
                })
                .finally(() => (this.isLoading = false));
        },

        scrollHeader(){
          window.onscroll = () => {
            let scrollTop      = document.documentElement.scrollTop;

            if (scrollTop > 300 ) {
                this.display = false
                this.src = './img/new_logo_scroll.png'
            } else {
                this.display = true
                this.showimage = true
                this.src = './img/main_logo.jpg'
            }
          };
        },
        habilitarNotificaciones(){
            this.activarNotificaciones().then(sub => {
            console.log("valor de sub: "+ sub)
            this.$refs['my-modal'].hide();
        
    })
    },
    abrirModal(){
         this.$refs['my-modal'].show();
    },
    cerrarModal() {
      this.$refs['my-modal'].hide();
    },
    showModal(value) {
      this.valor = value;
      this.$refs["comentario"].show();
    },
    hideModal() {
      this.$refs["comentario"].hide();
    },
    saveComment() {
        if (this.value == '' || this.textComment  == '' ) {
             this.$toast.default("Debe Completar los Campos!", {
                    position: "top",
                    duration: "3000",
                });
        } else {
            this.isLoading = true;
            this.$store
            .dispatch("saveComment", {
                service_area_id: this.value,
                description: this.textComment,
                hotel_id: this.hotel_id,
                user_id: this.user_id,
                reservation_id: this.reservation.id,

            })
            .then((response) => {
               
              if (response) {
                this.$refs["comentario"].hide();
                this.value = '';
                this.textComment  = ''
                this.$toast.default("Comentario guardado con exito!", {
                    position: "top",
                    duration: "3000",
                });
              }
            })
            .catch((error) => {
                this.errored = true;
            })
            .finally(() => (this.isLoading = false));
        }

    },
    async getServiceAreas() {
        //console.log(this.hotel_id)
        let response = await axios.get(this.BASE_URL + "/get-service-area" + '/' + this.hotel_id , {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        })
        this.services = response.data
  
    },
   
    },
    mounted() {
  
        this.title_lang =   (this.$i18n.locale == 'en') ? 'Español' : 'English';
        this.$i18n.locale = this.locale === "English" ? "en" : "es";
        this.full_name =    this.user.full_name;
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        this.scrollHeader();
        this.getServiceAreas();
        this.buscarSuscripcion()
            .then(sub => {
            
                console.log(this.subscription)
                if (sub === null) {
                     this.subscription = sub
                } else {
                    this.subscription = sub
                    console.log('Existe una suscripcion activa', sub);

                }

                
            });
    },
};
</script>

<style scoped>
.footer {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: white;
   color: white;
   text-align: center;
   z-index: 999;
   padding: 0px;
/*   box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 50%);*/
}
.acept_comentario{
    background: #585858;
    color: white;
}
.buttonsFooter {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.bt_subscription{
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.btn-notify {
  border: 1px solid #94700a;
  background-color: #94700a;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  min-width: 142px;

}

.btn-notify_2 {
  border: 1px solid #94700a;
  background-color: black;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  min-width: 142px;
  color: white;
}
.huesped{
    color: black;
    font-family: 'FonstFree';
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px
}
.text-upercase{
    text-transform: uppercase;
    font-family: "FonstFree";
}
.navbar {
    padding: 0px !important;
}

.navbar-nav {
    background-color: #fff;
    padding: 9px;
}

.navbar-brand {
    display: inline-block;
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-left: 10px;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
}

.navbarApp {
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
}

.active {
    border-bottom: 6px solid #94700a;
    padding-top: 9px;
    color: black !important;
    width: fit-content;
}

.navBar .nav-item {
    font-size: 20px;
}

.navBar {
    height: 72px;
}

.dropdownLang span,
.dropdownUser span {
    
    color: black;
    font-family: 'FonstFree';
    text-transform: uppercase;
    font-weight:bold;
    
}

.jumbotron {
    background-color: navy;
    color: white;
    border-radius: 0;
    height: 202px;
}

.router-link-active {
    color: white !important;
}

.container-fluid {
    width: 100%;
    padding-right: -15px;
    padding-left: -15px;
    margin-right: auto;
    margin-left: auto;
}

/*
    .bg-info {
       background: rgb(35,40,40);
       background: linear-gradient(0deg, rgba(35,40,40,1) 45%, rgba(87,86,85,1) 100%);
    }
    */

.navbar-dark .navbar-toggler {
    color: #ae8a15;
    border-color: #ae8a15;
}

.navbar-light .navbar-toggler {
    color: rgba(0, 0, 0, 0.5);
    border-color: rgba(0, 0, 0, 0.1);
    margin: 8px;
}

.bg-info {
    background-color: #fff !important;
}

.navbar-dark .navbar-toggler {
    color: #ae8a15;
    border-color: #ae8a15;
}

.navbar-dark .navbar-brand {
    color: #1b1a1a;
}

.navbar-dark .navbar-nav .nav-link {
    color: rgb(23 21 21 / 93%);
}

.img_new{
    margin: 50%;
    margin-top: 134%;
}

.imgshow{
    display: none;
}

.imgprincipal{
    margin-left: 6%;
}



@media screen and (min-width: 990px) {
    .navBar .navbar-nav {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .navbar {
        padding: 0px !important;
        position: fixed !important;
    }

    .btn-whatsapp {
        display:block;
        width:70px;
        height:70px;
        color:#fff;
        position: fixed;
        right:20px;
        bottom:20px;
        border-radius:50%;
        line-height:80px;
        text-align:center;
        z-index:999;
    }

    .btn-comentario {
        display: block;
    width: 55px;
    height: 55px;
    color: #fff;
    position: fixed;
    /* right: -11px; */
    bottom: 27px;
    border-radius: 50%;
    line-height: 80px;
    text-align: center;
    z-index: 999;
    background: rgb(191 131 3);
    cursor:pointer;
   
    }
}

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    .imgshow{
        display: block;
        margin-right:12%;
    }

    .imgprincipal{
        display: none;
    }

    .go{

    margin-left: -15px;
    }

    .icon_watsapp{
       width: 70px;
    }
  
}
@media only screen and (device-width : 375px) and (device-height : 812px) 
    and (-webkit-device-pixel-ratio : 3) {
        .imgshow{
            display: block;
            margin-right:12%;
        } 
    }




.btn-whatsapp{
    display: block;
    width: 25px;
    height: 25px;
    color: #fff;
    position: fixed;
    right: 47px;
    bottom: 72px;
    border-radius: 50%;
    line-height: 80px;
    text-align: center;
    z-index: 999;
}

    .btn-comentario {
     display: block;
    width: 55px;
    height: 55px;
    color: #fff;
    position: fixed;
    /* right: -11px; */
    bottom: 27px;
    border-radius: 50%;
    line-height: 80px;
    text-align: center;
    z-index: 999;
    background: rgb(191 131 3);
    left: 4%;
    }


</style>
