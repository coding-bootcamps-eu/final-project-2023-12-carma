<template>
  <!-- Einbetten in eine submit-form-->
  <form @submit.prevent="submitForm">
    <div class="app-container-small">
      <!--Dynamisches Ändern der Überschrift-->

      <div>
        <h1 class="h1-event">{{ eventDescription }}</h1>
        <input type="text" minlength="1" maxlength="18" v-model="eventDescription" />
      </div>
      <!--Dynamische Auswahl des Fahrt-Typs-->
      <div>
        <input type="radio" id="freie-fahrt" value="voraus!" v-model="eventTypeP" />
        <label for="freie-fahrt">Freie Fahrt</label>

        <input type="radio" id="muss-sein" value="aber ist gut für's carma!" v-model="eventTypeP" />
        <label for="muss-sein">Muss sein</label>
      </div>

      <!--Ändern der Fahrt-Daten, am besten wahrscheinlich mit der Datepicker-Component vom
      V-Calendar-->
      <p>Von</p>
      <p>{{ eventStart }}</p>
      <input
        class="input-date"
        type="datetime-local"
        v-model="eventStart"
        id="event-start"
        placeholder="Von"
      />

      <p>Bis</p>
      <p>{{ eventEnd }}</p>
      <input
        class="input-date"
        type="datetime-local"
        v-model="eventEnd"
        id="event-end"
        placeholder="Bis"
      />
      <!--Auswahlmöglichkeit der MitfahrerInnen durch dynamisch erzeugte option-Elemente 
        -> je nach pinia-Einbindung nochmal genau überprüfen, welche Daten abgefragt werden sollen-->
      <p>Du fährst mit</p>
      <select v-model="selectedParticipants" multiple>
        <option v-for="driver in drivers" :key="driver.id" :value="driver.id">
          {{ driver.firstName }}
        </option>
      </select>

      <!--Dynamisches Ändern des Kommentars zur Fahrt-->
      <p>{{ eventNote }}</p>
      <input type="text" v-model="eventNote" />

      <!--Im unteren options-Bereich müssen noch Funktionen eingebaut werden, was genau
      mit den eingebenen Daten passieren soll -> POST an pinia, bzw die DB oder routelink 
      zurück bei abbrechen-->
    </div>
    <div class="btn-container">
      <button class="btn-main-short">ABBRECHEN</button
      ><button class="btn-main-short" type="submit">
        FERTIG
        <div class="btn-main-short-mini-bus"></div>
      </button>
    </div>
  </form>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  data() {
    return {
      eventDescription: '',
      eventTypeP: '',
      eventStart: '',
      eventEnd: '',
      eventNote: ''
    }
  },
  async mounted() {
    // Populate form fields with event data for the loggedInUser when the component is mounted
    await this.populateFormData()
  },
  methods: {
    async populateFormData() {
      const store = useUserStore() // Get access to the 'user' store
      const loggedInUser = store.loggedInUser // Get the loggedInUser from the store

      // Check if loggedInUser exists
      if (loggedInUser) {
        try {
          // Fetch event data for the loggedInUser from localhost:4000/events using fetch API
          const response = await fetch(`http://localhost:4000/events?driverId=1710581067070`)
          const eventData = await response.json()
          console.log(eventData)
          // Populate form fields with fetched event data
          this.eventDescription = eventData.description
          this.eventTypeP = eventData.type
          this.eventStart = eventData.start
          this.eventEnd = eventData.end

          this.eventNote = eventData.note
        } catch (error) {
          console.error('Error fetching event data:', error)
        }
      } else {
        console.error('No loggedInUser found.') // Handle case where loggedInUser is not available
      }
    },
    submitForm() {
      // Implement submit logic
    },
    cancel() {
      // Implement cancel logic if needed
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

.h1-event {
  font-style: italic;
}

.input-choose-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.input-choose {
  background-color: var(--beige-light);
  border: solid 0.1rem var(--orange);
  border-radius: 50%;
  padding: 0.5rem;
  width: 0.5rem;
  height: 0.5rem;

  color: var(--orange);
  font-size: 15px;
  font-weight: light;
  font-style: italic;
  text-align: center;
  margin-left: 2rem;
  margin-right: 0.5rem;
}

.input-date {
  background-color: var(--beige-light);
  border: solid 0.1rem var(--orange);
  border-radius: 0.4rem;
  padding: 0.5rem;
  width: 1.8rem;
  height: 1.8rem;

  color: var(--orange);
  font-size: 15px;
  font-weight: light;
  font-style: italic;
  text-align: center;
}
.comment-field {
  background-color: var(--beige-light);
  border: solid 0.1rem var(--orange);
  border-radius: 0.4rem;
  padding: 0.5rem;
  width: 22.25rem;

  color: var(--orange);
  font-size: 15px;
  font-weight: light;
  font-style: italic;
}

/* .flex-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
} */
.align {
  text-align: left;
  margin-left: 2rem;
}

select {
  text-align: right;
}

.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  position: absolute;
  bottom: 6rem;
}
</style>
