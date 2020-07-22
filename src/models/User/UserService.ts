import { ref } from '@vue/composition-api'
import { get } from '@/plugins/context';
import { IPost } from '@/models/Post'
import { IUser, UserRepository } from '@/models/User'
import { IUserAddress } from '../shared/ObjectValue/IUserAddress';

export default function PostService() {
  let users = ref<Array<IUser>>([]);
  let api: UserRepository = get('UserApi');

  const createUser = async (user: IUser) => {
    try {
      const newUser: IUser = await api.createUser(user);
      users.value.push(newUser);
      return Promise.resolve();
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  const getUsers = async () => {
    try {
      users.value = await api.getUsers();
      return Promise.resolve(users.value);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  const updateUser = async ({ userId, address }: { userId: string, address: IUserAddress }) => {
    try {
      const user = users.value.find(u => u.id == userId);
      const updatedUser = api.updateUser({ userId, user: { ...user, address } });
      return Promise.resolve(updatedUser);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }


  const getPosts = async (userId: string) => {
    try {
      const posts = await api.getPosts(userId);
      return Promise.resolve(posts);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  const addPost = async ({ userId, post }: { userId: string, post: IPost }) => {
    try {
      return api.addPost({ userId, post });
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }

  }
  const removePost = async ({ userId, postId }: { userId: string, postId: string }) => {
    try {
      return api.removePost({ userId, postId });
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  return {
    users,
    createUser,
    getUsers,
    updateUser,
    getPosts,
    addPost,
    removePost,
  };
}