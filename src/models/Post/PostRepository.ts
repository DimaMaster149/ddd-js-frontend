import { IPost } from '@/models/Post'
export interface OrderRepository {
  createPost(): Promise<IPost>;
  removePost(postId: string): Promise<any>;
  getPosts(): Promise<IPost[]>;
  getPost(postId: string): Promise<IPost>;
}
