<template>
  <div class="create-post">
    <div class="create-post__inner">
      <span>Title</span>
      <input type="text" v-model="title">
      <span>Text</span>
      <input type="text" v-model="text">
      <button @click="addPost">Create Post</button>

      {{ allPosts }}
    </div>
  </div>
</template>

<script lang="ts">
import { inject, defineComponent } from '@vue/composition-api'

export default defineComponent ({
  name: 'create-post',
  data() {
    return {
      title: '',
      text: '',
      allPosts: null,
    }
  },

  setup() {
    const PostService: any = inject('PostService')
    const UserService: any = inject('UserService')
    return { PostService, UserService }
  },

  mounted() {
    this.allPosts = this.UserService.currentUser.getPosts();
  },

  methods: {
    async addPost() {
      if (!this.title || !this.text) {
        alert('Title and text should not be empty');
        return;
      }
  
      this.UserService.currentUser.addPost({
        id: (Math.random()*1000).toString(),
        title: this.title,
        text: this.text
      });

      await this.UserService.currentUser.save();

      this.title = '';
      this.text = '';
    },
  },
})
</script>

<style lang="scss" scoped>
.create-post {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 100px 0;

  &__inner {
    display: flex;
    flex-direction: column;
    max-width: 250px
  }
}
</style>