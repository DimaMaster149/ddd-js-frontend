import { postsCollection } from '@/plugins/firebase'
import { IPost } from '@/models/Post/IPost'
import { PostRepository } from '@/models/Post/PostRepository'

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
        posts.push(doc.data())
      });

      return Promise.resolve(posts);
    } catch(err) {
      return Promise.reject(err);
    }
  }

  public async getPost(postId: string) {
    try {
      const doc = await postsCollection.doc(postId).get();
      return Promise.resolve(doc.data());
    } catch(err) {
      return Promise.reject(err);
    }
  }
}
