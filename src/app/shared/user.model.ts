enum FriendStatus {
  notFriends,
  requestSent,
  requestReceived,
  friends
}

export class Friend {
  constructor(public id: string, public status: FriendStatus) {}
}

export class User {
  constructor(public id: string, public firstName: string, public lastName: string, public email: string, public profileImage: string, public friends: Friend[]) {}
}
