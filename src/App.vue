<template>
    <div id="app">
        <TopMenu />
        <DashBoard />
        <WorkSchedule />
    </div>
</template>

<script>
import TopMenu from './components/TopMenu.vue';
import DashBoard from './components/DashBoard.vue';
import WorkSchedule from './components/WorkSchedule.vue';


export default {
    components: {
        TopMenu,
        DashBoard,
        WorkSchedule
    }
}
</script>



