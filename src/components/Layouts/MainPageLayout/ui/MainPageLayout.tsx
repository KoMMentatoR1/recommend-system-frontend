import { Box } from '@mui/material'
import React, { FC } from 'react'

interface MainPageLayoutProps {
  children?: React.ReactNode
}

export const MainPageLayout: FC<MainPageLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{
          bgcolor: '#795548B0',
          padding: '20px',
          backdropFilter: 'blur(3px)',
          borderRadius: '14px',
          width: '90%',
          height: '85vh',
          overflowY: 'scroll',
          mt: '80px',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
