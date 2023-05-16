import { Rating } from '@mui/material'
import { FC } from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'

interface BaseStarsProps {
  control?: UseControllerProps['control']
  name?: string
  defaultValue?: number
  rules?: UseControllerProps['rules']
  readOnly?: boolean
  size?: 'small' | 'large' | 'medium'
}

export const BaseStars: FC<BaseStarsProps> = ({
  control,
  name,
  defaultValue = 0,
  rules,
  readOnly = false,
  size,
}) => {
  if (!readOnly && name) {
    return (
      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <Rating
            precision={0.5}
            readOnly={readOnly}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            size={size}
          />
        )}
        defaultValue={defaultValue}
        name={name}
        control={control}
        rules={rules}
      />
    )
  } else {
    return (
      <Rating
        precision={0.5}
        readOnly={readOnly}
        defaultValue={defaultValue || 0}
        size={size}
      />
    )
  }
}
