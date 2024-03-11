<template>
  <main>
    <button><RouterLink to="/">x</RouterLink></button>
    <h1>Willkommen zurück</h1>
    <form>
      <input type="text" name="username" placeholder="Benutzer*innen-Name" />
      <!--Frage: Brauchen wir ein Label oder "reicht" ein placeholder?-->
      <input type="password" name="password" minlength="8" required placeholder="Passwort" />
      <!--Frage: Brauchen wir ein Label oder "reicht" ein placeholder?-->
      <button type="submit"><RouterLink to="/home">Log in</RouterLink></button>
    </form>
    <p>carma</p>
  </main>
</template>

<script>
//Daten müssen auf Richtigkeit geprüft werden, sonst Fehlermeldung
export default {}
</script>

<style scoped></style>

<!--Next Steps:
Einbinden Hintergrund Bild
Custom Styles (Schrift, Farben, Buttons)
Ausprobieren, ob die Links richtig funktionieren
Wie kommen die Daten in die Datenbank? (siehe "action" und "method" Attribut von html input tags)
-->
