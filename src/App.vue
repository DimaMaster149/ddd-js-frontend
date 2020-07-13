<template>
  <div id="app">
    <router-link :to="{name: 'home'}">Home </router-link>
    <router-link :to="{name: 'create-post'}">Create post</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
