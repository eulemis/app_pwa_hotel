<template>
<b-container class="container">
        <div class="row">
            <div class="col-md-12" style="margin-top: -71px;">
                <h5 class="font" style="text-align:center;margin-top:5%">{{ $t("title_identity") }}</h5><br>  
                 <img  v-show="view"   class="img_services" v-if="imagenIdentity"  v-bind:src="imagenIdentity" alt="">
                 <img style="width: 80%; height: auto; margin-left:5%;" v-show="view"   class="img_services" v-else  src="@/assets/add_img_web.svg" alt="">
            </div>
        </div>
    <b-row class="justify-content-center">
        <b-col cols="12" md="6" lg="6">
            <div class="text-center">
                <b-img  class="img" center rounded v-bind:src="imagePreview" v-show="showPreview"></b-img>
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
    <b-row  v-if="imagenIdentity"  class="justify-content-center mt-5">
        <b-col style="text-align: center;" cols="12" md="6" lg="6">
            <button style="width:60%" v-if="!previewCamera" class="btn btn-primary bt_submit" @click="turnOnCamera()">
                {{ $t("foto") }} <b-icon icon="camera" font-scale="1"></b-icon>
            </button><br>
            <button style="width:60%;margin: 20px" v-if="previewCamera" class="btn btn-primary bt_submit" @click="takeNewPicture()">
                {{ $t("new_foto") }} <b-icon icon="upload" font-scale="1"></b-icon> 
                <br>
            </button><br>
            <button style="width:60%" class="btn btn-secondary bt_submit" @click="clipFile()">
                {{ $t("upload_file") }} <b-icon icon="upload" font-scale="1"></b-icon> 
            </button>     
        </b-col>
    </b-row>
    <b-row  v-else class="justify-content-center mt-3">
        <b-col style="text-align: center;" cols="12" md="6" lg="6">
            <button style="width:60%" v-if="!previewCamera" class="btn btn-primary bt_submit" @click="turnOnCamera()">
                {{ $t("foto") }} <b-icon icon="camera" font-scale="1"></b-icon>
            </button><br>
            <button style="width:60%;margin: 20px" v-if="previewCamera" class="btn btn-primary bt_submit" @click="takeNewPicture()">
                {{ $t("new_foto") }} <b-icon icon="upload" font-scale="1"></b-icon> 
                   <br>
            </button><br>
            <button style="width:60%" class="btn btn-secondary bt_submit" @click="clipFile()">
                {{ $t("upload_file") }} <b-icon icon="upload" font-scale="1"></b-icon> 
            </button>

        </b-col>
    </b-row>
    <b-row v-if="imagenIdentity"  class="justify-content-center mt-5">
        <b-col style="text-align: center;margin-top: -27px;" cols="12" md="6" lg="6">
            <button style="width:60%" class="btn btn-success bt_submit" :disabled="file === null" @click="submitFile2()">
                Enviar
            </button>
        </b-col>
    </b-row>
    <b-row v-else  class="justify-content-center mt-5">
        <b-col style="text-align: center;margin-top: -27px;margin-bottom:14%" cols="12" md="6" lg="6">
            <button style="width:60%" class="btn btn-success bt_submit" :disabled="file === null" @click="submitFile2()">
                Enviar
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
        view:true,
        imagenIdentity:'',
    }),
    computed: {
        ...mapState(["user_id","user"]),
    
    },
    created(){
        this.imagenIdentity = this.imagenIdentity;
    },
    components: {
        cameraComponent
    },

    methods: {
        takeNewPicture() {
            this.file =''
            this.base64File = false
            this.previewCamera = false
            this.view  = false
            this.turnOnCamera()

        },
        turnOnCamera() {
            this.imagePreview = ''
            this.showPreview = false
            this.takePicture = true
            this.showDialog = true
            this.base64File = true
            this.view  = false
            setTimeout(() => {
                this.$children[0].executeCamera()
            }, 100)
        },
        clipFile() {
            this.takePicture = false
            this.showDialog = true
            this.previewCamera = false
            this.view  = false
            this.imagePreview = ''
        },
        baseSeisCuatro(evento) {
            this.previewCamera = true
            this.file = evento
            this.base64File = true
        },
        //          Submits the file to the server
        submitFile2() {
            this.$store.commit("uploadImage", true);
            //            Initialize the form data
            let formData = new FormData();

            //         Add the form data we need to submit
            formData.append("image_doc_huesped", this.file);
            formData.append("id", this.user_id);
            formData.append("bandera", 1);// El Valor 1 indica que se esta enviando una copia de cedula o pasaporte
            if (this.base64File) {
                formData.append("flag", 0);
            } else {
                formData.append("flag", 1);
            }

            /*
                Make the request to the POST /single-file URL
              */
            axios.post(`${ENV.BASE_URL}/save_image`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    if (res) {
                        this.imagenIdentity = res.data.image_document 
                    }
                
                    this.previewCamera = false
                    this.showDialog = false
                    this.$store.commit("uploadImage", false);
                    this.$toast.default("Archivo guardado con exito!", {
                        position: "top"
                    });
                    this.imagePreview = "";
                    this.getUser();
                    setTimeout(() => {
                    //this.$router.go(0);         
                    }, 600);
                        })
                .catch(function () {
                
                    this.$toast.error("No se subio la imagen, intente nuevamente!", {
                        position: "top"
                    });
                });
        },
        async  getUser() {
           let response = await axios.get(this.BASE_URL+"/get-user"+'/'+this.user.id, {
                  headers: {
                  Authorization: 'Bearer ' + this.token 
                }
            })
           console.log(response.data.image_document )
                this.imagenIdentity = response.data.image_document 
                this.view = true;    
          },

        // Handles a change on the file upload
        handleFileUpload() {
            this.base64File = false

            /*
                Set the local file variable to what the user has selected.
              */
            this.file = this.$refs.file.files[0];
           
            /*
                Initialize a File Reader object
              */
            const reader = new FileReader();

            /*
                Add an event listener to the reader that when the file
                has been loaded, we flag the show preview as true and set the
                image to be what was read from the reader.
              */
            //Check to see if the file is not empty.

            if (this.file) {
      
                if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
           
                    reader.readAsDataURL(this.file);
                }
            }
            reader.onload = (e) => {
                this.showPreview = false;
                this.imagePreview = e.target.result;
            };
        },
    },
    mounted () {
    //console.log(this.user.image_document)
       // this.imagenIdentity = this.user.image_document,
        this.getUser(); 
     },
};
</script>

<style scoped>
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
.font{
    font-family: "FonstFree";
}
.img_services{
    width: 100%; 
    height: 300px; 
    margin-left: 3%;
}
@media only screen and (min-device-width: 320px) and (max-device-width: 480px){
   .img_services{
        width: 100%; 
        height: 300px; 
        margin-left: 3% !important;

    } 
}
</style>
