<template>
	<div>
                
        <div class="card card__createpost">

             <div class="form-row" >
                <label for="title">title</label>
                <input  v-model="title" type="text" id="title" class="form-control">
             </div>
            <div class="form-row" >
                <label for="content">Post</label>
                <input  v-model="content" type="text" id="content" class="form-control">
             </div>
                <button @click="createPost()">Créer un post</button>
        </div>
    </div>

</template>

<script>

import axios from 'axios'



export default {
	name: "createPost",

    data() {
        return {
            post: [],
            title: '',
            content: '',
            attachment: '',
        }
    },

        created() {

            
    },

    methods: {

        createPost: function(){

             const userToken = localStorage.getItem("user");
            const accessToken = JSON.parse(userToken);
            console.log(accessToken.token)

              axios.interceptors.request.use(
                      config => {
                      config.headers.authorization = `Bearer ${accessToken.token}`;
                    return config;
                }, error => { return Promise.reject(error);})

        const postSend = {
         title: this.title,
         content: this.content,
                 }

        axios.post(`http://localhost:3000/api/posts/new`, postSend)
        .then(response =>{
            
            this.title = response.data
            this.content = response.data
          
          console.log(response)
            this.$router.push('/home')
        })

      },
    }
}

</script>