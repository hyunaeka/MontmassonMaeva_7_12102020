<template>
	<div id="wall" class="wall">

      

                    <div class="container">

            <button class=" mt-5"><router-link :to="'/createPost/'">créer un article</router-link></button>
                </div>

                <div class="container card mb-5">
                    <h3>Catégories</h3>
                </div>

            <div class=" container ">
                <div class="card mb-2" :key="index" v-for="(article, index) in posts" >
                        <router-link :to="`/postsView/${article.id}`">
                    <h1>{{ article.title }}</h1>
                    </router-link>
                    
                    <p>{{ article.content }}</p>
                    <p>{{ article.userName }}</p>
                    <p>{{ article.createdAt }}</p>
                    
                        <hr>

                </div>
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


<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Anton&family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Libre+Baskerville:ital@1&family=Roboto&display=swap');

.card {

  display: flex;
  border: 0;
  width: 100%;
  padding: 80px;
}

.card__presentation {

  color: black;
  height: 100%;
  width: 100%;
  padding: 50px;
  background: #FED6D6;
}

.groupamania {

  font-family: 'Anton';
}

.step {
  font-family: 'Anton';
}

.step h3 {

  font-size: 20px;
}

.step__content {

  font-family: 'Libre Baskerville';

}

button {

  color: black;
  border: #FED6D6 solid 2px;
  background-color: white;

}

img {

  width: 100px;
  height: 100px;
}


</style>