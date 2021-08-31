import { ref } from '@vue/composition-api'
import { get } from '@/plugins/context';
import { IPost } from '@/models/Post/IPost'
import { PostRepository } from '@/models/Post/PostRepository'
import { right } from '@ts-monads/either';

export default function PostService() {
  let posts = ref<Array<IPost>>([]);
  let api: PostRepository = get('PostApi');

  const createPost = async (post: IPost) => {
    const maybePost = await api.createPost(post);

    if (maybePost.isRight()) {
      const { value: newPost } = maybePost;
      posts.value.push(newPost);
      return right(newPost)
    } return maybePost;
  }

  const removePost = async (postId: string) => {
    const maybeRight = await api.removePost(postId);

    if (maybeRight.isRight()) {
      posts.value = posts.value.filter(post => post.id !== postId)
    } return maybeRight;
  }

  const getPosts = async () => {
    const maybePosts = await api.getPosts();
    
    if (maybePosts.isRight()) {
      const { value: allPosts } = maybePosts
      posts.value = allPosts;
      return right(posts.value)
    } return maybePosts
  }

  const getPost = async (postId: string) => {
    return await api.getPost(postId)
  }

  return {
    posts,
    createPost,
    removePost,
    getPosts,
    getPost
  };
}