import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Dashboard from '../views/Dashboard.vue'
import Home from '../views/Home.vue'
import Post from '../components/Post.vue'
import createPost from '../views/CreatePost.vue'
import createSuccess from '../components/CreateSuccessPost.vue'
import deleteSuccess from '../components/DeletePostSuccess.vue'
import deleteUser from '../components/DeleteUser.vue'

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

  {path: '/', name: 'login', component: Login }, // Page principale du site
  {path: '/profile', name: 'profile', component: Profile }, // Page profile de l'utilisateur
  {path: '/Dashboard', name: 'dashboard', component: Dashboard }, // Page administration pour les admins ( pas encore mis en place )
  {path: '/Home', name: 'home', component: Home }, // Page d'affichage de tous les posts
  {path: '/postsView/:id', name: 'postsView', component: Post },  // Page affichage d'un post
  {path: '/createPost', name: 'CreatePost', component: createPost }, // Page de création de post
  {path: '/createSuccess', name: 'createSuccess', component: createSuccess }, // Page de confirmation modification ou création post
  {path: '/deleteSuccess', name: 'deleteSuccess', component: deleteSuccess }, // Page de confirmation suppression de post
  {path: '/deleteUser', name: 'deleteUser', component: deleteUser }, // Page de confirmation suppression de l'utilisateur
]
})

export default router
