import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import {
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material'
import { red, brown } from '@mui/material/colors'
import { FC, useState } from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'
import { PasswordInput } from '../style/style'

interface BaseInputPasswordProps {
  control: UseControllerProps['control']
  label: string
  name: string
  defaultValue?: string
  required?: boolean
  error?: boolean
  helperText?: string
  rules?: UseControllerProps['rules']
}

export const BaseInputPassword: FC<BaseInputPasswordProps> = ({
  control,
  label,
  name,
  defaultValue = '',
  required = false,
  error,
  helperText,
  rules,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <Controller
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <PasswordInput required={required} variant='filled'>
          <InputLabel error={error}>{label}</InputLabel>
          <FilledInput
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            fullWidth
            error={error}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {helperText && (
            <FormHelperText sx={{ color: red[900] }}>
              {helperText}
            </FormHelperText>
          )}
        </PasswordInput>
      )}
      defaultValue={defaultValue}
      name={name}
      control={control}
      rules={rules}
    />
  )
}
