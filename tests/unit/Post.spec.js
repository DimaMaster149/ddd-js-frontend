import VueCompositionAPI from '@vue/composition-api';
import { mount, createLocalVue } from '@vue/test-utils';
import usePostService from '@/models/Post/PostService';
import { registry } from '@/plugins/context'
import PostMock from '@/models/Post/PostMock'

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

describe('PostService', () => {
  let PostService
  beforeEach(async () => {
    registry('PostApi', PostMock);

    const component = mountComposition(() => {
      PostService = usePostService();
    });
  })

  it('getPosts', async () => {
    expect(PostService.posts.value).toStrictEqual([]);
    await PostService.getPosts();

    expect(PostService.posts.value).toStrictEqual(PostMock.posts());
  });
});