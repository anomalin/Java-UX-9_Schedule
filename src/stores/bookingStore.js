import { defineStore } from 'pinia';

export const useBookingStore = defineStore('bookings', {
  state: () => ({
    bookings: [],
    loading: false,
    error: null,
    filterStatus: '',
    filterName: null,
  }),
  actions: {
    async fetchBookings() {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetch("https://yrgo-web-services.netlify.app/bookings");
        if (!res.ok) throw new Error("Kunde inte hämta bokningar");
        this.bookings = await res.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    setFilter(value) {
      this.filterStatus = value;
    },
    setFilterName(name) {
      this.filterName = name
    },
    clearFilterName() {
      this.filterName = nullß
    }
  },
  getters: {
    filteredBookings(state) {
      return state.bookings
        .filter(worker => {
          if (state.filterName) {
            return worker.name.toLowerCase().includes(state.filterName.toLowerCase());
          }
          return true;
        })
        .map(worker => {
          const bookings = worker.bookings || [];

          const filtered = bookings.filter(b => {
            if (state.filterStatus) {
              return b.status === state.filterStatus;
            }
            return true;
          });

          return {
            ...worker,
            bookings: filtered,
          };
        });
    }

    ,
    prelCount(state) {
      return state.bookings.reduce((sum, worker) => {
        const prels = worker.bookings?.filter(b => b.status === 'Preliminary') ?? [];
        return sum + prels.length;
      }, 0);
    },
  }

})