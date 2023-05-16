import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { brown } from '@mui/material/colors'

export const ButtonContainer = styled('div')`
  display: flex;
  gap: 15px;
  width: 100%;
  margin-top: 30px;

  @media (max-width: 1200px) {
    flex-direction: column-reverse;
  }

  @media (max-width: 600px) {
    flex-direction: column-reverse;
  }
`
export const AuthButton = styled(Button)`
  font-family: 'Rubik', sans-serif;
  background-color: ${brown[400]};
  &:hover {
    background-color: ${brown[500]};
  }
`
