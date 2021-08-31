import { postsCollection } from '@/plugins/firebase';
import { IPost, PostRepository } from '@/models/Post';

import { PostsError } from '@/errors/PostsError';

import { left, right } from '@ts-monads/either';

export class PostApi implements PostRepository {
	public async createPost(post: IPost) {
		try {
			await postsCollection.doc(post.id).set(post);
			return right<PostsError, IPost>(post);
		} catch (err) {
			return left<PostsError, IPost>(new PostsError(err));
		}
	}

	public async removePost(postId: string) {
    try {
      await postsCollection.doc(postId).delete();
      return right<PostsError, any>(null)
    } catch (err) {
      return left<PostsError, any>(new PostsError(err))
    }
	}

	public async getPosts() {
		try {
			const querySnapshot = await postsCollection.get();
			const posts = <Array<IPost>>[];
			querySnapshot.forEach(function(doc) {
				const postItem: any = doc.data();
				posts.push(postItem);
			});

			return right<PostsError, IPost[]>(posts);
		} catch (err) {
			return left<PostsError, IPost[]>(new PostsError(err));
		}
	}

	public async getPost(postId: string) {
		try {
			const doc: any = await postsCollection.doc(postId).get();
			return right<PostsError, IPost>(doc.data());
		} catch (err) {
			return left<PostsError, IPost>(new PostsError(err));
		}
	}
}
