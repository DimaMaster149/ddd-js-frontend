import { IPost } from '@/models/Post'
export interface PostRepository {
  createPost(post: IPost): Promise<IPost>;
  removePost(postId: string): Promise<any>;
  getPosts(): Promise<IPost[]>;
  getPost(postId: string): Promise<IPost>;
}
