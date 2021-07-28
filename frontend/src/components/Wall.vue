<template>
	<div id="wall" class="wall">

         <h1 class="card__title" >Le post numéro {{ id }}</h1>
           <div class="card"  >
               <p>{{ articleUnique.userName }}</p>
               <p>{{ articleUnique.content}}</p>
               <p>{{ articleUnique.title}}</p>
               <div class="card card__createcomment">

                <div class="form-row" >
                <label for="comment">Répondre</label>
                <input  v-model="comment" type="text" id="comment" class="form-control">
                <button @click="createComment()">Créer un commentaire</button>
                </div>
                
               </div>
                
               <div class="card__comment card" :key="index" v-for="(datapost, index) in comments">
                                <p>{{ datapost.userName }}</p>
                                 <p>{{ datapost.comment}}</p>


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
    }
  },

  props: {

  },

        mounted() {

            const userToken = localStorage.getItem("user");
            const accessToken = JSON.parse(userToken);
            console.log(accessToken.token)

              axios.interceptors.request.use(
                      config => {
                      config.headers.authorization = `Bearer ${accessToken.token}`;
                    return config;
                }, error => { return Promise.reject(error);})
            
               axios.get(`http://localhost:3000/api/posts/userPost/${this.id}`)
                .then(response => {

            
              this.articleUnique = response.data.post
              console.log(response.data.post);
              if(response.data.post){
                    this.comments = response.data.comment
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

        axios.post(`http://localhost:3000/api/comments/create/${this.id}`)
        .then(response =>{
            

          
          console.log(response)
        })


        
      }
  }
}
</script>

<style>
</style>