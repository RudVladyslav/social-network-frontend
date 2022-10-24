export interface Post {
  id: number
  image: string
  text: string
  createdAt: string
  updatedAt: string
  likesCount: number
}

export interface updatePostParams {
  text: string
  image: string
}

export interface PostsSliceState {
  userPosts: Post[]
  postsWall: PostsWall[]
}
export interface Likes {
  id: number
  postId: number
  userId: number
}

export interface PostsWall {
  id: number
  image: string
  text: string
  createdAt: string
  updatedAt: string
  userId: number
  likesCount: number
  liked: boolean
  user: {
    image: string
    firstName: string
    lastName: string
  }
}
