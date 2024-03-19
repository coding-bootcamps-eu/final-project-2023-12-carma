<!-- an Figma angepasst cm -->
<template>
  <!-- Überschrift -->
  <div>
    <h1 class="h1-event">Deine <br />nächste Fahrt</h1>
  </div>
  <div class="flex-container">
    <form @submit.prevent="createNewRide">
      <div>
        <!-- Text-Input für die Event-Description, später POST zur API, evt noch einmal 
    auf die Darstellung der maxlength vom text-input schauen, z.B. mit popup 
    bei hovern lösen -->

        <input
          class="input-main"
          type="text"
          v-model="eventDescription"
          id="event-description"
          placeholder="Name der Fahrt"
          minlength="1"
          maxlength="30"
          required
        />
      </div>
      <!--bisher war die maximale Zeichenlänge 18-->
      <div>
        <!-- Datums-Input für das Event, Start und Ende, evt mit Datepicker und range, 
      später POST zur API, Format anpassen zur Darstellung in der Calendar-Component -->

        <div class="dates">
          <input
            class="input-date"
            type="datetime-local"
            v-model="eventStart"
            id="event-start"
            placeholder="Von"
            required
          />

          <input
            class="input-date"
            type="datetime-local"
            v-model="eventEnd"
            id="event-end"
            placeholder="Bis"
            required
          />
        </div>
      </div>
      <div>
        <!-- MitfahrerInnen-Input für das Event, am besten dynamisch erzeugt 
        aus der Auto-Gruppe anhand der driver_id, mit Darstellung des Buchstaben-
        Icons, später POST zur API, if checked -> eventParticipants -->
        <!-- <div class="input-pre" method="post">
          <label for="event-participants">Mitfahrer*innen hinzufügen</label>
          <select name="eventParticipants" id="event-participants">
            <option value="MitfahrerInnen hinzufügen"></option>
            <option value="driver_id = 1">
              <input type="checkbox" name="eventParticipants" id="driver-1" />
            </option>
            <option value="driver_id = 2">
              <input type="checkbox" name="eventParticipants" id="driver-2" />
            </option>
            <option value="driver_id = 3">
              <input type="checkbox" name="eventParticipants" id="driver-3" />
            </option>
            <option value="driver_id = 4">
              <input type="checkbox" name="eventParticipants" id="driver-4" />
            </option>
          </select>
        </div>-->
      </div>
      <div>
        <!--Möglichkeit einen Kommentar zur Fahrt zu hinterlassen, später POST 
      zur API, eventNotes -->

        <textarea
          class="comment-field"
          id="event-notes"
          v-model="eventNotes"
          rows="5"
          cols="33"
          placeholder="Kommentar"
        >
        </textarea>

        <div class="input-choose-container">
          <!-- Auswahl des EventType, später POST zur API, eventType -->

          <div class="input-choose-wrapper">
            <input
              class="input-choose"
              type="radio"
              v-model="eventType"
              id="freie-fahrt"
              value="Freie Fahrt"
              name="radio"
              required
            />
          </div>
          Freie Fahrt
          <label class="label-freie-fahrt" for="freie-fahrt"></label>

          <div class="input-choose-wrapper">
            <input
              class="input-choose"
              type="radio"
              v-model="eventType"
              id="muss-sein"
              value="Muss sein"
              name="radio"
            />
          </div>
          Muss sein
          <label class="label-muss-sein" for="muss-sein"> </label>
        </div>
      </div>

      <div class="btn-container">
        <!-- <button class="btn-main-short">ABBRECHEN</button>-->
        <router-link :to="'/calendar/'"
          ><button class="btn-main-short">ABBRECHEN</button></router-link
        >
        <button class="btn-main-short" type="submit">
          FERTIG
          <div class="btn-main-short-mini-bus"></div>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  data() {
    return {
      eventDescription: '',
      eventStart: '',
      eventEnd: '',
      eventNotes: '',
      eventType: '',
      driverId: ''
    }
  },
  setup() {
    const user = useUserStore()

    return {
      user
    }
  },
  methods: {
    createNewRide() {
      const newEvent = {
        description: this.eventDescription,
        start: this.eventStart,
        end: this.eventEnd,
        notes: this.eventNotes,
        type: this.eventType,
        driverId: this.user.loggedInUser.id,
        finished: false
      }
      fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((responseData) => {
          console.log('Data posted successfully:', responseData)
          this.$router.push('/calendar')
        })
        .catch((error) => {
          console.error('Error posting data:', error)
        })
      return
    }
  }
}
</script>

<style scoped>
.h1-event {
  display: flex;
  margin-left: 30px;
}

.create-event-box {
  margin: auto;
}

.flex-container {
  width: 372px;
  margin: auto;
}
.input-choose-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}

.input-pre {
  margin-top: 15px;
}

.input-choose-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-left: 2rem;
  margin-right: 0.5rem;
}

.input-choose {
  background-color: var(--beige-light);
  border: solid 0.1rem var(--orange);
  border-radius: 50%;
  box-sizing: border-box;

  padding: 0rem;
  width: 1.1rem;
  height: 1.1rem;

  color: var(--orange);
  font-size: 15px;
  font-weight: light;
  font-style: italic;
  text-align: center;
  margin: 0px;
}

.input-choose:checked::before {
  content: '';
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background-color: var(--orange);
  display: block;
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
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

.dates {
  display: flex;
  justify-content: space-between;
}

#event-start {
  width: 152px;
}

#event-end {
  width: 152px;
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
  margin-top: 15px;
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
  margin-left: 10px;
  position: absolute;
  bottom: 6rem;
}
</style>
