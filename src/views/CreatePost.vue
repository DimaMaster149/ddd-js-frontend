<template>
  <div>
    <button @click="addPost">Create Post</button>
    {{PostService.posts.length}}
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
        title: 'title',
        text: 'some text'
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>