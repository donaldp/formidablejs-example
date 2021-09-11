import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '../views/Tasks.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import api from '../api/api'
import user from '../api/user'

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks,
    meta: {
      authOnly: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      guestOnly: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  let isAuthenticated = await user.isAuthenticated()

  if (to.matched.some(record => record.meta.guestOnly)) {
    if (isAuthenticated) next('/')
    else next()
  } else if (to.matched.some(record => record.meta.authOnly)) {
    if (isAuthenticated) next()
    else next('/login')
  } else {
    next();
  }
});

export default router
