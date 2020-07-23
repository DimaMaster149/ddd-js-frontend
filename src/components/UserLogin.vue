<template>
  <div >
    <input type="text" v-model="username">
    <button @click="login">Login</button>
  </div>
</template>

<script lang="ts">
import { inject, defineComponent } from '@vue/composition-api'

export default defineComponent ({
  name: 'UserLogin',
  data() {
    return {
      username: '',
    }
  },
  setup() {
    const UserService: any = inject('UserService');
    
    return { UserService }
  },
  methods: {
    async login() {
      await this.UserService.loginUser(this.username);
      console.log(this.UserService)
    },
  },
})
</script>

<style lang="scss" scoped>
</style>
