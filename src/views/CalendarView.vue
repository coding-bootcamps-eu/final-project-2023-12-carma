<template>
  <!--br müssen noch raus, und Abstände über css gelöst werden-->

  <div class="container">
    <!--V-Calendar-Plugin attributes werden im method-Abschnitt gebindet-->
    <VCalendar
      :initial-page="{ month: 3, year: 2024 }"
      :attributes="attrs"
      borderless
      transparent
      expanded
    />
  </div>
  <div class="btn-plus">
    <button>
      <RouterLink to="/new-ride"> <i class="fa-solid fa-plus fa-2xl"></i></RouterLink>
    </button>
  </div>
  <!--hier nutzen wir ein fontawesome-Zeichen-->
  <div class="event-container">
    <ul class="ul-style">
      <li class="event-li" v-for="(event, index) in attrs" :key="index">
        <div class="event-container-links">
          <div>
            <UserIcon class="event-user-icon">{{ event.firstName }}</UserIcon>
          </div>
          <div class="event-name">{{ event.description }}</div>
          <!--<div class="event-start">Start: {{ event.dates.start.toLocaleDateString('de-DE') }}</div>
        <div class="event-end">End: {{ event.dates.end.toLocaleDateString('de-DE') }}</div>-->
          <div class="event-date">
            {{ event.dates.start.toLocaleDateString('de-DE') }} -
            {{ event.dates.end.toLocaleDateString('de-DE') }}
          </div>
        </div>
        <!--hier nutzen wir ein fontawesome-Zeichen, alert einfügen-->
        <div class="event-container-rechts">
          <button>
            <router-link :to="'/edit-ride/'"><i class="fa-solid fa-pen-to-square"></i></router-link>
          </button>
          <button @click="confirmDelete(index, event.key)">
            <i class="fa-solid fa-trash"></i>
          </button>
          <!--hier nutzen wir ein fontawesome-Zeichen-->
        </div>
      </li>
    </ul>
  </div>

  <!--hier muss das jeweilige li aus der ul entfernt werden,
        vorher noch einen alert "wirklich löschen?", das könnte man in einer method anlegen, die @click dann ausgeführt wird-->
</template>

<script>
import UserIcon from '@/components/UserIcon.vue'

export default {
  data() {
    return {
      attrs: []
    }
  },
  mounted() {
    // Wenn mounted, werden alle User und Events gefetcht und die Darstellung
    // im V-Calendar geupdatet
    Promise.all([this.fetchEvents(), this.fetchUsers()])
      .then(([events, users]) => {
        this.users = users

        this.updateAttributes(events, users)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  },
  components: {
    UserIcon
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
    async deleteEvent(index, eventId) {
      this.attrs.splice(index, 1)
      // Fahrt löschen, zunächst aus dem attrs-array löschen, dann mit eventId aus der API
      try {
        const response = await fetch(`http://localhost:4000/events/${eventId}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          throw new Error('Failed to delete event from the server')
        }

        console.log('Event deleted successfully from the server')
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    },
    confirmDelete(index, eventId) {
      if (confirm('Bist du sicher, dass du die Fahrt löschen willst?')) {
        // Popup-Abfrage, ob User tatsächlich Fahrt löschen möchte,
        //dann Ausführung der deleteEvent-Funktion
        this.deleteEvent(index, eventId)
      }
    }
  }
}
</script>

<style scoped>
button {
  all: unset;
  text-decoration: none;
}

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
  width: 23rem;
  margin: auto;
  margin-top: 73px;
}

.ul-style {
  list-style: none;
  margin: 0px;
  margin-top: 30px;
  padding: 0px;
}

.event-li {
  display: flex;
  position: relative;
  justify-content: space-between;
  background-color: var(--beige-light);
  width: 23rem;
  height: 127px;
  margin-left: 24px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.event-container-links {
  display: flex;
  width: 200px;
  margin-top: 50px;
  margin-left: 20px;
  flex-direction: column;
}

.event-container-rechts {
  display: flex;
  margin-top: 50px;
  margin-right: 20px;
  flex-direction: column;
}

.btn-plus {
  background-color: var(--green-dark);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 4.563rem;
  height: 3.125rem;
  margin-left: 11.063rem;
  margin-top: 35px;
  border-radius: 0.25rem;
}

.fa-plus {
  color: var(--beige-light);
}

.fa-pen-to-square {
  color: var(--orange);
}

.fa-trash {
  color: var(--orange);
  margin-top: 20px;
}

.event-user-icon {
  margin-left: 00px;
  margin-top: 0px;
  padding: 0px;
  background-color: darkblue;
  position: relative;
}

.event-name {
  font-weight: 700;
  margin-top: 0px;
  font-size: 15px;
  line-height: 17.61px;
}

.event-date {
  font-weight: 500;
  margin-top: 20px;
  font-size: 15px;
  line-height: 17.61px;
}

.event-end {
  font-weight: 500;
  font-size: 15px;
  line-height: 17.61px;
}
</style>

<!--Next Steps:
Menü,  Header, Footer einbinden
  font-family: Raleway;

submit {
  all: unset;
  text-decoration: none;
}


Delete-Overlay
-->
