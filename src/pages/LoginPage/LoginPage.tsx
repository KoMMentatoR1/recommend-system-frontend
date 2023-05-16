import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  AuthButton,
  AuthButtonContainer,
} from '../../components/Auth/AuthButtonContainer'
import {
  AuthPageLayout,
  FormContainer,
} from '../../components/Auth/AuthPageLayout'
import { BaseInputPassword } from '../../components/base/base-input-password'
import { BaseInputText } from '../../components/base/base-Input-text'
import { useAction } from '../../shared/hooks/useAction'
import { Alert } from '@mui/material'
import { useTypeSelector } from '../../shared/hooks/useTypeSelector'
import { useEffect } from 'react'
const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()

  const navigator = useNavigate()

  const { login, clearUser } = useAction()
  const { error } = useTypeSelector(state => state.auth)

  const onSubmit: SubmitHandler<FieldValues> = data =>
    login(data.username, data.password)

  useEffect(() => {
    clearUser()
  }, [])

  return (
    <AuthPageLayout title='BookScout' subTitle='Вход'>
      <FormContainer>
        <BaseInputText
          rules={{
            required: 'Имя пользователя обязательно',
          }}
          required
          error={errors.username ? true : false}
          label='Имя пользователя'
          name='username'
          helperText={errors.username?.message as string}
          control={control}
        />
        <BaseInputPassword
          required
          error={errors.password ? true : false}
          label='Пароль'
          name='password'
          helperText={errors.password?.message as string}
          control={control}
          rules={{
            required: 'Пароль обязателен',
          }}
        />
        {error && <Alert severity='error'>{error}</Alert>}
        <AuthButtonContainer>
          <AuthButton
            onClick={() => navigator('/register')}
            fullWidth
            color='success'
            variant='contained'
          >
            Sing up
          </AuthButton>
          <AuthButton
            onClick={handleSubmit(onSubmit)}
            fullWidth
            color='success'
            variant='contained'
          >
            log in
          </AuthButton>
        </AuthButtonContainer>
      </FormContainer>
    </AuthPageLayout>
  )
}

export default LoginPage
