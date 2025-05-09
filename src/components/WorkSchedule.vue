<script>
import { useBookingStore } from '../stores/bookingStore';

export default {
    data() {
        return {
            bookingStore: useBookingStore
        }
    },
    computed: {
        isFiltered() {
            return this.bookingStore.filters.length > 0
        },
        filteredBookings() {
            return this.bookingStore.filteredBookings;
        }
    },
    mounted() {
        this.bookingStore.fetchBookings();
    }
}
</script>

<template>
    <div class="container">
        <div v-if="bookingStore.loading">Laddar bokningar...</div>
        <div v-else-if="bookingStore.error">{{ bookingStore.error }}</div>
        <div v-else>
            <div v-for="worker in (isFiltered ? filteredBookings : bookingStore.bookings)" :key="worker.name">
                <h2>{{ worker.name }}</h2>
                <p>Sysselsättningar: {{ worker.professions.join(', ') }}</p>
                <div v-for="booking in worker.bookings" :key="booking.from + booking.to" class="framed">
                    <p><strong>{{ booking.activity }}</strong></p>
                    <p>{{ booking.from }} - {{ booking.to }}</p>
                    <p>{{ booking.percentage }}% {{ booking.status }}</p>
                </div>
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
