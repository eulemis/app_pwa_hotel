<template>
<b-container class="container">
        <div class="row">
            <div class="col-md-12">
          
                <h5 class="font" v-show="optionPayment" style="text-align:center;margin-top:5%">{{ $t("title_upload") }}</h5><br>   
                <div v-show="optionPayment">
                    <img style="width: 70%; height: 300px; margin-left: 15%"  v-show="Fondo"    class="img_services" v-if="imagePayment"  v-bind:src="imagePayment" alt="">
                    <img style="width: 100%; height: 300px; margin-top:-26%;"   v-show="Fondo"    class="img_services" v-else src="@/assets/add_img_web.svg" alt="">
                </div>
            </div>
        </div>
    <b-row class="justify-content-center">
        <b-col cols="12" md="6" lg="6">
            <div class="text-center">
                <b-img class="img" center rounded v-bind:src="imagePreview" v-show="showPreview"></b-img>
            </div>
        </b-col>
    </b-row>
    <b-row v-if="!takePicture && showDialog" class="justify-content-center">
        <b-col cols="12" md="6" lg="6">
            <input class="form-control inp" type="file" id="file" ref="file" accept="image/*" @change="handleFileUpload()" />
        </b-col>
    </b-row>
    <b-row v-if="takePicture && showDialog" class="justify-content-center">
        <b-col cols="12" md="6" lg="6">
            <camera-component v-show="!previewCamera" @imgBase="baseSeisCuatro"></camera-component>
            <b-img class="img" center rounded v-bind:src="file" v-show="previewCamera"></b-img>
        </b-col>
    </b-row>
    <b-row v-show="optionPayment" v-if="imagePayment"  class="justify-content-center mt-5">
        <b-col style="text-align: center;margin-top:-26%;" cols="12" md="6" lg="6">
            <button style="width:60%" v-if="!previewCamera" class="btn btn-primary bt_submit" @click="turnOnCamera()">
                {{ $t("foto") }} <b-icon icon="camera" font-scale="1"></b-icon>
            </button><br>
            <button style="width:60%;margin: 20px" v-if="previewCamera" class="btn btn-primary bt_submit" @click="takeNewPicture()">
                {{ $t("new_foto") }} <b-icon icon="upload" font-scale="1"></b-icon> 
            </button><br>
            <button style="width:60%" class="btn btn-secondary bt_submit" @click="clipFile()">
                {{ $t("upload_file") }} <b-icon icon="upload" font-scale="1"></b-icon> 
            </button>

        </b-col>
    </b-row>
        <b-row v-else  class="justify-content-center mt-5">
        <b-col style="text-align: center;margin-top:-26%;" cols="12" md="6" lg="6">
            <button style="width:60%" v-if="!previewCamera" class="btn btn-primary bt_submit" @click="turnOnCamera()">
                {{ $t("foto") }} <b-icon icon="camera" font-scale="1"></b-icon>
            </button><br>
            <button style="width:60%;margin: 20px" v-if="previewCamera" class="btn btn-primary bt_submit" @click="takeNewPicture()">
                {{ $t("new_foto") }} <b-icon icon="upload" font-scale="1"></b-icon> 
                
            </button><br>
            <button style="width:60%" class="btn btn-secondary bt_submit" @click="clipFile()">
                {{ $t("upload_file") }} <b-icon icon="upload" font-scale="1"></b-icon> 
            </button> 

        </b-col>
    </b-row>
    <b-row v-show="optionPayment" v-if="imagePayment"  class="justify-content-center mt-5">
        <b-col style="text-align: center;margin-top: -27px;" cols="12" md="6" lg="6">
            <button style="width:60%" class="btn btn-success bt_submit" :disabled="file === null" @click="submitFile()">
                Submit
            </button>
        </b-col>
    </b-row>
    <b-row v-else  class="justify-content-center mt-5">
        <b-col style="text-align: center;margin-top: -27px;" cols="12" md="6" lg="6">
            <button style="width:60%" class="btn btn-success bt_submit" :disabled="file === null" @click="submitFile()">
                Submit
            </button>
        </b-col>
    </b-row>

</b-container>
</template>

<script>
import {
    mapState
} from "vuex";
import ENV from "../config";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import axios from "axios";
import cameraComponent from './CameraComponent';
export default {
    data: () => ({
        file: null,
        showPreview: false,
        imagePreview: "",
        takePicture: false,
        showDialog: false,
        previewCamera: false,
        base64File: false,
        Fondo:true,
        imagePayment:'',
        selected:false,
        optionPayment:true
    }),
    computed: {
        ...mapState(["user_id"]),
    },

    components: {
        cameraComponent
    },
     methods: {
        takeNewPicture() {
            this.file =''
            this.base64File = false
            this.previewCamera = false
            this.Fondo  = false
            this.turnOnCamera()

        },
        turnOnCamera() {
            this.imagePreview = ''
            this.showPreview = false
            this.takePicture = true
            this.showDialog = true
            this.base64File = true
            this.Fondo  = false
            setTimeout(() => {
                this.$children[0].executeCamera()
            }, 100)
        },
        clipFile() {
            this.takePicture = false
            this.showDialog = true
            this.previewCamera = false
            this.Fondo  = false
            this.imagePreview = ''
        },
        baseSeisCuatro(evento) {
            this.previewCamera = true
            this.file = evento
            this.base64File = true
        },
        //          Submits the file to the server
        submitFile() {
            this.$store.commit("uploadImage", true);
            //            Initialize the form data
            let formData = new FormData();

            //         Add the form data we need to submit
            formData.append("image_doc_huesped", this.file);
            formData.append("id", this.user_id);
            formData.append("reservation_id", this.reservation.id);            
            formData.append("bandera", 0);// El Valor 0 indica que se esta enviando un recibo de pago

            if (this.base64File) {
                formData.append("flag", 0);
            } else {
                formData.append("flag", 1);
            }

            /*
                Make the request to the POST /single-file URL
              */
            axios
                .post(`${ENV.BASE_URL}/save_image`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {

                        if (res) {
                        this.imagePayment = res.data.image_pay 
                    }
                       
                    this.previewCamera = false
                    this.showDialog = false
                    this.$store.commit("uploadImage", false);
                    this.$toast.success("Su Pre check In fue realizado con éxito.", {
                        position: "top"
                      
                    });
                    this.imagePreview = "";
                    this.getUser();
/*
                    setTimeout(() => {
                    this.$router.go(0);         
                    }, 600);*/
                })
                .catch(function () {
                    this.$toast.error("No se subio la imagen, intente nuevamente!", {
                        position: "top"
                  
                    });
                });
        },
        async  getUser() {
           let response = await axios.get(this.BASE_URL+"/get-user-reservation"+'/'+this.user.id+'/'+this.reservation.id, {
                  headers: {
                  Authorization: 'Bearer ' + this.token 
                }
            })
          
             this.imagePayment = response.data.image_pay;
             this.Fondo = true; 
         
     
          },
        

        // Handles a change on the file upload
        handleFileUpload() {
            this.base64File = false

            /*
                Set the local file variable to what the user has selected.
              */
            this.file = this.$refs.file.files[0];
         
            const reader = new FileReader();

            if (this.file) {
  
                if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {

                    reader.readAsDataURL(this.file);
                }
            }
            reader.onload = (e) => {
               
                this.showPreview = true;
                this.imagePreview = e.target.result;
            };
        },
        optionPago(){
            if(this.selected == false) {
                this.optionPayment = false
            } else {
                this.optionPayment = true
            }
    
        }
    },
      mounted () {
    
        this.imagePayment = this.user.image_pay,
        this.getUser();
          },
};
</script>

<style scoped>
.font{
    font-family: "FonstFree";
}
.container {
    margin-top: 5rem !important;
    font-family: "FonstFree";
}

.img {
    max-width: 50%;
}
.btn-primary {
    color: #fff;
    background-color: #A17E13;
    border-color: #A17E13;
}

.btn-secondary {
    color: #fff;
    background-color: #25231F;
    border-color: #25231F;
}

.btn-success {
    color: #fff;
    background-color: #7D661E;
    border-color: #7D661E;
}
/*.check{
    margin-left: 11px;
    font-size: 16px;
}*/
.text-center{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.zelle{
    margin-right: 14px;
    font-size: 18px;
}

</style>
