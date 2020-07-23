import { provide } from '@vue/composition-api'
import PostService from '@/models/Post/PostService';
import UserService from '@/models/User/UserService';

// import { PostApi } from '@/models/Post/PostApi'
import { PostLocalStorageApi } from '@/models/Post/api/PostLocalStorageApi'
import { UserLocalStorageApi } from '@/models/User/api/UserLocalStorageApi'

const context = {};

export const registry = (key, store) => {
  context[key] = store;
};

export const get = (key) => {
  return context[key];
}

registry('PostService', PostService);
registry('PostApi', new PostLocalStorageApi());

registry('UserService', UserService);
registry('UserApi', new UserLocalStorageApi());
// registry('PostApi', new PostApi());

const contextMixin = {
  setup() {
    Object.keys(context).forEach(key => {
      const service = context[key];
      if (typeof service === "function") {
        provide(key, service());
      } else {
        provide(key, service);
      }
    })
  },
}

export default contextMixin;