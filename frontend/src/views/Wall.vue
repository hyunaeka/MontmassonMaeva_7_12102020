<template>
	<div >

         <h1 class="card__title">post {{ }}</h1>
           <div class="card">
               <h1>{{ articleUnique.title}}</h1>
               <p>{{  articleUnique.body}}</p>
           </div>
	</div>
</template>

<script>

import axios from 'axios'

export default {
	name: "wall",

    data() {
        return {
        articleUnique: [],
        postView: [],   

        }
    },
    mounted(){
        axios
        .get(`http://localhost:3000/api/posts/userPost/`)
         .then(response => {

            this.articleUnique = response.data 
         })
             /*
             let dataPost = {
            id: response.data[0].id,
            title: response.data[0].title,
            content: response.data[0].content,
            userName: response.data[0].userName,
            createdAt: response.data[0].createdAt,
             }
             
                this.post = dataPost
                this.postUserId = response.data[0].userId
                this.userId = localStorage.getItem('userId')
                    if(this.userId == this.postUserId) {
                        this.isAdmin = true
                        } else {
                        this.isAdmin = false
          }
         }) */
    },

    /*methods: {

        showPost(post){},
    },*/
}
</script>

<style>
</style>