enum FriendStatus {
  notFriends,
  requestSent,
  requestReceived,
  friends
}

export class Friend {
  constructor(public id: string, public status: FriendStatus) {}
}

export interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  profileImage: string,
  friends: Friend[]
}
