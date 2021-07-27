<template>
	<div id="wall" class="wall">

         <h1 class="card__title">Le post numéro {{ id }}</h1>
           <div class="card" >

               <p>{{ articleUnique.title }}</p>
               <p>{{ articleUnique.userName }}</p>
               <p>{{ articleUnique.content }}</p>
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
    }
  },

        mounted() {
        axios.get(`http://localhost:3000/api/posts/userPost/${this.id}`,)
            .then(response => {
              
              this.articleUnique = response.data;
              console.log(response.data);
             })
    },
    

      computed: {
},

	components: {

	}
}
</script>

<style>
</style>