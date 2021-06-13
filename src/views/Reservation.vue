<template>
	<main>
		<form  @submit.prevent="reservationForm">
			<b-container class="bv-example-row">
				<loading :active.sync="isLoading" 
			             :can-cancel="true" 
			             :is-full-page="fullPage">
			    </loading>
		 		<b-row>
				    <b-col cols="12" md="4">
				    	<label for="datepicker-valid">{{$t('arrival')}}</label>
					 	<b-form-datepicker 
					 		v-model="arrival"    
					 		v-model.trim="$v.arrival.$model" 	
    						:state="$v.arrival.$dirty ? !$v.arrival.$invalid : null">
    					</b-form-datepicker>
				    </b-col>
				    <b-col cols="12" md="4">
				    	<label for="datepicker-valid">{{$t('departure')}}</label>
			    		<b-form-datepicker 
			    			v-model="departure"
			    			v-model.trim="$v.departure.$model" 	
    						:state="$v.departure.$dirty ? !$v.departure.$invalid : null">
			    	 	</b-form-datepicker>
				    </b-col>
				    <b-col cols="12" md="4">
			    		<label for="">{{$t('people')}}</label>
			    	 	<b-form-spinbutton id="demo-sb" 
			    			v-model="people" 
			    			min="1" max="100"
			    			v-model.trim="$v.people.$model" 	
    						:state="$v.people.$dirty ? !$v.people.$invalid : null">
			    	 	</b-form-spinbutton>
				    </b-col>
				</b-row>
				<b-row>
				    <b-col cols="12" md="4">
				    	<label for="datepicker-valid">{{$t('full_name')}}</label>
					    <b-form-input
    					    v-model="full_name" 
    					    v-model.trim="$v.full_name.$model" 	
    					    :state="$v.full_name.$dirty ? !$v.full_name.$invalid : null" 
    					    >
					    </b-form-input>
    					<div class="error" v-if="!$v.full_name.minLength"> {{$v.full_name.$params.minLength.min}} letters.</div> 
				    </b-col>
				    <b-col cols="12" md="4">
				    	<label for="datepicker-valid">{{$t('number_id')}}</label>
			    		<b-form-input
			    	  		v-model="number_id"
			    	    	v-model.trim="$v.number_id.$model" 	
    					    :state="$v.number_id.$dirty ? !$v.number_id.$invalid : null" 
			    	  		>
			    	  	</b-form-input>
				    </b-col>
				    <b-col cols="12" md="4">
				    	<label for="">{{$t('nationality')}}</label>
						  <div>
							<b-form-select v-model="selected" :options="nationality"
								v-model.trim="$v.selected.$model" 	
    					    :state="$v.selected.$dirty ? !$v.selected.$invalid : null" ></b-form-select>
							
						</div>
			    	<!-- 	<b-form-input
			    	 		v-model="nationality"
			    	 		v-model.trim="$v.nationality.$model" 	
    					    :state="$v.nationality.$dirty ? !$v.nationality.$invalid : null" 
			    	  	>
			    	  	</b-form-input> -->
				    </b-col>
				</b-row>
				<b-row>
				    <b-col cols="12" md="4">
				    	<label for="">{{$t('phone')}}</label>
    					<b-form-input
	    					 v-model="phone" 
	    					 v-model.trim="$v.phone.$model" 	
		    				:state="$v.phone.$dirty ? !$v.phone.$invalid : null"
	    					>	
    					 </b-form-input>
				    </b-col>
				    <b-col cols="12" md="4">
				    	<label for="">{{$t('email')}}</label>
				    	<b-form-input
					    	v-model="email" 
					    	v-model.trim="$v.email.$model" 	
		    				:state="$v.email.$dirty ? !$v.email.$invalid : null"
					    >
				    	 </b-form-input>
				    </b-col>
				       <b-col cols="12" md="4">
				    	<label for="">{{$t('city')}}</label>
				    	<b-form-input 
					    	v-model="city" 
					    	v-model.trim="$v.city.$model" 	
			    			:state="$v.city.$dirty ? !$v.city.$invalid : null"
					    	>
				    	</b-form-input>
				    </b-col>
				</b-row>
				<b-row>
				    <b-col cols="12" md="4">
				    	<label for="datepicker-valid">{{$t('country')}}</label>
    					<b-form-input 
	    					v-model="country"
	    					v-model.trim="$v.country.$model" 	
				    		:state="$v.country.$dirty ? !$v.country.$invalid : null"
	    				>
    					</b-form-input>
				    </b-col>
				    <b-col cols="12" md="4">
				    	<label for="datepicker-valid">{{$t('origin')}}</label>
				    	<b-form-input
					    	v-model="origin" 
					    	v-model.trim="$v.origin.$model" 	
					    	:state="$v.origin.$dirty ? !$v.origin.$invalid : null"
					    	>
				    	</b-form-input>
				    </b-col>
				       <b-col cols="12" md="4">
				    	<label for="">{{$t('destination')}}</label>
				    	<b-form-input 
					    	v-model="destination"
					    	v-model.trim="$v.destination.$model" 	
						    :state="$v.destination.$dirty ? !$v.destination.$invalid : null"
					    	>	
				    	</b-form-input>
				    </b-col>
				</b-row> 

			</b-container>
			<hr>
			<b-row class="bt_submit">
			 	<b-button class="bt" type="submit" variant="success" :disabled="submitStatus === 'PENDING'">
			 		{{$t('submit')}}
			 	</b-button>
			</b-row>
			<b-row class="message">
				<p class="success" v-if="submitStatus === 'OK'">{{$t('submit_success')}}</p>
				<p class="error" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
				<p class="warning" v-if="submitStatus === 'PENDING'">Sending...</p>
			</b-row>
		</form>
	</main>
</template>

<script>

import {mapState, mapMutations} from 'vuex';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'; 
import 'vue-loading-overlay/dist/vue-loading.css';
import { required, minLength, between,  numeric, helpers, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'  


const isPhoneNumber = helpers.regex('numeric', /^[0-9]{11}$/)
const alpha = helpers.regex('alpha', /^[a-zA-Z]*$/)


  export default {
    computed: {
      nameState() {
       /* return this.name.length > 2 ? true : false*/
      }
    },
    data() {
      return {
            arrival : '',
            departure : '',
            people : 0,
            full_name : '',
            number_id : '',
            nationality : [
						{
						id: '1',
						text: 'Venezolano'
					},
					{
						id: '2',
						text: 'Extranjero'
					}
			],
            phone : '',
            email : '',
            city : '',
            country : '',
            origin : '',
            destination : '',
            isLoading: false,
            fullPage: true,
            submitStatus: null
      		
          
        
      }
    },
    components: {
        Loading
    },
    
    methods: {
      	reservationForm (validations) {
      		this.$v.$touch()
      		if (this.$v.$invalid) {
		        this.submitStatus = 'ERROR'
		    } else {
        // do your submit logic here
        	this.submitStatus = 'PENDING'
        	this.isLoading = true;
	        setTimeout(() => {
	          this.submitStatus = 'OK'
	          this.full_name = ''
	          this.isLoading = false;
	        }, 500)
	      }
      		
      	}
      },
    validations: {
	    full_name: {
	      required,
	      minLength: minLength(4),
	      alpha 
	    },
	    number_id: {
	      required,
	      numeric

	    },
	    selected:{
	 
	    },
	    arrival:{
	    	required
	    },
	    departure:{
	    	required
	    },
	    people:{
	    	required
	    },
	    phone:{
	    	required,
	    	isPhoneNumber
	    },
	    email:{
	    	required,
	    	email
	    },
	    city:{
	    	required
	    },
	    country:{
	    	required
	    },
	    origin:{
	    	required
	    },
	    destination:{
	    	required
	    }
  	}
  }
</script>
<style scoped>
	   main{
    max-width: 1272px;
    background: #e4ecef;
    padding: 40px;
    border-radius: 10px;
    margin: auto;
    margin-top: 5%;
}
.bt_submit{
	display: flex;
	justify-content: center;
}
.bt{
	width: 29%;
}

.btn-success {
    color: #fff;
    background-color: #c4a650;
    border-color: #c4a650;
}
.error{
	color: red;
}
.success{
	color: #28a745;
}
.warning{
	color: #ffc107;
}
.message{
	margin-left: 43%;
}



@media only screen 
and (min-device-width : 320px) 
and (max-device-width : 480px) {
	.bt{
		width: 81%;
	}
	.message{
	margin-left: 16%;
}
}
</style>