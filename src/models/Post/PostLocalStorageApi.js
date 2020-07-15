const POSTS_KEY = 'posts';

export default {
  async createPost(post) {
    try {
      const posts = await this.getPosts();
      posts.push(post);
      localStorage.setItem([POSTS_KEY], JSON.stringify(posts));

      return Promise.resolve(post)
    } catch(err) {
      return Promise.reject(err);
    }
  },

  async removePost(postId) {
    try {
      const posts = await this.getPosts();
      const filteredPosts = posts.filter(post => post.id !== postId);
      localStorage.setItem([POSTS_KEY], JSON.stringify(filteredPosts));

      return Promise.resolve();
    } catch(err) {
      return Promise.reject(err);
    }
  },

  async getPosts() {
    try {
      const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
      if (!posts) {
        return Promise.resolve([]);
      }

      return Promise.resolve(posts);
    } catch(err) {
      return Promise.reject(err);
    }
  },

  async getPost(postId) {
    try {
      const post = await this.getPosts().find(post => post.id === postId);

      return Promise.resolve(post);
    } catch(err) {
      return Promise.reject(err);
    }
  }
};
