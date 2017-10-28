import axios from 'axios'

export const Http = axios.create({
  baseURL: 'https://usersmanager-928b5.firebaseio.com/'
})
