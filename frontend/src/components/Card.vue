<template>
	<div id="wall" class="wall">

         <h1 class="card__title">Publication</h1>
          
           <div class="card" :key="index" v-for="(article, index) in posts" >
                <router-link :to="`/postsView/${index + 1}`">
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
        axios.get('http://localhost:3000/api/posts/all')
            .then(response => { for( const postsView of response.data){
                this.posts.push(postsView)
            }
            
            })
    }
}

</script>