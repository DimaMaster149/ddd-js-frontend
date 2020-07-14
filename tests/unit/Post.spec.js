import VueCompositionAPI from '@vue/composition-api';
import { mount, createLocalVue } from '@vue/test-utils';
import usePostService from '@/models/Post/PostService';

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);

const mountComposition = (cb) => {
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

describe('My Test', () => {
  it('Works', () => {
    let PostService;
    // use PostMock.js
    const component = mountComposition(() => {
      PostService = usePostService();
    });

    expect(PostService.posts.value).toStrictEqual([]);
  });
});