import React, { FC } from 'react'
import { ButtonContainer } from '../style/style'

interface AuthButtonContainerProps {
  children: React.ReactNode
}

export const AuthButtonContainer: FC<AuthButtonContainerProps> = ({
  children,
}) => {
  return <ButtonContainer>{children}</ButtonContainer>
}
