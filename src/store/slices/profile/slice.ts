import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileData, ProfileSliceState } from './types'
import axios from '../../../axios'

const initialState: ProfileSliceState = {
  userData: {
    id: 0,
    firstName: '',
    lastName: '',
    image: '',
    status: '',
    createdAt: '',
    updatedAt: '',
    followingCount: 0,
    followersCount: 0
  }
}

// Thunk creators

export const fetchProfileData = createAsyncThunk<ProfileData>(
  'profile/fetchProfileData',
  async () => {
    const { data } = await axios.get<ProfileData>('api/profile')
    return data
  }
)

export const fetchUpdateProfileData = createAsyncThunk<ProfileData, any>(
  'profile/fetchUpdateProfileData',
  async (values) => {
    const { data } = await axios.patch<ProfileData>('api/profile', values)
    return data
  }
)

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setCountFollowerFollowing (state, action: PayloadAction<{ isFollow: boolean }>) {
      if (action.payload.isFollow) {
        state.userData.followingCount++
      } else {
        state.userData.followingCount--
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileData.fulfilled, (state, action) => {
      state.userData = action.payload
    })
    builder.addCase(fetchUpdateProfileData.fulfilled, (state, action) => {
      state.userData = action.payload
    })
  }
})

// Action creators are generated for each case reducer function

export const { setCountFollowerFollowing } = profileSlice.actions

export default profileSlice.reducer
