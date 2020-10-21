import { users } from '../../../../tests/data/users';
import { IUser, UserRepository } from '@/models/User';
import { IPost } from '@/models/Post';
import { left, right } from '@sweet-monads/either';
import { UserError } from '@/errors/UserError';

// eslint-disable-next-line, require-await
export class UserMock implements UserRepository {
	public async createUser(user: IUser) {
		if (user) {
			return right(user);
		}
		return left(new UserError('mock user error'));
	}

	public async loginUser(username: String) {
		const user: IUser = users.find((u: IUser) => u.username === username)!;
		if (user) {
			return right(user);
		}
		return left(new UserError('mock user error'));
	}

	public async logoutUser() {
		return right(null)
	}

	public async getUsers() {
		return right(users)
	}

	public async updateUser({ userId, user }: { userId: string; user: IUser }) {
		const index = users.findIndex((u: IUser) => u.id === userId);
		users[index] = user;

		return right(user);
	}

	public async getPosts(userId: string) {
		const user = users.find((u: IUser) => u.id === userId)!;

		return right(user.posts);
	}

	public async addPost({ userId, post }: { userId: string; post: IPost }) {
		const user = users.find((u: IUser) => u.id === userId)!;
		user.posts.push(post);

		return right(post);
	}

	public async removePost({ userId, postId }: { userId: string; postId: string }) {
		const user = users.find((u: IUser) => u.id === userId)!;
		user.posts = user.posts.filter((p: IPost) => p.id !== postId);

		return right(null);
	}
}
