import { eachDayOfInterval, isSameDay, parseISO } from 'date-fns'

export function getBookingStats(bookings, startDate, endDate) {
  const allDays = eachDayOfInterval({ start: startDate, end: endDate })

  const stats = {
    booked100: 0,
    booked50: 0,
    preliminary100: 0,
    preliminary50: 0,
    absent: 0,
    other: 0,
    free: 0,
    total: allDays.length
  }

  for (const day of allDays) {
    const booking = bookings.find(b =>
      isSameDay(parseISO(b.from), day)
    )

    if (!booking) {
      stats.free++
      continue
    }

    const { status, percentage } = booking

    if (status === 'Booked') {
      if (percentage === 100) stats.booked100++
      else if (percentage === 50) stats.booked50++
    } else if (status === 'Preliminary') {
      if (percentage === 100) stats.preliminary100++
      else if (percentage === 50) stats.preliminary50++
    } else if (status === 'Absent') {
      stats.absent++
    } else {
      stats.other++
    }
  }

  return stats
}
