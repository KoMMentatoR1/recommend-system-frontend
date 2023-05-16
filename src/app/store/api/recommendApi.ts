import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { API_URL } from '../../../shared/http'
import { Book } from '../../../shared/types/book'

export const recommendApi = createApi({
  reducerPath: 'recommendApi',
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
    getRecommend: build.query<Book[], string>({
      query: categori => ({
        url: categori ? `/my/recommend/${categori}` : '/my/recommend',
      }),
    }),
  }),
})
