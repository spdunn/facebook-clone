enum FriendStatus {
  notFriends,
  requestSent,
  requestReceived,
  friends
}

export interface Friend {
  id: string,
  status: FriendStatus
}

export interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  profileImage: string,
  friends: Friend[]
}
