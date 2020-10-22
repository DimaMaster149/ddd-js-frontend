import { posts } from '../../../../tests/data/posts'
import { IPost, PostRepository } from '@/models/Post'
import { right, left } from '@sweet-monads/either';
import { PostsError } from '@/errors/PostsError';

export class PostMock implements PostRepository {
  // eslint-disable-next-line, require-await
  public async createPost (post: IPost) {
    return right(post)
  }

  public async removePost (postId: string) {
    return right(null);
  }

  public async getPosts () {
    return right(posts);
  }

  public async getPost (postId: string) {
    const foundPost: IPost = posts.find((post: IPost) => post.id == postId)!
    if (foundPost) {
      return right(foundPost);
    } return left(new PostsError(`This post does not exist`));
  }
}