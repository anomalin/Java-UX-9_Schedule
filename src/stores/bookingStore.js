import { defineStore } from 'pinia';

export const useBookingStore = defineStore('bookings', {
    state: () => ({
        bookings: [],
        filteredBookings: [],
        loading: false,
        error: null,
        filters: {
            status: null
        }
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
        setFilter(type, value) {
            this.filters[type] = value;
        }
    },
    getters: {
        filteredBookings(state) {
            return state.bookings.map(worker => {
                const filtered = worker.bookings.filter(b => {
                    if (state.filters.status) {
                        return b.status === state.filters.status;
                    }
                    return true;
                });
                return {
                    ...worker,
                    bookings: filtered,
                };
            });
        }
    }    
})