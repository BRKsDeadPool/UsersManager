<script>
  export default {
    name: 'app'
  }
</script>

<template>
  <v-app id="app">
    <v-toolbar fixed color="primary" dark clipped-left app>
      <router-link tag="span" style="cursor: pointer;" to="/" class="title">Users&nbsp;<span class="text">Manager</span></router-link>
    </v-toolbar>
    <main>
      <v-content>
        <v-container>
          <v-layout class="mt-3" row wrap>
            <v-flex xs12 sm6 class="text-sm-right text-xs-center">
              <v-btn to="/">Cadastrar Usuário</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-sm-left text-xs-center">
              <v-btn to="/users">Listar Usuários</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
        <router-view></router-view>
      </v-content>
    </main>
  </v-app>
</template>
