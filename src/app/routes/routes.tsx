import { Navigate } from 'react-router-dom'
import RegisterPage from '../../pages/RegisterPage/RegisterPage'
import LoginPage from '../../pages/LoginPage/LoginPage'
import UserPage from '../../pages/UserPage/UserPage'
import BookPage from '../../pages/BookPage/BookPage'
import BooksPage from '../../pages/BooksPage/BooksPage'
import { AddBookPage } from '../../pages/AddBookPage/AddBookPage'

interface IRouter {
  path: string
  element: React.ReactNode
}

export const publicRoutes: Array<IRouter> = [
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <LoginPage />,
  },
]

export const userRoutes: Array<IRouter> = [
  {
    path: '/',
    element: <UserPage />,
  },
  {
    path: '/book/:id',
    element: <BookPage />,
  },
  {
    path: '/books/:page',
    element: <BooksPage />,
  },
  {
    path: '/addBook',
    element: <AddBookPage />,
  },
  {
    path: '*',
    element: <UserPage />,
  },
]
