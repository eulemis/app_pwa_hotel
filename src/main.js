import Vue from 'vue';
import Vm from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueI18n from 'vue-i18n';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "./registerServiceWorker";
import i18n from './i18n';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import Vuelidate from 'vuelidate';
import mixins from './mixins';
import './registerServiceWorker';
import vuetify from '@/plugins/vuetify'; 
import VueLazyload from 'vue-lazyload';
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';

/*import ReadMore from 'vue-read-more';*/
 






Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueAxios, axios)
Vue.use(VueI18n)
Vue.use(VueToast)
Vue.use(Vuelidate)
Vue.mixin(mixins)
/*Vue.use(ReadMore);*/
Vue.use(VueLazyload, {
  lazyComponent: true
});




new Vue({
  router,
  store,
  axios,
  i18n,
  vuetify,
  VueLazyload,
  VueperSlides, 
  VueperSlide,
  render: h => h(Vm)
}).$mount('#app')
