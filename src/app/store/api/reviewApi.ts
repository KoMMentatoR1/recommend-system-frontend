import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { API_URL } from '../../../shared/http'
import { AddReview, ReviewWithBook } from '../../../shared/types/review'

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
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
  tagTypes: ['Review'],
  endpoints: build => ({
    addReview: build.mutation<boolean, AddReview>({
      query: data => ({
        url: `/review/${data.bookId}`,
        body: { review: +data.review.toFixed(1) },
        method: 'POST',
      }),
      invalidatesTags: ['Review'],
    }),
    getOneReview: build.query<number, string>({
      query: bookId => ({
        url: `/review/${bookId}`,
      }),
      providesTags: ['Review'],
    }),
    getMyReview: build.query<ReviewWithBook[], void>({
      query: () => ({
        url: `/my/review`,
      }),
      providesTags: ['Review'],
    }),
  }),
})
