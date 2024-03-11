<template>
  <main>
    <div>Platzhalter Menü</div>
    <div>Platzhalter Icon Name</div>
    <h2>Hi Maria!</h2>
    <!--das muss dann mit {{ firstname }} dynamisiert werden-->
    <p>Dein Fahrt startet:</p>
    <p>Heute!</p>
    <!-- hier das Datum {{ eventStart }} der jeweils nächsten Fahrt des Users-->
    <div>Platzhalter Kalender</div>
    <p>Dein Auto: Berta</p>
    <!--dynamisch das Auto, dass dem Benutzer zugeordnet ist-->
    <p>Kilometerstand</p>
    <!--aktuell aus Datenbank des jeweilige Autos-->
    <p>Deine carma-Points</p>
    <!--aktuell aus Datenbank, points des jeweiligen users-->
    <p>Danke, dass du dabei bist!</p>
    <p>carma</p>
  </main>
</template>

<script>
export default {}
</script>
<!--Nach dem Login sollten wir wissen, welcher User angemeldet ist 
  und so auf die weiteren Daten zugreifen. Wie das genau funktioniert, 
  weiß ich gerade leider nicht.  
-->

<style scoped></style>

<!--Next Steps:
Menü und Kalender Components einbauen
Styling
Username und Datum nächste Fahrt aus Datenbank fetchen
Autoname, Kilometerstand und carma-Punktestand aus Datenbank fetchen
-->
