<template>
  <div>Platzhalter Icon Name</div>
  <div>
    <h1 v-if="user.isLoggedIn">Hi {{ user.loggedInUser.firstName }}!</h1>
  </div>

  <p>Deine Fahrt startet:</p>
  <div>
    <p>{{}}</p>
  </div>
  <i class="fa-solid fa-car"></i>
  <p>Dein Auto: Berta</p>
  <!--dynamisch das Auto, dass dem Benutzer zugeordnet ist-->
  <i class="fa-solid fa-gauge-simple-high"></i>
  <p>Kilometerstand</p>
  <!--aktuell aus Datenbank des jeweilige Autos-->
  <!-- hier das Datum {{ eventStart }} der jeweils nächsten Fahrt des Users-->
  <div>Platzhalter Kalender</div>
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
  methods: {},
  data() {
    return {}
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
