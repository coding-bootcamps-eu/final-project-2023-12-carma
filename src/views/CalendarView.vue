<template>
  <!--das ist verrückt, nur eine Notlösung mit dem Inline-Style-->
  <div style="height: 0.03px"></div>
  <div class="container-calendar">
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
          <div class="event-user-icon" :style="{ backgroundColor: `var(--user-${event.colorId})` }">
            {{ event.firstName[0] }}
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

        <form @submit.prevent="deleteEvent(index, event.key)" v-if="askDelete" class="delete-ride">
          <div class="popup">
            <p class="text1">Möchtest du deine Fahrt wirklich löschen?</p>
            <br /><br />
            <br /><br />
            <div class="btn-popup">
              <button @click="askDelete = false" class="btn-cancel">
                <i class="fa-solid fa-xmark"></i>
              </button>
              <button type="submit" class="btn-delete">
                <i class="fa-regular fa-circle-check"></i>
              </button>
            </div>
          </div>
        </form>
        <div class="event-container-rechts">
          <button>
            <router-link :to="'/edit-ride/'"><i class="fa-solid fa-pen-to-square"></i></router-link>
          </button>
          <!-- @click="isRideFinished = true" -->
          <button @click="askDelete = true">
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
export default {
  data() {
    return {
      attrs: [],
      askDelete: null
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
                firstName: user.firstName,
                colorId: user.id
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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          throw new Error('Failed to delete event from the server')
        }

        console.log('Event deleted successfully from the server')
      } catch (error) {
        console.error('Error deleting event:', error)
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

.container-calendar {
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
  margin-top: 15px;
  margin-left: 20px;
  flex-direction: column;
}

.event-container-rechts {
  display: flex;
  margin-top: 28px;
  margin-right: 20px;
  flex-direction: column;
  font-size: 1.3rem;
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
  margin-top: 40px;
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

.event-name {
  border: 1px- red solid;
  width: 16rem;
  font-weight: 700;
  margin-top: 15px;
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

.popup {
  background-color: var(--green-dark);
  text-align: center;
  width: 25rem;
  height: 20rem;
  position: absolute;
  left: 0.8rem;
  top: 20rem;
}

.btn-popup {
  font-size: 3rem;
}

.btn-cancel {
  margin-right: 2.5rem;
}

.btn-delete {
  margin-left: 2.5rem;
}

.text1 {
  color: var(--beige-light);
  font-size: 1.5rem;
  margin-top: 2rem;
}

.delete-ride {
  position: absolute; /* Sit on top of the page content */
  /*display: none; /* Hidden by default */
  width: 428px;
  height: 926px;
  margin: auto;
  margin-top: 0.9rem;
  top: -29.8rem;
  left: -1.4rem;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
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
