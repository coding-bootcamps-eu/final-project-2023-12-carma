<template>
  <div class="title"></div>
  <h1 class="static-h1">Ändere deine Fahrt</h1>
  <!-- Einbetten in eine submit-form-->
  <!--<form @submit.prevent="submitForm">-->
  <!-- <div class="app-container-small">-->
  <!--Dynamisches Ändern der Überschrift-->

  <!---<h1 class="h1-event">{{ eventDescription }}</h1>-->
  <!--<input type="text" minlength="1" maxlength="18" v-model="eventDescription" />-->

  <!--Dynamische Auswahl des Fahrt-Typs
      <div>
        <input type="radio" id="freie-fahrt" value="voraus!" v-model="eventTypeP" />
        <label for="freie-fahrt">Freie Fahrt</label>

        <input type="radio" id="muss-sein" value="aber ist gut für's carma!" v-model="eventTypeP" />
        <label for="muss-sein">Muss sein</label>
      </div>-->

  <div class="input-choose-container">
    <!-- von NewRide -->
    <div>
      <label for="freie-fahrt">
        <input
          disabled
          class="input-choose"
          type="radio"
          v-model="eventType"
          id="freie-fahrt"
          value="freie-fahrt"
          name="radio"
          required
        />Freie Fahrt
      </label>
    </div>
    <div>
      <label for="muss-sein">
        <input
          disabled
          class="input-choose"
          type="radio"
          v-model="eventType"
          id="muss-sein"
          value="muss-sein"
          name="radio"
        />Muss sein
      </label>
    </div>
  </div>

  <!--Ändern der Fahrt-Daten, am besten wahrscheinlich mit der Datepicker-Component vom
      V-Calendar-->
  <div class="edit-container">
    <div class="event-date-container">
      <!-- <p>{{ eventStart }}</p>-->
      <input class="input-date" placeholder="Von" />
      <!--type="datetime-local"
        v-model="eventStart"
        id="event-start"-->
      <hr class="trenner" />
      <!-- <p>{{ eventEnd }}</p>-->
      <input class="input-date" placeholder="Bis" />
      <!-- type="datetime-local"
        v-model="eventEnd"
        id="event-end"-->
      <hr class="trenner" />

      <input class="input-kommentar" placeholder="Bringt bitte Gummibärchen mit!" />
    </div>

    <!--Auswahlmöglichkeit der MitfahrerInnen durch dynamisch erzeugte option-Elemente 
        -> je nach pinia-Einbindung nochmal genau überprüfen, welche Daten abgefragt werden sollen-->
    <!-- <p>Du fährst mit</p>
    <select v-model="selectedParticipants" multiple>
      <option v-for="driver in drivers" :key="driver.id" :value="driver.id">
        {{ driver.firstName }}
      </option>
    </select>-->

    <!--Dynamisches Ändern des Kommentars zur Fahrt-->
    <p>{{ eventNote }}</p>
    <input type="text" v-model="eventNote" />
  </div>

  <!--Im unteren options-Bereich müssen noch Funktionen eingebaut werden, was genau
      mit den eingebenen Daten passieren soll -> POST an pinia, bzw die DB oder routelink 
      zurück bei abbrechen-->

  <div class="btn-container">
    <!--<button class="btn-main-short">ABBRECHEN</button> -->
    <router-link :to="'/calendar/'"><button class="btn-main-short">ABBRECHEN</button></router-link>
    <button class="btn-main-short" type="submit">
      FERTIG
      <div class="btn-main-short-mini-bus"></div>
    </button>
  </div>
  <!--</form>-->
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
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/events?driverId=1710581067070`
          )
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
.title {
  height: 15px;
}

.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-left: 35px;

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

.trenner {
  border: 0;
  width: 100%;
  height: 1px;
  background-color: var(--orange);
}

.event-date-container {
}

.input-date {
  background-color: var(--beige-light);

  border-radius: 0.4rem;
  padding: 0.5rem;
  width: 356px;
  height: 12px;

  color: var(--orange);
  font-size: 15px;
  font-weight: light;
  font-style: italic;
  text-align: left;
}

.input-kommentar {
  background-color: var(--beige-light);

  border-radius: 0.4rem;
  padding: 0.5rem;
  width: 356px;
  height: 12px;

  color: var(--orange);
  font-size: 15px;
  font-weight: light;
  font-style: italic;
  text-align: left;
}

.edit-container {
  display: flex;
  margin: auto;
  margin-top: 15px;
  width: 372px;
  height: 359px;
  top: 325px;
  left: 35px;
  border-radius: 4px;
  border: solid 0.1rem var(--orange);
  background-color: var(--beige-light);
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
