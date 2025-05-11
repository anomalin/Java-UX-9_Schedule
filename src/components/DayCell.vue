<template>
    <div class="day-cell" :class="[statusClass, { percentage50: bookingForThisDay?.percentage === 50}]" :title="tooltip"></div>
</template>

<script setup>
import { computed } from 'vue'
import { isSameDay, parseISO } from 'date-fns'

const props = defineProps({
    date: {
        type: Date,
        required: true
    },  
    bookings: Array
})

const bookingForThisDay = computed(() => {
  if (!props.date || !Array.isArray(props.bookings)) return undefined

  return props.bookings.find(b =>
    isSameDay(parseISO(b.from), new Date(props.date))
  )
})


const statusClass = computed(() => {
    if (!bookingForThisDay.value) return 'free'
    if (bookingForThisDay.value.status === 'Booked') return 'booked'
    if (bookingForThisDay.value.status === 'Preliminary') return 'preliminary'
    if (bookingForThisDay.value.status === 'Absent') return 'absent'
    return 'other'
})

const tooltip = computed(() => {
    const b = bookingForThisDay.value
    return b ? `${b.activity}, ${b.percentage}%, ${b.status}` : 'Ingen bokning'
})

</script>

<style scoped>
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

.day-cell {
    color: #03045E;
    width: 54px;
    height: 63px;
    font-size: 12px;
    border-radius: 5px;
}

.preliminary {
    border: 1px dashed;
    background-color: #00FF73;
}

.free {
    background-color: #E9E7E7;
}

.booked {
    background-color: #00FF73;
}

.schedule-box-orange {
    background-color: #FFB200;
    border-style: dashed;
}

.absent {
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

.preliminary.percentage50 {
    background-color: #FFB200;
}

.booked.percentage50 {
   background-color: #FFB200; 
}
</style>