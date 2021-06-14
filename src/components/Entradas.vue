<template>
    <div class="entrada">
    	<div v-if="id == 1" class="container-view">
    		<h1 class="rest">Restaurant</h1>
    		<h2 class="title">HORARIO:<br>
			<p>6:30 am a 10:00 pm</p>
			</h2>
			
			 
    		
    		<div class="underline"></div>
    		<div>
    			<p class="p_text">Lidotel Centro Lido Caracas cuenta con Le Nouveau Restaurant, ubicado en el último piso del hotel, donde podrá disfrutar de una deliciosa gastronomía, acompañada de una vista privilegiada de la ciudad de Caracas. 
				</p>
    		</div>
    	</div>
    	<div v-if="id == 2" class="container-view">
    		<h1 class="rs">Room Service</h1>
    		<h2 class="title">HORARIO: <br>
			<p>6:30 am a 10:00 pm</p>
			</h2>
    		
    		<div class="underline"></div>
    		<div>
    			<p class="p_text">Disfrute de nuestro menú desde la comodidad de su habitación.
				</p>
    		</div>	
    	</div>
    	<div v-if="id == 3" class="container-view">
    		<h1 class="gym">Gimnasio</h1>
    		<h2 class="title">HORARIO:<br>
			</h2>
    		<p class="text-desc">
    			Lunes a viernes 6:00 am a 7:00 pm <span class="sem">(Semana flexible)</span>  <br>
				Lunes a viernes 6:00 am a 5:00 pm <span class="sem"> (Semana radical)</span><br>
				Sábados 9:00 am a 2:00 pm <span class="sem">(Semana flexible y radical)</span>
			</p>
    		<!-- <h2>General:</h2> -->
    		<div class="underline"></div>
    		<div>
    			<p class="p_text">Amplias instalaciones y modernos equipos para que pueda disfrutar de un momento de esparcimiento y relajación en uno de los gimnasios más exclusivos de la capital.
				<br>
				<strong>Acceso gratuito a las instalaciones para huéspedes del hotel.</strong>
				</p>
    		</div>
    	</div>
    	<div v-if="id == 4" class="container-view">
	
				<salones></salones>
    	</div>
    	<div v-if="id == 5" class="container-view">
    		<h1 class="bussines">Business Center</h1>
    		<h2 class="title">HORARIO: <br>
			<p >24 horas con la llave de su habitación.</p></h2>
    		<div class="underline"></div>
    		<div>
    			<p class="p_text">Espacio privado para desarrollar sus actividades de negocios desde la comodidad de nuestras instalaciones.
				</p>
				<p class="p_text"> Acceso gratuito a las instalaciones para huéspedes del hotel.
				</p>
    		</div>
    	</div>
    	<div v-if="id == 6" class="container-view">
    		<h1 class="parking">Valet Parking</h1>
    		<h2 class="title">HORARIO:<br>
			<p >7:00 am a 7:00 pm</p> </h2>
    		
  
    		<div class="underline"></div>
    		<div>
    			<p class="p_text">Para su mayor comodidad, ofrecemos el servicio de valet parking.
				</p>
				<p class="title">Costo: $5</p> 	
    		</div>	
    	</div>
    	<div v-if="id == 7" class="container-view">
    		<h1 class="lav">Lavandería</h1>
    		<h2 class="title">HORARIO:<br>
				<p>8:00 am a 4:00 pm</p>
			</h2>
    		
    		<div class="underline"></div>
    		<div>
    			<p class="p_text">Puede contar con nuestro servicio de lavandería y despreocuparse por el aseo de sus prendas.
				
				</p>
				<p class="p_text">Nuestro horario de atención al cliente es de lunes a viernes, para lavandería de 8:00 am a 2:00 pm, y para tintorería de 8:00 am a 10:00 am.
.</p>
    		</div>
           <div>
                <lavanderia></lavanderia>
            </div>
    	</div>
    	<div v-if="id == 8" class="container-view">
    		<h1 class="wifi">Wi Fi</h1>
    	
    		<div class="underline"></div>
    		<div>
    			<p class="p_text">Manténgase conectado durante su estadía, a través de nuestro servicio WiFi gratuito en todas nuestras instalaciones.</p>
    		</div>	
    	</div>
    	<div v-if="id == 9" class="container-view">
    		<h1 class="lido">Acceso directo al Centro Lido</h1>
    		<div class="underline"></div>
    		<div>
    			<p class="p_text">Le ofrecemos un cómodo y rápido acceso al Centro Lido a través de la llave de su habitación. Disfrute de variedad de tiendas, farmacias, entidades bancarias, feria de comida, cine, entre otros, a solo pasos de nuestras instalaciones.

				</p>
    		</div>	
    	</div>
    </div>

</template>
<script>
    import lavanderia from "@/components/Lavanderia";
    import salones from "@/components/Salones";

	export default {
    name: "ListaLavanderia",
    components: {
     lavanderia,
     salones
    },
    data() {
        return {
        	id:this.$route.params.id,
        };
    }

}
</script>
<style scoped>
#carousel-1{
    margin-top: 40%;
}
.carousel-img{
    height: 500px;
}
.title{
	font-family: "HelveticaBold";
	font-size: 110%;
}

.sem{
	font-size: 80%;
	font-style: normal;
}

.entrada {
    background-image: url("~@/assets/Background.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

}


.container-view{
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: space-around;
    padding: 5%;
    font-family: "Helvetica";
    margin-top: -12%;

}
h1{
	
	
	font-family: "HelveticaBold";
	text-transform: uppercase;
}

h2{
	font-weight: bold;
	font-family: "Helvetica";
	text-align: center;
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

.gym{
    margin-top: 8%;
}

.parking{
    margin-top: 5%;
}
.lav{
    margin-top:19%;
}

.wifi,.lido{
    margin-top: -3%;
}
.salones{
    margin-top: 57%;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
	.container-view{
	    width: 100%;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    flex-direction: column;
	    -ms-flex-wrap: wrap;
	    flex-wrap: wrap;
	    -webkit-box-pack: center;
	    -ms-flex-pack: center;
	    justify-content: space-around;
	    margin-top: -18%;
	    padding: 5%;

	}
    #carousel-1{
        margin-top: 105%;
        margin-bottom: -80%;
    }
    h1{
        font-size: 26px;
        text-transform: uppercase;
    }

    .rs{
        text-align: center;
        margin-top: -55%;
    }

    .gym{
        text-align: center;
        margin-top: 37%;
    }

    .bussines{
        text-align: center;
        margin-top: -31%;
    }

    .parking{
        text-align: center;
        margin-top: -38%;
    }

    .lav{
        text-align: center;
        margin-top: 52%;
    }

    .wifi{
        text-align: center;
        margin-top: -65%;
    }

    .lido{
        text-align: center;
        margin-top: -35%;
    }

    .rest{
        text-align: center;
        margin-top: -25%;
    }

    .salones{
        text-align: center;
        margin-top: 303%;
    }
    .salones-select{
        margin-top: -28%;
    }

    .title{
        text-align: center;
        margin-top: 11px;
    } 
}
@media only screen and (device-width : 375px) and (device-height : 812px) 
    and (-webkit-device-pixel-ratio : 3) {
        .salones{
            margin-top: 225%;
            font-size:  28px;
        }
        .salones-select{
            margin-top: 0%;
        }
        .title{
            margin-top: 0;
        }

    }

@media only screen and (min-device-width: 411px) and (max-device-width: 823px){
	.lav{
	    text-align: center;
    	margin-top: 27%;
	}	
}

</style>