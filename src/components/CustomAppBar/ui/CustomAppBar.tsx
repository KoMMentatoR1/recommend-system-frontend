import { AppBar, Box, Button, ListItem, Toolbar } from '@mui/material'
import { brown, grey } from '@mui/material/colors'
import { ButtonList, Logo } from '../style/style'
import { useNavigate } from 'react-router-dom'
import { useAction } from '../../../shared/hooks/useAction'

export const CustomAppBar = () => {
  const navigator = useNavigate()
  const { logout } = useAction()
  return (
    <AppBar>
      <Toolbar sx={{ bgcolor: brown[400] }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ pl: '20px' }}>
            <Logo
              sx={{
                ':hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={() => navigator('/')}
            >
              BOOKSCOUT
            </Logo>
          </Box>
          <ButtonList>
            <ListItem>
              <Button
                fullWidth
                sx={{ color: grey[300], width: '130px', fontSize: '17px' }}
                variant='text'
                onClick={() => navigator('/books/1')}
              >
                Поиск книг
              </Button>
              <Button
                fullWidth
                sx={{ color: grey[300], width: '130px', fontSize: '17px' }}
                variant='text'
                onClick={() => navigator('/')}
              >
                Мои книги
              </Button>
            </ListItem>
            <ListItem>
              <Button
                sx={{ color: grey[300], fontSize: '17px' }}
                variant='text'
                onClick={() => logout()}
              >
                Выход
              </Button>
            </ListItem>
          </ButtonList>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
