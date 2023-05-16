import { Book } from './book'

export interface AddReview {
  bookId: string
  review: number
}

export interface ReviewWithBook {
  book: Book
  rating: number
}
