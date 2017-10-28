import {auth} from 'firebase'

export default {
  namespaced: true,

  state: {
    user: null
  },

  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    }
  },

  actions: {
    setUser({commit}, payload) {
      commit('SET_USER', payload)
    },
    signIn({dispatch, getters}) {
      if (!getters.user) {
        auth().signInAnonymously()
          .catch(console.log)
        auth().onAuthStateChanged(user => {
          if (user) {
            dispatch('setUser', user)
          }
        })
      }
    }
  },

  getters: {
    user(state) {
      return state.user
    }
  }
}
