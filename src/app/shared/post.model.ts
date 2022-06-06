import { User } from "./user.model";

export interface Post {
  id: string,
  author: User,
  content: string,
  likes: User[]
}
