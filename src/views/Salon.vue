<template>
    <div class="main-salones">   
        <h1 class="salones">Salones y Terrazas</h1> 
        <h4 class="title">Ubicación: Terraza del piso 8 y Salones del piso 5.<br>
            <p style="padding-top: 3%">Previa reservación con nuestro equipo de Alimentos y Bebidas.</p>
        </h4>
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
        <div class="underline"></div>
        <div>
            <p class="p_text">LIDOTEL Centro Lido Caracas ofrece 1 terraza y 5 salas versátiles, cómodas y elegantes para cualquier tipo de eventos: Bodas, lanzamientos, showrooms, conferencias, reuniones de trabajo, congresos, entre otros. Todas las salas están equipadas con equipos de tecnología audiovisual y proporcionamos cualquier otro material de trabajo adicional que usted requiera. Además, nuestro Departamento de Alimentos y Bebidas ofrece una amplia variedad de menús para atender desayunos, almuerzos, cenas o coffee break.</p>
            <p class="p_text">  <strong>Para mayor información comunicarse con nuestro departamento de Recepción a través de la extensión 10 o del WhatsApp 0424-2517807</strong></p>
        </div>  
        

        <div class="salones-select">
            <div class="mt-3 mb-3 col-4">
                <label class="title">Salones</label>
                    <b-form-select
                    v-model="selected"
                    :options="salones"
                    class="mb-3 select"
                    value-field="id"
                    text-field="salon"
                    @change="changeLivinRoom($event)"
                    ></b-form-select>
            </div>
            <div class="row">
                <div class="content-room">
                    <div class="text-center">
                        <h2 class="title-room">{{title}}</h2>
                    </div>
                    <div class="list_room">
                        <p><strong>Dimensiones: </strong>{{dimensiones}}</p>
                        <p><strong>Teatro: </strong>{{teatro}}</p>
                        <p><strong>Tipo "U": </strong>{{tipo_u}}</p>
                        <p><strong>Escuela: </strong>{{escuela}}</p>
                        <p><strong>Banquetes: </strong>{{banquetes}}</p>
                        <p><strong>Media Luna: </strong>{{medialuna}}</p>
                        <p><strong>Cocktail: </strong>{{cocktail}}</p>
                        <p><strong>Imperial: </strong>{{imperial}}</p>
                    </div>
                </div>          
            </div>
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
                salones: [
                    {
                        id: '1',
                        salon: 'Doral I'
                    },
                    {
                        id: '2',
                        salon: 'Doral II'
                    },
                    {
                        id: '3',
                        salon: 'Doral III'
                    },
                    {
                        id: '4',
                        salon: 'Unidos Doral I II y III'
                    },
                    {
                        id: '5',
                        salon: 'Dorado'
                    },
                    {
                        id: '6',
                        salon: 'Terraza'
                    }

                ],
                title:'Doral I',
                dimensiones: '145 mts2 - Alt. 2,10 mts',
                teatro:100,
                tipo_u:30,
                escuela:30,
                banquetes:60,
                medialuna:50,
                cocktail:150,
                imperial:'N/A',

                slides: [
                    {
                        title: 'Salon 1',
                        content: 'Photo by Max Rive',
                        image: require('@/assets/salones/salon1.jpg'),
                    },
                    {
                        title: 'Salon 2',
                        content: 'Photo by Max Rive',
                        image: require('@/assets/salones/salon2.jpg'),
                    },
                    {
                        title: 'Salon 3',
                        content: 'Photo by Max Rive',
                        image: require('@/assets/salones/salon3.jpg'),
                    },
                    {
                        title: 'Salon 4',
                        content: 'Photo by Max Rive',
                        image: require('@/assets/salones/salon4.jpg'),
                    },
                ]
            }
        },
        methods: {
            changeLivinRoom(event) {

                if (event == 1) {
                    this.title = 'Doral I'
                    this.dimensiones = '145 mts2 - Alt. 2,10 mts',
                    this.teatro      = 100,
                    this.tipo_u      = 30,
                    this.escuela     = 30,
                    this.banquetes   = 60,
                    this.medialuna   = 50,
                    this.cocktail    = 150,
                    this.imperial    = 'N/A'
                } else if(event == 2) {
                    this.title = 'Doral II'
                    this.dimensiones = '89 mts2 - Alt. 2,10 mts',
                    this.teatro      = 50,
                    this.tipo_u      = 20,
                    this.escuela     = 25,
                    this.banquetes   = 40,
                    this.medialuna   = 25,
                    this.cocktail    = 50,
                    this.imperial    = 'N/A'
                } else if(event == 3) {
                    this.title = 'Doral III'
                    this.dimensiones = '120 mts2 - Alt. 2,10 mts',
                    this.teatro      = 50,
                    this.tipo_u      = 20,
                    this.escuela     = 28,
                    this.banquetes   = 40,
                    this.medialuna   = 30,
                    this.cocktail    = 50,
                    this.imperial    = 'N/A'

                } else if(event == 4) {
                    this.title = 'Unidos Doral I II y III'
                    this.dimensiones = '350 mts - Alt. 2,10 mts',
                    this.teatro      = 200,
                    this.tipo_u      = 'N/A',
                    this.escuela     = 'N/A',
                    this.banquetes   = 170,
                    this.medialuna   = 'N/A',
                    this.cocktail    = 350,
                    this.imperial    = 'N/A'
                    
                } else if(event == 5) {
                    this.title = 'Dorado'
                    this.dimensiones = '30 mts2 - Alt. 2,10 mts',
                    this.teatro      = 'N/A',
                    this.tipo_u      = 'N/A',
                    this.escuela     = 'N/A',
                    this.banquetes   = 'N/A',
                    this.medialuna   = 'N/A',
                    this.cocktail    = 'N/A',
                    this.imperial    = 12
                    
                } else {
                    this.title = 'Terraza'
                    this.dimensiones = 'N/A',
                    this.teatro      =  80,
                    this.tipo_u      =  60,
                    this.escuela     =  64,
                    this.banquetes   =  200,
                    this.medialuna   =  100,
                    this.cocktail    =  250,
                    this.imperial    =  'N/A'
                    
                }
            }
        }
    }
</script>
<style scoped>
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

    }
</style>