import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material'
import { FC } from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'

interface BaseSelectProps {
  control: UseControllerProps['control']
  label: string
  name: string
  defaultValue?: string
  rules?: UseControllerProps['rules']
  required?: boolean
  error?: boolean
  helperText?: string
  disabled?: boolean
  values: Array<{ label: string; value: string | number }>
}

export const BaseSelect: FC<BaseSelectProps> = ({
  control,
  label,
  name,
  defaultValue,
  disabled,
  error,
  helperText,
  required,
  values,
  rules,
}) => {
  return (
    <Controller
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <FormControl required={required} error={error} fullWidth>
          <InputLabel color='success' required={required}>
            {label}
          </InputLabel>
          <Select
            color='success'
            required={required}
            value={value}
            label={label}
            onChange={onChange}
          >
            {values.map(value => (
              <MenuItem value={value.value}>{value.label}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      )}
      defaultValue={defaultValue}
      name={name}
      control={control}
      rules={disabled ? {} : rules}
    />
  )
}
