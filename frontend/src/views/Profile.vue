<template>

  <div class="container d-flex flex-column mt-5 ">

  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"  integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">


    <div class=" card mt-5 p-5 card__perso">
    <h1 class="card__title container d-flex justify-content-center p-5">Bienvenue {{user.username}}</h1>

    <p class="container d-flex justify-content-center">Votre bio:  </p>
    <p class="container card d-flex justify-content-center p-5 bio__content " >{{user.bio}}</p>

    <div class=" flex-wrap justify-content-center p-5">
      
    <h2 class="card__subtitle pb-4">Informations personnelles</h2>
    <p class=""> Votre pseudo: {{user.username}}  </p>
    <p>Votre email: {{user.email}}</p>
    <img :src="user.photo"/>
     <button @click="logout()" class="button btn btn__x justify-content-center p-2 mt-3"> Déconnexion </button>
    </div>
    </div>

    <div class="card p-5 mt-5 p-1 card__modify">
      <p   v-if="mode == 'profile'"> <i @click="switchModify()" class="fas p-2 btn fa-user p-1"></i>Modifier mes informations personnelles</p>
      <div class="form-row"  v-if="mode == 'modify'">
        <label class="mb-3 " for="username">Votre nouveau pseudo</label>
        <input v-model="username" type="text" id="prenom" class="form-control">
      </div>
      <div class="form-row"  v-if="mode == 'modify'">
        <label class="mb-3 mt-4" for="bio">Ma bio</label>
        <textarea v-model="bio" type="text" id="bio" class="form-control"></textarea>
        <button @click="modifyUser()" class=" mt-2 mb-5 p-2 btn" v-if="mode == 'modify'">Modifier</button>
      </div>
      <div class="" v-else>
       <p> <i class="fas p-2 btn fa-user p-1"></i>Changer mon mot de passe </p>
       </div>
      <div >
       <p> <i @click="deleteUser()" class="fas fa-user-times p-2 btn "></i>Supprimer mon compte </p>
       </div>
    </div>


  </div>
</template>

<script>

import { mapState } from 'vuex'
import axios from 'axios'

export default {

  name: 'profile',
  data: function(){
    return{
      mode: 'profile',
      bio: '',
      username:'',


    }
  },

  
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background: white')
  },

  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return ;
    }
    this.$store.dispatch('getUserInfos');
  },

  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {

          switchModify: function(){
          this.mode = 'modify';
      },
      switchProfile: function(){
          this.mode = 'profile';
      },

    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    },

    modifyUser: function(){

      const userToken = localStorage.getItem("user");
            const accessToken = JSON.parse(userToken);
            console.log(accessToken.token)

              axios.interceptors.request.use(
                      config => {
                      config.headers.authorization = `Bearer ${accessToken.token}`;
                    return config;
                }, error => { return Promise.reject(error);})

       

            const userModifySend = {

              bio : this.bio,
              username : this.username

            }
     

          axios.put('http://localhost:3000/api/users/myprofile' , userModifySend)
        .then(response => {     
            
          this.username = response.data.bio
          this.bio = response.data.username

          location.reload();
          

        }).catch((error) => {
              console.error(error);
          });
    },

    deleteUser: async function(){

        const userToken = localStorage.getItem("user");
            const accessToken = JSON.parse(userToken);
            console.log(accessToken.token)

              axios.interceptors.request.use(
                      config => {
                      config.headers.authorization = `Bearer ${accessToken.token}`;
                    return config;
                }, error => { return Promise.reject(error);})


        axios.delete('http://localhost:3000/api/users/deleteMe')
        .then(() =>{
          localStorage.removeItem('user')
          this.$router.push('/deleteUser')
          
          
          
          })
        
        
        .catch((error) => {
              console.error(error);
          });
      },

  }
}
</script>


<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@1&family=Overpass:ital,wght@0,300;0,600;1,600&family=Zilla+Slab:wght@600&display=swap');

.card {

  display: flex;
}

.card__presentation {

  color: white;
  height: 100%;
  width: 100%;
  padding: 50px;
  background: white;
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

}

.card__content {
}

.card__perso {
  background: #091F43 ;
  color: white;
}

.card__modify {

  background: #091F43;
  color: white;

}


h1 {
    font-family: 'Zilla Slab';
    font-size: 28px;
}

h2 {
  font-family: 'Overpass';
  font-size: 22px;
}

p{
  font-family: 'Overpass';
  font-weight: 300;
}

.bio__content {

  color: #091F43;
  width: 50%;
}


i {
  color: #FED6D6;
}

i:hover {

  color: red;
}

button:hover {

  background:#BA4D55;
  border-color: #BA4D55;
}

</style>