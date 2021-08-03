<template>

  
	<div  id="wall" class="wall container ">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"  integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">

    <div v-if=" idTokenAdmin == null ">

      

    </div>
    <div >
            <div class="container d-flex justify-content-center">
            <button  class=" btn p-2 mb-5 mt-5"><router-link :to="'/createPost/'">créer un article</router-link></button>
            </div>
                    <div class="container d-flex flex-column">
                <div class="container card mb-5">

                    <h3>Catégories</h3>

                    
                </div>
                </div>


            <div class=" container d-flex flex-column-reverse ">
                <div class="card card__post mb-2" :key="index" v-for="(article, index) in posts" >
                        <router-link :to="`/postsView/${article.id}`">
                    <h1>{{ article.title }}</h1>
                    </router-link>
                    
                    <p class="card__username">By <i class="fas fa-user p-1"></i> {{ article.userName }}<span> <i class="far fa-clock"></i>Le {{ article.createdAt | formatDate }}</span><i class="far fa-heart p-5"></i></p>
                        <hr>

                </div>
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

          idTokenAdmin: '',
        }
    },

  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background: #091F43 ')
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
            .then(response => { 
              
              
              for( const postsView of response.data){
                this.posts.push(postsView)

                console.log(response.data)
            }
            
            })
    }, 




    methods: {

    }
}

</script>


<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@1&family=Overpass:ital,wght@0,300;0,600;1,600&family=Zilla+Slab:wght@600&display=swap');

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
  background-color: #FED6D6;
  font-family: 'Zilla Slab';

}

button:hover{

  border: #BA4D55 solid 2px;
  background-color: #BA4D55;
  font-family: 'Zilla Slab';


}

img {

  width: 100px;
  height: 100px;
}

.card__post {

  background: white;
}

a {
  color: black;
  text-decoration: none;


}

a:hover {

color: black;
text-decoration: none;
}

.card__username {

  color: #BA4D55;
  font-family: 'Overpass';
}

span {

}

.fa-clock {

  padding-left: 20px;
  padding-right: 5px;
}

h1 {
  font-family: 'Zilla Slab';
}

.card__post a:hover {

   color: #BA4D55;
}
</style>