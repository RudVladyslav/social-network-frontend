import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppSliceState, Status } from './types'

const initialState: AppSliceState = {
  isAuth: false,
  appStatus: ''
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setStatusApp (state, action: PayloadAction<Status>) {
      state.appStatus = action.payload
    },
    setIsAuth (state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    }
  }
})

// Action creators are generated for each case reducer function

export const { setStatusApp, setIsAuth } = appSlice.actions

export default appSlice.reducer
