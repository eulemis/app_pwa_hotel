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
            <div class="col-md-6 img_huesped title_pago">
                 <div  class="text-center title_type_payment">
                    <h3  style="font-size: 20px; font-weight: bold"  class="font" >Forma de Pago</h3>
                 </div>
              <div v-show="paymentform" class="checkbox-list">
                  
                    <b-form-radio class="font"    v-model="chk_method_payment" name="method_payment" value="Efectivo" switch size="lg">
                        Efectivo
                    </b-form-radio>
                    <b-form-radio class="font"    v-model="chk_method_payment" name="method_payment" value="TDC" switch size="lg">
                        Tarjeta de Crédito y/o Débito
                    </b-form-radio>
                    <b-form-radio class="font"    v-model="chk_method_payment" name="method_payment" value="Zelle" switch size="lg">
                        Transferencias y/o Zelle
                    </b-form-radio><br>
                <div class="text-center">
                    <button style="width:30%"  class="btn btn-primary bt_submit font" @click="confirmPayment()">
                        Confirmar
                    </button><br>
                </div>
                </div>
                <div v-show="paymentresumen" class="checkbox-list">
                    <div class="edit_payment">
                        <b-icon @click="habilitarPayment()" icon="pencil-square" font-scale="2" style="cursor:pointer;color:#ae8000"></b-icon>
                    </div>
                    <div class="row resumen">
                        <h4 class="type_payment"><b-icon icon="check-circle" font-scale="1" style="cursor:pointer;color:#ae8000"></b-icon>&nbsp;&nbsp;{{ type_payment }}</h4>
                        <h5 class="message_payment">Realizar el pago Directamente en el Hotel</h5>
                    </div>
                
                </div> 
                <div v-show="paymentresumenwithimage" class="checkbox-list-transfer">
                    <div class="edit_payment">
                        <b-icon @click="habilitarPayment()" icon="pencil-square" font-scale="2" style="cursor:pointer;color:#ae8000"></b-icon>
                    </div>
                    <div class="row resumen">                    
                        <img  class="img_services_payment"  v-bind:src="imagePayment" alt="">
                        <h4 class="type_payment_transfer"><b-icon icon="check-circle" font-scale="1" style="cursor:pointer;color:#ae8000"></b-icon>&nbsp;&nbsp;{{ type_payment }}</h4>
                        <!--<h5 class="message_payment">Realizar el pago Directamente en el Hotelgggggggggggg</h5>-->
                    </div>
                
                </div> 
                <UploadImageNew v-show="showcomponent"></UploadImageNew>
            </div>
            <b-modal class="confirmedModal" ref="confirmpayment" size="lg" hide-footer hide-header>
                <h5 class="text-center">Realizar el pago Directamente en el Hotel</h5>
                <div class="text-center img_payment">
                    <img  src="@/assets/payment_black.png" alt="Center image" width="80px">
                </div>
                <h5 class="text-center">Su Pre check In fue realizado con éxito.</h5>
                <div class="buttonsFooter text-center">
                <b-button class="btn-modal " @click="returnHome()">
                  Finalizar
                </b-button>
              </div>
            </b-modal>
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
        paymentform:true,
        paymentresumen:false,
        paymentresumenwithimage:false,
        value:'',
        receipofpayment:'',
        imagePayment:'',
        type_payment:''
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
                 //this.makeToast();
                 this.$refs["confirmpayment"].show();
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
    showConfirmedModal() {
      this.$refs["confirmpayment"].show();
    },
    hideConfirmedModal() {
      this.$refs["confirmedModal"].hide();
    },
    returnHome() {
        this.$router.go(-1);
    },
    back: function () {
      this.$router.go(-1);
    },
    async  getUser() {

        let response = await axios.get(this.BASE_URL+"/get-user-reservation"+'/'+this.user.id+'/'+this.reservation.id, {
              headers: {
              Authorization: 'Bearer ' + this.token 
            }
        })

        this.imagePayment    = response.data.image_pay;
        this.receipofpayment = (response.data.method_payment) ? 1 : 0;
        this.type_payment    = (response.data.method_payment) ? response.data.method_payment : '';

        if (this.receipofpayment == 1 ) {
            if(this.type_payment == 'Zelle') {
                this.type_payment += ' / Transferencia';
                this.paymentresumen = false;
                this.paymentform = false;
                this.paymentresumenwithimage = true;
            } else {
                this.paymentresumen = true;
                this.paymentform = false;
                this.paymentresumenwithimage = false; 
            }
       
        } else {
            this.paymentresumen = false;
            this.paymentform = true;
            this.paymentresumenwithimage = false;
        }
        
    },
    habilitarPayment(){
        this.paymentresumen = false;
        this.paymentform = true;
        this.paymentresumenwithimage = false; 
    }
    },
    mounted () {
        this.getUser(); 
    },


};
</script>


<style scoped>
.edit_payment{
    display: flex;
    justify-content: flex-end;
}
.img_services_payment{
    width:90%; 
    margin:auto;
    
}
.resumen{
    display: flex;
    flex-direction: column;
    padding: 7%;
}
.message_payment{
    margin: auto;
    border: 1px solid #ae8000;
    padding: 19px;
    margin-top: 8%;
}
.type_payment{
    margin-left: 15px;
}
.type_payment_transfer{
    margin: auto;
    margin-top: 20px;
}
.img_payment{
    /*margin-bottom: -22px;*/
}
.payment_title{
    text-align: left;
}
.title_type_payment{
    width: 87%;
    display: flex;
    justify-content: center;
    margin-top: 16%;
}
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
    margin-top: 3%;
    margin-left: 9%;
    background-color: white;
    width: 70%;
    height: 456px;
    padding: 15px;
   /* box-shadow: 4px 4px 10px 0px rgb(0 0 0 / 50%);*/
}

.checkbox-list-transfer{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: -2%;
    margin-left: 9%;
    /*  background-color: white;*/
    width: 70%;
    padding: 15px;
}

h3{
    text-align: center;
}
  .font{
    font-family: "FonstFree";
  }
  .btn-modal {
  border: 1px solid #94700a;
  background-color: #94700a;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  min-width: 142px;
  color: white;
  font-family: "FonstFree";
  text-transform: uppercase;
  font-size: 80%;
}

.title_pago{
  margin-top: -44px;
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
    .img_huesped{
        margin-top: -21%;
    }
    h5{
        margin-top: 10%;
    }
    .checkbox-list{
        display: flex;
        justify-content: space-around;
        background-color: white;
        height: 456px;
        padding: 15px;
/*        box-shadow: 0px 0px 1px 0px rgb(0 0 0 / 50%);*/
        margin: auto;
        width: 100%;
        margin-top: 15%;
    /*    border-radius: 28px;*/
    }

    .checkbox-list-transfer{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-top: 3%;
        background-color: white;
        width: 100%;
        padding: 15px;
        margin-left: 0% !important;
    }

    .img_services_payment{
        width:100%; 
        margin:auto;
        margin-left: 8%;
    }
    .type_payment_transfer{
       text-align: center;
        margin-top: 20px;
        font-size: 20px;
    }
    .message_payment{
        text-align: center;
        width: 120%;
    }
    .resumen{
        width: 92%;
        margin-top: -15%;
    }

    .title_type_payment{
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: -4%;
    }
   
    
}
</style>