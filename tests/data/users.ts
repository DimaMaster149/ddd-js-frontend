import { posts } from './posts'

export const users = [{
  id: 'first',
  username: 'first_user',
  address: {
    city: 'first city',
    street: 'first street',
    building: 10
  },
  posts: [],
}, {
  id: 'second',
  username: 'second_user',
  address: {
    city: 'second city',
    street: 'second street',
    building: 10
  },
  posts: posts,
}];
