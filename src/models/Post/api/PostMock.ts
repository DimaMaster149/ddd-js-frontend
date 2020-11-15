import { posts } from '../../../../tests/data/posts';
import { IPost, PostRepository } from '@/models/Post';
import { right, left } from '@ts-monads/either';
import { PostsError } from '@/errors/PostsError';

export class PostMock implements PostRepository {
	// eslint-disable-next-line, require-await
	public async createPost(post: IPost) {
		return right<PostsError, IPost>(post);
	}

	public async removePost(postId: string) {
		return right<PostsError, any>(null);
	}

	public async getPosts() {
		return right<PostsError, IPost[]>(posts);
	}

	public async getPost(postId: string) {
		const foundPost: IPost = posts.find((post: IPost) => post.id == postId)!;
		if (foundPost) {
			return right<PostsError, IPost>(foundPost);
		}
		return left<PostsError, IPost>(new PostsError(`This post does not exist`));
	}
}
