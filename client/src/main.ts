import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueTheMask from 'vue-the-mask';
import Particles from "particles.vue";
import Header from '@/components/Header.vue';
import Background from '@/components/Background.vue';
declare module "particles.vue";

Vue.config.productionTip = false

Vue.component('Header', Header);
Vue.component('Background', Background);
Vue.use(VueTheMask);
Vue.use(Particles);

Vue.filter('capitalize', (value: string) => {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
