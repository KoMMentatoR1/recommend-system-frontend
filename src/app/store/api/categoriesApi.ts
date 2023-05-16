import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { API_URL } from '../../../shared/http'

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: headers => {
      const token = localStorage.getItem('token')

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: build => ({
    getCategories: build.query<string[], void>({
      query: () => ({
        url: `/categories`,
      }),
    }),
    getMyCategories: build.query<string[], void>({
      query: () => ({
        url: `/my/categories`,
      }),
    }),
  }),
})
