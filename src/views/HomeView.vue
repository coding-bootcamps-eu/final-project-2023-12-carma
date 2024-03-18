<template>
  <div class="welcome-user">
    <h1 v-if="user.isLoggedIn">Hi {{ user.loggedInUser.firstName }}!</h1>
  </div>

  <div class="container-next-ride">
    <div class="btn-home">
      <p v-if="nextEventStartDate" @click="$router.push('/start-ride')">
        Nächste Fahrt am: {{ nextEventStartDate.toLocaleDateString('de-DE') }}
      </p>
      <p v-else @click="$router.push('/calendar')">Fahrt eintragen</p>
    </div>
  </div>

  <div v-for="car in cars" :key="car.id" class="car-container">
    <div class="car-group">
      <i class="fa-solid fa-car"></i>
      <p class="car-text">{{ car.name }}</p>
    </div>
    <div class="car-kilometer" @click="$router.push('/logbuch')">
      <i class="fa-solid fa-gauge-simple-high"></i>
      <p class="kilometer-text">{{ car.kilometer }} km</p>
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
      attrs: [
        // {
        //   highlight: pink,
        //   dates: new Date()
        // }
      ],
      cars: [],
      users: [],
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

  transition:
    background-color 0.5s ease,
    transform 0.5s ease;
}

.container:hover {
  background-color: var(--beige-dark);
  transform: scale(1.05);
}

.welcome-user {
  padding-top: 2rem;
}

.car-container {
  margin-top: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.car-group:hover {
  transform: scale(1.05);
}

.car-group {
  margin-left: 1.2rem;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  transition:
    background-color 0.5s ease,
    transform 0.5s ease;
}

.car-text {
  font-size: 15px;
  font-weight: bold;
}

.car-kilometer {
  margin-left: 1.2rem;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  transition:
    background-color 0.5s ease,
    transform 0.5s ease;
}

.car-kilometer:hover {
  transform: scale(1.05);
}

.kilometer-text {
  font-size: 15px;
  font-weight: bold;
  margin: 1rem;
}

.container-next-ride {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.btn-home {
  background-color: var(--beige-light);
  border-radius: 0.4rem;
  margin: auto;
  width: 16rem;
  padding: 0.3rem;

  color: var(--blue);
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  position: relative;
  display: inline-block;

  transition:
    background-color 0.5s ease,
    transform 0.5s ease;
}

.btn-home:hover {
  background-color: var(--beige-dark);
  transform: scale(1.05);
}
</style>
