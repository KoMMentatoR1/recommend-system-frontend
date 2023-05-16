import { Background } from '../../components/Auth/AuthPageLayout/style/style'
import { MainPageLayout } from '../../components/Layouts/MainPageLayout/ui/MainPageLayout'
import { CustomAppBar } from '../../components/CustomAppBar'
import { Alert, Box, Button, Typography } from '@mui/material'
import { brown, grey } from '@mui/material/colors'
import { FieldValues, useForm } from 'react-hook-form'
import { BaseInputText } from '../../components/base/base-Input-text'
import { bookApi } from '../../app/store/api/bookApi'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AddBookPage = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const [createBook, { isSuccess, error }] = bookApi.useCreateBookMutation()

  const handleCreate = (data: FieldValues) => {
    createBook({
      authors: data.authors,
      categories: data.categories,
      description: data.description,
      image: data.image,
      previewLink: data.previewLink,
      publisher: data.publisher,
      title: data.title,
    })
  }

  const navigator = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      navigator('/books/1')
    }
  }, [isSuccess])

  return (
    <Background>
      <CustomAppBar />
      <MainPageLayout>
        <Typography variant='h4' sx={{ color: grey[200], textAlign: 'center' }}>
          Добавление книги
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            mt: '30px',
            width: '100%',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <BaseInputText
              control={control}
              label='Название книги'
              name='title'
              required
              rules={{ required: 'Название книги обязательно для заполнения' }}
              helperText={errors.title?.message as string}
              error={!!errors.title}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <BaseInputText
              control={control}
              label='Описание книги'
              name='description'
              rows={10}
              required
              rules={{ required: 'Описание книги обязательно для заполнения' }}
              helperText={errors.description?.message as string}
              error={!!errors.description}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <BaseInputText
              control={control}
              label='Авторы (перечислить через запятую)'
              name='authors'
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <BaseInputText
              control={control}
              label='Категории (перечислить через запятую)'
              name='categories'
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <BaseInputText
              control={control}
              label='Ссылка на книгу'
              name='previewLink'
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <BaseInputText
              control={control}
              label='Ссылка на фотографию'
              name='image'
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <BaseInputText
              control={control}
              label='Кто опубликовал?'
              name='publisher'
            />
          </Box>
          {error && (
            <Alert severity='error'>Книга с таким именем уже существует</Alert>
          )}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
            <Button
              variant='contained'
              size='large'
              sx={{
                bgcolor: brown[700],
                '&:hover': {
                  bgcolor: brown[900],
                },
              }}
              onClick={handleSubmit(handleCreate)}
            >
              Создать
            </Button>
          </Box>
        </Box>
      </MainPageLayout>
    </Background>
  )
}

export { AddBookPage }
