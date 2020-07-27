import { IUser } from '@/models/User'
import { IPost } from '@/models/Post'

export interface UserRepository {
  createUser(user: IUser): Promise<IUser>;
  loginUser(username: string): Promise<IUser>;
  logoutUser(): Promise<any>;
  getUsers(): Promise<IUser[]>;
  updateUser({ userId, user }: { userId: string, user: IUser }): Promise<IUser>;
  getPosts(userId: string): Promise<IPost[]>;
  addPost({ userId, post }: { userId: string, post: IPost }): Promise<IPost>;
  removePost({ userId, postId }: { userId: string, postId: string }): Promise<any>;
}
