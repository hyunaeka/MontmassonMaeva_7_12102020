<template>
    <div>
        Home
        
        <wallscard/>
    </div>

    

</template>

<script>

import wallscard from '@/components/AllPosts.vue'


export default{
    name: 'home',

    components: {

        wallscard,


    }
}
</script>
