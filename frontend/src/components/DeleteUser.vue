<template>
  <div class="card container d-flex justify-content-center mt-5">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous"
    />

    <div class="container d-flex justify-content-center flex-column p-5">
      <h1>
        Votre compte a bien été supprimé ! Nous vous souhaitons une bonne
        continuation et espérons vous revoir très bientôt parmi nous.
      </h1>

      <button class="btn">
        <router-link :to="{ name: 'login' }">
          Retourner à l'accueil</router-link
        >
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "deleteUser",

  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background: #091F43 ");
  },

  components: {},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@1&family=Overpass:ital,wght@0,300;0,600;1,600&family=Zilla+Slab:wght@600&display=swap");

button {
  color: black;
  border: #fed6d6 solid 2px;
  background-color: #fed6d6;
  font-family: "Zilla Slab";
  margin: 10px;
}

button:hover {
  color: white;
  border: #ba4d55 solid 2px;
  background-color: #ba4d55;
  font-family: "Zilla Slab";
}

a {
  color: black;
  list-style: none;
  text-decoration: none;
}

a:hover {
  color: white;
}
</style>