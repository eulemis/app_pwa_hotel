<template>
	<div class="main-lav">
		<h1 class="lav">Lavandería</h1>
		<h2 class="title">HORARIO:<br>
			<p>8:00 am a 4:00 pm</p>
		</h2>
		
		<div class="underline"></div>
		<div>
			<p class="p_text">Puede contar con nuestro servicio de lavandería y despreocuparse por el aseo de sus prendas.
			
			</p>
			<p class="p_text">Nuestro horario de atención al cliente es de lunes a viernes, 
			para lavandería de 8:00 am a 2:00 pm, y para tintorería de 8:00 am a 10:00 am.</p>
		</div>
			<div class="main-lavanderia mt-3">

		<div class="btn_lavanderia">
			<b-button  class="btn-action" :class="{ active: isActive }" @click="lavanderia()">Lavandería</b-button>
			 <div   class="content-table" v-show="lavanderia_show">
			    <b-table border="1"  :items="items" :fields="fields" class="mt-3 tdTable" outlined >
			    </b-table>
			 </div>
		</div>
		<div class="btn_lavanderia">
			<b-button  class="btn-action" :class="{ active: isActive2 }" @click="tintoreria()">Tintorería</b-button>
			<div   class="content-table " v-show="tintoreria_show">
			    <b-table border="1"  :items="items2" :fields="fields2" class="mt-3 tdTable Dt" outlined >
			    </b-table>
			</div>
		</div>
		<div class="btn_lavanderia ">
			<b-button  class="btn-action" :class="{ active: isActive3 }" @click="plancha()">Solo Plancha</b-button>
			<div   class="content-table " v-show="plancha_show">
			    <b-table border="1"  :items="items3" :fields="fields3" class="mt-3 tdTable Dt_2" outlined >
			    </b-table>
			</div>
		</div>
	</div>
	</div>

</template>
<script>
	export default {
		data() {
	        return {
		        fields: ['PIEZA', 'PRECIO'],
		        items: [
		          { PRECIO: '$ '+ 2.5, PIEZA: 'CALCETINES'},
		          { PRECIO: '$ '+ 2.5, PIEZA: 'CALZONCILLOS'},
		          { PRECIO: '$ '+ 3,   PIEZA: 'CAMISA POLO' },
				  { PRECIO: '$ '+ 4,   PIEZA: 'FRANELAS' },
				  { PRECIO: '$ '+ 4,   PIEZA: 'PANTALONES CORTOS' },
				  { PRECIO: '$ '+ 1,   PIEZA: 'PAÑUELOS' },
				  { PRECIO: '$ '+ 4.5, PIEZA: 'CAMISA POLO BLANCA' },
				  { PRECIO: '$ '+ 2,   PIEZA: 'PIJAMAS (2 piezas)' },
				  { PRECIO: '$ '+ 2,   PIEZA: 'ROPA INTERIOR DE DAMA' },
				  { PRECIO: '$ '+ 4,   PIEZA: 'CAMISA BLANCA' },
				  { PRECIO: '$ '+ 2,   PIEZA: 'BATA' }

		        ],
		        fields2: ['PIEZA', 'PRECIO'],
		        items2: [
		 
		          { PRECIO: '$ '+ 4,   PIEZA: 'BLUSA'},
		          { PRECIO: '$ '+ 4,   PIEZA: 'CAMISA'},
				  { PRECIO: '$ '+ 5,   PIEZA: 'CHAQUETA'},
				  { PRECIO: '$ '+ 3,   PIEZA: 'CORBATA'},
				  { PRECIO: '$ '+ 4,   PIEZA: 'FALDA'},
				  { PRECIO: '$ '+ 8,   PIEZA: 'VESTIDO (corto)'},
				  { PRECIO: '$ '+ 4,   PIEZA: 'SWEATER'},
				  { PRECIO: '$ '+ 7,   PIEZA: 'TRAJE (3 piezas)'},
				  { PRECIO: '$ '+ 9,   PIEZA: 'TRAJE DE ETIQUETA'},
				  { PRECIO: '$ '+ 11,  PIEZA: 'VESTIDO DE NOCHE'},
				  { PRECIO: '$ '+ 8,   PIEZA: 'VESTIDO (largo)	'},
				  { PRECIO: '$ '+ 3,   PIEZA: 'PANTALONES'},
				  { PRECIO: '$ '+ 5,   PIEZA: 'CAMISA DE SEDA'},
				  { PRECIO: '$ '+ 4,   PIEZA: 'GUAYABERA'},
				  { PRECIO: '$ '+ 6,   PIEZA: 'BLUSA BLANCAS'},
				  { PRECIO: '$ '+ 5,   PIEZA: 'CAMISA CON ALMIDON'},
				  { PRECIO: '$ '+ 3,   PIEZA: 'CAMISA BLANCA'},
				  { PRECIO: '$ '+ 5.5, PIEZA: 'CHAQUETA'},
				  { PRECIO: '$ '+ 4.5, PIEZA: 'PANTALON'},

		        ],
		        fields3: ['PIEZA', 'PRECIO'],
		        items3: [
		          { PRECIO: '$ '+ 2, PIEZA: 'BLUSA' },
				  { PRECIO: '$ '+ 2, PIEZA: 'CAMISA' },
				  { PRECIO: '$ '+ 2, PIEZA: 'CHAQUETA' },
				  { PRECIO: '$ '+ 4, PIEZA: 'FALDA' },
				  { PRECIO: '$ '+ 3, PIEZA: 'PANTALONES' },
				  { PRECIO: '$ '+ 5, PIEZA: 'TRAJE' },
				  { PRECIO: '$ '+ 8, PIEZA: 'TRAJE DE ETIQUETA' },
				  { PRECIO: '$ '+ 7, PIEZA: 'VESTIDO DE NOCHE' },
				  { PRECIO: '$ '+ 5, PIEZA: 'VESTIDO' }
		        ],
		        lavanderia_show:true,
		        tintoreria_show:false,
		        plancha_show:false,
		        change:0,
		        isActive:true,
		        isActive2:false,
		        isActive3:false
	        }
    	},
        methods: {
	    	lavanderia() {
	    		if(window.screen.width < 768){
		    		this.lavanderia_show = true;
		    		this.tintoreria_show = false;
		    		this.plancha_show    = false;
		    		this.isActive = true;
		    		this.isActive2 = false;
		    		this.isActive3 = false;
		    	}
	    	},
	    	tintoreria() {
	    		if(window.screen.width < 768){
		    		this.lavanderia_show = false;
		    		this.tintoreria_show = true;
		    		this.plancha_show    = false;
		    		this.isActive  = false;
		    		this.isActive2 = true;
		    		this.isActive3 = false;
		    	}
	    	},
	    	plancha() {
	    		if(window.screen.width < 768){
					this.lavanderia_show = false;
		    		this.tintoreria_show = false;
		    		this.plancha_show    = true;
		    		this.isActive  = false;
		    		this.isActive2 = false;
		    		this.isActive3 = true;
		    	}
	    	},

	    	update() {
	    		if(window.screen.width > 768){
	    			this.lavanderia_show = true;
	    			this.tintoreria_show = true;
	    			this.plancha_show    = true;
	    			this.change = 0;
	    			this.isActive  = false;
		    		this.isActive2 = false;
		    		this.isActive3 = false;
	    		} 
		  
	    	},
	    	isMobile() {
	    		if (this.change == 0) {
	    			this.lavanderia_show = true;
	    			this.tintoreria_show = false;
	    			this.plancha_show    = false;
	    			this.change = 1;
	    			this.isActive  = true;
		    		this.isActive2 = false;
		    		this.isActive3 = false;
	    		}
	    	},
	    	scrollToTop() {
	            window.scrollTo(0,0);
	        }
    	},
	    created () {
			setInterval(() => {
				if(window.screen.width > 768){
					this.update();
				} 
			}, 100)

			setInterval(() => {
				if(window.screen.width < 768){
					this.isMobile();
				} 
			}, 100)
		
		},
		mounted (){
	        this.scrollToTop();
	    }
	}
</script>
<style scoped>
	.main-lav{
		padding: 40px;
		margin-top: 3%;
		margin-bottom: 3%;
	}
	.title{
		font-family: "HelveticaBold";
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
	.p_text{
		text-align: justify;
		font-family: "FonstFree";
		font-size: 110%
	}
	.lav{
	    margin-top:2%;
	    font-size: 55px;
		text-align: center;
	}
	.btn-action{
		border: 1px solid #94700a;
    	background-color: #94700a;
    	border-radius: 0px;
    	color: white;
	}
	.main-lavanderia{
		display:flex;
		flex-direction: row;
    	justify-content: space-around;
	}
	.btn_lavanderia{
		text-align: center !important;
	}
	.tdTable{
		width: 400px;
	}
	.content-table{
		background-color: white;
		-webkit-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
	  	-moz-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
	  	box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);

	}
	 @media only screen and (min-device-width: 320px) and (max-device-width: 480px){
		.main-lav{
			padding: 15px;
		}
		.lav{
			text-align: center;
			margin-top: 11%;
			font-size: 37px;
		}
		.title{
			margin-top: 16px;
			font-size: 20px;
			font-family: "HelveticaBold";
		}
	  }
	@media only screen and (max-width: 768px) {
	
		
		.main-lavanderia{
			display: flex;
			background: white;
   	 		padding: 8px;
    		box-shadow: 5px 5px 10px 0px rgb(0 0 0 / 50%);	
    		border-radius: 5px;
    		margin-bottom: 30%;

		}
		.content-table{
			/*	*/
			width: 40px;
			left: 6%;
			background:none;
			box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0);
		}
		.tdTable{
			width: 305px;
		}
		.Dt{
			margin-left:-253%;
		}
		.Dt_2{
			margin-left:-487%;
		}
	
	}
</style>