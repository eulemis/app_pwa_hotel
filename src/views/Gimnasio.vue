<template>
    <div>
        <a name="inicio_gym"></a>
        <div class="main-salones">

            <h1 class="salones">Gimnasio</h1> 
            <p class="txt_gym">Amplias instalaciones y modernos equipos para que pueda disfrutar de un momento de esparcimiento y relajación en uno de los gimnasios más exclusivos de la capital.</p>
            <div class="underline"></div>
            <div>
                <h3 class="txt_horario">Horarios:</h3>
                <p class="horario">
                    Lunes a viernes 6:00 am a 7:00 pm (Semana flexible)<br> 
                    Lunes a viernes 6:00 am a 5:00 pm (Semana radical) <br>
                    Sábados 9:00 am a 2:00 pm (Semana flexible y radical)<br>
                </p>
            </div>
                <p class="txt_gym">  <strong>Acceso gratuito a las instalaciones para huéspedes del hotel.</strong></p>
            
            <vueper-slides
                class="no-shadow"
                :visible-slides="1"
                :slide-ratio="1 / 2"
                :dragging-distance="40"
                :gap="3"
                :autoplay="true"
                :arrows="false"
            >
            <vueper-slide v-for="(slide, i) in slides"
                :key="i"
                :image="slide.image"
            />
            </vueper-slides>
        </div>
    </div>
</template>
<script>
    import { VueperSlides, VueperSlide } from 'vueperslides';
    import 'vueperslides/dist/vueperslides.css';

    export default {
        components: {
            VueperSlides, 
            VueperSlide
        },
        data() {
            return{
                selected:1,
                slides: [
                    {
                        title: '',
                        content: '',
                        image: require('@/assets/gym/gym-1.png'),
                    },
                    {
                        title: '',
                        content: '',
                        image: require('@/assets/gym/gym-2.png'),
                    },
                    {
                        title: '',
                        content: '',
                        image: require('@/assets/gym/gym-3.png'),
                    },
                    {
                        title: '',
                        content: '',
                        image: require('@/assets/gym/gym-4.png'),
                    },
                ]
            }
        }
    }
</script>
<style scoped>
    .txt_gym{
        text-align: center;
        font-size: 20px;
        font-family: "FonstFree";
    }
    .txt_horario{
        text-align: center;
        font-size: 22px;
        font-family: "HelveticaBold";
        text-transform: uppercase;
    }
    .horario{
        text-align: center;
        font-size: 20px;
        font-family: "FonstFree"; 
        }
    .main-salones{
        padding: 40px;
    }
    .salones{
        margin-top: 60px;
        font-family: "HelveticaBold";
        text-transform: uppercase;
        text-align: center;
    }
    .content-room{
        width: 100%;
        background-color: #f5f5f552;
        /*border-radius: 15px;*/
        box-shadow: 0px 0px 1px 0px rgb(0 0 0 / 0.5);
    }
    .list_room{
        margin: 3% 4% 4% 10%;
    }
    .list_room p{
        font-size: 30px;
    }
    .title-room{
        color: black;
        font-size: 48px;
        font-weight: bold;
        text-decoration: underline;
        margin-top: 30px;
    }
    .title{
        font-family: "HelveticaBold";
        font-size: 30px;
    }

    .underline{
      
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: .5em;
        margin-bottom: 1em;
        height: 3px;
        background:#be8202;
        text-align: left;
    }

    .p_text, .text-desc{
        text-align: justify;
        font-family: "FonstFree";
        font-size: 110%
    }

    @media only screen and (min-device-width: 320px) and (max-device-width: 480px){
        .main-salones{
            padding: 20px;
        }
        .select{
            width:300px;
        }
        .salones{
        
            font-size:  28px;
        }
        .list_room p{
            font-size: 14px;
        }
        .title-room{
            font-size: 25px;
        }
        .p_text{
            font-size: 92%;
        }
        .title{
            font-family: "HelveticaBold";
            font-size: 20px;
        }

        .content-room{
            margin-bottom: 19%;
        }
        .txt_gym{
            text-align: center;
            font-size: 16px;
            font-family: "FonstFree";
        }

        .horario{
            text-align: center;
            font-size: 14px;
            font-family: "FonstFree"; 
        }

    }
    @media only screen and (device-width : 375px) and (device-height : 812px) 
    and (-webkit-device-pixel-ratio : 3) {
        .main-salones{
            padding: 20px;
        }
        .salones{
            font-size:  28px;
        }
        .salones-select{
            margin-top: 0%;
        }
        .title{
            margin-top: 0;
        }
        .content-room{
            margin-bottom: 19%;
        }
        .txt_gym{
            text-align: center;
            font-size: 16px;
            font-family: "FonstFree";
        }

        .horario{
            text-align: center;
            font-size: 14px;
            font-family: "FonstFree"; 
        }
    }
</style>