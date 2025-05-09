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

import { useBookingStore } from '../stores/bookingStore';

const bookingStore = useBookingStore();


</script>

<template>
    <div class="container">
        <div class="dashboard">
            <div class="top-board">
                <h3>SCHEMALÄGGNING</h3>
                <input type="text" placeholder="Sök...">
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

                    <select id="sort-option" v-model="bookingStore.filters.status"
                        @change="applyFilters('status', status.value)">
                        <option disabled value="">Sortera på</option>
                        <option value="">Visa alla</option>
                        <option value="booked">Bokad</option>
                        <option value="prelbooked">Preliminärt bokad</option>
                        <option value="50booked">50% bokad</option>
                        <option value="100booked">100% bokad</option>
                        <option value="available">Tillgänglig</option>
                        <option value="absence">Frånvaro</option>
                    </select>
                </div>

                <div>
                    <div id="current-dashboard" class="framed">
                        <p>Preliminära bokningar</p>
                        <p>Du har 3 stycken väntande bokningar på 50%, klicka här för mer info.</p>
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
        applyFilters(type, value) {
            const filterValue = value === 'all' ? '' : value;
            this.bookingStore.setFilter(type, filterValue.status);
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

    padding: 0.2rem;
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
}</style>