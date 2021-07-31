<template>
	<div id="wall" class="wall">

         <h1 class="card__title" >Le post numéro {{ id }}</h1>
           <div class="card"  >
               <p>{{ articleUnique.userName }}</p>
               <p>{{ articleUnique.content}}</p>
               <p>{{ articleUnique.title}}</p>
               <div class="card card__deletePost">
                 <button v-if=" this.idPostUser == this.idTokenAdmin" @click="deletePost(articleUnique.id)">Supprimer l'article</button>
                
                <div v-if=" this.idPostUser == this.idTokenAdmin" class="card card__modifyPost">
                <div class="form-row">
                <label for="title">Nouveau titre du post</label>
                <input v-model="title" type="text" id="title" class="form-control">
                <label for="content">Contenu du post</label>
                <input v-model="content" type="text" id="content" class="form-control">
                </div>
                <button v-if=" this.idPostUser == this.idTokenAdmin" @click="modifyPost(articleUnique.id)" >Modifier le post</button>
                </div>
                
               </div>
               <div class="card card__createcomment">

                <div class="form-row" >
                <label for="comment">Répondre</label>
                <input  v-model="comment" type="text" id="comment" class="form-control">
                <button @click="createComment()">Créer un commentaire</button>
                </div>
                
               </div>
              <div class="card card__comment__test">
               <div class="card__comment card" :key="index" v-for="(datapost, index) in comments">
                                <p>{{ datapost.userName }}</p>
                                <p>{{ datapost.comment}}</p>
                  <button @click="deleteComment(datapost.id)"> supprimer</button>
               </div>
              
               </div>
           </div>
	</div>
</template>

<script>

import axios from 'axios'


export default {
	name: "thePostView",
  data(){
    return {
      id: this.$route.params.id,
      articleUnique: [],
      post: {},
      comments: [],
      comment: '',
      idComment: '',
      Admin: '',
      idPostUser:'',
      idTokenAdmin: '',
      idCommentUser: '',
      title: '',
      content: '',
      attachment: '',
    }
  },

  props: {

  },

        mounted() {

            const userToken = localStorage.getItem("user");
            const accessToken = JSON.parse(userToken);
            const accessUserId = JSON.parse(userToken);
            console.log(accessToken.token)
            console.log(accessUserId.userId)

              axios.interceptors.request.use(
                      config => {
                      config.headers.authorization = `Bearer ${accessToken.token}`;
                    return config;
                }, error => { return Promise.reject(error);})
            
               axios.get(`http://localhost:3000/api/posts/userPost/${this.id}`)
                .then(response => {
              
              this.articleUnique = response.data.post
              this.idPostUser = response.data.post.userId
              this.idTokenAdmin = accessUserId.userId

              console.log(response.data.post);
              console.log(response.data.post.userId);

              if(response.data.post){

                    this.comments = response.data.comment
                    this.idCommentUser = response.data.comment.userId

                    console.log(response.data.comment.userId)
                    
                return console.log(response.data.comment)

                
                
              }
             })
    },
    

      computed: {
},

	components: {

	},

  methods: {

      createComment: function(){

         const userToken = localStorage.getItem("user");
            const accessToken = JSON.parse(userToken);
            console.log(accessToken.token)

              axios.interceptors.request.use(
                      config => {
                      config.headers.authorization = `Bearer ${accessToken.token}`;
                    return config;
                }, error => { return Promise.reject(error);})

        const commentSend = {
          comment: this.comment,
        }

        axios.post(`http://localhost:3000/api/comments/create/${this.id}`, commentSend)
        .then(response =>{
            
            this.comment = response.data.comment
          
          console.log(response)
        })


        
      },

      deleteComment: async function(idComment){

        const userToken = localStorage.getItem("user");
            const accessToken = JSON.parse(userToken);
            console.log(accessToken.token)

              axios.interceptors.request.use(
                      config => {
                      config.headers.authorization = `Bearer ${accessToken.token}`;
                    return config;
                }, error => { return Promise.reject(error);})


        axios.delete(`http://localhost:3000/api/comments/delete/` + idComment)
        .then(()=> {
        })
      },


      deletePost: async function(idpost){

            const userToken = localStorage.getItem("user");
            const accessToken = JSON.parse(userToken);
            console.log(accessToken.token)

              axios.interceptors.request.use(
                      config => {
                      config.headers.authorization = `Bearer ${accessToken.token}`;
                    return config;
                }, error => { return Promise.reject(error);})


        axios.delete(`http://localhost:3000/api/posts/delete/` + idpost)
        .then(()=> {
        })

      },


      modifyPost: async function (idpost){

        const userToken = localStorage.getItem("user");
            const accessToken = JSON.parse(userToken);
            console.log(accessToken.token)

              axios.interceptors.request.use(
                      config => {
                      config.headers.authorization = `Bearer ${accessToken.token}`;
                    return config;
                }, error => { return Promise.reject(error);})

            const postModifySend = {

                    title: this.title,
                    content: this.content,
            }

          axios.put(`http://localhost:3000/api/posts/modify-post/` + idpost , postModifySend)
        .then(response => {

          this.title = response.data.title 
          this.content = response.data.content
        })



      }

  }
}
</script>

<style>
</style>