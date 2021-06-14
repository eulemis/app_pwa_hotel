<template>
	<div class="main-lavanderia mt-3">
		<div class="btn_lavanderia">
			<b-button  class="btn-action" :class="{ active: isActive }" @click="lavanderia()">Lavanderia</b-button>
			 <div   class="content-table" v-show="lavanderia_show">
			    <b-table border="1"  :items="items" :fields="fields" class="mt-3 tdTable" outlined >
			    </b-table>
			 </div>
		</div>
		<div class="btn_lavanderia">
			<b-button  class="btn-action" :class="{ active: isActive2 }" @click="tintoreria()">Tintoreria</b-button>
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
</template>
<script>
	export default {
		data() {
        return {
        fields: ['Articulo', 'Precio'],
        items: [
          { Precio: '$ '+ 40, Articulo: 'Dickerson kjhgkjhjk hkjh '},
          { Precio: '$ '+ 21, Articulo: 'Larsen'},
          { Precio: '$ '+ 89, Articulo: 'Geneva' }
        ],
        fields2: ['Articulo', 'Precio'],
        items2: [
 
          { Precio: '$ '+ 80, Articulo: 'Toallas Sanitarias'},
          { Precio: '$ '+ 50, Articulo: 'Jabon de Tocador'},
          { Precio: '$ '+ 90, Articulo: 'Sábanas' }
        ],
        fields3: ['Articulo', 'Precio'],
        items3: [
          { Precio: '$ '+ 80, Articulo: 'Toallas Sanitarias'},
          { Precio: '$ '+ 50, Articulo: 'Jabon de Tocador'},
          { Precio: '$ '+ 90, Articulo: 'Sábanas' }
        ],
        lavanderia_show:true,
        tintoreria_show:false,
        plancha_show:false,
        change:0,
        isActive:true,
        isActive2:false,
        isActive3:false
        	
        };
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
	
	}
	}
</script>
<style scoped>
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