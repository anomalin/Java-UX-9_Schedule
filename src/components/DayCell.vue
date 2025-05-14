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

.absent {
    background-color: #FF0000;
    color: #FFFFFF;
}

.preliminary.percentage50 {
    background-color: #FFB200;
}

.booked.percentage50 {
   background-color: #FFB200; 
}
</style>