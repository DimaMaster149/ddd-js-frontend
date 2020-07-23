import { ref } from '@vue/composition-api'
import { get } from '@/plugins/context';
// import { IPost } from '@/models/Post'
import { IUser, UserRepository } from '@/models/User'
// import { IUserAddress } from '../shared/ObjectValue/IUserAddress';
import { User } from './User';

export default function UserService() {
  let users = ref<Array<User>>([]);
  let currentUser:any = ref(null);
  let api: UserRepository = get('UserApi');

  const createUser = async (user: IUser) => {
    try {
      const newUser: IUser = await api.createUser(user);
      users.value.push(new User(newUser));
      currentUser.value = newUser;
      console.log(currentUser, 'currentUser')
      return Promise.resolve();
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  const loginUser = async (username: string) => {
    try {
      const user:IUser = await api.loginUser(username);
      const newUser = new User(user);
      console.log({newUser})

      users.value.push(newUser);
      currentUser.value = newUser;

    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };

  const logoutUser = async () => {
    return api.logoutUser()
  };

  const getUsers = async () => {
    try {
      const usersArray = await api.getUsers();
      users.value = usersArray.map((u: IUser) => new User(u));
      return Promise.resolve(users.value);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  // const updateUser = async ({ userId, address }: { userId: string, address: IUserAddress }) => {
  //   try {
  //     const user: any = users.value.find(u => u.id == userId);
  //     const updatedUser = api.updateUser({ userId, user: { ...user, address } });
  //     return Promise.resolve(updatedUser);
  //   } catch (err) {
  //     console.log(err);
  //     return Promise.reject(err);
  //   }
  // }


  // const getPosts = async (userId: string) => {
  //   try {
  //     const posts = await api.getPosts(userId);
  //     return Promise.resolve(posts);
  //   } catch (err) {
  //     console.log(err);
  //     return Promise.reject(err);
  //   }
  // }

  // const addPost = async ({ userId, post }: { userId: string, post: IPost }) => {
  //   try {
  //     return api.addPost({ userId, post });
  //   } catch (err) {
  //     console.log(err);
  //     return Promise.reject(err);
  //   }

  // }
  // const removePost = async ({ userId, postId }: { userId: string, postId: string }) => {
  //   try {
  //     return api.removePost({ userId, postId });
  //   } catch (err) {
  //     console.log(err);
  //     return Promise.reject(err);
  //   }
  // }

  return {
    users,
    currentUser,
    createUser,
    loginUser,
    logoutUser,
    getUsers,
    // updateUser,
    // getPosts,
    // addPost,
    // removePost,
  };
}