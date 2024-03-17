<template>
  <div class="welcome-user">
    <h1 v-if="user.isLoggedIn">Hi {{ user.loggedInUser.firstName }}!</h1>
  </div>

  <div class="container">
    <div class="btn-main-long">
      <p v-if="nextEventStartDate" @click="$router.push('/start-ride')">
        Nächste Fahrt am:{{ nextEventStartDate.toLocaleDateString('de-DE') }}
      </p>
      <p v-else @click="$router.push('/calendar')">Keine weitere Fahrt eingetragen</p>
    </div>
  </div>

  <div v-for="car in cars" :key="car.id" class="car-container" @click="$router.push('/registered')">
    <div class="car-group">
      <i class="fa-solid fa-car"></i>
      <p>{{ car.name }}</p>
    </div>
    <div class="car-kilometer">
      <i class="fa-solid fa-gauge-simple-high"></i>
      <p>{{ car.kilometer }} km</p>
    </div>
  </div>
  <!--aktuell aus Datenbank des jeweilige Autos-->

  <div class="container">
    <!--V-Calendar-Plugin attributes werden im method-Abschnitt gebindet-->
    <VCalendar
      :initial-page="{ month: 3, year: 2024 }"
      :attributes="attrs"
      borderless
      transparent
      expanded
      @click="$router.push('/calendar')"
    />
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
      attrs: [],
      cars: [],
      nextEventStartDate: null
    }
  },
  mounted() {
    Promise.all([this.fetchEvents(), this.fetchUsers(), this.fetchCars()])
      .then(([events, users, cars]) => {
        this.users = users
        this.updateAttributes(events, users)
        this.findNextEventStartDate(events)
        this.cars = cars
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  },
  methods: {
    async fetchEvents() {
      // Fetch der events
      const response = await fetch('http://localhost:4000/events')
      if (!response.ok) {
        throw new Error('Failed to fetch events data')
      }
      return await response.json()
    },
    // Fetch der User
    async fetchUsers() {
      const response = await fetch('http://localhost:4000/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users data')
      }
      return await response.json()
    },
    async fetchCars() {
      const response = await fetch('http://localhost:4000/cars')
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
        if (user && !event.finished) {
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
                highlight: {
                  color: user.color
                },
                description: event.description,
                dates: { start: startDate, end: endDate },
                firstName: user.firstName
              })
            }
          }
        }
      })
    },
    findNextEventStartDate(events) {
      const loggedInUserId = this.user.loggedInUser.id
      const userEvents = events.filter(
        (event) => event.driverId === loggedInUserId && !event.finished
      )
      const sortedEvents = userEvents.sort((a, b) => new Date(a.start) - new Date(b.start))
      if (sortedEvents.length > 0) {
        const nextEvent = sortedEvents[0]
        const nextEventStartDateString = nextEvent.start.split('T')[0]
        const [year, month, day] = nextEventStartDateString.split('-').map(Number)
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
          this.nextEventStartDate = new Date(year, month - 1, day)
        }
      }
    }
  }
}
</script>

<style scoped>
.vc-header {
  color: var(--orange);
}

.vc-title {
  color: var(--orange);
}

.container {
  background-color: var(--beige-light);
  border: solid 0.1rem var(--orange);
  border-radius: 4px;
  width: 23.5rem;
  margin: auto;
  margin-top: 73px;
}

.container:hover {
  background-color: var(--blue);
  transform: scale(1.05);
}

.welcome-user {
  padding-top: 2rem;
}

.car-container {
  margin-top: 4rem;
  margin-left: 6rem;
  display: flex;
}

.car-group:hover {
  background-color: var(--blue);
  transform: scale(1.05);
}

.car-group {
  font-size: 2rem;
  margin-right: 3rem;
}

.car-kilometer {
  margin-left: 1.2rem;
  font-size: 2rem;
}
</style>
