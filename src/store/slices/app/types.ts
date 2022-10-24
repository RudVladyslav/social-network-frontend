export enum Status {
  LOADING = 'loading',
  NORMAL = ''
}

export interface AppSliceState {
  isAuth: boolean
  appStatus: 'loading' | ''
}

export interface RegistrationParams {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface AuthenticateParams {
  email: string
  password: string
}

export interface RegistrationResponse {
  message: string
}

export interface AuthenticateResponse {
  token: any
}
