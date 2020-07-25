import { ref } from '@vue/composition-api'
import { get } from '@/plugins/context';
import { IUser, UserRepository } from '@/models/User'
import { User } from './User';

export default function UserService() {
  let users = ref<Array<User>>([]);
  let currentUser:any = ref(null);
  let api: UserRepository = get('UserApi');

  const createUser = async (user: IUser) => {
    try {
      const createdUser: IUser = await api.createUser(user);
      const newUser = new User(createdUser);

      users.value.push(newUser);
      currentUser.value = newUser;

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


  return {
    users,
    currentUser,
    createUser,
    loginUser,
    logoutUser,
    getUsers,
  };
}