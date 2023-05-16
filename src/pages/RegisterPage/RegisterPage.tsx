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
import { useTypeSelector } from '../../shared/hooks/useTypeSelector'
import { Alert } from '@mui/material'
import { useEffect } from 'react'

const RegisterPage = () => {
  const navigator = useNavigate()

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()

  const { error } = useTypeSelector(state => state.auth)

  const { registration, clearUser } = useAction()

  const onSubmit: SubmitHandler<FieldValues> = data =>
    registration(data.password, data.username)

  useEffect(() => {
    clearUser()
  }, [])

  return (
    <AuthPageLayout title='BookScout' subTitle='Регистрация'>
      <FormContainer>
        <BaseInputText
          required
          label='Имя пользователя'
          error={errors.username ? true : false}
          name='username'
          control={control}
          rules={{ required: 'Имя пользователя обязатально' }}
          helperText={errors.username?.message as string}
        />
        <BaseInputPassword
          required
          label='Пароль'
          error={errors.password ? true : false}
          name='password'
          control={control}
          helperText={errors.password?.message as string}
          rules={{
            required: 'Пароль обязателен',
            minLength: {
              value: 6,
              message: 'Пароль должен состоять минимум из 6 символов',
            },
          }}
        />
        <BaseInputPassword
          required
          label='Повторите пароль'
          error={errors.repeatPassword ? true : false}
          name='repeatPassword'
          control={control}
          helperText={errors.repeatPassword?.message as string}
          rules={{
            required: 'Необходимо повторить пароль',
            validate: (val: string) => {
              if (watch('password') != val) {
                return 'Пароли не совпадают'
              }
            },
          }}
        />
        {error && <Alert severity='error'>{error}</Alert>}
        <AuthButtonContainer>
          <AuthButton
            fullWidth
            onClick={() => navigator('/login')}
            variant='contained'
          >
            Вернуться к странице входа
          </AuthButton>
          <AuthButton
            onClick={handleSubmit(onSubmit)}
            fullWidth
            variant='contained'
          >
            Зарегистрироваться
          </AuthButton>
        </AuthButtonContainer>
      </FormContainer>
    </AuthPageLayout>
  )
}

export default RegisterPage
