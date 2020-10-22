const POSTS_KEY: string = 'posts';
import { IPost, PostRepository } from '@/models/Post';

import { PostsError } from '@/errors/PostsError';

import { left, right } from '@sweet-monads/either';

export class PostLocalStorageApi implements PostRepository {
	public async createPost(post: IPost) {
    const maybePosts = await this.getPosts();
    if (maybePosts.isRight()) {
      const { value: posts } = maybePosts;
      posts.push(post);
      localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
      return right(post)
    } return maybePosts;
	}

	public async removePost(postId: string) {
    const maybePosts = await this.getPosts();
    if (maybePosts.isRight()) {
      const { value: posts } = maybePosts;
      const filteredPosts = posts.filter((post: IPost) => post.id !== postId);
      localStorage.setItem(POSTS_KEY, JSON.stringify(filteredPosts));
      return right(null)
    } return maybePosts;
	}

	public async getPosts() {
		try {
			const json = localStorage.getItem(POSTS_KEY);
			if (json) {
				const posts: IPost[] = JSON.parse(json);
				return right(posts);
			}
			const emptyPosts: IPost[] = [];
			return right(emptyPosts);
		} catch (err) {
			return left(new PostsError(err.message));
		}
	}

	public async getPost(postId: string) {
		const maybePosts = await this.getPosts();
		if (maybePosts.isRight()) {
			const { value: posts } = maybePosts;
      const post = posts.find((post: IPost) => post.id === postId);
      if (post) {
        return right(post);
      } return left(new PostsError(`This post does not exist`))
    }
    
    return maybePosts;
	}
}
