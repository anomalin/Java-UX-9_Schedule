<template>
    <div class="day-cell" :class="[statusClass, { percentage50: bookingForThisDay.some(b => b.percentage === 50) }]"
 :title="tooltip"></div>
</template>

<script setup>
import { computed } from 'vue'
import { parseISO, isWithinInterval } from 'date-fns'

const props = defineProps({
    date: {
        type: Date,
        required: true
    },  
    bookings: Array
})


const bookingForThisDay = computed(() => {
  if (!props.date || !Array.isArray(props.bookings)) return []

  const selectedDate = new Date(props.date)

  return props.bookings.filter(b =>
    isWithinInterval(selectedDate, {
      start: parseISO(b.from),
      end: parseISO(b.to)
    })
  )
})

const statusClass = computed(() => {
  const b = bookingForThisDay.value[0] 
  if (!b) return 'free'
  if (b.status === 'Booked') return 'booked'
  if (b.status === 'Preliminary') return 'preliminary'
  if (b.status === 'Absent') return 'absent'
  return 'other'
})

const tooltip = computed(() => {
  if (bookingForThisDay.value.length === 0) return 'Ingen bokning'
  return bookingForThisDay.value
    .map(b => `${b.activity}, ${b.percentage}%, ${b.status}`)
    .join('\n') 
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

