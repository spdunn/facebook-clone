import { User } from "./user.model";

export class Post {
  constructor(public id: string, public author: User, public content: string, public likes: User[]) {}
}
