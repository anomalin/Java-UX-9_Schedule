<template>
     <div class="schedule-box-worker">
            <div class="worker-short">
            <div>Bild</div>
            <div>
                <div class="schedule-box-profile"> {{ worker.name }} </div>
                <div class="schedule-box-profile">{{ worker.professions.join(', ') }}</div>
            </div>
            </div>
        <DayCell v-for="day in days" :key="day.toISOString()" :date="day" :bookings="worker.bookings"/>
    </div>
</template>

<script setup>
import DayCell from './DayCell.vue'


const props = defineProps({
    worker: Object,
    days: Array
})



</script>

<style scoped>
.worker-short {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 150px;
    background-color: #D9D9D9;
    padding: 0.2rem;
    border-radius: 5px;
}

.worker-short > div {
    display: flex;
    flex-direction: column;
    align-content: flex-end;
}
</style>