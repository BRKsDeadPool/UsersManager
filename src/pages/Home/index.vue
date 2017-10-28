<script>
  let defaultLoadingMessage = 'Criando usuário...'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Home',
    data() {
      return {
        nome: '',
        sobrenome: '',
        email: '',
        rg: '',
        cpf: '',
        cep: '',
        bairro: '',
        rua: '',
        numero: '',
        imagem: null,
        imagePreview: '',
        loading: true,
        loadingMessage: 'Criando usuário...',
        snackbar: false,
        user: null
      }
    },
    created() {
      if (!this.auth) {
        this.$store.dispatch('Auth/signIn')
      }
      if (!this.emails.length ||
        !this.rgs.length ||
        !this.cpfs.length) {
        this.loadingMessage = 'Carregando...'
        let vm = this
        this.$store.dispatch('Validation/fetch')
          .then(() => {
            vm.loadingMessage = defaultLoadingMessage
            vm.loading = false
          })
      } else {
        this.loading = false
      }
    },
    computed: {
      canSubmit() {
        return !!this.nome &&
          !!this.sobrenome &&
          !!this.email &&
          !!this.rg &&
          !!this.cpf &&
          !!this.cep &&
          !!this.bairro &&
          !!this.rua &&
          !!this.numero &&
          !!this.imagem
      },
      cpfValidation() {
        return {
          required: true,
          not_in: this.cpfs,
          regex: /^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$/
        }
      },
      cepValidation() {
        return {
          required: true,
          regex: /^([0-9]){5}\-([0-9]){3}$/
        }
      },
      rgValidation() {
        return {
          required: true,
          not_in: this.rgs,
          regex: /^([0-9]){2}\.([0-9]){3}\.([0-9]){3}\-([0-9]){1}$/
        }
      },
      ...mapGetters({
        auth: 'Auth/user',
        emails: 'Validation/emails',
        rgs: 'Validation/rgs',
        cpfs: 'Validation/cpfs',
        emailExists: 'Validation/emailExists',
        cpfExists: 'Validation/cpfExists',
        rgExists: 'Validation/rgExists'
      })
    },
    methods: {
      createPreview(ev) {
        let file = ev.target.files[0]
        let reader = new FileReader
        let filename = file.name

        if (filename.lastIndexOf('.') <= 0) {
          return alert('Por favor adicione um arquivo válido!')
        }
        let vm = this

        reader.addEventListener('load', () => {
          vm.imagePreview = reader.result
        })

        reader.readAsDataURL(file)
        this.imagem = file
      },
      pickImage() {
        this.$refs.imagePicker.click()
      },
      clearAll() {
        let data = {
          nome: '',
          sobrenome: '',
          email: '',
          rg: '',
          cpf: '',
          cep: '',
          bairro: '',
          rua: '',
          numero: '',
          imagem: null,
          imagePreview: ''
        }

        for (let field in data) {
          this[field] = data[field]
        }
      },
      onSubmit() {
        if (!this.canSubmit) return
        let vm = this
        vm.loading = true
        let data = {
          nome: this.nome,
          sobrenome: this.sobrenome,
          email: this.email,
          rg: this.rg,
          cpf: this.cpf,
          cep: this.cep,
          bairro: this.bairro,
          rua: this.rua,
          numero: this.numero,
          imagem: this.imagem
        }

        this.$store.dispatch('User/createUser', data)
          .then(user => {
            vm.clearAll()
            vm.loading = false
            vm.showNackbar(user)
          })
      },
      showNackbar(user) {
        this.user = user
        this.snackbar = true
      },
      showUser() {
        if (!this.user) return

        this.$router.push({
          name: 'Users'
        })
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
    <v-card
            v-if="!loading">
      <v-toolbar color="teal" dark>
        <v-toolbar-title>Preencha o Formulário</v-toolbar-title>
      </v-toolbar>
      <form @submit.prevent="onSubmit" class="pa-3">

        <v-text-field
          label="Nome"
          v-model="nome"
          type="text"
          :error-messages="errors.collect('nome')"
          v-validate="'required|max:60'"
          data-vv-name="nome"
          required></v-text-field>

        <v-text-field
          label="Sobrenome"
          v-model="sobrenome"
          type="text"
          :error-messages="errors.collect('sobrenome')"
          v-validate="'required|max:60'"
          data-vv-name="sobrenome"
          required></v-text-field>

        <v-text-field
          label="Email"
          v-model="email"
          type="email"
          :error-messages="errors.collect('email')"
          v-validate="`required|email|not_in:${emails}`"
          data-vv-name="email"
          required></v-text-field>

        <v-text-field
          label="Rg"
          v-model="rg"
          type="text"
          :error-messages="errors.collect('rg')"
          v-mask="'99.999.999-9'"
          v-validate="rgValidation"
          data-vv-name="rg"
          required></v-text-field>

        <v-text-field
          label="Cpf"
          v-model="cpf"
          type="text"
          v-mask="'999.999.999-99'"
          :error-messages="errors.collect('cpf')"
          v-validate="cpfValidation"
          data-vv-name="cpf"
          required></v-text-field>

        <v-text-field
          label="Cep"
          v-model="cep"
          type="text"
          v-mask="'99999-999'"
          :error-messages="errors.collect('cep')"
          v-validate="cepValidation"
          data-vv-name="cep"
          required></v-text-field>

        <v-text-field
          label="Bairro"
          v-model="bairro"
          type="text"
          :error-messages="errors.collect('bairro')"
          v-validate="`required`"
          data-vv-name="bairro"
          required></v-text-field>

        <v-text-field
          label="Rua"
          v-model="rua"
          type="text"
          :error-messages="errors.collect('rua')"
          v-validate="`required`"
          data-vv-name="rua"
          required></v-text-field>

        <v-text-field
          label="Número"
          v-model="numero"
          type="text"
          :error-messages="errors.collect('numero')"
          v-validate="`required|numeric`"
          data-vv-name="numero"
          required></v-text-field>

        <v-btn class="primary" @click="pickImage">Escolher imagem</v-btn>
        <input id="image"
               name="image"
               type="file"
               ref="imagePicker"
               v-show="false"
               @change="createPreview"
               accept="image/*">

        <div class="text-xs-center">
          <img :src="imagePreview" v-show="!!imagePreview" style="max-width: 100%; max-height: 400px">
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="red" dark @click="clearAll">Limpar</v-btn>
          <v-btn class="primary" type="submit" :disabled="!canSubmit">Criar</v-btn>
        </v-card-actions>
      </form>
    </v-card>

    <v-snackbar :timeout="4000"
                color="primary"
                bottom
                v-model="snackbar">
      <v-btn dark
             flat
             @click="showUser">Ver Usuário
      </v-btn>
      <v-btn dark
             flat
             @click="snackbar = false">Fechar
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
