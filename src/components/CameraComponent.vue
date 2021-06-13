<template>

<div class="cameraContainer">
  
    <div class="cameraImagen" :class="[cameraFlag ? 'show' : 'hide']">
        <video ref="videoPlayer" autoplay style="height: 100%; max-width:100%;"></video>
    </div>
    <div class="buttonsContainer" v-if="cameraFlag">
        <div class="row button_camara">
            <div>
                <button @click="capturePicture" class="btn btn-success">
                    <b-icon icon="camera"></b-icon>
                </button>
            </div>
            <div>
                <button @click="turnOff" class="btn btn-danger">
                    <b-icon icon="power"></b-icon>
                </button>
            </div>
            <div v-if="camara && camara.twoCameras">
                <button @click="turnCamera" class="btn btn-warning">
                    <b-icon icon="arrow-repeat"></b-icon>
                </button>
            </div>
        </div>

    </div>
</div>
</template>

<script>
class Camera {
    constructor(videoNode, size = {
        width: 300,
        height: 300
    }) {
        this.constraints = {
            audio: false,
            video: {
                facingMode: "user",
                width: size.width,
                height: size.height
            }
        };
        this.videoNode = videoNode
        this.twoCameras = false
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            devices.forEach((device) => {
                if (device.label.includes('back')) {
                    this.twoCameras = true
                }
            })
        })
    }

    turnOn() {
        navigator.mediaDevices.getUserMedia(this.constraints).then((stream) => {
            this.videoNode.srcObject = stream
            this.stream = stream
        }).catch((err) => {
            
        });
    }

    turnOff() {
        this.videoNode.pause();
        if (this.stream) {
            this.stream.getTracks()[0].stop();
        }
    }

    takePicture() {
        let canvas = document.createElement('canvas');
        canvas.setAttribute('width', 300)
        canvas.setAttribute('height', 300)

        let context = canvas.getContext('2d');

        context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);
        this.foto = context.canvas.toDataURL();
        canvas = null;
        context = null;

        return this.foto;
    }

    switchCamera() {
        if (this.twoCameras) {
            if (this.constraints.video.facingMode === "user") {
                this.constraints.video.facingMode = 'environment'
            } else {
                this.constraints.video.facingMode = 'user'
            }
            this.turnOn()
        }
    }
}

export default {
    name: 'CameraComponent',
    data() {
        return {
            camara: null,
            cameraFlag: false
        }
    },
    mounted() {
        this.camara = new Camera(this.$refs['videoPlayer'], {
            width: 480,
            height: 480
        })
    },
    methods: {
        executeCamera() {
            this.cameraFlag = true
            this.camara.turnOn()
        },
        turnOff() {
            this.cameraFlag = false
            this.camara.turnOff()
        },
        capturePicture() {
            let picture = this.camara.takePicture();
            setTimeout(() => {
                this.cameraFlag = false
                this.turnOff()
            }, 100)
            this.$emit('imgBase', picture)

            // this.base64ToFile(picture).then((imgFile) => {
            //     this.$emit('file', imgFile)
            // })
        },
        turnCamera() {
            this.camara.switchCamera()
        },
        base64ToFile(picture) {
            return fetch(picture)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], new Date().valueOf(), {
                        type: "image/png"
                    })
                    return file
                })
        }
    }
}
</script>

<style>
.cameraContainer {}

.cameraContainer .cameraImagen {
    text-align: center;
    margin: auto;
}

.button_camara {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.hide {
    display: none;
}

/* Smartphones (portrait & landscape) */
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    .button_camara {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

}
</style>
