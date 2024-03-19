<template>
  <div>
    <ul class="messages">
      <li class="message" v-for="(event, index) in attrs" :key="index">
        <div>
          <span class="name">{{ event.firstName }}: </span><br />
          <span class="text">{{ event.afterRideNotes }}</span> <br />
          <span class="date">{{ event.dates.end.toLocaleDateString('de-DE') }}</span>
        </div>
      </li>
    </ul>
    <form @submit.prevent="addNotes()">
      <textarea
        class="comment-field"
        id="added-notes"
        name="added-notes"
        rows="3"
        placeholder="Füge eine Notiz hinzu!"
        v-model="addedNotes"
      ></textarea>
      <button class="btn-main-short"><i class="fa-regular fa-circle-check"></i></button>
    </form>
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
      attrs: []
    }
  },
  mounted() {
    Promise.all([this.fetchEvents(), this.fetchUsers()])
      .then(([events, users]) => {
        this.users = users

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
    // Funktion um die Fahrten den Usern zuzuordnen und Start und Ende der Fahrt in ein
    // Datums-Format umzuwandeln, dass V-Calendar verarbeiten kann
    updateAttributes(events, users) {
      events.forEach((event) => {
        // Event und User zusammenbringen
        const user = users.find((user) => user.id === event.driverId)
        this.colorId = event.driverId
        if (user && event.finished && event.afterRideNotes !== '') {
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
                afterRideNotes: event.afterRideNotes
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
.messages {
  position: absolute;
  margin-top: 5rem;
  list-style: none;
}

.message {
  background-color: var(--beige-light);
  padding: 1rem;
  border-radius: 15px;
  margin-bottom: 1rem;
  margin-right: 2.3rem;
  position: relative;
  width: 20rem;
}

.date {
  color: var(--green-light);
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 0.9rem;
}

.text {
  display: block;
  margin-bottom: 0.1rem;
  margin-top: 0.1rem;
}
.comment-field {
  background-color: var(--beige-light);
  border: solid 1px var(--orange);
  border-radius: 15px;
  padding: 1rem;
  width: 20rem;

  color: var(--orange);
  font-size: 15px;
  font-weight: light;
  font-style: italic;
  position: absolute;
  bottom: 3.3rem;
  right: 2.3rem;
}
.btn-main-short {
  position: absolute;
  bottom: 3.4rem;
  right: 2.3rem;
  width: 1.3rem;
  height: 1rem;
  border-radius: 0.4rem;
}
</style>
