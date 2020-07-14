import { provide } from '@vue/composition-api'
import PostService from '@/models/Post/PostService';

const context = {};

export const registry = (key, store) => {
  context[key] = store;
};

registry('PostService', PostService);

const contextMixin = {
  setup() {
    Object.keys(context).forEach(key => {
      const store = context[key]()
      provide(key, store)
    })
  },
}

export default contextMixin