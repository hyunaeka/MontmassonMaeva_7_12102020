import Vue from 'vue'
import Vuex from 'vuex'

const axios = require('axios');
const instanceUser = axios.create({
  baseURL: 'http://localhost:3000/api/users/'
});

const instancePost = axios.create({
  baseURL: 'http://localhost:3000/api/posts/'
})



Vue.use(Vuex)

let user = localStorage.getItem('user');
if (!user) {
  user = {
     userId: -1,
     token: '',
   }; 
 } else {
   try {
     user = JSON.parse(user);
     instanceUser.defaults.headers.common['Authorization'] = user.token;
   } catch (ex) {
     user = {
       userId: -1,
       token: '',
     };
   }
 }

export default new Vuex.Store({
  state: {
    status: '',
    user: user,
    userInfos: {
      email: '',
      username: '',
      bio: '',

    },

    savedSingleUserConnections: {},

    allPosts : {
      title: '',
      content: '',
      attachment: '',
      userName: '',
      createdAt: '',
    },

  },
  getters: {

  },
  mutations: {

    setStatus: function (state , status){
      state.status = status;
    },

    logUser: function(state , user){
      instanceUser.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },

    userInfos: function (state , userInfos){
      state.userInfos = userInfos;

    },

    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
    },

    allPosts: function (state , allPosts){
      state.allPosts = allPosts;

    },

  },

  actions: {
    createUser: ({commit}, userInfo) => {
      commit('setStatus', 'loading');
      return new Promise ((resolve, reject)=> {
        instanceUser.post('/register', userInfo)
        .then(function(response){
          commit('setStatus', '');
          resolve(response);
        })
        .catch(function(error){
          commit('setStatus', 'error_create');
          reject(error);
        })
      })
    },
    login: ({commit}, userInfo) => {
      return new Promise ((resolve, reject)=> {
        commit('setStatus', 'loading');
        instanceUser.post('/login', userInfo)
        .then(function(response){
          commit('setStatus', '');
          commit('logUser', response.data );
          resolve(response);
        })
        .catch(function(error){
          commit('setStatus', 'error_login');
          reject(error);
        })
      })
    },

    getUserInfos: ({commit}) => {

     instanceUser.get('/me')
        .then(function(response){
          commit('userInfos', response.data);
        })
        .catch(function(){
        })

    },

    getAllPosts: ({commit}) => {

      instancePost.get('/all')
      .then(function(response){
        commit('allPosts', response.data)
      })
    }
  },
  modules: {
  }
})
