<template>
	<div >

            <thePostView/>

	</div>
</template>

<script>

import thePostView from '@/components/Wall.vue'

export default {
	name: "wall",

    data() {
        return {
        postView: [],

        }
    },

        components: {

        thePostView

    }
   
             /*
             let dataPost = {
            id: response.data[0].id,
            title: response.data[0].title,
            content: response.data[0].content,
            userName: response.data[0].userName,
            createdAt: response.data[0].createdAt,
             }
             
                this.post = dataPost
                this.postUserId = response.data[0].userId
                this.userId = localStorage.getItem('userId')
                    if(this.userId == this.postUserId) {
                        this.isAdmin = true
                        } else {
                        this.isAdmin = false
          }
         }) */

    /*methods: {

        showPost(post){},
    },*/
}
</script>

<style>
</style>