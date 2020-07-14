import { ref } from '@vue/composition-api'
import { get } from '@/plugins/context';

export default function PostService() {
  let posts = ref([]);
  let api = get('PostApi');

  const createPost = async (post) => {
    const newPost = await api.createPost(post);
    posts.value.push(newPost);
  }

  const removePost = async (postId) => {
    await api.removePost(postId);
    posts.value = posts.value.filter(post => post.id !== postId)
    return Promise.resolve();
  }

  const getPosts = async () => {
    const allPosts = await api.getPosts();
    posts.value = allPosts;
  }

  const getPost = async (postId) => {
    const foundPost = await api.getPost(postId);
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