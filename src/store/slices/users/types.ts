export interface UsersInitialState {
  allUsers: User[]
  following: User[]
  followers: User[]
  searchUsers: User[]
  searchMessage: string
  searchValue: string
}

export interface User {
  id: number
  firstName: string
  lastName: string
  image: string
  status: string
  createdAt: string
  updatedAt: string
  following: boolean
  follower: boolean
}

export interface FollowingUser {
  id: number
  firstName: string
  lastName: string
  image: string
  status: string
  createdAt: string
  updatedAt: string
  followed: boolean
}
