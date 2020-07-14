<template>
  <div>
    <button @click="addPost">Create Post</button>
  </div>
</template>

<script>
import { inject } from '@vue/composition-api'

export default {
  name: 'create-post',
  setup() {
    const PostService = inject('PostService')
    return { PostService }
  },
  methods: {
    addPost() {
      this.PostService.createPost({
        id: Math.random(0, 10000).toString(),
        title: 'title',
        text: 'some text'
      })
    },
  }
}
</script>
