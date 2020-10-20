import { ref } from '@vue/composition-api'
import { get } from '@/plugins/context';
import { IPost } from '@/models/Post'
import { IUser, UserRepository } from '@/models/User'
import { IUserAddress } from '../shared/ObjectValue/IUserAddress';

import { UserError } from '@/errors/UserError'
import { AuthorizationError } from '@/errors/AuthorizationError'
import { PostsError } from '@/errors/PostsError'

import { right, left } from '@sweet-monads/either';

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
    try {
      const user:IUser = await api.loginUser(username);
      currentUser.value = user;

      return right(user);
    } catch (err) {
      console.log(err);
      return left(new AuthorizationError(`Can't login`));
    }
  };

  const logoutUser = async () => {
    try {
      await api.logoutUser(); 
      currentUser.value = null;

      return right(null);
    } catch (err) {
      console.log(err);
      return left(new AuthorizationError(`Can't logout`));
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
    try {
      const user: IUser = users.value.find(u => u.id == userId)!;
      const updatedUser = api.updateUser({ userId, user: { ...user, address } });

      return right(updatedUser);
    } catch (err) {
      return left(new UserError(`Can't update user`));
    }
  }

  const getPosts = async (userId: string) => {
    try {
      const posts = await api.getPosts(userId);
      return right(posts);
    } catch(err) {
      return left(new PostsError(`Can't load user posts`))
    }
  }

  const addPost = async ({ userId, post }: { userId: string, post: IPost }) => {
    try {
      const createdPost = await api.addPost({ userId, post });
      return right(createdPost);
    } catch(err) {
      return left(new PostsError(`Can't create new post`))
    }
  }

  const removePost = async ({ userId, postId }: { userId: string, postId: string }) => {
    try {
      await api.removePost({ userId, postId });
      return right(null);
    } catch(err) {
      return left(new PostsError(`Can't delete existing post`))
    }
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