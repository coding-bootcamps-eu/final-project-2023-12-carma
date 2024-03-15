<template>
  <!--br müssen noch raus, und Abstände über css gelöst werden-->
  <br />
  <br />
  <br />
  <br />
  <br />
  <div class="container">
    <!--V-Calendar-Plugin attributes werden im method-Abschnitt gebindet-->
    <VCalendar :initial-page="{ month: 3, year: 2024 }" :attributes="attrs" borderless expanded />
  </div>
  <button><RouterLink to="/new-ride">+</RouterLink></button>
  <!--hier nutzen wir ein fontawesome-Zeichen-->
  <ul>
    <li v-for="(event, index) in attrs" :key="index">
      <div>Erstellt von: {{ event.firstName }}</div>
      <div>{{ event.description }}</div>
      <div>Start: {{ event.dates.start }}</div>
      <div>End: {{ event.dates.end }}</div>
      <!--hier nutzen wir ein fontawesome-Zeichen, alert einfügen-->
      <button @click="confirmDelete(index, event.key)">Delete</button>
      <!--hier nutzen wir ein fontawesome-Zeichen-->
      <router-link :to="'/edit-ride/'">Edit</router-link>
    </li>
  </ul>

  <!--hier muss das jeweilige li aus der ul entfernt werden,
        vorher noch einen alert "wirklich löschen?", das könnte man in einer method anlegen, die @click dann ausgeführt wird-->
</template>

<script>
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
.container {
  width: 23rem;
  margin: auto;
}
</style>

<!--Next Steps:
Menü,  Header, Footer einbinden


Delete-Overlay
-->
