import { RootState } from '../../index'
import { ProfileSliceState } from './types'

export const profileSelector = (state: RootState): ProfileSliceState => state.profile
