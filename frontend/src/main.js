import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { NavbarPlugin } from 'bootstrap-vue'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

Vue.use(NavbarPlugin)

library.add(faUserSecret)


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.filter('formatDate', function(value) {

  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
