<template>
	<div id="wall" class="wall container mt-5">
    

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"  integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
           <div class="card container p-5"  >
             
             
<h1 class="pb-5 form__title ">Publication de {{articleUnique.userName}}</h1>


              <img :src="articleUnique.attachment" class="rounded mx-auto d-block" >
                <h2 class="m-5 d-flex justify-content-center form__title ">{{ articleUnique.title}}</h2>
                <p  class=" mb-5 d-flex justify-content-center">{{ articleUnique.content}}</p>
               
               
                <div v-if=" this.idPostUser == this.idTokenAdmin" class="card card__modifyPost container p-5">
                  
                <div class="form-row">
                <label class=" pb-3 form__title" for="title">Nouveau titre du post</label>
                <input  v-model="title" type="text" id="title" class="form-control" required>
                <p class="modify"> *obligatoire </p>
                <label class=" pt-4 pb-3 form__title" for="content">Contenu du post</label>
                <textarea v-model="content" type="text" id="content" class="form-control content__modify" required ></textarea>
                 <p class="modify"> *obligatoire </p>
                </div>
                <div class="form-row pt-5 pb-5 " >
                <label  class="form__title" for="file"><i class="fas fa-cloud-upload-alt"></i> Ajouter une image</label>
                <input type="file" @change="selectedFile" id="file" name="file" accept="image/*" /><p class="modify"> *Falcultatif </p>
               
                </div>
                <button class="btn__modify btn form__title" v-if=" this.idPostUser == this.idTokenAdmin" @click="modifyPost(articleUnique.id) != null" >Modifier le post</button>

                
                </div>
                
               
               <div class=" card__deletePost container pt-5 pb-5">
                 <button class="btn-danger btn btn__suppr form__title" v-if=" this.idPostUser == this.idTokenAdmin" @click="deletePost(articleUnique.id)">Supprimer l'article</button>
                </div>
               <div class="card card__createcomment container p-5 mb-4">

                <div class="form-row " >
                <label class=" pb-3 form__title " for="comment">Répondre</label>
                <input  v-model="comment" type="text" id="comment" class="form-control" required>
                <button class="mt-3 btn form__title" @click="createComment()">Créer un commentaire</button>
                </div>
                
               </div>
              <div class="card card__comment__test d-flex ">

               <div class="card__comment card p-5 m-5" :key="index" v-for="(datapost, index) in comments">
                 <div class="d-flex flex-row-reverse">
                  <i @click="deleteComment(datapost.id)" class="fas btn fa-times suppr"></i>
                  </div>
                                <p class=" form__title ">{{ datapost.userName }}</p>
                                <p>{{ datapost.comment}}</p>
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

  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background: #091F43 ')
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

          
        selectedFile(e){

                this.attachment = e.target.files[0];

        },

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
        }).then(() =>{location.reload()})


        
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
        .then(() =>{location.reload()})
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
        .then(() =>{this.$router.push('/deleteSuccess')})

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

        const title = this.title;
        const content = this.content;

            const postModifySend = new FormData(); 

        postModifySend.append('title', title);
        postModifySend.append('content', content); 
        postModifySend.append('image', this.attachment);
     

          axios.put(`http://localhost:3000/api/posts/modify-post/` + idpost , postModifySend)
        .then(response => {     
            
          this.title = response.data.title 
          this.content = response.data.content
          this.attachment = response.data.attachment
          this.$router.push('/createSuccess')
          

        }).catch((error) => {
              console.error(error);
          });
    }
  }
}
</script>

<style scoped>

img {
  width: 50%!important;
  height: 50% !important;
}

.suppr {
  color: red;
}

.modify {
  color: red;
}

.card__comment {

  border: solid 2px pink;
}

button {

  color: black;
  border: #FED6D6 solid 2px;
  background-color: #FED6D6;
  font-family: 'Zilla Slab';

}

button:hover{

  color: white;
  border: #BA4D55 solid 2px;
  background-color: #BA4D55;
  font-family: 'Zilla Slab';


}

.btn__suppr {

  background: rgb(184, 4, 4);
  color: white;
}

.form__title {

  font-family: 'Zilla Slab'
}

h1 {

  font-size: 20px;
}
</style>