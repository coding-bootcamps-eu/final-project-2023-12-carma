<template>
  <div>
    <ul class="messages">
      <li class="message" v-for="(event, index) in attrs" :key="index">
        <div>
          <span>{{ event.firstName }}: </span><br />
          <span class="text">{{ event.afterRideNotes }}</span> <br />
          <span class="date">{{ event.dates.end.toLocaleDateString('de-DE') }}</span>
        </div>
      </li>
    </ul>
    <ul class="messages2">
      <li class="message2" v-for="(note, index) in allNotes" :key="index">
        <div>
          <span>{{ user.loggedInUser.firstName }}: </span><br />
          <span class="text">{{ note.addedNotes }}</span> <br />
          <span class="date">{{ new Date().toLocaleDateString('de-DE') }}</span>
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
      <button class="btn-main-short">Submit</button>
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
      attrs: [],
      addedNotes: '',
      allNotes: []
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
    addNotes() {
      console.log(this.addedNotes)
      fetch(`http://localhost:4000/users/${this.user.loggedInUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          addedNotes: this.addedNotes
        })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((responseData) => {
          console.log('Data posted successfully:', responseData)
          this.allNotes.push(responseData)
        })
        .catch((error) => {
          console.error('Error posting data:', error)
        })
    },
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

.messages2 {
  position: absolute;
  margin-top: 22rem;
  list-style: none;
}

.message {
  background-color: var(--beige-light);
  padding: 1rem;
  border-radius: 15px;
  margin-bottom: 1.5rem;
  margin-right: 2.3rem;
  position: relative;
}

.message2 {
  background-color: var(--beige-light);
  padding: 1rem;
  border-radius: 15px;
  margin-bottom: 1.5rem;
  margin-right: 2.3rem;
  position: relative;
}

.date {
  color: var(--green-light);
  position: absolute;
  right: 10px;
  bottom: 10px;
}

.text {
  display: block;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}
.comment-field {
  background-color: var(--beige-light);
  border: solid 0.1rem var(--orange);
  border-radius: 0.4rem;
  padding: 0.5rem;
  width: 20.8rem;

  color: var(--orange);
  font-size: 15px;
  font-weight: light;
  font-style: italic;
  position: absolute;
  bottom: 3rem;
  right: 2.3rem;
}
.btn-main-short {
  position: absolute;
  bottom: 3rem;
  right: 2.3rem;
}
</style>
