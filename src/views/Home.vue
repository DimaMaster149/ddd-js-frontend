<template>
  <div class="home">
    home
    <post-item 
      v-for="(post, index) in PostService.posts"
      :post="post"
      :key="index"
      @remove="PostService.removePost(post.id)"
    />
  </div>
</template>

<script>
import PostItem from '@/components/PostItem';
import { inject } from '@vue/composition-api'

export default {
  name: 'Home',
  components: {
    PostItem
  },
  setup() {
    const PostService = inject('PostService');
    if (PostService.posts.value.length === 0) {
      PostService.getPosts()
    }
    return { PostService }
  },
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
}
</style>
