import {get as getEmails} from '../../services/Emails'
import {get as getCpfs} from '../../services/Cpfs'
import {get as getRgs} from '../../services/Rgs'
import {encode, decode} from 'firebase-key'

export default {
  namespaced: true,

  state: {
    rgs: [],
    cpfs: [],
    emails: []
  },
  mutations: {
    SET_RGS(state, payload) {
      for (let key in payload) {
        state.rgs.push(key)
      }
    },
    SET_CPFS(state, payload) {
      for (let key in payload) {
        state.cpfs.push(key)
      }
    },
    SET_EMAILS(state, payload) {
      for (let key in payload) {
        state.emails.push(key)
      }
    }
  },
  actions: {
    setRgs({commit}, payload) {
      commit('SET_RGS', payload)
    },
    setCpfs({commit}, payload) {
      commit('SET_CPFS', payload)
    },
    setEmails({commit}, payload) {
      commit('SET_EMAILS', payload)
    },
    fetch({dispatch}, payload) {
      return new Promise((resolve, reject) => {
        Promise.all([
          getEmails(),
          getCpfs(),
          getRgs()
        ]).then(data => {
          resolve()
          dispatch('setEmails', data[0]['data'])
          dispatch('setCpfs', data[1]['data'])
          dispatch('setRgs', data[2]['data'])
        })
      })
    }
  },

  getters: {
    emails(state) {
      return state.emails.map(function(email) {
        return decode(email)
      })
    },
    cpfs(state) {
      return state.cpfs.map(function(item) {
        return decode(item)
      })
    },
    rgs(state) {
      return state.rgs.map(function(item) {
        return decode(item)
      })
    },
    emailExists(state) {
      return email => {
        return state.emails.findIndex(sEmail => sEmail === encode(email)) > -1
      }
    },
    cpfExists(state) {
      return cpf => {
        return state.emails.findIndex(sCpf => sCpf === cpf) > -1
      }
    },
    rgExists(state) {
      return rg => {
        return state.rgs.findIndex(sRg => sRg === rg) > -1
      }
    }
  }
}
