<template>

  <div class="container d-flex flex-row mt-5 ">

    <div class=" card left-column col-6 mt-5 p-4">
    <h1 class="card__title">Bienvenue {{user.username}}</h1>
    <p class="card__subtitle">Informations personnelles</p>
    <p class=""> Votre pseudo: {{user.username}}  </p>
    <p>Votre bio: {{user.bio}}</p>
    <p>Votre email: {{user.email}}</p>
    <img :src="user.photo"/>
     <button @click="logout()" class="button"> Déconnexion </button>
    </div>

    <div class="card right-column col-6 p-5 mt-5 p-1">
      <p>Modifier mes <button> informations personnelles </button></p>
       <p>Changer mon <button> mot de passe </button></p>
    </div>
    <div class="form-row">
      
    </div>

  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {

  name: 'profile',

  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background: #FED6D6')
  },
  beforeDestroy () {
    document.querySelector('body').setAttribute('style', 'background: #FED6D6')
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

    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    }

  }
}
</script>


<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Anton&family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Libre+Baskerville:ital@1&family=Roboto&display=swap');

.card {

  display: flex;
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

.card__content {
}

h1 {
  font-size: 25px;
}

body {

  background: black;
}

</style>