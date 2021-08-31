import VueCompositionAPI from '@vue/composition-api';
import { mount, createLocalVue } from '@vue/test-utils';

import { registry } from '@/plugins/context'
import useUserService from '@/models/User/UserService';
import { UserMock } from '@/models/User'

import { users } from '../data/users'
import { IUserAddress } from '@/models/shared/ObjectValue/IUserAddress';

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);

const mountComposition = (cb: any) => {
  return mount(
    {
      setup() {
        return cb();
      },
      render(h) {
        return h('div');
      }
    },
    { localVue }
  );
};

describe('UserService', () => {
  let UserService: any
  beforeEach(async () => {
    registry('UserApi', new UserMock());

    const component = mountComposition(() => {
      UserService = useUserService();
    });
  })

  it('createUser', async () => {
    expect(UserService.users.value).toStrictEqual([]);
    expect(UserService.currentUser.value).toEqual(null);

    const user = users[0];

    await UserService.createUser(user);

    expect(UserService.users.value).toStrictEqual([user]);
    expect(UserService.currentUser.value).toStrictEqual(user);
  });

  it('login and logout', async () => {
    expect(UserService.users.value).toStrictEqual([]);
    expect(UserService.currentUser.value).toEqual(null);

    const user = users[0];

    await UserService.createUser(user);
    expect(UserService.users.value).toStrictEqual([user]);
    expect(UserService.currentUser.value).toStrictEqual(user);

    await UserService.logoutUser()
    expect(UserService.currentUser.value).toEqual(null);

    await UserService.loginUser(user.username)
    expect(UserService.currentUser.value).toStrictEqual(user);
  });

  it('getUsers', async () => {
    await UserService.getUsers();
    
    expect(UserService.users.value).toStrictEqual(users)
  });
  
  it('getUsers', async () => {
    await UserService.getUsers();
    expect(UserService.users.value).toStrictEqual(users)

    const newAddress: IUserAddress = {
      city: 'some city',
      street: 'some street',
      building: 1
    }

    await UserService.updateUser({
      userId: users[0].id, 
      address: newAddress,
    });

    expect(UserService.users.value[0]).toStrictEqual({
      ...users[0],
      address: newAddress
    });
  });

  it('getPosts', async () => {
    await UserService.getUsers();
    expect(UserService.users.value).toStrictEqual(users)

    const userPosts = await UserService.getPosts(users[1].id);
    
    expect(userPosts).toStrictEqual(users[1].posts)
  });
  
  it('addPost', async () => {
    await UserService.getUsers();
    expect(UserService.users.value).toStrictEqual(users)
    
    const newPost = {
      id: '3',
      title: 'third',
      text: 'post'
    };

    await UserService.addPost({ userId: users[0].id, post: newPost });
    expect(UserService.users.value[0].posts).toStrictEqual([newPost]);
  });

  it('addPremovePostost', async () => {
    await UserService.getUsers();
    expect(UserService.users.value).toStrictEqual(users)

    await UserService.removePost({ userId: users[1].id, postId: users[1].posts[1].id });
    expect(UserService.users.value[1].posts).toHaveLength(1);
    expect(UserService.users.value[1].posts).toStrictEqual([users[1].posts[0]]);
  });
});