<template>
	<div class="container">

        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"  integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
                
        <div class="card m-5 p-5">

             <div class="form-row container mb-4" >
                <label class="mb-3 form__title" for="title">Titre de la publication</label>
                <input  v-model="title" type="text" id="title" class="form-control" required>
             </div>
             
            <div class="form-row container mb-4" >
                <label class="mb-3 form__title" for="content ">Contenu de la publication</label>
                <textarea v-model="content" type="text" id="content" class="form-control" required></textarea>
             </div>
            <div class="form-row container mb-4" >
            <label class=" form__title" for="file"> Partager une image,un gif...</label>
             <input class=" m-2" type="file" @change="selectedFile" id="file" name="file" accept="image/*" />
             </div>
                <button class=" btn-info" @click="createPost()">Créer la publication</button>
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
      beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background: #091F43 ')
  },

    methods: {

        selectedFile(e){

                this.attachment = e.target.files[0];

        },

        createPost(){



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

        const postSend = new FormData(); 

        postSend.append('title', title);
        postSend.append('content', content); 
        postSend.append('image', this.attachment);
                 

        axios.post(`http://localhost:3000/api/posts/new`, postSend)
        .then(response =>{
            
            this.title = response.data
            this.content = response.data
            this.attachment = response.data
          
          console.log(response)
            this.$router.push('/createSuccess')
        })

      },
    }
}

</script>

<style scoped>
.form__title {

    font-family: 'Zilla Slab';
    font-size: 20px;
}

button:hover {

  background:#BA4D55;
  border-color: #BA4D55;
  color: #091F43;
}

button {

  color: #FED6D6;
  border: #091F43 solid 2px;
  background-color: #091F43;

}
</style>