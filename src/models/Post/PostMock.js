const posts = [{
  id: '1',
  title: 'first',
  text: 'post'
  }, {
  id: '2',
  title: 'second',
  text: 'post',
}]

export default {
  posts() {
    return posts;
  },
  // eslint-disable-next-line, require-await
  async createPost (post) {
    return Promise.resolve(post)
  },

  async removePost (postId) {
    // return removed post ?
    const foundPost = posts.find(post => post.id == postId)
    return Promise.resolve(foundPost);
  },

  async getPosts () {
    return Promise.resolve(posts);
  },

  async getPost (postId) {
    const foundPost = posts.find(post => post.id == postId)
    return Promise.resolve(foundPost);
  }
}