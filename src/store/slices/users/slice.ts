import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UsersInitialState } from './types'
import axios from '../../../axios'
import { setCountFollowerFollowing } from '../profile/slice'

const initialState: UsersInitialState = {
  allUsers: [],
  searchUsers: [],
  following: [],
  followers: [],
  searchMessage: '',
  searchValue: ''
}

// Thunk creators

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async () => {
    const { data } = await axios.get<User[]>('/api/users')
    return data
  }
)

export const fetchFollow = createAsyncThunk< any, { id: number }>(
  'users/fetchFollow',
  async ({ id }, { dispatch }) => {
    try {
      const { data } = await axios.post<{ success: boolean }>('/api/users/follow', { id })
      if (data.success) {
        dispatch(setFollowUnfollow({ id, isFollow: true }))
        dispatch(setCountFollowerFollowing({ isFollow: true }))
      }
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchUnfollow = createAsyncThunk<any, { id: number }>(
  'users/fetchUnfollow',
  async ({ id }, { dispatch }) => {
    try {
      const { data } = await axios.delete<{ success: boolean }>(`/api/users/unfollow/${id}`)
      if (data.success) {
        dispatch(setFollowUnfollow({ id, isFollow: false }))
        dispatch(setCountFollowerFollowing({ isFollow: false }))
      }
    } catch (e) {
      console.log(e)
    }
  }
)

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFollowUnfollow (state, action: PayloadAction<{ id: number, isFollow: boolean }>) {
      state.allUsers = [...state.allUsers].map(user => {
        if (user.id === action.payload.id) {
          user.following = action.payload.isFollow
          return user
        }
        return user
      })

      if (state.searchValue !== '') {
        state.searchUsers = [...state.allUsers].filter(user => (user.firstName + user.lastName).toLowerCase().includes(state.searchValue))
      }
      state.following = [...state.allUsers].filter(user => user.following)
      state.followers = [...state.allUsers].filter(user => user.follower)
    },
    setSearchValue (state, action: PayloadAction<{ searchParams: string }>) {
      state.searchValue = action.payload.searchParams.toLowerCase().split(' ').join('')
      if (state.searchValue !== '') {
        state.searchUsers = [...state.allUsers].filter(user => (user.firstName + user.lastName).toLowerCase().includes(state.searchValue))
      } else {
        state.searchUsers = []
      }
      if (state.searchUsers.length === 0 && state.searchValue !== '') {
        state.searchMessage = 'Не найдено'
      } else {
        state.searchMessage = ''
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload
      state.following = [...action.payload].filter(user => user.following)
      state.followers = [...action.payload].filter(user => user.follower)
    })
  }
})

// Action creators are generated for each case reducer function

export const { setFollowUnfollow, setSearchValue } = userSlice.actions

export default userSlice.reducer
