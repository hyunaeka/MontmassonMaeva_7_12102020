<template>
    <div class="">
        <button>
            <router-link :to="{ name: 'home'}">Home</router-link>
        </button>
        <button>
            <router-link :to="{ name: 'dashboard'}">Dashboard</router-link>
        </button>
        <button>
            <router-link :to="{ name: 'login'}">Login</router-link>
        </button>
        <button>
            <router-link :to="{ name: 'profile'}">Profile</router-link>
        </button>
    </div>
</template>

