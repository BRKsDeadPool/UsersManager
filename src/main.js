/** Vue-related stuff */
// Importing Vue
import Vue from 'vue'
// Importing App Root
import App from './App'
// Importing Router and routes
import router from './router'
// Importing Vuex Stores
import store from './store'

/** Vue-related plugings*/
// Import Plugins
// Vuetify is a material-design library build to vue
import Vuetify from 'vuetify'
// VeeValidate is a validation-library for vue
import VeeValidate from 'vee-validate'
// Mask library
import AwesomeMask from 'awesome-mask'

/** Vue-related assets*/
//  The base styles for the app
import './assets/stylus/app.styl'

/** Another libs */
//  Firebase is a realtime database
import {initializeApp, database} from 'firebase'

/** Plugins Config */
import Localization from './plugins/Localization'

/** Vue plugins registration*/
Vue.use(Vuetify)
Vue.use(VeeValidate, Localization)

/** Vue configurations */
Vue.config.productionTip = false

/** Vue directives */
Vue.directive('mask', AwesomeMask)

/** Vue root instantiation */
/* eslint-disable no-new */
new Vue({
  /** The root element witch will render vue*/
  el: '#app',
  /** The router */
  router,
  /** The vuex store*/
  store,
  /** The render function to render app-root*/
  render: h => h(App),
  /** The created method is called right after vue start rendered component, before mount*/
  created() {
    /** Firebase app initalization */
    initializeApp({
      apiKey: "AIzaSyAa-XwTTSEggdrPONsLMH63Xe2inCBPF2g",
      authDomain: "usersmanager-928b5.firebaseapp.com",
      databaseURL: "https://usersmanager-928b5.firebaseio.com",
      projectId: "usersmanager-928b5",
      storageBucket: "usersmanager-928b5.appspot.com",
      messagingSenderId: "848735900083"
    });
  }
})
