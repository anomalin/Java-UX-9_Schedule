<script setup>
import { computed, onMounted } from 'vue'
import { useBookingStore } from '../stores/bookingStore'

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
        <div v-if="bookingStore.loading">Laddar bokningar...</div>
        <div v-else-if="bookingStore.error">{{ bookingStore.error }}</div>
        <div v-else>
            <div v-for="worker in workersToShow" :key="worker.name">
                <template v-if="worker && worker.bookings && worker.bookings.length > 0">
                <h2>{{ worker.name }}</h2>
                <p>Sysselsättningar: {{ worker.professions.join(', ') }}</p>
                <div v-for="booking in worker.bookings" :key="booking.from + booking.to + booking.activity" class="framed">
                    <p><strong>{{ booking.activity }}</strong></p>
                    <p>{{ booking.from }} - {{ booking.to }}</p>
                    <p>{{ booking.percentage }}% {{ booking.status }}</p>
                </div>
                </template>
            </div>
        </div>
    </div>
</template>


<style scoped>
.container {
    max-width: 1280px;
    margin: 0 auto;
}

.framed {
    border: 1px solid #ccc;
    margin-bottom: 10px;
    padding: 10px;
}
</style>
