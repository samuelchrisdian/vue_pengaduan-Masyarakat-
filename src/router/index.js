import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import PengaduanMasyarakat from '../views/PengaduanMasyarakat.vue'
import Navbar from '../views/layouts/Navbar.vue'
import Footer from '../views/layouts/Footer.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    components: {default: Login, footer: Footer}
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/',
    name: 'home',
    components: {default: Home, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/pengaduanmasyarakat',
    name: 'pengaduanmasyarakat',
    components: {default: PengaduanMasyarakat, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
