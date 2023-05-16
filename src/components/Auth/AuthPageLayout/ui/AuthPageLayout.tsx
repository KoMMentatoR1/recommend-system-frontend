import React, { FC } from 'react'
import {
  Background,
  Container,
  Dashboard,
  SubTitle,
  Title,
} from '../style/style'

interface AuthPageLayoutProps {
  title: string
  subTitle: string
  children: React.ReactNode
}

export const AuthPageLayout: FC<AuthPageLayoutProps> = ({
  title,
  subTitle,
  children,
}) => {
  return (
    <Background>
      <Container>
        <Dashboard>
          <Title>{title}</Title>
          <SubTitle>{subTitle}</SubTitle>
          {children}
        </Dashboard>
      </Container>
    </Background>
  )
}
