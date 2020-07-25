import { users } from '../../../../tests/data/users'
import { IUser, UserRepository } from '@/models/User'
import { IPost } from '@/models/Post'

// eslint-disable-next-line, require-await
export class UserMock implements UserRepository {
  public async createUser(user: IUser) {
    return Promise.resolve(user)
  }

  public async loginUser(username: String) {
    const user:IUser = users.find((u: IUser) => u.username === username)!;

    return Promise.resolve(user)
  }

  public async logoutUser() {
    return Promise.resolve()
  }

  public async getUsers() {
    return Promise.resolve(users)
  }

  public async updateUser({ userId, user }: { userId: string, user: IUser }) {
    const index = users.findIndex((u:IUser) => u.id === userId);
    users[index] = user;

    return Promise.resolve(user);
  }

  public async getPosts(userId: string) {
    const user = users.find((u:IUser) => u.id === userId)!;

    return Promise.resolve(user.posts);
  }

  public async addPost({ userId, post }: { userId: string, post: IPost }) {
    const user = users.find((u: IUser) => u.id === userId)!;
    user.posts.push(post);

    return Promise.resolve(post);
  }

  public async removePost({ userId, postId }: { userId: string, postId: string }) {
    const user = users.find((u: IUser) => u.id === userId)!;
    user.posts = user.posts.filter((p: IPost) => p.id !== postId);

    return Promise.resolve();
  }
}