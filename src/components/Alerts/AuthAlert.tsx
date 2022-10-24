import { Alert, AlertColor, Box } from '@mui/material'
import React from 'react'

interface AuthAlertProps {
  children: React.ReactNode
  severity: AlertColor
  setMessage: (arg: string) => void

}

const AuthAlert: React.FC<AuthAlertProps> = ({ children, severity, setMessage }) => {
  return (
        <Box sx={{
          position: 'absolute',
          left: { xs: '8%', md: '30%' },
          right: { xs: '8%', md: '30%' },
          marginLeft: { xs: 1 },
          marginRight: { xs: 1 },
          marginTop: 1
        }}>
            <Alert variant='filled'
                   severity={severity}
                   onClose={() => setMessage('')}>
                {children}
            </Alert>

        </Box>
  )
}

export default AuthAlert
