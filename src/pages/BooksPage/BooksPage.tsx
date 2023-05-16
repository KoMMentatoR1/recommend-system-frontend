import React, { useEffect, useState } from 'react'
import { Background } from '../../components/Auth/AuthPageLayout/style/style'
import { CustomAppBar } from '../../components/CustomAppBar'
import { MainPageLayout } from '../../components/Layouts/MainPageLayout/ui/MainPageLayout'
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Pagination,
  TextField,
  Autocomplete,
  Alert,
  Button,
} from '@mui/material'
import { brown } from '@mui/material/colors'
import { bookApi } from '../../app/store/api/bookApi'
import { useNavigate, useParams } from 'react-router-dom'
import noPhoto from './../../assets/noPicture.jpg'
import { authorsApi } from '../../app/store/api/authorsApi'
import { categoriesApi } from '../../app/store/api/categoriesApi'
import { AuthButton } from '../../components/Auth/AuthButtonContainer'

const BooksPage = () => {
  const params = useParams()

  const { data: authors } = authorsApi.useGetAuthorsQuery()
  const { data: сategories } = categoriesApi.useGetCategoriesQuery()
  const navigator = useNavigate()

  const [authorValue, setAuthorValue] = useState<string | null>(
    localStorage.getItem('author')
  )
  const [inputAuthorValue, setInputAuthorValue] = useState('')
  const optionsAuthors = authors?.length ? authors : []

  const [categoryValue, setCategoryValue] = useState<string | null>(
    localStorage.getItem('category')
  )
  const [inputCategoryValue, setInputCategoryValue] = useState('')
  const optionsCategory = сategories?.length ? сategories : []

  const [serchTitle, setSearhTitle] = useState('')

  const { data: books } = bookApi.useGetBooksQuery({
    page: Number(params.page) || 0,
    author: authorValue,
    category: categoryValue,
    title: serchTitle,
  })

  const { data: booksCount } = bookApi.useGetBooksCountQuery({
    author: authorValue,
    category: categoryValue,
    title: serchTitle,
  })

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    navigator('/books/' + value)
    setPage(value)
  }

  const [page, setPage] = useState(1)

  useEffect(() => {
    navigator('/books/' + 1)
    setPage(1)
  }, [booksCount])

  return (
    <Background>
      <CustomAppBar />
      <MainPageLayout>
        <Alert
          severity='warning'
          sx={{ mb: '20px', fontSize: '17px', alignItems: 'center' }}
          action={
            <AuthButton
              variant='contained'
              onClick={() => navigator('/addBook')}
              size='small'
            >
              Добавить
            </AuthButton>
          }
        >
          Не нашли книгу?
        </Alert>
        <Box
          sx={{
            width: '100%',
            height: '60px',
            mb: '30px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridColumnGap: '20px',
          }}
        >
          <Autocomplete
            value={authorValue}
            onChange={(event: any, newValue: string | null) => {
              setAuthorValue(newValue)
              localStorage.setItem('author', newValue || '')
            }}
            inputValue={inputAuthorValue}
            onInputChange={(event, newInputValue) => {
              setInputAuthorValue(newInputValue)
            }}
            options={optionsAuthors}
            renderInput={params => (
              <TextField {...params} label='Выбор автора' />
            )}
            sx={{
              '&.Mui-focused': {
                color: 'brown',
              },
              '&.Mui-focused > div > label': {
                color: brown[800],
              },
              '&.Mui-focused > div > div > fieldset': {
                borderColor: brown[800] + ' !important',
              },
            }}
          />
          <Autocomplete
            value={categoryValue}
            onChange={(event: any, newValue: string | null) => {
              setCategoryValue(newValue)
              localStorage.setItem('category', newValue || '')
            }}
            inputValue={inputCategoryValue}
            onInputChange={(event, newInputValue) => {
              setInputCategoryValue(newInputValue)
            }}
            options={optionsCategory}
            renderInput={params => (
              <TextField {...params} label='Выбор категории' />
            )}
            sx={{
              '&.Mui-focused': {
                color: 'brown',
              },
              '&.Mui-focused > div > label': {
                color: brown[800],
              },
              '&.Mui-focused > div > div > fieldset': {
                borderColor: brown[800] + ' !important',
              },
            }}
          />
          <TextField
            value={serchTitle}
            onChange={e => setSearhTitle(e.target.value)}
            label='Поиск по заголовку'
            sx={{
              '& > label.Mui-focused': {
                color: brown[800],
              },
              '& > div.Mui-focused > fieldset': {
                borderColor: brown[800] + ' !important',
              },
            }}
          />
        </Box>
        {books && books.length ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
              gridGap: '30px',
            }}
          >
            {books?.map(book => (
              <Card
                sx={{ bgcolor: brown[600] }}
                onClick={() => navigator('/book/' + book._id)}
              >
                <CardActionArea>
                  <CardMedia
                    component='img'
                    height='340'
                    image={
                      typeof book.image === 'string' ? book.image : noPhoto
                    }
                  />
                  <CardContent sx={{ minHeight: '200px' }}>
                    <Typography gutterBottom variant='h5' component='div'>
                      {book.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Категория:{' '}
                      {book?.categories?.[0]
                        ? book?.categories.join(', ')
                        : 'Категория не определена'}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Авторы:{' '}
                      {book?.authors?.[0]
                        ? book.authors.join(', ')
                        : 'Автор не известен'}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Публикация:{' '}
                      {typeof book.publisher === 'string'
                        ? book.publisher
                        : 'Не известно'}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography variant='h3' sx={{ textAlign: 'center' }}>
            По данному фильтру книги не найдены
          </Typography>
        )}

        {booksCount ? (
          <Box
            sx={{
              width: '100%',
              marginTop: '30px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Pagination
              count={booksCount}
              size='large'
              variant='outlined'
              onChange={handleChangePagination}
              page={page}
            />
          </Box>
        ) : (
          ''
        )}
      </MainPageLayout>
    </Background>
  )
}

export default BooksPage
