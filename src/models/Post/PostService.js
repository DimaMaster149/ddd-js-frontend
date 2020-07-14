import { ref } from '@vue/composition-api'
import { get } from '@/plugins/context';

export default function PostService() {
  let posts = ref([]);
  let api = get('PostApi');

  const createPost = async (post) => {
    try {
      const newPost = await api.createPost(post);
      posts.value.push(newPost);
      return Promise.resolve();
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  const removePost = async (postId) => {
    try {
      await api.removePost(postId);
      posts.value = posts.value.filter(post => post.id !== postId)
      return Promise.resolve();
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  const getPosts = async () => {
    try {
      const allPosts = await api.getPosts();
      posts.value = allPosts;
      return Promise.resolve(posts.value);
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  const getPost = async (postId) => {
    try {
      const foundPost = await api.getPost(postId);
      return Promise.resolve(foundPost)
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  return {
    posts,
    createPost,
    removePost,
    getPosts,
    getPost
  };
}