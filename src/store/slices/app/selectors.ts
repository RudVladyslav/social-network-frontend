import { RootState } from '../../index'
import { AppSliceState } from './types'

export const appSelector = (state: RootState): AppSliceState => state.app
export const appStatusSelector = (state: RootState): string => state.app.appStatus
