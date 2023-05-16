import { AppDispatch } from '..'
import AuthService from '../api/authService'
import { authSlice } from '../slices/authSlice'

export const registration =
  (password: string, username: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.userFetching())
      const response = await AuthService.registration(password, username)
      localStorage.setItem('token', response.data.token)
      dispatch(authSlice.actions.userFetchingSuccess(response.data))
      dispatch(authSlice.actions.userSetSuccess(true))
    } catch (e: any) {
      dispatch(authSlice.actions.userFetchingError(e.response.data.detail))
    }
  }

export const login =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.userFetching())
      const response = await AuthService.login(username, password)
      localStorage.setItem('token', response.data.token)
      dispatch(authSlice.actions.userFetchingSuccess(response.data))
    } catch (e: any) {
      dispatch(authSlice.actions.userFetchingError(e.response.data.detail))
    }
  }

export const cheackAuth = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.userFetching())
    const response = await AuthService.refresh()
    localStorage.setItem('token', response.data.token)
    dispatch(authSlice.actions.userFetchingSuccess(response.data))
  } catch (e: any) {
    localStorage.removeItem('token')
    dispatch(authSlice.actions.userFetchingError(e.response.data.detail))
  }
}

export const clearErrorAuth = () => async (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.userClearError())
}

export const setSuccess =
  (success: boolean) => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.userSetSuccess(success))
  }

export const clearUser = () => async (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.userClear())
}

export const logout = () => (dispatch: AppDispatch) => {
  localStorage.removeItem('token')
  dispatch(authSlice.actions.userClear())
}
