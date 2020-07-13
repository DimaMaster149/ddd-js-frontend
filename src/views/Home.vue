<template>
  <div>
    home
    {{PostService.posts}}
  </div>
</template>

<script>
import { inject } from '@vue/composition-api'

export default {
  name: 'Home',
  setup() {
    const PostService = inject('PostService');
    if (PostService.posts.value.length === 0) {
      PostService.getPosts()
    }
    return { PostService }
  },
}
</script>
