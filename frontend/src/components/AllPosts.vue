<template>
	<div id="wall" class="wall">

            <button><router-link :to="'/createPost/'">créer un article</router-link></button>

         <h1 class="card__title">Publication</h1>
          
           <div class="card" :key="index" v-for="(article, index) in posts" >
                <router-link :to="`/postsView/${article.id}`">
               <h1>{{ article.title }}</h1>
               </router-link>
              
               <p>{{ article.content }}</p>
               <p>{{ article.userName }}</p>
               <p>{{ article.createdAt }}</p>
                <hr>

           </div>
           
           
	</div>
</template>

<script>

import axios from 'axios'



export default {
	name: "wallscard",

    props: ['id', 'title', 'userName', 'content', 'createdAt'],
    data() {
        return {
            posts: [],
        }
    },

        created() {

            const userToken = localStorage.getItem("user");
            const accessToken = JSON.parse(userToken);
            console.log(accessToken.token)
            
        axios.interceptors.request.use(
                      config => {
                      config.headers.authorization = `Bearer ${accessToken.token}`;
                    return config;
                }, error => { return Promise.reject(error);})

        axios.get('http://localhost:3000/api/posts/all')
            .then(response => { for( const postsView of response.data){
                this.posts.push(postsView)

                console.log(response.data)
            }
            
            })
    }
}

</script>