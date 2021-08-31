import VueCompositionAPI from '@vue/composition-api';
import { mount, createLocalVue } from '@vue/test-utils';

import usePostService from '@/models/Post/PostService';
import { registry } from '@/plugins/context'
import { PostMock } from '@/models/Post/api/PostMock'

import { posts } from '../data/posts'

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

describe('PostService', () => {
  let PostService: any
  beforeEach(async () => {
    registry('PostApi', new PostMock());

    const component = mountComposition(() => {
      PostService = usePostService();
    });
  })

  it('createPost', async () => {
    expect(PostService.posts.value).toStrictEqual([]);
    const post = {
      id: (Math.random() * 1000).toString(),
      title: 'title',
      text: 'text',
    };

    await PostService.createPost(post);

    expect(PostService.posts.value).toStrictEqual([post]);
  });

  it('removePost', async () => {
    const postId = '2';

    expect(PostService.posts.value).toStrictEqual([]);
    await PostService.getPosts();
    expect(PostService.posts.value).toStrictEqual(posts);

    await PostService.removePost(postId)
    
    expect(PostService.posts.value).toStrictEqual([posts[0]]);
  });

  it('getPosts', async () => {
    expect(PostService.posts.value).toStrictEqual([]);
    await PostService.getPosts();

    expect(PostService.posts.value).toStrictEqual(posts);
  });

  it('getPosts', async () => {
    const postId = '1';

    expect(PostService.posts.value).toStrictEqual([]);
    await PostService.getPosts();
    expect(PostService.posts.value).toStrictEqual(posts);

    const post = await PostService.getPost(postId);
    expect(post).toStrictEqual(posts[0]);
  });
});