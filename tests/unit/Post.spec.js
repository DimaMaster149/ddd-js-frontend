import VueCompositionAPI from '@vue/composition-api';
import { mount, createLocalVue } from '@vue/test-utils';

import usePostService from '@/models/Post/PostService';
import { registry } from '@/plugins/context'
import PostMock from '@/models/Post/PostMock'

import { posts } from '../data/posts'

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

  it('createPost', async () => {
    expect(PostService.posts.value).toStrictEqual([]);
    const post = {
      id: Math.random(0, 10000).toString(),
      title: 'title',
      text: 'text',
    };

    await PostService.createPost(post);

    expect(PostService.posts.value).toStrictEqual([post]);
  });

  it('getPosts', async () => {
    expect(PostService.posts.value).toStrictEqual([]);
    await PostService.getPosts();

    expect(PostService.posts.value).toStrictEqual(posts);
  });
});