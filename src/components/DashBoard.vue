<script setup>
import hammer from '@/assets/ion_hammer-sharp.svg'
import brush from '@/assets/la_brush.svg'
import lightningbolt from '@/assets/mdi_electricity-outline.svg'
import brickwall from '@/assets/game-icons_brick-wall.svg'
import wrench from '@/assets/mdi_wrench.svg'
import no1 from '@/assets/Frame_154.svg'
import no2 from '@/assets/Frame_155.svg'
import no3 from '@/assets/Frame_156.svg'
import no4 from '@/assets/Frame_157.svg'
import no5 from '@/assets/Frame_158.svg'

import { storeToRefs } from 'pinia';
import { useBookingStore } from '../stores/bookingStore';
import { ref, computed } from 'vue'

const bookingStore = useBookingStore();
const { filterStatus, filteredBookings, bookings } = storeToRefs(bookingStore);
const searchTerm = ref('')

const suggestedNames = computed(() => {
    if (!searchTerm.value) return []
    return bookingStore.bookings.map(worker => worker.name).filter(name => name.toLowerCase().includes(searchTerm.value.toLowerCase()))
})
function selectName(name) {
    searchTerm.value = name
    bookingStore.setFilterName(name)
}

</script>

<template>
    <div class="container">
        <div class="dashboard">
            <div class="top-board">
                <h3>SCHEMALÄGGNING</h3>
                <input v-model="searchTerm" @input="bookingStore.setFilterName(searchInput)" placeholder="Sök..."/>
                <ul v-if="suggestedNames.length">
                <li v-for="name in suggestedNames" :key="name" @click="selectName(name)">
                {{ name }}
                </li>
                </ul>
            </div>

            <div class="booking-info">
                <div class="workers">
                    <div id="worker-info" class="framed">
                        <div>Snickare <img :src="hammer" alt="hammer icon"></div>
                        <div>Målare <img :src="brush" alt="brush icon"></div>
                        <div>Elektriker <img :src="lightningbolt" alt="lightningbolt icon"></div>
                        <div>Murare <img :src="brickwall" alt="brickwall icon"></div>
                        <div>Rörmokare <img :src="wrench" alt="wrench icon"></div>
                    </div>

                    <select id="sort-option" v-model="bookingStore.filterStatus">
                        <option disabled value="">Sortera på</option>
                        <option value="">Visa alla</option>
                        <option value="Booked">Bokad</option>
                        <option value="Preliminary">Preliminärt bokad</option>
                        <option value="50">50% bokad</option>
                        <option value="100">100% bokad</option>
                        <option value="Absent">Frånvaro</option>
                    </select>
                </div>

                <div>
                    <div id="current-dashboard" class="framed">
                        <h3>Preliminära bokningar</h3>
                        <p>Du har {{ bookingStore.prelCount }} stycken väntande bokningar, klicka <a @click="bookingStore.filterStatus = 'Preliminary'">här</a> för mer info.</p>
                    </div>

                    <div id="color-explain" class="framed">
                        <img :src="no1" alt="">
                        <img :src="no2" alt="">
                        <img :src="no3" alt="">
                        <img :src="no4" alt="">
                        <img :src="no5" alt="">
                    </div>
                </div>

                <div id="statistics" class="framed">
                    <h2>STATISTIK</h2>

                </div>

                <div id="schedule" class="framed">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            status: ''
        };
    },
    methods: {
        applyFilters(value) {
            const filterValue = value === 'all' ? '' : value;
            this.bookingStore.setFilter(filterValue);
        }
    }
}
</script>


<style scoped>
.container {
    max-width: 1280px;
    margin: 0 auto;
}

.dashboard>div {
    display: flex;
    justify-items: center;
}

.booking-info {
    display: flex;
    justify-content: space-between;
}

.top-board {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.top-board input {
    background-color: #D2D2DC;
    height: 40px;
    border-radius: 10px;
}

.framed {
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 10px;
}

.workers {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.workers select {
    background-color: #D9D9D9;
    height: 30px;
    border-radius: 10px;
    width: 130px;
    margin-top: 0.2rem;
}

#worker-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 130px;

    padding: 0.5rem;
    height: 250px;
}

#worker-info>div {
    display: flex;
    justify-content: space-between;
}

#current-dashboard {
    width: 400px;
    height: 225px;
    padding: 1rem;
    margin-bottom: 0.2rem;
}

#current-dashboard h3 {
    margin-bottom: 1rem;
}

#statistics {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 380px;
    height: 288px;
}

#schedule {
    width: 260px;
    height: 288px;
}

#color-explain {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
}

p > a {
    text-decoration: underline;
    cursor: default;
}

ul {
    list-style-type: none;
}
</style>