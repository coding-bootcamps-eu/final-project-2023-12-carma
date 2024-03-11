<template>
    <main>
        <button><RouterLink to="/">x</RouterLink></button>
        <h1>Stell dich vor!</h1>
       <form>
            <input type="email" name="email" placeholder="E-Mail Adresse" />
            <input type="password" name="password" placeholder="Passwort" minlength="8" required /> //Länge und Vorgaben des Passworts
            <input type="text" name="firstname" placeholder="Vorname" />
            <input type="text" name="lastname" placeholder="Nachname" />
       </form>
       <button><router-link to="">Auto-Gruppe erstellen</router-link>≈</button>
       <button><router-link to="">Auto-Gruppe beitreten</router-link>≈</button>
       <p>Carma</p>
    </main>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>