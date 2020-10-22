import { IUser } from '@/models/User'
import { IPost } from '@/models/Post'
import { AuthorizationError } from '@/errors/AuthorizationError'
import { UserError } from '@/errors/UserError'
import { PostsError } from '@/errors/PostsError'
import { Either } from "@sweet-monads/either";


export interface UserRepository {
	createUser(user: IUser): Promise<Either<UserError, IUser>>;
	loginUser(username: string): Promise<Either<AuthorizationError, IUser>>;
	logoutUser(): Promise<Either<AuthorizationError, any>>;
	getUsers(): Promise<Either<UserError, IUser[]>>;
	getUser(userId: string): Promise<Either<UserError, IUser>>;
	updateUser({ userId, user }: { userId: string; user: IUser }): Promise<Either<UserError, IUser>>;
	getPosts(userId: string): Promise<Either<UserError | PostsError, IPost[]>>;
	addPost({ userId, post }: { userId: string; post: IPost }): Promise<Either<UserError | PostsError, IPost>>;
	removePost({ userId, postId }: { userId: string; postId: string }): Promise<Either<UserError | PostsError, any>>;
}
