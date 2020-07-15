<template>
  <div class="create-post">
    <div class="create-post__inner">
      <span>Title</span>
      <input type="text" v-model="title">
      <span>Text</span>
      <input type="text" v-model="text">
      <button @click="addPost">Create Post</button>
    </div>
  </div>
</template>

<script>
import { inject } from '@vue/composition-api'

export default {
  name: 'create-post',
  data() {
    return {
      title: '',
      text: '',
    };
  },
  setup() {
    const PostService = inject('PostService')
    return { PostService }
  },
  methods: {
    async addPost() {
      if (!this.title || !this.text) {
        alert('Title and text should not be empty');
        return;
      }

      await this.PostService.createPost({
        id: Math.random(0, 10000).toString(),
        title: this.title,
        text: this.text
      });
      this.title = '';
      this.text = '';
    },
  }
}
</script>

<style lang="scss" scoped>
.create-post {
  display: flex;
  justify-content: center;
  width: 100%;

  &__inner {
    display: flex;
    flex-direction: column;
    max-width: 250px
  }
}
</style>