import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import profileSlice from './slices/profile/slice'
import userSlice from './slices/users/slice'
import postsSlice from './slices/posts/slice'
import appSlice from './slices/app/slice'

export const store = configureStore({
  reducer: {
    app: appSlice,
    profile: profileSlice,
    users: userSlice,
    posts: postsSlice
  }
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
