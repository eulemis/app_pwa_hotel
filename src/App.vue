<template>
  <div>
    <div v-if="this.token">
      <Header></Header>
    </div>
    <router-view />
    <b-modal
      @ok="installPrompt()"
      ref="promptModal"
      size="sm" >

          <img src="@/assets/new_logo.png" width="100%" alt="">
   
      <p class="my-4">Desea agregar esta aplicacion a su escritorio?!</p>
    </b-modal>


<!--     <b-modal ref="my-modal" hide-footer title="Notificaciones">
      <div class="d-block text-center">
        <h5>¿Desea que <strong>Lidotel Venezuela</strong> envíe Notificaciones de su Orden? </h5>
      </div>
      <div class="buttonsFooter bt_subscription">
        <b-button class="btn-modal"  size="sm"   v-if="!getSuscripcion"   @click  = "habilitarNotificaciones">
         Permitir
        </b-button>
        <b-button class="btn-modal_2"  size="sm" @click="cerrarModal">
          Bloquear
        </b-button>
      </div>
       <b-button 
        v-if="!getSuscripcion"
        block 
        class   = "mt-3" 
        variant = "outline-success" 
        @click  = "habilitarNotificaciones">Permitir
      </b-button>  
    </b-modal>  -->   
  </div>
  
</template>

<script>
import BASE_URL from './config'
import BASE_URL_CALLS from './api_url'

import Header from "@/components/Header.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "home",
  components: {
    Header,
  },
  data() {
    return {
      deferredPrompt: null,
      serviceWorkerRegistation: null,
      message: null
    };
  },
  created() {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
     // this.$refs["promptModal"].show();
    });
  },
  computed: {
    ...mapState(["token"]),
  },
  mounted() {  

/*    this.buscarSuscripcion()
    .then(sub => {
        if (sub === null) {
            console.log('No hay suscripciones', sub);
        } else {
            console.log('Existe una suscripcion activa', sub);
        }

        this.$refs['my-modal'].show()
    })*/    
},
  methods: {
/*    habilitarNotificaciones(){
      this.activarNotificaciones()
    },*/
    desabilitarNotificaciones(){
      this.eliminarSuscripcion()
    },
    createPushNotification(){
      let user = JSON.parse(localStorage.getItem('user'))
      let body = {
        message: this.message,
        userId: user.id
      }
      fetch(`${BASE_URL_CALLS}/api/notify`,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then((response)=>{
          this.message = null
      })        
    },
    enabledNotification(){
      const notificationsOpts = {
        body: 'Cuerpo de la notificacion',
 
      }
      const notification =  new Notification('Hola baby',notificationsOpts)

    },
    installPrompt() {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        this.deferredPrompt = null;
      });
    }

  },
};
</script>

<style>
@font-face {
  font-family: "Futura_Std_Bold";
  src: local("Futura Std"),
   url(./fonts/futura-std-bold.ttf) format("truetype");
}

@font-face {
  font-family: "Helvetica";
  src: local("Helvetica"),
   url(./fonts/HelveticaNeue-Thin.ttf) format("truetype");
}

@font-face {
  font-family: "HelveticaBold";
  src: local("HelveticaBold"),
   url(./fonts/helvetica-lt-bold.ttf) format("truetype");
}

@font-face {
  font-family: "FonstFree";
  src: local("FonstFree"),
   url(./fonts/FontsFree.ttf) format("truetype");
}

@font-face {
  font-family: "Futura_Std_Book";
  src: local("Futura Std Book"),
   url(./fonts/futura-std-book.ttf) format("truetype");
}
/*@import url('https://fonts.googleapis.com/css2?family=Merienda&display=swap');
*/
.btn-modal {
  border: 1px solid #94700a;
  background-color: #94700a;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  min-width: 142px;
  margin:auto;
}

.btn-modal_2 {
  border: 1px solid #94700a;
  background-color: black;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  min-width: 142px;
}
.bt_subscription{
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
