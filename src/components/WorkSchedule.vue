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

    <!-- Dates -->
    <div class="workers">

        <!-- Week dates-->
        <div class="worker-column-info">

            Hantverkare
        </div>
        <!--week 1-->
        <div class="schedule-box-date">M<br> 7</div>
        <div class="schedule-box-date">T<br> 8</div>
        <div class="schedule-box-date">O<br> 9</div>
        <div class="schedule-box-date">T<br> 10</div>
        <div class="schedule-box-date">F<br> 11</div>
        <!--week 2-->
        <div class="schedule-box-date">M<br> 14</div>
        <div class="schedule-box-date">T<br> 15</div>
        <div class="schedule-box-date">O<br> 16</div>
        <div class="schedule-box-date">T<br> 17</div>
        <div class="schedule-box-date">F<br> 18</div>
        <!--week 3-->
        <div class="schedule-box-date">M<br> 21</div>
        <div class="schedule-box-date">T<br> 22</div>
        <div class="schedule-box-date">O<br> 23</div>
        <div class="schedule-box-date">T<br> 24</div>
        <div class="schedule-box-date">F<br> 25</div>
        <!--week 4 -->
        <div class="schedule-box-date">M<br> 28</div>
        <div class="schedule-box-date">T<br> 29</div>
        <div class="schedule-box-date">O<br> 30</div>
        <div class="schedule-box-date">T<br> 1</div>
        <div class="schedule-box-date">F<br> 2</div>
    </div>

    <!-- Worker list -->
    <div class="workers">
        <!--Worker-->
        <div class="schedule-box-worker">
            <div><img src="img/Rectangle 1721-1.svg" alt="Profile pic"></div>
            <div>
                <div class="schedule-box-profile"> Namn </div>
                <div class="schedule-box-profile"> Titel</div>
            </div>
        </div>
        <!--1-->
        <div class="schedule-box-grey">A grå</div>
        <!--2-->
        <div class="schedule-box-green">B grön</div>
        <!--3-->
        <div class="schedule-box-orange">C orange</div>
        <!--4-->
        <div class="schedule-box-red">D röd</div>
        <!--5-->
        <div class="schedule-box">E</div>
        <!--6-->
        <div class="schedule-box">F</div>
        <!--7-->
        <div class="schedule-box">G</div>
        <!--8-->
        <div class="schedule-box">H</div>
        <!--9-->
        <div class="schedule-box">I</div>
        <!--10-->
        <div class="schedule-box">J</div>
        <!--11-->
        <div class="schedule-box">K</div>
        <!--12-->
        <div class="schedule-box">L</div>
        <!--13-->
        <div class="schedule-box">M</div>
        <!--14-->
        <div class="schedule-box">N</div>
        <!--15-->
        <div class="schedule-box">O</div>
        <!--16-->
        <div class="schedule-box">P</div>
        <!--17-->
        <div class="schedule-box">Q</div>
        <!--18-->
        <div class="schedule-box">R</div>
        <!--19-->
        <div class="schedule-box">S</div>
        <!--20-->
        <div class="schedule-box">T</div>
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

/* worker boxes */
.schedule-list {
    grid-column: auto;
}

.workers {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.workers * {
    display: flex;
    justify-content: center;
    align-items: center;

    border: 0.5px;
    background-color: #E9E7E7;
    width: 54px;
    height: 63px;

    text-align: center;
    white-space: normal;
    overflow: hidden;
    border-radius: 5px;

    /* outline: 1px solid red; */          /* uncomment to debug */
}

.schedule-box-worker {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    color: #03045E;
    width: 150px;
    height: 63px;
    font-size: 12px;
}

.schedule-box-worker * {
    flex-direction: column;
}

.schedule-box-grey {
    background-color: #E9E7E7;
}

.schedule-box-green {
    background-color: #00FF73;
}

.schedule-box-orange {
    background-color: #FFB200;
    border-style: dashed;
}

.schedule-box-red {
    background-color: #FF0000;
    color: #FFFFFF;
}

.worker-column-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    background-color: #D9D9D9;
    width: 133px; 
    height: 55px;
    margin-right: 17px;
    margin-bottom: 17px;
    border: 0.5px;

}

.schedule-box-date{
    background-color: #D9D9D9;
    font-size: 12px;
}

</style>
