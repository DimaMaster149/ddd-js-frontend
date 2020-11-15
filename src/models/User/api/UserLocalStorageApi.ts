const USERS_KEY: string = 'users';
const AUTHORIZED_USER_KEY: string = 'username';

import { AuthorizationError } from '@/errors/AuthorizationError';
import { PostsError } from '@/errors/PostsError';
import { UserError } from '@/errors/UserError';
import { IPost } from '@/models/Post';
import { IUser, UserRepository } from '@/models/User';
import { left, right } from '@ts-monads/either';
import { User } from 'firebase';

export class UserLocalStorageApi implements UserRepository {
	public async createUser(user: IUser) {
		const maybeUsers = await this.getUsers();

		if (maybeUsers.isRight()) {
			const { value: users } = maybeUsers;
			users.push(user);
			localStorage.setItem(USERS_KEY, JSON.stringify(users));
			return right<UserError, IUser>(user);
		}
		return left<UserError, IUser>(new UserError(`Can't create user`));
	}

	public async loginUser(username: string) {
		const maybeUsers = await this.getUsers();

		if (maybeUsers.isRight()) {
			const { value: users } = maybeUsers;
			const user = users.find((u: IUser) => u.username === username);
			if (user) {
				localStorage.setItem(AUTHORIZED_USER_KEY, username);
				return right<AuthorizationError, IUser>(user as IUser);
			}
			return left<AuthorizationError, IUser>(new AuthorizationError(`Can't login`));
		}

		return left<AuthorizationError, IUser>(new AuthorizationError(`Can't get users`));
	}

	public async logoutUser() {
		try {
			localStorage.removeItem(AUTHORIZED_USER_KEY);
			return right<AuthorizationError, any>(null);
		} catch (err) {
			return left<AuthorizationError, any>(new AuthorizationError(`Can't logout`));
		}
	}

	public async getUsers() {
		try {
			const json = localStorage.getItem(USERS_KEY);
			if (json) {
				const users: IUser[] = JSON.parse(json);
				return right<UserError, IUser[]>(users);
			}
			const emptyUsers: IUser[] = [];
			return right<UserError, IUser[]>(emptyUsers);
		} catch (err) {
			return left<UserError, IUser[]>(new UserError(`Can't load users`));
		}
	}

	public async getUser(userId: string) {
		const maybeUsers = await this.getUsers();

		if (maybeUsers.isRight()) {
			const { value: users } = maybeUsers;
			const user = users.find((u: IUser) => u.id === userId);
			if (user) {
				return right<UserError, IUser>(user);
			}
			return left<UserError, IUser>(new UserError(`Can't find user`));
		}
		return left<UserError, IUser>(new UserError(`Can't find user`));
	}

	public async updateUser({ userId, user }: { userId: string; user: IUser }) {
		const maybeUsers = await this.getUsers();

		if (maybeUsers.isRight()) {
			const { value: users } = maybeUsers;
			const index = users.findIndex((u: IUser) => u.id === userId);
			if (index !== -1) {
				users[index] = user;
				localStorage.setItem(USERS_KEY, JSON.stringify(users));
				return right<UserError, IUser>(user);
			}
			return left<UserError, IUser>(new UserError(`Can't update user`));
		}
		return left<UserError, IUser>(new UserError(`Can't find user`));
	}

	public async getPosts(userId: string) {
		const maybeUser = await this.getUser(userId);

		if (maybeUser.isRight()) {
			const { value: user } = maybeUser;
			return right<PostsError, IPost[]>(user.posts);
		}
		return left<PostsError, IPost[]>(new PostsError(`Can't load user posts`));
	}

	public async addPost({ userId, post }: { userId: string; post: IPost }) {
		const maybeUsers = await this.getUsers();
		if (maybeUsers.isRight()) {
			const { value: users } = maybeUsers;
			const user = users.find((u) => u.id === userId);
			if (user) {
				user.posts.push(post);
				localStorage.setItem(USERS_KEY, JSON.stringify(users));
				return right<PostsError, IPost>(post);
			}
			return left<UserError, IPost>(new UserError(`Can't find user`));
		}
		return left<UserError, IPost>(new UserError(`Can't find user`));
	}

	public async removePost({ userId, postId }: { userId: string; postId: string }) {
		const maybeUsers = await this.getUsers();
		if (maybeUsers.isRight()) {
			const { value: users } = maybeUsers;
			const user = users.find((u) => u.id === userId);
			if (user) {
				user.posts = user.posts.filter((p: IPost) => p.id !== postId);
				localStorage.setItem(USERS_KEY, JSON.stringify(users));
				return right<UserError, any>(null);
			}
			return left<UserError, any>(new UserError(`Can't find user`));
		}
		return left<UserError, any>(new UserError(`Can't find user`));
	}
}
