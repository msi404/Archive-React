import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { archiveApi } from '@/shared/api/archiveApi'
import { type RootState } from '@/shared/lib/store'

type AuthState = {
  id: number | null
  email: string | null
  role: string | null
  name: string | null
  token: string | null
}

const defaultState: AuthState = {
  id: null,
  email: null,
  role: null,
  name: null,
  token: null
}

const loadInitialState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (e) {
        console.error('Failed to parse localStorage user', e)
        localStorage.removeItem('user')
      }
    }
  }
  return defaultState
}

const initialState: AuthState = loadInitialState()

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<AuthState>>) => {
      const newUser = { ...state, ...action.payload }
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(newUser))
      }
      return newUser
    },
    logout: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user')
      }
      return defaultState
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      archiveApi.endpoints.postApiAuthLogin.matchFulfilled,
      (_state, { payload }) => {
        const userData: AuthState = payload.result
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(userData))
        }
        return userData
      }
    )
  }
})

export const { setUser, logout } = authSlice.actions
export const selectToken = (state: RootState) => state.auth.token
export const selectUser = (state: RootState) => state.auth
export default authSlice.reducer
