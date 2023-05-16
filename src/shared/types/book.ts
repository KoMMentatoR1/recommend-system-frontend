export interface Book {
  _id: number
  title: string
  description: string
  authors: string[]
  categories: string[]
  previewLink: string
  publishedDate: string
  publisher: string | null
  image: string
  description_vektor: JSON
}

export interface SearchBook {
  author: string | null
  category: string | null
  title: string | null
  page: number
}

export interface SearchBookCount {
  author: string | null
  category: string | null
  title: string | null
}

export interface AddBook {
  title: string
  description: string
  authors: string | null
  image: string | null
  categories: string | null
  previewLink: string | null
  publisher: string | null
}
