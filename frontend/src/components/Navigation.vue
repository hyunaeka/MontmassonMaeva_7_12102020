<template>
  <div class="">

    <div class="navcolor">

      <b-navbar toggleable="sm" type="light" variant="variant">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand><img src="../assets/icon.png" /></b-navbar-brand>

        <b-collapse id="nav-text-collapse" is-nav>
          <b-navbar-nav>
            
        <!-- Route vers le fil d'actualité-->

            <b-nav-text><router-link :to="{ name: 'home' }">Home</router-link></b-nav-text>
          </b-navbar-nav>
          <b-nav-item-dropdown text="Me" right>

        <!-- Route vers le profile -->

            <b-dropdown-item><router-link :to="{ name: 'profile' }">Profile</router-link></b-dropdown-item>

        <!-- Route vers créer une publication -->
            
            <b-dropdown-item><router-link :to="{ name: 'CreatePost' }">Créer une publication</router-link></b-dropdown-item>
          </b-nav-item-dropdown>
        </b-collapse>
      </b-navbar>

    </div>

  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
}

li {
  list-style: none;
}

img {
  width: 80px;
  height: 80px;
}

a {
  color: #0e2140;
  text-decoration: none;
}

a:hover {
  color: #0e2140;
  border-bottom: #0e2140 solid 2px;
  text-decoration: none;
}

.navcolor {
  background-color: white;
}
</style>

