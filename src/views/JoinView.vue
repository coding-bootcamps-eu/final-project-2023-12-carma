<template>
    <main>
        <button><RouterLink to="/register">back</RouterLink></button>
        <h1>Gruppe beitreten</h1>
        <form>
            <input type="text" name="autoname" placeholder="Auto Name" />
            <input type="text" name="autokennzeichen" placeholder="Autokennzeichen" />
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