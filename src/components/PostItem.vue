<template>
  <div class="post-item">
    <span class="post-item__text">{{post.id}}</span>
    <span class="post-item__text">{{post.title}}</span>
    <span class="post-item__text">{{post.text}}</span>
    <span class="post-item__remove" @click="$emit('remove', post.id)">remove</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({ name: 'post-item' })
export default class PostItem extends Vue {
  @Prop() post!: Object;
}
</script>

<style lang="scss" scoped>
.post-item {
  display: flex;
  flex-direction: row;

  &__text {
    margin: 0 10px;
  }
  
  &__remove {
    margin-left: 12px;
    color: red;
  }
}
</style>