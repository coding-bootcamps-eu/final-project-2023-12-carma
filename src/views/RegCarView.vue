<template>
    <main>
        <button><RouterLink to="/register">back</RouterLink></button>
        <h1>Stell dein Auto vor!</h1>
       <form>
            <input type="text" name="autoname" placeholder="Autoname" required/>
            <input type="text" name="autokennzeichen" placeholder="Autokennzeichen" maxlength="11" required />
            <input type="number" name="tachostand" placeholder="Aktueller Tachostand" required/> 
            <input type="date" name="waschtermin" placeholder="Letzter Waschtermin" />
       </form>
       <button><router-link to="/home">los geht's!</router-link></button>
       <p>Carma</p>
    </main>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>