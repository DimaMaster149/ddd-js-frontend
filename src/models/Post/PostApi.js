import { postsCollection } from '@/plugins/firebase'

export default {
  async createPost(post) {
    const { title, text } = post;
    const postToAdd = {
      id: new Date(),
      title,
      text
    }
    await postsCollection.add(postToAdd);
    return Promise.resolve(postToAdd)
  },

  removePost(postId) {
    console.log('removed postId: ', postId)
    return Promise.resolve();
  },

  async getPosts() {
    const querySnapshot = await postsCollection.get()
    const posts = []
    querySnapshot.forEach(function(doc) {
      posts.push(doc.data())
    });
    return Promise.resolve(posts);
  },

  async getPost(postId) {
    return postsCollection.where('postId', '==', postId).get();
  }
}
