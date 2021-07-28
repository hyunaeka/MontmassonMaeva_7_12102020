import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Dashboard from '../views/Dashboard.vue'
import Home from '../views/Home.vue'
import Wall from '../views/Wall.vue'
import Post from '../components/Wall.vue'

Vue.use(VueRouter)

 /*const routes = [


 {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about"  '../views/About.vue')
  }  
]*/

const router = new VueRouter({
  mode: 'history',
  routes: [

  {path: '/Login', name: 'login', component: Login },
  {path: '/profile', name: 'profile', component: Profile },
  {path: '/Dashboard', name: 'dashboard', component: Dashboard },
  {path: '/Home', name: 'home', component: Home },
  {path: '/Wall', name: 'wall', component: Wall },
  {path: '/postsView/:id', name: 'postsView', component: Post },
  ]
})

export default router
