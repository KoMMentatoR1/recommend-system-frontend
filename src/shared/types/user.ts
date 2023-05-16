export interface IReqUser {
  password: string
  username: string
}

export interface IUser {
  token: string
  id: number
  role: string
  username: string
}

export interface IUserAdmin {
  id: number
  role: string
}

export interface IUserAdminUpdate {
  id: number
  role: string
}
