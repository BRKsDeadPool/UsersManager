import Vuex from 'vuex'
import Vue from 'vue'
import Auth from './modules/Auth'
import User from './modules/User'
import Validation from './modules/Validation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    User,
    Validation
  }
})
