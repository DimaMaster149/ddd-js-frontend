const USERS_KEY: string = 'users';
const AUTHORIZED_USER_KEY: string = 'username';

import { IPost } from '@/models/Post'
import { IUser, UserRepository } from '@/models/User'

export class UserLocalStorageApi implements UserRepository {
  public async createUser(user: IUser) {
    try {
      const users = await this.getUsers();
      users.push(user);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      return Promise.resolve(user)
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async loginUser(username: string) {
    try {
      localStorage.setItem(AUTHORIZED_USER_KEY, username)
      let users = await this.getUsers();
      const user = users.find((u: IUser) => u.username === username);
      return Promise.resolve(user);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async logoutUser() {
    try {
      localStorage.removeItem(AUTHORIZED_USER_KEY)
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getUsers() {
    try {
      const json = localStorage.getItem(USERS_KEY)
      if (json) {
        const users = JSON.parse(json);
        if (!users) {
          return Promise.resolve([]);
        }
        return Promise.resolve(users);
      }
      return Promise.resolve([]);

    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async updateUser({ userId, user }: { userId: string, user: IUser }) {
    try {
      let users = await this.getUsers();
      const index = users.findIndex((u: IUser) => u.id === userId);
      
      users[index] = user;      
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      return Promise.resolve(user)
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getPosts(userId: string) {
    try {
      const json = localStorage.getItem(USERS_KEY)
      if (json) {
        const users = JSON.parse(json);
        const user = users.find((u: IUser) => u.id === userId);
        if (user) {
          return Promise.resolve(user.posts);
        } else {
          return Promise.reject('No such user');
        }
      }
      return Promise.reject('No such user');
    } catch (err) {
      return Promise.reject(err);
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
          return Promise.resolve(post);
        } else {
          return Promise.reject('No such user');
        }
      }

      return Promise.reject('No users in local storage');
    } catch (err) {
      return Promise.reject(err);
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
          return Promise.resolve();
        } else {
          return Promise.reject('No such user');
        }
      }

      return Promise.reject('No users in local storage');
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
