import VueCompositionAPI from '@vue/composition-api';
import { mount, createLocalVue } from '@vue/test-utils';

import { registry } from '@/plugins/context'
import useUserService from '@/models/User/UserService';
import { UserMock } from '@/models/User'

import { users } from '../data/users'
import { User } from '@/models/User';

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
    const createdUser = new User(user);

    await UserService.createUser(user);

    expect(UserService.users.value).toStrictEqual([createdUser]);
    expect(UserService.currentUser.value).toStrictEqual(createdUser);
  });
});