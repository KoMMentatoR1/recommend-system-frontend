import {
  Autocomplete,
  TextField,
  AutocompleteRenderInputParams,
} from '@mui/material'
import { FC, useState } from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'

interface BaseAutocompleteProps {
  control: UseControllerProps['control']
  label: string
  name: string
  rules?: UseControllerProps['rules']
  required?: boolean
  error?: boolean
  helperText?: string
  disabled?: boolean
  options: Array<{ label: string; value: string | number }>
}

export const BaseAutocomplete: FC<BaseAutocompleteProps> = ({
  control,
  label,
  name,
  rules,
  required = false,
  error,
  helperText,
  disabled = false,
  options,
}) => {
  return (
    <Controller
      render={({ field }) => (
        <Autocomplete
          disablePortal
          options={options}
          getOptionLabel={option => option.label}
          {...field}
          sx={{ width: 300 }}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <TextField
              {...params}
              required={required}
              error={error}
              helperText={helperText}
              label={label}
              variant='outlined'
            />
          )}
        />
      )}
      name={name}
      control={control}
      rules={disabled ? {} : rules}
    />
  )
}
