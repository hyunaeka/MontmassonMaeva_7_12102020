<template>
  <div class="card">
     
      <h1 class="card__tile" v-if="mode == 'login'">Connexion</h1>
      <h1 class="card__tile" v-else>Inscription</h1>
        <p class="card__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <button class="card__action" @click="switchSignUp()">Créer un compte</button></p>
        <p class="card__subtitle" v-else>Tu as déjà un compte ? <button class="card__action" @click="switchLogin()">Se connecter</button></p>

   <h2>Voici le formulaire d'inscription {{day}}</h2>



      <div class="form-row">
        <label for="email" >Ton Email</label>
        <input v-model="email" type="email" id="email" name="email" class="form-control">
      </div>

      <div class="form-row"  v-if="mode == 'create'">
        <label for="username">Ton pseudo</label>
        <input v-model="username" type="text" id="prenom" class="form-control">
      </div>

      <div class="form-row">
        <label for="password">Ton mot de passe</label>
        <input v-model="password" type="password" id="password" class="form-control">
      </div>

    <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
      Adresse mail et/ou mot de passe invalide
    </div>

      <div class="form-row" v-if="mode == 'create'">
        <label for="bio">Ta bio</label>
        <textarea v-model="bio" name="bio" id="bio" class="form-control"></textarea>
      </div>

      <button @click="login()" class="button button--disabled" v-if="mode == 'login'"> 
        <span v-if="status == 'loading'"> Chargement </span>
        <span v-else> Connexion </span>
        </button>
      <button  @click="createUser()" class="button" v-else> Créer mon compte </button>

    
  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {

  name: "login",
  data: function(){
      return {
          mode: 'login',
          email: '',
          username: '',
          password: '',
          bio: '',
      }

  },
  computed : {
      ...mapState(['status', 'day'])
  },

  methods: {
      switchSignUp: function(){
          this.mode = 'create';
      },
      switchLogin: function(){
          this.mode = 'login';
      },

      login: function(){
          const self = this;
          console.log(this.email, this.password);
          this.$store.dispatch('login', {
              email: this.email,
              password: this.password,
          }).then(function(response){
            console.log(response);
            self.$router.push('/profile');

          }, function(error){
            console.log(error);
          })
      },
      createUser: function(){
          const self = this;
          console.log(this.email, this.username, this.password, this.bio);
          this.$store.dispatch('createUser', {
              email: this.email,
              username: this.username,
              password: this.password,
              bio: this.bio
          }).then(function(response){
            console.log(response);
            self.login();

          }, function(error){
            console.log(error);
          })
      },

  }

}
</script>

<style scoped>

</style>

