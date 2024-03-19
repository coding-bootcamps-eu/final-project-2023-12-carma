<template>
  <div><h1 class="h1-event">Logbuch</h1></div>
  <div>
    <ul class="ul-style">
      <li v-for="(event, index) in attrs" :key="index" style="margin-top: 1rem">
        <div class="event-container">
          <div class="event-user-icon" :style="{ backgroundColor: `var(--user-${event.colorId})` }">
            {{ event.firstName[0] }}
          </div>
          <div>
            <div class="event-details">{{ event.description }}: {{ event.eventKilometer }} km</div>
            <div class="event-dates">
              {{ event.dates.start.toLocaleDateString('de-DE') }} -
              {{ event.dates.end.toLocaleDateString('de-DE') }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  setup() {
    const user = useUserStore()

    return {
      user
    }
  },
  data() {
    return {
      cars: [],
      attrs: []
    }
  },
  mounted() {
    Promise.all([this.fetchEvents(), this.fetchUsers(), this.fetchCars()])
      .then(([events, users, cars]) => {
        this.users = users
        this.cars = cars
        this.updateAttributes(events, users)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  },

  methods: {
    async fetchEvents() {
      // Fetch der events
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events`)
      if (!response.ok) {
        throw new Error('Failed to fetch events data')
      }
      return await response.json()
    },
    // Fetch der User
    async fetchUsers() {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`)
      if (!response.ok) {
        throw new Error('Failed to fetch users data')
      }
      return await response.json()
    },
    async fetchCars() {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cars`)
      if (!response.ok) {
        throw new Error('Failed to fetch cars data')
      }
      return await response.json()
    },
    // Funktion um die Fahrten den Usern zuzuordnen und Start und Ende der Fahrt in ein
    // Datums-Format umzuwandeln, dass V-Calendar verarbeiten kann
    updateAttributes(events, users) {
      events.forEach((event) => {
        // Event und User zusammenbringen
        const user = users.find((user) => user.id === event.driverId)
        this.colorId = event.driverId
        if (user && event.finished) {
          // Wenn gefunden, formatieren des Start-Datums
          const startDateString = event.start.split('T')[0]
          const [year, month, day] = startDateString.split('-').map(Number)
          // Wenn das Format korrekt ist, füge das formatierte Datum ein
          if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            const startDate = new Date(year, month - 1, day)
            // Das gleiche für das End-Datum
            const endDateString = event.end.split('T')[0]
            const [endYear, endMonth, endDay] = endDateString.split('-').map(Number)
            if (!isNaN(endYear) && !isNaN(endMonth) && !isNaN(endDay)) {
              const endDate = new Date(endYear, endMonth - 1, endDay)
              // Dann Fahrt-Daten in das attrs-array pushen
              this.attrs.push({
                key: event.id,
                description: event.description,
                dates: { start: startDate, end: endDate },
                firstName: user.firstName,
                eventKilometer: event.kilometer,
                colorId: user.id
              })
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.event-container {
  display: inline-flex;
}

.ul-style {
  list-style: none;
}

.event-details {
  margin-left: 1.5rem;
  font-weight: bold;
}

.event-dates {
  margin-left: 1.5rem;
}

.event-user-icon {
  height: 30px;
  width: 30px;
  position: relative;
  background-color: var(--user-3);
  border-radius: 50%;
  color: var(--beige-light);
  text-align: center;
  line-height: 30px;
}
.h1-event {
  display: flex;
  margin-left: 30px;
}
</style>
