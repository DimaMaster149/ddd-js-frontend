<template>
  <div class="post-item">
    <span>{{post.id}}</span>
    <span>{{post.title}}</span>
    <span>{{post.text}}</span>
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
  &__remove {
    margin-left: 12px;
    color: red;
  }
}
</style>