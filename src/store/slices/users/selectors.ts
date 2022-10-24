import { RootState } from '../../index'
import { UsersInitialState } from './types'

export const usersSelector = (state: RootState): UsersInitialState => state.users
