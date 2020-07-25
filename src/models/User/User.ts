import { IUser, UserRepository } from '@/models/User'
import { IUserAddress } from '../shared/ObjectValue/IUserAddress';
import { get } from '@/plugins/context';
import { IPost } from '../Post';

export class User {
  public user: IUser;
  public api: UserRepository = get('UserApi');

  constructor(user: IUser) {
    this.user = user;
  }

  public getAddress() {
    return this.user.address
  }

  public getUsername() {
    return this.user.username
  }

  public getPosts() {
    return this.user.posts
  }

  public addPost(post:IPost) {
    return this.user.posts.push(post);
  }

  public removePost(postId: string) {
    return this.user.posts = this.user.posts.filter(post => post.id !== postId);
  }
  
  public getId() {
    return this.user.id
  }

  public setAddress(address: IUserAddress) {
    return this.user.address = address;
  }

  public async save() {
    return this.api.updateUser({ userId: this.user.id, user: this.user });
  }
}
