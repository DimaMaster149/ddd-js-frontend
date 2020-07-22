import { postsCollection } from '@/plugins/firebase'
import { IPost, PostRepository } from '@/models/Post'

export class PostApi implements PostRepository {
  public async createPost(post: IPost) {
    try {
      await postsCollection.doc(post.id).set(post);
      return Promise.resolve(post)
    } catch(err) {
      return Promise.reject(err);
    }
  }

  public async removePost(postId: string) {
    return postsCollection.doc(postId).delete();
  }

  public async getPosts() {
    try {
      const querySnapshot = await postsCollection.get()
      const posts = <Array<IPost>>([]);
      querySnapshot.forEach(function(doc) {
        const postItem: any = doc.data();
        posts.push(postItem);
      });

      return Promise.resolve(posts);
    } catch(err) {
      return Promise.reject(err);
    }
  }

  public async getPost(postId: string) {
    try {
      const doc: any = await postsCollection.doc(postId).get();
      return Promise.resolve(doc.data());
    } catch(err) {
      return Promise.reject(err);
    }
  }
}