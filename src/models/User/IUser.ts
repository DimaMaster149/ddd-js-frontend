import { IUserAddress } from '@/models/shared/ObjectValue/IUserAddress';
import { IPost } from '@/models/Post'

export interface IUser {
  id: string,
  username: string,
  address: IUserAddress,
  posts: IPost[]
}
