import { IPost } from '@/models/Post/IPost'

export interface OrderRepository {
  createPost(): Promise<IPost>;
  removePost(postId: string): Promise<any>;
  getPosts(): Promise<IPost[]>;
  getPost(postId: string): Promise<IPost>;
}
