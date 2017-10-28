import Home from '../pages/Home'
import User from '../pages/User'
import Users from '../pages/Users'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User
  },
  {
    path: '*',
    redirect: '/'
  }
]
