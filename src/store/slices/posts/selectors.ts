import { RootState } from '../../index'
import { PostsSliceState } from './types'

export const postsSelector = (state: RootState): PostsSliceState => state.posts
