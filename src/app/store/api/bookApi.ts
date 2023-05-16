import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { API_URL } from '../../../shared/http'
import {
  AddBook,
  Book,
  SearchBook,
  SearchBookCount,
} from '../../../shared/types/book'

export const bookApi = createApi({
  reducerPath: 'bookApi',
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
    getBook: build.query<Book, string>({
      query: id => ({
        url: `/book/${id}`,
      }),
    }),
    getBooks: build.query<Book[], SearchBook>({
      query: data => ({
        url: `/books/${data.page}`,
        params: {
          author: data.author,
          category: data.category,
          title: data.title,
        },
      }),
    }),
    getBooksCount: build.query<number, SearchBookCount>({
      query: data => ({
        url: `/booksCount`,
        params: {
          author: data.author,
          category: data.category,
          title: data.title,
        },
      }),
    }),
    createBook: build.mutation<boolean, AddBook>({
      query: data => ({
        url: `/book`,
        method: 'POST',
        body: { ...data },
      }),
    }),
  }),
})
