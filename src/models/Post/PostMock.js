import { posts } from '../../../tests/data/posts'

export default {
  // eslint-disable-next-line, require-await
  async createPost (post) {
    return Promise.resolve(post)
  },

  async removePost () {
    return Promise.resolve();
  },

  async getPosts () {
    return Promise.resolve(posts);
  },

  async getPost (postId) {
    const foundPost = posts.find(post => post.id == postId)
    return Promise.resolve(foundPost);
  }
}