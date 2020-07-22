const POSTS_KEY:string = 'posts';
import { IPost, PostRepository } from '@/models/Post'

export class PostLocalStorageApi implements PostRepository {
  public async createPost(post: IPost) {
    try {
      const posts = await this.getPosts();
      posts.push(post);
      localStorage.setItem(POSTS_KEY, JSON.stringify(posts));

      return Promise.resolve(post)
    } catch(err) {
      return Promise.reject(err);
    }
  }

  public async removePost(postId: string) {
    try {
      const posts = await this.getPosts();
      const filteredPosts = posts.filter((post: IPost) => post.id !== postId);
      localStorage.setItem(POSTS_KEY, JSON.stringify(filteredPosts));

      return Promise.resolve();
    } catch(err) {
      return Promise.reject(err);
    }
  }

  public async getPosts() {
    try {
      const json = localStorage.getItem(POSTS_KEY)
      if (json) {
        const posts = JSON.parse(json);
        if (!posts) {
          return Promise.resolve([]);
        }
        return Promise.resolve(posts);
      }
      return Promise.resolve([]);
      
    } catch(err) {
      return Promise.reject(err);
    }
  }

  public async getPost(postId: string) {
    try {
      const posts = await this.getPosts()
      const post = posts.find((post: IPost) => post.id === postId);

      return Promise.resolve(post);
    } catch(err) {
      return Promise.reject(err);
    }
  }
}
