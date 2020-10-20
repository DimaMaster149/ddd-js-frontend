const USERS_KEY: string = 'users';
const AUTHORIZED_USER_KEY: string = 'username';

import { AuthorizationError } from '@/errors/AuthorizationError';
import { PostsError } from '@/errors/PostsError';
import { UserError } from '@/errors/UserError';
import { IPost } from '@/models/Post'
import { IUser, UserRepository } from '@/models/User'
import { left, right } from '@sweet-monads/either';

export class UserLocalStorageApi implements UserRepository {
  public async createUser(user: IUser) {
    const maybeUsers = await this.getUsers();

    if (maybeUsers.isRight()) {
      const { value: users } = maybeUsers;
      users.push(user);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      return right(user);
    } return left(new UserError(`Can't create user`));
  }

  public async loginUser(username: string) {
    try {
      localStorage.setItem(AUTHORIZED_USER_KEY, username)
      let users = await this.getUsers();
      const user = users.find((u: IUser) => u.username === username);

      return right(user);
    } catch (err) {
      return left(new AuthorizationError(`Can't login`));
    }
  }

  public async logoutUser() {
    try {
      localStorage.removeItem(AUTHORIZED_USER_KEY)
      return right(null);
    } catch (err) {
      return left(new AuthorizationError(`Can't logout`));
    }
  }

  public async getUsers() {
    try {
      const json = localStorage.getItem(USERS_KEY)
      if (json) {
        const users = JSON.parse(json);
        if (!users) {
          return right([]);
        }
        return right(users);
      }
      return right([]);

    } catch (err) {
      return left(new UserError(`Can't load users`));
    }
  }

  public async updateUser({ userId, user }: { userId: string, user: IUser }) {
    try {
      let users = await this.getUsers();
      const index = users.findIndex((u: IUser) => u.id === userId);
      
      users[index] = user;      
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      return right(user)
    } catch (err) {
      return left(new UserError(`Can't update user`));
    }
  }

  public async getPosts(userId: string) {
    try {
      const json = localStorage.getItem(USERS_KEY)
      if (json) {
        const users = JSON.parse(json);
        const user = users.find((u: IUser) => u.id === userId);
        if (user) {
          return right(user.posts);
        } else {
          return left(new UserError('No such user found'));
        }
      }
      return left(new UserError('No such user found'));
    } catch (err) {
      return left(new PostsError(`Can't load posts`));
    }
  }

  public async addPost({ userId, post }: { userId: string, post: IPost }) {
    try {
      const json = localStorage.getItem(USERS_KEY)
      if (json) {
        const users = JSON.parse(json);
        const user = users.find((u: IUser) => u.id === userId);
        if (user) {
          user.posts.push(post);
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
          return right(post);
        } else {
          return left(new UserError('No such user found'));
        }
      }

      return left(new UserError('No users in local storage'));
    } catch (err) {
      return left(new PostsError(`Can't add new post`));
    }
  }

  public async removePost({ userId, postId }: { userId: string, postId: string }) {
    try {
      const json = localStorage.getItem(USERS_KEY)
      if (json) {
        const users = JSON.parse(json);
        const user = users.find((u: IUser) => u.id === userId);
        if (user) {
          user.posts = users.posts.filter((p: IPost) => p.id !== postId);
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
          return right(null);
        } else {
          return left(new UserError('No such user found'));
        }
      }

      return left(new UserError('No users in local storage'));
    } catch (err) {
      return left(new PostsError(`Can't remove existing post`));
    }
  }
}
