import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  Post, PostsSliceState, PostsWall
} from './types'
import axios from '../../../axios'

const initialState: PostsSliceState = {
  userPosts: [],
  postsWall: []
}

// Thunk creators

export const fetchPostsWall = createAsyncThunk(
  'posts/fetchPostsWall',
  async () => {
    const { data } = await axios.get<PostsWall[]>('/api/posts/wall')
    return data
  }
)

export const fetchUsersPost = createAsyncThunk(
  'posts/fetchUsersPost',
  async (_, { dispatch }) => {
    const { data } = await axios.get<Post[]>('api/posts')
    dispatch(setPosts(data))
  }
)

export const fetchCreatePost = createAsyncThunk<Post[], any>(
  'posts/fetchCreatePost',
  async (values) => {
    const { data } = await axios.post<Post[]>('api/posts', values)
    return data
  }
)

export const fetchUpdatePost = createAsyncThunk<Post[], any>(
  'posts/fetchUpdatePost',
  async (values) => {
    const { data } = await axios.put<Post[]>(`api/posts/${values.id}`, values.formData)
    return data
  }
)

export const fetchDeletePost = createAsyncThunk<any, { id: number }>(
  'posts/fetchDeletePost',
  async ({ id }, { dispatch }) => {
    try {
      const { data } = await axios.delete<{ success: boolean }>(`api/posts/${id}`)
      if (data.success) {
        dispatch(setDeletePost(id))
      }
    } catch (e) {
      console.log(e)
    }
  }
)

export const fetchLikePost = createAsyncThunk<any, { id: number }>(
  'posts/fetchLikePost',
  async ({ id }, { dispatch }) => {
    try {
      await axios.post<{ success: boolean }>(`api/posts/like/${id}`)
      dispatch(setLike(id))
    } catch (e) {
      console.log(e)
    }
  }
)

export const fetchUnlikePost = createAsyncThunk<any, { id: number }>(
  'posts/fetchUnlikePost',
  async ({ id }, { dispatch }) => {
    try {
      await axios.delete<Post[]>(`api/posts/unlike/${id}`)
      dispatch(setUnlike(id))
    } catch (e) {
      console.log(e)
    }
  }
)

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts (state, action) {
      state.userPosts = action.payload
    },
    setDeletePost (state, action) {
      state.userPosts = [...state.userPosts].filter(post => post.id !== action.payload)
    },
    setLike (state, action) {
      const post = state.postsWall.find(post => post.id === action.payload)
      if (post) {
        post.liked = true
        post.likesCount++
      }
    },
    setUnlike (state, action) {
      const post = state.postsWall.find(post => post.id === action.payload)
      if (post) {
        post.liked = false
        post.likesCount--
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreatePost.fulfilled, (state, action) => {
      state.userPosts = action.payload
    })
    builder.addCase(fetchCreatePost.rejected, (state, action) => {
      state.userPosts = []
    })
    builder.addCase(fetchPostsWall.fulfilled, (state, action) => {
      state.postsWall = action.payload
    })
    builder.addCase(fetchPostsWall.rejected, (state, action) => {
      state.postsWall = []
    })
    builder.addCase(fetchUpdatePost.fulfilled, (state, action) => {
      state.userPosts = action.payload
    })
    builder.addCase(fetchUpdatePost.rejected, (state, action) => {
      state.userPosts = []
    })
  }
})

// Action creators are generated for each case reducer function

export const { setPosts, setLike, setUnlike, setDeletePost } = postsSlice.actions

export default postsSlice.reducer
