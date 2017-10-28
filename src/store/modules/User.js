import {database, storage} from 'firebase'
import {encode, decode} from 'firebase-key'
import {get as getUsers} from '../../services/Users'

export default {
  namespaced: true,

  state: {
    users: [],
    loading: true
  },

  mutations: {
    SET_USERS(state, payload) {
      for (let field in payload) {
        let user = payload[field]
        user.key = field
        state.users.push(user)
      }
    },
    ADD_USER(state, payload) {
      state.users.push(payload)
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    UPDATE_USER(state, payload) {
      let newUsers = JSON.parse(JSON.stringify(state.users))
      let index = newUsers.findIndex(user => user.key === payload.key)
      if (index === -1) return

      newUsers.splice(index, 1, payload)
      console.log('added!')
      state.users = newUsers
    }
  },

  actions: {
    setUsers({commit}, payload) {
      commit('SET_USERS', payload)
    },
    setLoading({commit}, payload) {
      commit('SET_LOADING', payload)
    },
    addUserCreatedListener({commit, dispatch, getters}) {
      database().ref('users').orderByKey().on('child_added', snap => {
        let user = snap.val()
        user.key = snap.key
        commit('ADD_USER', user)
        if (getters.loading) {
          dispatch('setLoading', false)
        }
      })
      database().ref('users').on('child_changed', snap => {
        let user = snap.val()
        user.key = snap.key
        commit('UPDATE_USER', user)
      })

      setTimeout(() => {
        if (getters.users.length === 0) {
          dispatch('setLoading', false)
        }
      }, 3000)
    },
    createUser({commit, dispatch}, {
      nome,
      sobrenome,
      email,
      rg,
      cpf,
      cep,
      bairro,
      rua,
      numero,
      imagem,
      imagePreview
    }) {
      return new Promise((resolve, reject) => {
        let ref = database().ref('users')
        let key
        let imageUrl
        let user = ref.push({
          nome,
          sobrenome,
          email,
          rg,
          cpf,
          cep,
          bairro,
          rua,
          numero
        })
          .then(data => {
            key = data.key
            return key
          }, reject)
          .then(key => {
            const filename = imagem.name
            const ext = filename.slice(filename.lastIndexOf('.') + 1)
            return storage().ref(key + ext).put(imagem)
          }, reject)
          .then(fileData => {
            imageUrl = fileData.metadata.downloadURLs[0]

            return ref.child(key).update({imagem: imageUrl})
          }).then(() => {
            ref.child(key).once('value')
              .then(snap => {
                let user = snap.val()
                user.id = snap.key
                resolve(user)
              })
          }, reject)

        database().ref('emails/' + encode(email)).set(true)
          .then(() => {
            database().ref('rgs/' + encode(rg)).set(true)
          })
          .then(() => {
            database().ref('cpfs/' + encode(cpf)).set(true)
          })
      })
    }
  },

  getters: {
    users(state) {
      return state.users.filter(user => user.hasOwnProperty('imagem'))
    },
    loading(state) {
      return state.loading
    }
  }
}
