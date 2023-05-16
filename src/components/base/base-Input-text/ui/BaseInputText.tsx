import { FC } from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'
import { Input } from '../style/style'

interface BaseInputTextProps {
  control: UseControllerProps['control']
  label: string
  name: string
  defaultValue?: string
  rules?: UseControllerProps['rules']
  required?: boolean
  error?: boolean
  helperText?: string
  rows?: number
}

const BaseInputText: FC<BaseInputTextProps> = ({
  control,
  label,
  name,
  defaultValue = '',
  rules,
  required = false,
  error,
  helperText,
  rows = 0,
}) => {
  return (
    <Controller
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
          label={label}
          required={required}
          fullWidth
          error={error}
          variant='filled'
          helperText={helperText}
          rows={rows}
          multiline={rows ? true : false}
        />
      )}
      defaultValue={defaultValue}
      name={name}
      control={control}
      rules={rules}
    />
  )
}

export default BaseInputText
