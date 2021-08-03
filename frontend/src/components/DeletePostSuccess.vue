<template>

<div class="card container d-flex justify-content-center mt-5">
    <div class="container d-flex justify-content-center flex-column p-5">
       <h1> Votre publication a bien été supprimé ! </h1>

        <div>
       <button class="btn "> <router-link :to="{ name: 'profile'}" >  au profile </router-link> </button>
       <button class="btn "> <router-link :to="{ name: 'home'}" >  au fil d'actualité </router-link> </button>
       </div>
       </div>

</div>

</template>

<script>

export default{
    name: 'deletePost',
    components: {
        
    }
}
</script>