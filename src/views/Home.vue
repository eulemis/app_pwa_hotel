<template>
  <div>
    <HomeDetail></HomeDetail>
  </div>
</template>

<script>
import axios from "axios";
import VueAxios from "vue-axios";
import Header from "@/components/Header.vue";
import HomeDetail from "@/components/HomeDetail.vue";
import {mapState, mapMutations , mapGetters} from 'vuex';

export default {
  name: "home",
  components: {
    Header,
    HomeDetail,
  },
  mounted () {
    
   // this.deleteImage();       

  },
  methods: {
    getPicture(pic) {
    },
 /*   async deleteImage() {
      let response = await axios.post(this.BASE_URL+"/empty-image"+'/'+this.user.id, {
              headers: {
              Authorization: 'Bearer ' + this.token 
            }
        })   
     
 
      },*/
  },
};
</script>


