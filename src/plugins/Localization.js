export default {
  locale: 'pt-BR',
  attributes: {
    nome: 'Nome',
    sobrenome: 'Sobrenome',
    email: 'Email',
    rg: 'Rg',
    cpf: 'Cpf',
    cep: 'Cep',
    bairro: 'Bairro',
    rua: 'Rua',
    numero: 'Número'
  },
  dictionary: {
    'pt-BR': {
      messages: {
        required(field) {
          return `O campo ${field} é obrigatório!`
        },
        max(field, value) {
          return `O campo ${field} deve ter no minio ${value} caracteres!`
        },
        email(field) {
          return `O campo ${field} não está no formato de um email!`
        },
        not_in(field) {
          return `O campo ${field} já foi cadastrado!`
        },
        numeric(field) {
          return `O campo ${field} só permite números!`
        },
        regex(field) {
          return `O campo ${field} não está no formato correto!`
        }
      }
    }
  }
}
