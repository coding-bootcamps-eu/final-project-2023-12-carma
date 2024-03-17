<template>
  <div>
    <h1 class="h1-event">{{ eventToStart.description }}</h1>
  </div>

  <!--Anzeige des EventType mit Zusatzspruch, "Aber ist gut fürs Carma" oder
  "voraus!", evt mit v-if oder v-show?-->
  <div>
    <p>{{ eventType }}</p>
    <p>{{ eventTypeP }}</p>
  </div>
  <!--Als Block dargestellte Infos über das Event, Start und Ende, wer sind 
      die MitfahrerInnen(in der Darstellung als MitfahrerInnen-Icon) und evt
    ein Kommentar zur Fahrt als eventNote-->
  <div class="ride-info-block">
    <p>Von</p>
    <p>{{ eventToStart.start }}</p>
    <p>Bis</p>
    <p>{{ eventToStart.end }}</p>
    <p>Du fährst mit</p>
    <p>{{ eventParticipants }}</p>
    <p>{{ eventToStart.notes }}</p>
  </div>
  <form v-if="isRideFinished" class="endride">
    <div class="popup">
      <p class="text1">Deine Fahrt ist zu Ende!</p>
      <p class="text2">Bis zum nächsten Mal</p>
      <br /><br />
      <input
        class="input-main"
        type="text"
        v-model="carKilometer"
        placeholder="Aktueller Tachostand *"
        required
      />
      <input
        class="input-main"
        type="text"
        v-model="afterRideNotes"
        placeholder="Hinterlasse eine Notiz"
      />
      <div @click="updateCarKilometer()">
        <i class="fa-regular fa-circle-check"></i>
      </div>
    </div>
  </form>
  <div class="btn-container">
    <button @click="isRideFinished = true" class="btn-main-long">
      FAHRT BEENDEN
      <div class="btn-main-long-mini-bus"></div>
    </button>
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
      eventToStart: {},
      licensePlate: 'B-US-1337',
      isRideFinished: null,
      nextEventStartDate: null,
      carKilometer: '',
      afterRideNotes: '',
      eventKilometer: ''
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
        this.eventToStart = nextEvent
        const nextEventStartDateString = nextEvent.start.split('T')[0]
        const [year, month, day] = nextEventStartDateString.split('-').map(Number)
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
          this.nextEventStartDate = new Date(year, month - 1, day)
        }
      }
    },
    updateCarKilometer() {
      fetch('http://localhost:4000/cars')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          const foundCar = data.find((car) => car.licensePlate === this.licensePlate)

          if (foundCar) {
            fetch(`http://localhost:4000/cars/1`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                kilometer: this.carKilometer
              })
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Failed to update car participants')
                }
                return response.json()
              })
              .then((updatedCar) => {
                console.log('Car kilometer updated:', updatedCar)
                this.eventKilometer = this.carKilometer - foundCar.kilometer
                fetch(`http://localhost:4000/events/${this.eventToStart.id}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    kilometer: this.eventKilometer,
                    afterRideNotes: this.afterRideNotes,
                    finished: true
                  })
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error('Failed to update car participants')
                    }
                    return response.json()
                  })
                  .then((updatedCar) => {
                    console.log('Fahrt erfolgreich beendet:', updatedCar)
                  })
                  .catch((error) => {
                    console.error('Error updating car participants:', error)
                  })
                this.$router.push('/home')
              })
              .catch((error) => {
                console.error('Error updating car participants:', error)
              })
          } else {
            throw new Error('Dieses Auto gibt es anscheinend nicht')
          }
        })
        .catch((error) => {
          console.error('Es gab ein Problem mit der Autosuche:', error)
        })
    }
  }
}
</script>

<style scoped>
.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  position: absolute;
  bottom: 6rem;
}

.popup {
  background-color: var(--green-dark);
  text-align: center;
  width: 25rem;
  height: 20rem;
  position: absolute;
  left: 1rem;
  top: 20rem;
}
.endride {
  position: absolute; /* Sit on top of the page content */
  /*display: none; /* Hidden by default */
  width: 428px;
  height: 926px;
  margin: auto;
  margin-top: 0.9rem;
  top: -4.4rem;
  left: -1.85rem;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
}
.text1 {
  color: var(--beige-light);
  font-size: 1.5rem;
  margin-top: 2rem;
}

.text2 {
  color: var(--beige-light);
}

.fa-regular {
  color: var(--beige-light);
  margin-top: 1.5rem;
}
</style>
