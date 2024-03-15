<template>
  <div>Platzhalter Icon Name</div>
  <div>
    <h1 v-if="user.isLoggedIn">Hi {{ user.loggedInUser.firstName }}!</h1>
  </div>

  <p v-if="nextEventStartDate">
    Nächste Fahrt am: {{ nextEventStartDate.toLocaleDateString('de-DE') }}
  </p>
  <div>
    <p>{{}}</p>
  </div>
  <i class="fa-solid fa-car"></i>

  <div v-for="car in cars" :key="car.id">
    <p>Name: {{ car.name }}</p>
    <p>Kilometers: {{ car.kilometer }}</p>
  </div>
  <!--aktuell aus Datenbank des jeweilige Autos-->

  <div>
    <VCalendar :initial-page="{ month: 3, year: 2024 }" :attributes="attrs" borderless expanded />
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
        if (user) {
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
      const userEvents = events.filter((event) => event.driverId === loggedInUserId)
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

<!--Nach dem Login sollten wir wissen, welcher User angemeldet ist 
  und so auf die weiteren Daten zugreifen. Wie das genau funktioniert, 
  weiß ich gerade leider nicht. -->

<style scoped></style>

<!--Next Steps:
Menü und Kalender Components einbauen
Styling
Username und Datum nächste Fahrt aus Datenbank fetchen
Autoname, Kilometerstand und carma-Punktestand aus Datenbank fetchen
-->
