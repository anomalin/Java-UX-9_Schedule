<script setup>
import logo from '@/assets/Group_7.svg'
import group from '@/assets/fluent_people-community-16-filled.svg'
import question from '@/assets/Vector-1.svg'
import settings from '@/assets/mdi_cog.svg'
import home from '@/assets/Vector-2.svg'
import user from '@/assets/Group_45.svg'

</script>

<template>
<div class="container"> 
    <div class="topmenu">
        <div><img :src="logo" alt="logo"></div>
        <div class="menu-icons">
            <img :src="group" alt="group icon">
            <img :src="question" alt="questions icon">
            <img :src="settings" alt="settings icon">
            <img :src="home" alt="home icon">
            <img :src="user" alt="user icon">
        </div>
    </div>
</div>
</template>

<style scoped>
.container {
    max-width: 1440px;
    margin: 0 auto;
}

.topmenu {
    display: flex; 
    flex-direction: row;
    justify-content: space-between;
    margin: 0.2rem;
}

.menu-icons {
    display: flex;
    gap: 0.5rem;
}
</style>
