<script setup>
import WorkerRow from './WorkerRow.vue'
import { computed, onMounted, ref } from 'vue'
import { useBookingStore } from '../stores/bookingStore'
import { startOfWeek, addDays } from 'date-fns'

const today = new Date()
const start = startOfWeek(today, { weekStartsOn: 1 })
const days = ref(
    Array.from({ length: 20 }, (_, i) => addDays(start, i)).filter(date => date.getDay() !== 6 && date.getDay() !== 0)
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
    <div class="container">
        <WorkerRow class="worker-row" v-for="worker in workersToShow" :key="worker.name" :worker="worker" :days="days"/>
    </div>
</template>


<style scoped>

.container {
    max-width: 1280px;
    margin: 0 auto;
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
