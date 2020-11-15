import { IPost } from '@/models/Post'
import { UserError } from '@/errors/UserError';
import { PostsError } from '@/errors/PostsError';
import { Either } from '@ts-monads/either';
export interface PostRepository {
	createPost(post: IPost): Promise<Either<UserError | PostsError, IPost>>;
	removePost(postId: string): Promise<Either<UserError | PostsError, any>>;
	getPosts(): Promise<Either<UserError | PostsError, IPost[]>>;
	getPost(postId: string): Promise<Either<UserError | PostsError, IPost>>;
}
