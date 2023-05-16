import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
} from '@mui/material'
import { Background } from '../../components/Auth/AuthPageLayout/style/style'
import { CustomAppBar } from '../../components/CustomAppBar'
import { brown, grey } from '@mui/material/colors'
import { BaseStars } from '../../components/base/base-stars'
import { useNavigate } from 'react-router-dom'
import { reviewApi } from '../../app/store/api/reviewApi'
import { recommendApi } from '../../app/store/api/recommendApi'
import { categoriesApi } from '../../app/store/api/categoriesApi'
import { useState } from 'react'
import { MainPageLayout } from '../../components/Layouts/MainPageLayout/ui/MainPageLayout'

const UserPage = () => {
  const { data: myCategories } = categoriesApi.useGetMyCategoriesQuery()
  const options = myCategories?.length ? myCategories : []
  const [value, setValue] = useState<string | null>(
    localStorage.getItem('myCategory' || '')
  )
  const [inputValue, setInputValue] = useState('')
  const navigator = useNavigate()
  const { data: myReview } = reviewApi.useGetMyReviewQuery()
  const { data: myRecommend, isLoading } = recommendApi.useGetRecommendQuery(
    value || ''
  )

  return (
    <Background>
      <CustomAppBar />
      <MainPageLayout>
        <Box
          sx={{
            bgcolor: 'transparent',
            width: '100%',
            height: '60px',
            mb: '30px',
          }}
        >
          <Autocomplete
            value={value}
            onChange={(event: any, newValue: string | null) => {
              setValue(newValue)
              localStorage.setItem('myCategory', newValue || '')
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue)
            }}
            options={...options}
            renderInput={params => (
              <TextField {...params} label='Рекомендовать по категории' />
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
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridColumnGap: '50px',
            height: 'auto',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                color: grey[300],
                fontSize: '25px',
                textAlign: 'center',
                mb: '20px',
              }}
            >
              Прочитанные мной книги:
            </Box>
            <Box
              sx={{
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {myReview && myReview.length ? (
                myReview.map(review => (
                  <Box
                    onClick={() => navigator(`/book/${review.book._id}`)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '10px',
                      height: '61.75px',
                      bgcolor: brown[700],
                      borderRadius: '2px',
                      transition:
                        'background .1s linear, box-shadow .1s linear',
                      '&:hover': {
                        bgcolor: brown[800],
                        boxShadow: '0px 0px 2px 2px rgba(0, 0, 0, 0.3)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        color: grey[300],
                        fontSize: '22px',
                        display: 'flex',
                        alignItems: 'center',
                        maxWidth: '80%',
                      }}
                    >
                      {review.book.title}
                    </Box>
                    <BaseStars readOnly defaultValue={review.rating} />
                  </Box>
                ))
              ) : isLoading ? (
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress size='10rem' sx={{ color: brown[900] }} />
                </Box>
              ) : (
                <Box
                  sx={{ color: grey[300], fontSize: '22px', margin: 'auto' }}
                >
                  У вас пока нет отзывов на прочитанные книги
                </Box>
              )}
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                color: grey[300],
                fontSize: '25px',
                textAlign: 'center',
                mb: '20px',
              }}
            >
              Рекомендуемые книги:
            </Box>
            <Box
              sx={{
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {myRecommend && myRecommend.length ? (
                myRecommend.map(book => (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '10px',
                      bgcolor: brown[700],
                      borderRadius: '2px',
                      transition:
                        'background .1s linear, box-shadow .1s linear',
                      '&:hover': {
                        bgcolor: brown[800],
                        boxShadow: '0px 0px 2px 2px rgba(0, 0, 0, 0.3)',
                      },
                    }}
                    onClick={() => navigator(`/book/${book._id}`)}
                  >
                    <Box
                      sx={{
                        color: grey[300],
                        fontSize: '22px',
                        display: 'flex',
                        alignItems: 'center',
                        maxWidth: '80%',
                      }}
                    >
                      {book.title}
                    </Box>
                    <Button
                      sx={{ color: grey[300], fontSize: '17px' }}
                      variant='text'
                      onClick={() => navigator(`/book/${book._id}`)}
                    >
                      Открыть
                    </Button>
                  </Box>
                ))
              ) : isLoading ? (
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress size='10rem' sx={{ color: brown[900] }} />
                </Box>
              ) : (
                <Box
                  sx={{ color: grey[300], fontSize: '22px', margin: 'auto' }}
                >
                  Для получения рекомендаций оставьте хороший отзыв хотя бы на 1
                  книгу
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </MainPageLayout>
    </Background>
  )
}

export default UserPage
