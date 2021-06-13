<template>
	<div>
		<p>{{formattedString()}}
			<a class="read-more" :href="link" id="readmore" v-show="!isReadMore" v-on:click="triggerReadMore($event, true)">{{moreStr}}</a>
			<a class="read-more" :href="link" id="readmore" v-show="isReadMore" v-on:click="triggerReadMore($event, false)">{{lessStr}}</a>
		</p>
	
	</div>
</template>

<script>
	export default{
		props: {
			moreStr: {
				type: String,
				default: 'read more'
			},
			lessStr: {
				type: String,
				default: ''
			},
			text: {
				type: String,
				required: true
			},
			link: {
				type: String,
				default: '#'
			},
			maxChars: {
				type: Number,
				default: 100
			}
		},

		data (){
			return{
				isReadMore: false
			}
		},

		computed: {
		
		},

		methods: {
			formattedString(){
				var val_container = this.text;

				if(!this.isReadMore && this.text.length > this.maxChars){
					val_container = val_container.substring(0,this.maxChars) + '   '  ;
				}

				return(val_container);
			},
			triggerReadMore(e, b){
				if(this.link == '#'){
					e.preventDefault();
				}
				if(this.lessStr !== null || this.lessStr !== '')
					this.isReadMore = b;
			}
		}
	}
</script>
<style scoped>
	.read-more{
		color: #936d02;
		font-weight: bold;
	}
	.read-more:hover{
		color: #936d02;
	}
</style>