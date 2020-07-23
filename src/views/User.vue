<template>
  <div class="profile">
    <template v-if="!UserService.currentUser">
      <div v-if="!showLogin">
        <span @click="showLogin = true">
          Do you already have an account?
        </span>  
        <user-registration />
      </div>
      
      <div v-else>
        <span @click="showLogin = false">
          Don't you an account?
        </span>
        <user-login />
      </div>
    </template>

    <template v-else>
      <div>
        User logged in
        His username is: {{UserService.currentUser.username}}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { inject, defineComponent } from '@vue/composition-api'
import UserLogin from '@/components/UserLogin.vue'
import UserRegistration from '@/components/UserRegistration.vue'

export default defineComponent ({
  name: 'User',
  components: {
    UserLogin,
    UserRegistration
  },
  data() {
    return {
      showLogin: false,
    }
  },
  setup() {
    const UserService: any = inject('UserService');
    
    return { UserService }
  }
})
</script>

<style lang="scss">
.profile {
  margin: 100px;
}
</style>