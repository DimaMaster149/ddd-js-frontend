import { ref } from '@vue/composition-api'
import { get } from '@/plugins/context';
import { IPost } from '@/models/Post'
import { IUser, UserRepository } from '@/models/User'
import { IUserAddress } from '../shared/ObjectValue/IUserAddress';

import { UserError } from '@/errors/UserError'
import { AuthorizationError } from '@/errors/AuthorizationError'
import { PostsError } from '@/errors/PostsError'

import { right, left } from '@ts-monads/either';

export default function UserService() {
  let users = ref<Array<IUser>>([]);
  let currentUser:any = ref(null);
  let api: UserRepository = get('UserApi');

  const createUser = async (user: IUser) => {
    const maybeUser = await api.createUser(user);
    if (maybeUser.isRight()) {
      const { value: newUser } = maybeUser;
      users.value.push(newUser);
      currentUser.value = newUser;
    }
    
    return maybeUser;
  }

  const loginUser = async (username: string) => {
    const maybeUser = await api.loginUser(username);

    if (maybeUser.isRight()) {
      const { value: user } = maybeUser;
      currentUser.value = user;
    } 

    return maybeUser;
  };

  const logoutUser = async () => {
    const maybeUser = await api.logoutUser();

		if (maybeUser.isRight()) {
			currentUser.value = null;
    }
  };

  const getUsers = async () => {
    const maybeUsers = await api.getUsers();

    if (maybeUsers.isRight()) {
      const { value: loadedUsers } = maybeUsers;
      users.value = loadedUsers;
    }

    return maybeUsers;
  }

  const updateUser = async ({ userId, address }: { userId: string, address: IUserAddress }) => {
    const maybeUser = await api.getUser(userId);
    if (maybeUser.isRight()) {
      const { value: user } = maybeUser;
      return api.updateUser({ userId, user: { ...user, address } });
    } 
    
    return maybeUser;
  }

  const getPosts = async (userId: string) => {
    return api.getPosts(userId);
  }

  const addPost = async ({ userId, post }: { userId: string, post: IPost }) => {
    return api.addPost({ userId, post })
  }

  const removePost = async ({ userId, postId }: { userId: string, postId: string }) => {
    return api.removePost({ userId, postId });
  }

  return {
    users,
    currentUser,
    createUser,
    loginUser,
    logoutUser,
    getUsers,
    updateUser,
    getPosts,
    addPost,
    removePost,
  };
}