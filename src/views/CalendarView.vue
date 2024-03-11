<template>
  <main>
    <button>zurück</button>
    <div>Menü</div>
    <div>Icon User</div>
    <div>Kalender wird hier eingebunden</div>
    <button><RouterLink to="/new-ride">+</RouterLink></button>
    <ul>
      <li>
        <div>Icon User</div>
        <p>
          {{ eventDescription }}
        </p>
        <p>{{ eventStart + '-' + eventEnd }}</p>
        <button><RouterLink to="/edit-ride">edit</RouterLink></button>
        <button>delete</button>
        <!--hier muss das jeweilige li aus der ul entfernt werden,
        vorher noch einen alert "wirklich löschen?", das könnte man in einer method anlegen, die @click dann ausgeführt wird-->
      </li>
      <!--hier müssen dynamisch Events geadded und neue "li" erstellt werden können-->
    </ul>
  </main>
</template>

<script>
export default {}
</script>

<style scoped></style>

<!--Next Steps:
Menü, Kalender, Header, Footer einbinden
Daten fetchen
Methods anlegen (so ähnlich wie addTodo bei der Liste, wenn das neue Event "submitted" wird, muss es in der Liste erscheinen)
Delete-Overlay
-->
