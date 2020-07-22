import { posts } from '../../../../tests/data/posts'
import { IPost, PostRepository } from '@/models/Post'

export class PostMock implements PostRepository {
  // eslint-disable-next-line, require-await
  public async createPost (post: IPost) {
    return Promise.resolve(post)
  }

  public async removePost (postId: string) {
    return Promise.resolve();
  }

  public async getPosts () {
    return Promise.resolve(posts);
  }

  public async getPost (postId: string) {
    const foundPost = posts.find((post: IPost) => post.id == postId)
    if (foundPost) {
      return Promise.resolve(foundPost);
    } return Promise.reject();
  }
}