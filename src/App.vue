<template>
  <div id="app">
    <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
    <router-link class="nav-link" :to="{name: 'create-post'}">Create post</router-link>
    <router-link class="nav-link" :to="{name: 'user'}">User</router-link>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.nav-link {
  text-decoration: none;
  font-size: 22px;
  margin: 0 20px;
  padding: 5px;
  background-color: #E2DAD9;
  border-radius: 5px;
}
</style>
