import axios, { AxiosResponse } from 'axios'
import $api, { API_URL } from '../../../shared/http'
import { IUser } from '../../../shared/types/user'
export default class AuthService {
  static async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<IUser>> {
    return axios.post<IUser>(`${API_URL}/login`, {
      username,
      password,
    })
  }

  static async registration(
    password: string,
    username: string
  ): Promise<AxiosResponse<IUser>> {
    return axios.post<IUser>(`${API_URL}/registration`, {
      password,
      username,
    })
  }

  static async refresh(): Promise<AxiosResponse<IUser>> {
    return await $api.get<IUser>(`/refresh`, { withCredentials: true })
  }
}
