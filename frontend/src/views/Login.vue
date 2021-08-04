<template>
  <div class="card">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous"
    />

    <div class="card card__presentation">
      <div>
        <h1 class="card__title groupamania">GROUPAMANIA</h1>
        <p class="p-1">Partagez, Échangez , Découvrez ————</p>

        <div class="d-flex flex-row justify-content-center">
          <div class="step p-1">
            <h3>
              <i class="fas fa-file-signature"></i
              ><span class="step__content"> Inscrivez-vous </span>
            </h3>
          </div>
          <div class="step p-1">
            <h3>
              <i class="fas fa-upload"></i
              ><span class="step__content"> Publiez du contenu </span>
            </h3>
          </div>
          <div class="step p-1">
            <h3>
              <i class="fas fa-edit"></i
              ><span class="step__content">
                Commentez et intéragissez avec vos collègues
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-5">
      <img src="../assets/icon.png" />
      <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
      <h1 class="card__title" v-else>Inscription</h1>
      <p class="card__subtitle" v-if="mode == 'login'">
        Tu n'as pas encore de compte ?
        <button class="card__action btn" @click="switchSignUp()">
          Créer un compte
        </button>
      </p>
      <p class="card__subtitle" v-else>
        Tu as déjà un compte ?
        <button class="card__action btn_switch btn" @click="switchLogin()">
          Se connecter
        </button>
      </p>

      <div class="form-row">
        <label for="email">Ton Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          name="email"
          class="form-control"
        />
      </div>

      <div class="form-row" v-if="mode == 'create'">
        <label for="username">Ton pseudo</label>
        <input
          v-model="username"
          type="text"
          id="prenom"
          class="form-control"
        />
      </div>

      <div class="form-row">
        <label for="password">Ton mot de passe</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="form-control"
        />
      </div>

      <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
        Adresse mail et/ou mot de passe invalide
      </div>

      <div class="form-row" v-if="mode == 'create'">
        <label for="bio">Ta bio</label>
        <textarea
          v-model="bio"
          name="bio"
          id="bio"
          class="form-control"
        ></textarea>
      </div>

      <button
        @click="login()"
        class="button btn button--disabled mt-2 mb-5"
        v-if="mode == 'login'"
      >
        <span v-if="status == 'loading'"> Chargement </span>
        <span v-else> Connexion </span>
      </button>
      <button @click="createUser()" class="button mt-2 mb-5" v-else>
        Créer mon compte
      </button>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex";

export default {

  name: "login",

  data: function () {
    return {
      mode: "login",
      email: "",
      username: "",
      password: "",
      bio: "",
    };
  },

  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background: white");
  },

  computed: {
    ...mapState(["status", "day"]),
  },

  methods: {

    // Pour changer l'affichage et permettre la connexion ou l'inscription 

    switchSignUp: function () {
      this.mode = "create";
    },
    switchLogin: function () {
      this.mode = "login";
    },

/************************************************************************* Appelle fonction Log un utilisateur *******************************************************************************/

    login: function () {
      console.log(this.email, this.password);
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(
          function (response) {
            console.log(response);
            window.location.assign("http://localhost:8080/profile")
          },
          function (error) {
            console.log(error);
          }
        );
    },

/************************************************************************* Appelle fonction Créer un utilisateur *******************************************************************************/

    createUser: function () {
      const self = this;
      console.log(this.email, this.username, this.password, this.bio);
      this.$store
        .dispatch("createUser", {
          email: this.email,
          username: this.username,
          password: this.password,
          bio: this.bio,
        })
        .then(
          function (response) {
            console.log(response);
            self.login();
          },
          function (error) {
            console.log(error);
          }
        );
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@1&family=Overpass:ital,wght@0,600;1,600&family=Zilla+Slab:wght@600&display=swap");

.card {
  display: flex;
  align-items: center;
  border: 0;
}

.card__presentation {
  color: #ffd6d6;
  height: 100%;
  width: 100%;
  padding: 50px;
  background: #091f43;
}

.groupamania {
  font-family: "Zilla Slab";
}

.step {
  font-family: "Anton";
}

.step h3 {
  font-size: 20px;
}

.step__content {
  font-family: "Overpass";
}

button {
  color: black;
  border: #fed6d6 solid 2px;
  background-color: white;
}

img {
  width: 100px;
  height: 100px;
}

h1 {
  color: #ffd6d6;
}

p {
  font-size: 20px;
}
</style>

