<template>
  <div >
    <input type="text" v-model="username">
    <button @click="registrate">Registrate</button>
  </div>
</template>

<script lang="ts">
import { inject, defineComponent } from '@vue/composition-api'

export default defineComponent ({
  name: 'UserRegistration',
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
    async registrate() {
      const result = await this.UserService.createUser({
        id: (Math.random()*1000).toString(),
        username: this.username,
        address: {
          city: 'some city',
          street: 'some street',
          building: 20
        },
        posts: [],
      });

      console.log({result})
      console.log(this.UserService.currentUser, 'current user')
    },
  },
})
</script>

<style lang="scss" scoped>
</style>