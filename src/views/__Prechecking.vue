<template>
  <div class="prechekin">
<loading
    :active.sync="isLoading"
    :can-cancel="true"
    :is-full-page="fullPage"
>
</loading>
   
        <div class="information_huesped">   
            <b-row>
                <b-col cols="12" md="3">
                    <label class="font" for="datepicker-valid"><strong>{{$t('full_name')}}</strong></label>
                    <b-form-input disabled class="input_" v-model="this.fullname" style="border:none">
                    </b-form-input>
                </b-col>
                <b-col cols="12" md="3">
                    <label class="font" for=""><strong>{{$t('phone')}}</strong></label>
                    <b-form-input disabled class="input_" v-model="this.phone" style="border:none">   
                     </b-form-input>
                </b-col>
                <b-col cols="12" md="3">
                    <label class="font" for=""><strong>{{$t('email')}}</strong></label>
                    <b-form-input disabled class="input_" v-model="this.email" style="border:none">
                     </b-form-input>
                </b-col>
                   <b-col cols="12" md="3">
                    <label class="font" for=""><strong>{{$t('reservation')}}</strong></label>
                    <b-form-input disabled class="input_" v-model="this.reservation.num_reservation" style="border:none">
                    </b-form-input>
                </b-col>
            </b-row>

        </div>
        <div style="padding:10px;" class="row">
            <div class="col-md-6 img_huesped">
                <UploadImage></UploadImage>
            </div>
            <div class="col-md-6 img_huesped">
                <div v-show="paymentform" class="checkbox-list">
                    <h4 class="font">Seleccione su forma de Pago</h4>
                    <b-form-radio class="font"   v-model="chk_method_payment" name="method_payment" value="Efectivo" switch size="lg">
                        Efectivo
                    </b-form-radio>
                    <b-form-radio class="font"   v-model="chk_method_payment" name="method_payment" value="TDC" switch size="lg">
                        Tarjeta de Crédito y/o Débito
                    </b-form-radio>
                    <b-form-radio class="font"   v-model="chk_method_payment" name="method_payment" value="Zelle" switch size="lg">
                        Transferencias y/o Zelle
                    </b-form-radio><br>
                <div class="text-center">
                    <button style="width:30%"  class="btn btn-primary bt_submit font" @click="confirmPayment()">
                        Confirmar
                    </button><br>
                </div>
                </div> 
                <UploadImageNew v-show="showcomponent"></UploadImageNew>
            </div>
        </div>
 
  </div>
</template>

<script>
import ENV from "../config";
import axios from "axios";
import UploadImage from "../components/UploadImage";
import UploadImageNew from "../components/UploadImageNew";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import { mapState } from "vuex";
export default {
  components: {
    UploadImage,
    UploadImageNew,
    Loading,
  },
  /*
      Defines the data used by the component
    */
  data() {
    return {
        showLoading: true,
        checked: false,
        checked1: false,
        checked2: false,
        chk_method_payment: '',
        showcomponent:false,
        paymentform:true
  }


  },
  computed:{
    ...mapState(["isLoading", "fullPage","reservation","user","fullname","checking","email","phone","num_reservation","isOnline"]),
  },
  methods: {
    optionPayment(id){
        this.showcomponent = true;
        this.paymentform   = false;
    },
    makeToast() {
        this.$bvToast.toast('Realizar el pago Directamente en el Hotel', {
            title: `Información`,
            solid: true,
            variant: 'warning',
        })
        this.checked  = false;
        this.checked1 = false;
        
    },
    saveMethodPayment(){     
        axios.post(`${ENV.BASE_URL}/save_method_payment`, {
              user_id: this.user_id,
              reservation_id: this.reservation.id,
              method_payment: this.chk_method_payment,
          })
          .then((res) => {
    
                if (res) {
                   this.imagePayment = res.data
                }
          })
          .catch(function () {
              
          });
    },
    
    confirmPayment() {     
        if (this.chk_method_payment != ''){
            this.saveMethodPayment();
            if(this.chk_method_payment != 'Zelle') {
                 this.makeToast();
             } else {
                this.optionPayment()
             }
        } else {
            this.$bvToast.toast('Debe Seleccionar un Método de Pago', {
            title: `Notificación`,
            solid: true,
            variant: 'danger',
        })
        }
      

       
    },
    async  getUser() {
        let response = await axios.get(this.BASE_URL+"/get-user-reservation"+'/'+this.user.id+'/'+this.reservation.id, {
              headers: {
              Authorization: 'Bearer ' + this.token 
            }
        })
  
        this.imagePayment = response.data.image_pay;
        //console.log(this.imagenIdentity != 'null')

/*        if(this.imagenIdentity != 'null')   {
            this.showcomponent = true;
            this.paymentform   = false;
        }*/
        
    }
    },
    mounted () {
        this.getUser(); 
    },


};
</script>


<style scoped>
.btn-primary {
    color: #fff;
    background-color: #A17E13;
    border-color: #A17E13;
}

.prechekin{
    background-image: url("~@/assets/Background.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}
div.content img {
  max-width: 1000px;
  max-height: 200px;
  margin-bottom: 20px;
  border-radius: 8px;
}
.bt_submit {
  width: 100%;
}

.inp {
  padding: 3px;
}


.input_{
     border: 2px solid #a0a3a7;
    height: 45px;
}
.information_huesped{
    margin: 0% 5%;
    margin-top: 6%;
    font-family: "FonstFree";
}
  .checkbox-list{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 15%;
    margin-left: 9%;
    background-color: white;
    width: 70%;
    height: 456px;
    padding: 15px;
    box-shadow: 4px 4px 10px 0px rgb(0 0 0 / 50%);
  }
  h3{
    text-align: center;
  }
  .font{
    font-family: "FonstFree";
  }

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    .prechekin{
        margin-bottom: 20%;
    }
    .information_huesped {
        max-width: 1528px;
        margin-top: 18%;
        padding: 9px;
    }
   /* .img_huesped{
        margin-top: -21%;
    }*/
    h5{
        margin-top: 10%;
    }
    .checkbox-list{
        display: flex;
        justify-content: space-around;
        background-color: white;
        height: 456px;
        padding: 15px;
        box-shadow: 0px 0px 1px 0px rgb(0 0 0 / 50%);
        margin: auto;
        width: 100%;
        margin-top: 15%;
    /*    border-radius: 28px;*/
    }
}
</style>