const POSTS_KEY = 'posts';
import { IPost } from '@/models/Post/IPost'
import { PostRepository } from '@/models/Post/PostRepository'

export class PostLocalStorageApi implements PostRepository {
  public async createPost(post: IPost) {
    try {
      const posts = await this.getPosts();
      posts.push(post);
      localStorage.setItem([POSTS_KEY], JSON.stringify(posts));

      return Promise.resolve(post)
    } catch(err) {
      return Promise.reject(err);
    }
  }

  public async removePost(postId: string) {
    try {
      const posts = await this.getPosts();
      const filteredPosts = posts.filter(post => post.id !== postId);
      localStorage.setItem([POSTS_KEY], JSON.stringify(filteredPosts));

      return Promise.resolve();
    } catch(err) {
      return Promise.reject(err);
    }
  }

  public async getPosts() {
    try {
      const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
      if (!posts) {
        return Promise.resolve([]);
      }

      return Promise.resolve(posts);
    } catch(err) {
      return Promise.reject(err);
    }
  }

  public async getPost(postId: string) {
    try {
      const posts = await this.getPosts()
      const post = posts.find(post => post.id === postId);

      return Promise.resolve(post);
    } catch(err) {
      return Promise.reject(err);
    }
  }
}
