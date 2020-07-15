import { postsCollection } from '@/plugins/firebase'

export default {
  async createPost(post) {
    try {
      await postsCollection.doc(post.id).set(post);
      return Promise.resolve(post)
    } catch(err) {
      return Promise.reject(err);
    }
  },

  async removePost(postId) {
    return postsCollection.doc(postId).delete();
  },

  async getPosts() {
    try {
      const querySnapshot = await postsCollection.get()
      const posts = []
      querySnapshot.forEach(function(doc) {
        posts.push(doc.data())
      });

      return Promise.resolve(posts);
    } catch(err) {
      return Promise.reject(err);
    }
  },

  async getPost(postId) {
    try {
      const doc = await postsCollection.doc(postId).get();
      return Promise.resolve(doc.data());
    } catch(err) {
      return Promise.reject(err);
    }
  }
};
