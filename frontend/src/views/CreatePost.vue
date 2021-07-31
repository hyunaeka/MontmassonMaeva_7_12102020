<template>
    <div>
        créer un post
        
        <createPost/>
    </div>

    

</template>

<script>

import createPost from '@/components/CreatePost.vue'


export default{
    name: 'CreatePost',

    components: {

        createPost,


    }
}
</script>