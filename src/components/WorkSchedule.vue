<script setup>
import WorkerRow from './WorkerRow.vue'
import { computed, onMounted, ref } from 'vue'
import { useBookingStore } from '../stores/bookingStore'
import { startOfWeek, addDays, format } from 'date-fns'

const today = new Date()
const start = startOfWeek(today, { weekStartsOn: 1 })
const days = ref(
    Array.from({ length: 26 }, (_, i) => addDays(start, i)).filter(date => date.getDay() !== 6 && date.getDay() !== 0)
)
const bookingStore = useBookingStore()

const isFiltered = computed(() => bookingStore.filterStatus?.length > 0)
const filteredBookings = computed(() => bookingStore.filteredBookings)
const workersToShow = computed(() => {
  return bookingStore.filteredBookings.filter(worker => worker.bookings.length > 0)
});

onMounted(() => {
    bookingStore.fetchBookings()
})
</script>


<template>
    <div class="schedule-grid">
    <div class="header-row">
    <div class="header-workercell"><p>Hantverkare:</p></div>
    <div class="header-daycell" v-for="day in days" :key="day.toISOString()"> {{ format(day, 'd') }} </div>
    </div>
        <WorkerRow class="worker-row" v-for="worker in workersToShow" :key="worker.name" :worker="worker" :days="days"/>
    </div>
   
</template>


<style scoped>
.schedule-grid {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.header-row {
    display: grid;
    grid-template-columns: repeat(21, 1fr);
    margin-bottom: 0.5rem;
}

.header-workercell {
    background-color: #D9D9D9;
    border-radius: 5px;
    width: 133px;
    margin-right: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.header-daycell {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #D9D9D9;
    border-radius: 5px;
    width: 54px;
    height: 55px;
    
}

.worker-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #03045E;
    height: 63px;
    font-size: 12px;
    width: 1276px;
    margin-bottom: 1rem;
}

</style>
