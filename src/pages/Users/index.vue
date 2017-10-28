<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Users',
    data() {
      return {
        loadingMessage: 'Carregando usuários...',
        headers: [
          {
            text: 'Nome',
            align: 'center',
            sortable: true,
            value: 'nome'
          },
          {
            text: 'Sobrenome',
            align: 'center',
            sortable: true,
            value: 'sobrenome'
          },
          {
            text: 'Email',
            align: 'center',
            sortable: true,
            value: 'email'
          },
          {
            text: 'Rg',
            align: 'center',
            sortable: true,
            value: 'rg'
          },
          {
            text: 'Cpf',
            align: 'center',
            sortable: true,
            value: 'cpf'
          },
        ],
        perPageItems: [
          20,
          30,
          40,
          50,
          100,
          {text: 'Todos', value: -1}
        ],
        search: '',
        imageModal: false,
        imageModalSrc: ''
      }
    },
    created() {
      let vm = this
      if (!this.users.length) {
        this.$store.dispatch('User/addUserCreatedListener')
      }
    },
    computed: {
      ...mapGetters({
        users: 'User/users',
        loading: 'User/loading'
      })
    },
    methods: {
      setImageModal(user) {
        this.imageModalSrc = user.imagem
        this.imageModal = true
      },
      dismissed() {
        this.imageModalSrc = ''
      }
    }
  }
</script>

<template>
  <v-container>
    <v-layout row
              v-show="loading"
              class="mt-5">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :size="150"></v-progress-circular>
        <p>{{ loadingMessage }}</p>
      </v-flex>
    </v-layout>
    <template v-if="!loading">
      <v-layout class="mb-3" row>
        <v-flex xs12>
          <v-card>
            <v-toolbar color="teal" dark>
              <v-toolbar-title>Todos os Usuários</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field dark v-model="search" color="white" label="Buscar usuário..."></v-text-field>
            </v-toolbar>
            <v-data-table :headers="headers"
                          :items="users"
                          item-key="nome"
                          rows-per-page-text="Usuários por página"
                          no-data-text="Nenhum usuário encontrado."
                          :rows-per-page-items="perPageItems"
                          :search="search">
              <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded" :id="props.item.key">
                  <td>{{ props.item.nome }}</td>
                  <td>{{ props.item.sobrenome }}</td>
                  <td>{{ props.item.email }}</td>
                  <td>{{ props.item.rg }}</td>
                  <td>{{ props.item.cpf }}</td>
                </tr>
              </template>
              <template slot="expand" slot-scope="{ item }">
                <v-card flat>
                  <v-container fluid grid-list-lg>
                    <v-layout row>
                      <v-flex xs8>
                        <p><b>Cep</b>: {{ item.cep }}</p>
                        <p><b>Bairro</b>: {{ item.bairro }}</p>
                        <p><b>Rua</b>: {{ item.rua }}</p>
                        <p><b>Número</b>: {{ item.numero }}</p>
                      </v-flex>
                      <v-flex xs4>
                        <v-card-media style="cursor:pointer;" @click.stop="setImageModal(item)" height="100" contain :src="item.imagem"></v-card-media>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
      <v-dialog v-model="imageModal" max-width="700px">
        <img :src="imageModalSrc" style="max-width: 100%;max-height: 100%">
      </v-dialog>
    </template>
  </v-container>
</template>
