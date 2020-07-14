import { ref } from '@vue/composition-api'
import PostApi from '@/models/Post/PostApi'

export default function PostService() {
  let posts = ref([]);
  let api = PostApi;

  const createPost = async (post) => {
    const newPost = await PostApi.createPost(post);
    posts.value.push(newPost);
  }

  const removePost = async (postId) => {
    await PostApi.removePost(postId);
    posts.value = posts.value.filter(post => post.id !== postId)
    return Promise.resolve();
  }

  const getPosts = async () => {
    const allPosts = await PostApi.getPosts();
    posts.value = allPosts;
  }

  const getPost = async (postId) => {
    const foundPost = await PostApi.getPost(postId);
    return Promise.resolve(foundPost)
  }

  return {
    posts,
    createPost,
    removePost,
    getPosts,
    getPost
  };
}