import styled from '@emotion/styled'
import { FormControl } from '@mui/material'
import { brown, red } from '@mui/material/colors'

export const PasswordInput = styled(FormControl)({
  '& div.MuiFilledInput-root': {
    backgroundColor: brown[50],
  },
  '& div.MuiFilledInput-root.Mui-error': {
    backgroundColor: red[50],
  },
  '& label.Mui-focused': {
    color: brown[900],
  },

  '& label.MuiInputLabel-root': {
    color: brown[900],
  },
  '& label.MuiInputLabel-root.Mui-error': {
    color: red[900],
  },
  '& div.MuiFilledInput-root:after': {
    borderBottom: brown[900],
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: brown[900],
  },
})
