<template>
  <div class="home">
    <post-item 
      v-for="(post, index) in PostService.posts"
      :post="post"
      :key="index"
      @remove="PostService.removePost(post.id)"
    />
  </div>
</template>

<script lang="ts">
import PostItem from '@/components/PostItem.vue';
import { inject, defineComponent } from '@vue/composition-api'
// import { Component, Vue } from 'vue-property-decorator';

export default defineComponent ({
  name: 'Home',
  components: {
    PostItem
  },
  setup() {
    const PostService: any = inject('PostService');
    if (PostService.posts.value.length === 0) {
      PostService.getPosts()
    }
    return { PostService }
  }
})
</script>

<style lang="scss" scoped>
.home {
  margin: 100px;
  display: flex;
  flex-direction: column;
}
</style>
