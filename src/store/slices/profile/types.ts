
export interface Post {
  id: number
  image: string
  text: string
  createdAt: string
  updatedAt: string
  userId: number
}

export interface ProfileSliceState {
  userData: ProfileData
}

export interface EditProfileParams {
  image: string
  status: string
  firstName: string
  lastName: string
}

export interface CreatePostParams {
  image: string
  text: string
}

interface FollowingUsers {
  id: number
  firstName: string
  lastName: string
  image: string
}

export interface ProfileData {
  id: number
  firstName: string
  lastName: string
  image: string
  status: string
  createdAt: string
  updatedAt: string
  followersCount: number
  followingCount: number
}
