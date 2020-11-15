const POSTS_KEY: string = 'posts';
import { IPost, PostRepository } from '@/models/Post';

import { PostsError } from '@/errors/PostsError';

import { left, right } from '@ts-monads/either';
import { UserError } from '@/errors/UserError';

export class PostLocalStorageApi implements PostRepository {
	public async createPost(post: IPost) {
    const maybePosts = await this.getPosts();
    if (maybePosts.isRight()) {
      const { value: posts } = maybePosts;
      posts.push(post);
      localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
      return right<UserError, IPost>(post);
    } return left<UserError, IPost>(new UserError(`Can't find Users`));
	}

	public async removePost(postId: string) {
    const maybePosts = await this.getPosts();
    if (maybePosts.isRight()) {
      const { value: posts } = maybePosts;
      const filteredPosts = posts.filter((post: IPost) => post.id !== postId);
      localStorage.setItem(POSTS_KEY, JSON.stringify(filteredPosts));
      return right<PostsError, any>(null);
    } return maybePosts;
	}

	public async getPosts() {
		try {
			const json = localStorage.getItem(POSTS_KEY);
			if (json) {
				const posts: IPost[] = JSON.parse(json);
				return right<PostsError, IPost[]>(posts);
			}
			const emptyPosts: IPost[] = [];
			return right<PostsError, IPost[]>(emptyPosts);
		} catch (err) {
			return left<PostsError, IPost[]>(new PostsError(err.message));
		}
	}

	public async getPost(postId: string) {
		const maybePosts = await this.getPosts();
		if (maybePosts.isRight()) {
			const { value: posts } = maybePosts;
      const post = posts.find((post: IPost) => post.id === postId);
      if (post) {
        return right<PostsError, IPost>(post);
      } return left<PostsError, IPost>(new PostsError(`This post does not exist`));
    }
    
    return left<PostsError, IPost>(new PostsError(`Can't find posts`));
	}
}
