import React, { useEffect, useState } from 'react'
import { Background } from '../../components/Auth/AuthPageLayout/style/style'
import { CustomAppBar } from '../../components/CustomAppBar'
import { Box, Rating } from '@mui/material'
import { useParams } from 'react-router-dom'
import { bookApi } from '../../app/store/api/bookApi'
import { grey } from '@mui/material/colors'
import { MainPageLayout } from '../../components/Layouts/MainPageLayout/ui/MainPageLayout'
import noPhoto from './../../assets/noPicture.jpg'
import { reviewApi } from '../../app/store/api/reviewApi'

const BookPage = () => {
  const params = useParams()

  const { data: book, isLoading } = bookApi.useGetBookQuery(params.id || '')
  const [addReview, {}] = reviewApi.useAddReviewMutation()
  const { data: dataRating } = reviewApi.useGetOneReviewQuery(params.id || '')

  const [rating, setRating] = useState(dataRating || 0)

  useEffect(() => {
    setRating(dataRating || 0)
  }, [dataRating])

  const handleReview = (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    addReview({ bookId: params.id || '', review: value || 0 })
  }

  return (
    <Background>
      <CustomAppBar />
      <MainPageLayout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '22%',
              maxWidth: '22%',
              minWidth: '22%',
            }}
          >
            <img
              style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
              src={typeof book?.image === 'string' ? book.image : noPhoto}
            />
          </Box>
          <Box sx={{ width: '100%', color: grey[300], marginLeft: '60px' }}>
            <Box
              sx={{
                margin: 'auto',
                fontSize: '30px',
                width: '100%',
                textAlign: 'center',
                mb: '40px',
              }}
            >
              {book?.title}
            </Box>
            <Box
              sx={{
                margin: 'auto',
                fontSize: '30px',
                width: '100%',
                textAlign: 'left',
                mb: '20px',
              }}
            >
              <Box sx={{ fontWeight: 'bold', mb: '10px' }}>
                Краткое содержание:
              </Box>
              <Box>{book?.description}</Box>
            </Box>
            <Box
              sx={{
                margin: 'auto',
                fontSize: '30px',
                width: '100%',
                textAlign: 'left',
                mb: '20px',
              }}
            >
              <Box sx={{ fontWeight: 'bold', mb: '10px' }}>Авторы:</Box>
              {book?.authors?.[0]
                ? book?.authors.join(', ')
                : 'Автор не определен'}
            </Box>
            <Box
              sx={{
                margin: 'auto',
                fontSize: '30px',
                width: '100%',
                textAlign: 'left',
                mb: '20px',
              }}
            >
              <Box sx={{ fontWeight: 'bold', mb: '10px' }}>Категория:</Box>
              <Box>
                Категория:{' '}
                {book?.categories?.[0]
                  ? book?.categories.join(', ')
                  : 'Категория книг не определена'}
              </Box>
            </Box>
            <Box
              sx={{
                margin: 'auto',
                fontSize: '30px',
                width: '100%',
                textAlign: 'left',
                mb: '20px',
              }}
            >
              <Box sx={{ fontWeight: 'bold', mb: '10px' }}>Пуликация:</Box>
              <Box>
                {' '}
                {typeof book?.publisher === 'string'
                  ? book?.publisher
                  : 'Не известно'}
              </Box>
            </Box>
            <Box
              sx={{
                margin: 'auto',
                fontSize: '30px',
                width: '100%',
                textAlign: 'left',
                mb: '20px',
              }}
            >
              <a
                href={
                  typeof book?.previewLink === 'string' ? book.previewLink : '#'
                }
                target='_blank'
              >
                Перейти к книге
              </a>
            </Box>
            <Box
              sx={{
                margin: 'auto',
                fontSize: '30px',
                width: '100%',
                textAlign: 'left',
                mb: '20px',
              }}
            >
              <Box sx={{ fontWeight: 'bold', mb: '10px' }}>
                Уже читали эту книгу? Оставьте отзыв:
              </Box>
              <Box>
                <Rating
                  precision={0.5}
                  onChange={handleReview}
                  value={rating}
                  defaultValue={rating}
                  size='large'
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </MainPageLayout>
    </Background>
  )
}

export default BookPage
